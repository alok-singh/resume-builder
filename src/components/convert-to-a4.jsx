import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const ConvertToA4 = (props) => {
  const hiddenRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [previewHtml, setPreviewHtml] = useState('');

  const showElement = (element) => {
    if (!element.parentElement) {
      console.log(element?.innerText);
    }
    element.classList.remove('hidden');
    while (element.parentElement) {
      element = element.parentElement;
      element.classList.remove('hidden');
      if (!element.children) {
        console.log(element?.innerText);
      }
    }
  };

  const renderView = () => {
    const pageAspect = 1.4142;
    const previewPaddingY = 64;
    const hiddenResume = hiddenRef.current;
    const totalHtmlHeight = Math.ceil(hiddenResume.offsetHeight);
    const a4PageHeight = Math.ceil(hiddenResume.offsetWidth * pageAspect);
    const totalA4Pages = Math.ceil(totalHtmlHeight / a4PageHeight);
    const allHiddenElements = [...hiddenResume.querySelectorAll('*')].filter((element) => element.childElementCount === 0);
    const cloneElement = document.createElement('div');

    cloneElement.classList.add('bg-white');
    cloneElement.classList.add('p-8');
    cloneElement.classList.add('shadow');
    cloneElement.classList.add('text-gray-800');
    // cloneElement.style.width = `${hiddenResume.offsetWidth}px`;
    cloneElement.style.minHeight = `${a4PageHeight}px`;
    cloneElement.innerHTML = hiddenResume.innerHTML;
    cloneElement.querySelectorAll('*').forEach((innerElement) => {
      innerElement.classList.add('hidden');
    });

    const allElementsOfClone = [...cloneElement.querySelectorAll('*')].filter((element) => element.childElementCount === 0);

    console.log(allHiddenElements.length, allElementsOfClone.length);

    const paddedPageHeight = a4PageHeight;
    allHiddenElements.forEach((hiddenElement, index) => {
      const elementTopFromTop = hiddenElement.offsetTop;
      const elementBottomFromTop = hiddenElement.offsetTop + hiddenElement.offsetHeight;
      if (elementTopFromTop >= (currentPage - 1) * paddedPageHeight && elementBottomFromTop < currentPage * paddedPageHeight) {
        showElement(allElementsOfClone[index]);
      }
    });

    setPreviewHtml(cloneElement.outerHTML);
    setTotalPages(totalA4Pages);
  };

  useEffect(() => {
    renderView();
  }, [hiddenRef.current, props.children, currentPage]);

  return (
    <>
      <div className="h-0 overflow-hidden">
        <div ref={hiddenRef} className="invisible relative w-max max-w-3xl mx-auto p-8">
          {props.children}
        </div>
      </div>
      {/* zoom-[0.42] */}
      <div className="template-preview relative zoom-[0.42]" dangerouslySetInnerHTML={{ __html: previewHtml }} />
      <div className="mt-3 flex gap-2 items-center justify-center">
        <ChevronLeft onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} className="h-4 w-4 cursor-pointer" />
        <p className="text-center text-[11px] text-muted-foreground">
          Page {currentPage} of {totalPages} · A4
        </p>
        <ChevronRight onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} className="h-4 w-4 cursor-pointer" />
      </div>
    </>
  );
};

export default ConvertToA4;
