import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { createPortal } from "react-dom";
import { Previewer } from "pagedjs";

// Default screen-preview chrome for paged.js (page shadows, gaps, background).
// It ships its own print overrides too, so it's safe to leave imported.
// import "pagedjs/dist/paged.css";
import {
  Printer,
  ZoomIn,
  ZoomOut,
  X,
  Loader2,
  FileText,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";

/**
 * Builds the CSS that paged.js uses to lay out each physical page.
 * Anything that should repeat on every page (page numbers, running
 * headers) belongs here, as @page rules rather than React markup.
 */
function buildPageCss({ pageSize, margin }) {
  return `
    @page {
      size: ${pageSize};
      margin: ${margin};
    }
    @page {
      @bottom-center {
        content: counter(page) " / " counter(pages);
        font-family: ui-sans-serif, system-ui, sans-serif;
        font-size: 8.5pt;
        color: #94a3b8;
      }
    }
    html, body {
      font-family: ui-sans-serif, system-ui, -apple-system, sans-serif;
      color: #1e293b;
    }
    /* Sensible print defaults for whatever markup gets paginated */
    img { max-width: 100%; }
    table { border-collapse: collapse; }
    h1, h2, h3 { break-after: avoid; }
    p, li { orphans: 3; widows: 3; }
  `;
}

const ZOOM_MIN = 0.5;
const ZOOM_MAX = 2;
const ZOOM_STEP = 0.1;

/**
 * PrintPreview
 * ------------
 * Takes any React element as `children` and renders it as a paginated,
 * A4-shaped print preview using paged.js. Works two ways:
 *
 *  - Uncontrolled / inline: just mount it, it renders in place.
 *      <PrintPreview><Invoice /></PrintPreview>
 *
 *  - Controlled / fullscreen modal: pass `isOpen` + `onClose` and it
 *    portals to <body> as an overlay, like a native print-preview dialog.
 *      <PrintPreview isOpen={open} onClose={() => setOpen(false)}>
 *        <Invoice />
 *      </PrintPreview>
 *
 * Props
 *  children   ReactNode   required — content to paginate
 *  title      string      label shown in the toolbar
 *  pageSize   string      CSS `size` value, e.g. "210mm 297mm" (A4),
 *                         "297mm 210mm" (A4 landscape), "letter"
 *  margin     string      CSS page margin, e.g. "18mm 16mm"
 *  isOpen     boolean     if provided, renders as a fullscreen modal
 *  onClose    () => void  called when the modal's close button is used
 *  className  string      extra classes for the outer wrapper
 */
export default function PrintPreview({
  children,
  title = "Print preview",
  pageSize = "210mm 297mm",
  margin = "18mm 16mm",
  isOpen,
  onClose,
  className = "",
}) {
  const isModal = typeof isOpen === "boolean";
  const shouldRender = isModal ? isOpen : true;

  const sourceRef = useRef(null); // hidden DOM holding the real React-rendered children
  const previewRef = useRef(null); // paged.js renders its output pages in here
  const scrollRef = useRef(null); // scroll container, used for zoom + page tracking

  const [status, setStatus] = useState("idle"); // idle | rendering | ready | error
  const [errorMessage, setErrorMessage] = useState("");
  const [zoom, setZoom] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const pageCss = useMemo(() => buildPageCss({ pageSize, margin }), [
    pageSize,
    margin,
  ]);

  const paginate = useCallback(async () => {
    if (!sourceRef.current || !previewRef.current) return;
    setStatus("rendering");
    setErrorMessage("");
    previewRef.current.innerHTML = "";

    try {
      const previewer = new Previewer();
      await previewer.preview(
        sourceRef.current.innerHTML,
        [{ _identifier: "print-preview-page-css", _text: pageCss }],
        previewRef.current
      );
      const pages = previewRef.current.querySelectorAll(".pagedjs_page");
      setPageCount(pages.length);
      setCurrentPage(1);
      setStatus("ready");
    } catch (err) {
      console.error("PrintPreview: paged.js failed to paginate content", err);
      setErrorMessage(err?.message || "Could not lay out the pages.");
      setStatus("error");
    }
  }, [pageCss]);

  // Re-paginate whenever the preview becomes visible or the content changes.
  useEffect(() => {
    if (shouldRender) paginate();
  }, [shouldRender, children, paginate]);

  // Track which page is centered in the viewport while the user scrolls.
  useEffect(() => {
    if (status !== "ready" || !previewRef.current || !scrollRef.current) return;
    const pages = Array.from(
      previewRef.current.querySelectorAll(".pagedjs_page")
    );
    if (!pages.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const index = pages.indexOf(visible.target);
          if (index !== -1) setCurrentPage(index + 1);
        }
      },
      { root: scrollRef.current, threshold: [0.25, 0.5, 0.75] }
    );
    pages.forEach((p) => observer.observe(p));
    return () => observer.disconnect();
  }, [status, pageCount]);

  const goToPage = (n) => {
    const clamped = Math.min(Math.max(n, 1), pageCount);
    const page = previewRef.current?.querySelectorAll(".pagedjs_page")[
      clamped - 1
    ];
    page?.scrollIntoView({ behavior: "smooth", block: "start" });
    setCurrentPage(clamped);
  };

  const zoomIn = () => setZoom((z) => Math.min(ZOOM_MAX, +(z + ZOOM_STEP).toFixed(2)));
  const zoomOut = () => setZoom((z) => Math.max(ZOOM_MIN, +(z - ZOOM_STEP).toFixed(2)));
  const handlePrint = () => window.print();

  if (!shouldRender) return null;

  const content = (
    <div
      className={`flex h-full w-full flex-col bg-slate-100 ${className}`}
    >
      {/* Toolbar — hidden when the browser's own print dialog is active */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 py-2.5 print:hidden">
        <div className="flex min-w-0 items-center gap-2 text-slate-700">
          <FileText size={18} className="shrink-0 text-slate-400" />
          <span className="truncate text-sm font-medium">{title}</span>
          {status === "rendering" && (
            <Loader2 size={14} className="shrink-0 animate-spin text-slate-400" />
          )}
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage <= 1}
            className="rounded p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-30"
            aria-label="Previous page"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="min-w-16 text-center text-xs tabular-nums text-slate-500">
            {pageCount ? `${currentPage} / ${pageCount}` : "–"}
          </span>
          <button
            type="button"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage >= pageCount}
            className="rounded p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-30"
            aria-label="Next page"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={zoomOut}
            disabled={zoom <= ZOOM_MIN}
            className="rounded p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-30"
            aria-label="Zoom out"
          >
            <ZoomOut size={16} />
          </button>
          <span className="w-10 text-center text-xs tabular-nums text-slate-500">
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            onClick={zoomIn}
            disabled={zoom >= ZOOM_MAX}
            className="rounded p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-30"
            aria-label="Zoom in"
          >
            <ZoomIn size={16} />
          </button>

          <div className="mx-1 h-5 w-px bg-slate-200" />

          <button
            type="button"
            onClick={handlePrint}
            disabled={status !== "ready"}
            className="flex items-center gap-1.5 rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-800 disabled:opacity-40"
          >
            <Printer size={14} />
            Print
          </button>

          {isModal && (
            <button
              type="button"
              onClick={onClose}
              className="rounded p-1.5 text-slate-500 hover:bg-slate-100"
              aria-label="Close print preview"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Real React tree, rendered off-screen so paged.js can read its HTML */}
      <div ref={sourceRef} className="hidden" aria-hidden="true">
        {children}
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 border-b border-amber-200 bg-amber-50 px-4 py-2 text-xs text-amber-800 print:hidden">
          <AlertTriangle size={14} className="shrink-0" />
          {errorMessage}
        </div>
      )}

      {/* paged.js renders the paginated .pagedjs_page elements in here */}
      <div ref={scrollRef} className="flex-1 overflow-auto py-8">
        <div
          ref={previewRef}
          style={{ transform: `scale(${zoom})`, transformOrigin: "top center" }}
          className="pagedjs-preview mx-auto flex flex-col items-center gap-8 transition-transform"
        />
      </div>
    </div>
  );

  if (!isModal) return content;

  return createPortal(
    <div className="fixed inset-0 z-50">{content}</div>,
    document.body
  );
}

/**
 * Small convenience hook for the controlled/modal usage pattern.
 *
 *   const preview = usePrintPreview();
 *   <button onClick={preview.open}>Print preview</button>
 *   <PrintPreview isOpen={preview.isOpen} onClose={preview.close}>
 *     <Invoice />
 *   </PrintPreview>
 */
export function usePrintPreview(initialOpen = false) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen((o) => !o),
  };
}

/*
Setup
-----
npm install pagedjs lucide-react

Tailwind: make sure Tailwind's build sees this file (it just needs to be
inside your configured `content` globs) — no extra config needed since
only core utility classes are used.

Notes
-----
- paged.js does real layout math on real HTML, so `children` is rendered
  into a hidden div first and its `innerHTML` is handed to the Previewer.
  This means the paginated copy is static markup: interactive elements
  (inputs, onClick handlers) will render visually but won't be "live"
  inside the preview — which is the right behavior for a print preview.
- `pageSize` accepts any valid CSS `@page { size: ... }` value:
  "210mm 297mm" (A4 portrait, default), "297mm 210mm" (A4 landscape),
  "letter", "8.5in 11in", etc.
- Printing uses the browser's native print dialog (`window.print()`),
  which is also how a person saves the result as a PDF.
*/