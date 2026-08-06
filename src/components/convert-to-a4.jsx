import { useEffect, useRef, useState } from 'react';
import { postResource } from '../utils/http.util';
import { downloadBase64PDF } from '../utils/helper.util';

const ConvertToA4 = (props) => {
  const pageHeight = 1448;
  const pageAspect = 1.4142;
  const pagePadding = props.pagePadding || 0;
  const pageTopPadding = pagePadding / 2;
  const pageBottomPadding = pagePadding / 2;
  const hiddenRef = useRef(null);
  const [paintComplete, setPaintComplete] = useState(false);
  const [a4Pages, setA4Pages] = useState([]);

  const showElement = (element) => {
    element.classList.remove('hidden');
    while (element.parentElement) {
      element = element.parentElement;
      element.classList.remove('hidden');
    }
  };

  const setElementDebugConfig = (element, config) => {
    element.dataset.pageStart = config.pageBoundaries.start;
    element.dataset.pageEnd = config.pageBoundaries.end;
    element.dataset.elementTopFromTop = config.elementTopFromTop;
    element.dataset.elementBottomFromTop = config.elementBottomFromTop;
    element.dataset.toPage = config.toPage;
  };

  const getPageBoundaries = (pageNumber, isLast) => {
    const start = pageHeight - pageBottomPadding + (pageNumber - 2) * (pageHeight - pageTopPadding - pageBottomPadding);
    const end = pageHeight - pageBottomPadding + (pageNumber - 1) * (pageHeight - pageTopPadding - pageBottomPadding);
    return {
      start: pageNumber === 1 ? 0 : start,
      end: isLast ? end + pageBottomPadding : end
    };
  };

  const getTotalPages = (hiddenResume) => {
    const totalHtmlHeight = Math.ceil(hiddenResume?.offsetHeight - pageTopPadding - pageBottomPadding);
    const a4PageHeight = Math.ceil(hiddenResume?.offsetWidth * pageAspect);
    const totalA4Pages = Math.ceil(totalHtmlHeight / (a4PageHeight - pageTopPadding - pageBottomPadding));
    return totalA4Pages;
  };

  const getAllElementArray = (element) => {
    return [...element.querySelectorAll('*')].filter((elementItem) => elementItem.childElementCount === 0);
  };

  /**
   *
   * @param {*} hiddenResume
   * @param {*} toPage 1 to n
   * @returns
   */
  const getPageHtml = (hiddenResume, toPage, totalPages) => {
    const pageWidth = 1024;
    const pageHeight = 1447;
    const pageBoundaries = getPageBoundaries(toPage, totalPages === toPage);
    const allHiddenElements = getAllElementArray(hiddenResume);
    const cloneElement = document.createElement('div');

    cloneElement.style.height = `${pageHeight}px`;
    cloneElement.style.width = `${pageWidth}px`;
    cloneElement.innerHTML = hiddenResume.innerHTML;
    cloneElement.querySelectorAll('*').forEach((innerElement) => {
      if (!innerElement?.classList?.contains?.('do-not-hide')) {
        innerElement.classList.add('hidden');
      }
    });

    const allElementsOfClone = getAllElementArray(cloneElement);
    const topRect = hiddenResume.getBoundingClientRect();

    // for debugging
    console.log({ allElementsOfClone: allElementsOfClone.length, allHiddenElements: allHiddenElements.length });

    allHiddenElements.forEach((hiddenElement, index) => {
      const rect = hiddenElement.getBoundingClientRect();
      const elementTopFromTop = rect.top - topRect.top;
      const elementBottomFromTop = rect.bottom - topRect.top;

      // for debugging
      // if (hiddenElement.tagName !== allElementsOfClone[index].tagName) {
      //   console.log(hiddenElement.tagName, allElementsOfClone[index].tagName);
      // }

      if (hiddenElement.dataset.toPage === `${toPage}`) {
        hiddenElement.dataset.page = toPage;
        setElementDebugConfig(allElementsOfClone[index], { elementTopFromTop, elementBottomFromTop, pageBoundaries, toPage });
        showElement(allElementsOfClone[index]);
      } else if (elementTopFromTop >= pageBoundaries.start && elementTopFromTop < pageBoundaries.end) {
        if (elementBottomFromTop > pageBoundaries.end) {
          hiddenElement.dataset.toPage = toPage + 1;
        } else {
          hiddenElement.dataset.page = toPage;
          showElement(allElementsOfClone[index]);
          setElementDebugConfig(allElementsOfClone[index], { elementTopFromTop, elementBottomFromTop, pageBoundaries, toPage });
        }
      }
    });

    return cloneElement.outerHTML;
  };

  const rePaint = () => {
    const hiddenResume = hiddenRef.current;
    setA4Pages([]);
    setTimeout(() => {
      const totalPages = getTotalPages(hiddenResume);
      window.getTotalPages = getTotalPages;
      const pages = new Array(totalPages).fill(0).map((item, index) => {
        return getPageHtml(hiddenResume, index + 1, totalPages);
      });

      setA4Pages(pages);
    }, 300);
  };

  useEffect(() => {
    rePaint();
  }, []);

  window.rePaint = rePaint;

  return (
    <>
      {!paintComplete ? (
        <div ref={hiddenRef} className="absolute invisible top-[-10000px] left-[-10000px] w-5xl">
          {props.children}
        </div>
      ) : null}
      <div id="a4-preview" className="flex flex-col preview-page gap-4 bg-[#333] w-full" style={{ ...props.style }}>
        {a4Pages.map((page, index) => {
          return <div key={`preview-page-${index}`} className="h-362 w-5xl template-preview m-auto bg-[#333] overflow-hidden" dangerouslySetInnerHTML={{ __html: page }} />;
        })}
      </div>
    </>
  );
};

export default ConvertToA4;
