import React, { useRef, useState, useEffect } from 'react';
import { Bold, Italic, Underline, Strikethrough, Link as LinkIcon, List, ListOrdered, Undo, Redo, Sparkles } from 'lucide-react';
import PrimaryButton from './button';

const Textarea = (props) => {
  const editorRef = useRef(null);
  const [activeStyles, setActiveStyles] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikeThrough: false,
    unorderedList: false,
    orderedList: false
  });

  // Execute native browser text editing commands
  const executeCommand = (command, value) => {
    document.execCommand(command, false, value);
    updateToolbarState();
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  // Custom handler for adding hypertext links safely
  const handleLink = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || selection.toString().trim() === '') {
      alert('Please select some text first to apply a link.');
      return;
    }

    const url = prompt('Enter the URL link:');
    if (url === null) return; // Cancelled

    if (url.trim() === '') {
      executeCommand('unlink');
    } else {
      executeCommand('createLink', url);
    }
  };

  // Check which styles are currently active at the cursor position
  const updateToolbarState = () => {
    setActiveStyles({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      strikeThrough: document.queryCommandState('strikeThrough'),
      unorderedList: document.queryCommandState('insertUnorderedList'),
      orderedList: document.queryCommandState('insertOrderedList')
    });
  };

  // Ensure the editor focuses correctly when the wrapper area is clicked
  const handleWrapperClick = (event) => {
    if (event.target === event.currentTarget && editorRef.current) {
      editorRef.current.focus();
    }
  };

  useEffect(() => {
    editorRef.current.innerHTML = props.value || '';
  }, []);

  useEffect(() => {
    if (props?.onChange) {
      props.onChange(editorRef.current.innerHTML);
    }
  }, [editorRef?.current?.innerHTML]);

  return (
    <div className={`w-full max-w-4xl font-sans select-none ${props.className}`}>
      <label className="block text-slate-700 text-sm font-medium mb-2">Description</label>

      <div className="rounded-xl overflow-hidden shadow-sm bg-white focus-within:border-[#a7f5ed] focus-within:ring-4 focus-within:ring-[#05a2ff]/20 focus-within:outline-none transition-all">
        {/* Toolbar panel */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100 bg-slate-50/50 flex-wrap gap-2">
          <div className="flex items-center gap-0.5 text-slate-600">
            {/* Bold */}
            <button
              type="button"
              onClick={() => executeCommand('bold')}
              className={`p-1.5 rounded hover:bg-slate-100 transition-colors ${activeStyles.bold ? 'bg-slate-200 text-slate-900' : ''}`}
              title="Bold"
            >
              <Bold size={18} strokeWidth={2.5} />
            </button>

            {/* Italic */}
            <button
              type="button"
              onClick={() => executeCommand('italic')}
              className={`p-1.5 rounded hover:bg-slate-100 transition-colors ${activeStyles.italic ? 'bg-slate-200 text-slate-900' : ''}`}
              title="Italic"
            >
              <Italic size={18} strokeWidth={2.5} />
            </button>

            {/* Underline */}
            <button
              type="button"
              onClick={() => executeCommand('underline')}
              className={`p-1.5 rounded hover:bg-slate-100 transition-colors ${activeStyles.underline ? 'bg-slate-200 text-slate-900' : ''}`}
              title="Underline"
            >
              <Underline size={18} strokeWidth={2.5} />
            </button>

            {/* Strikethrough */}
            <button
              type="button"
              onClick={() => executeCommand('strikeThrough')}
              className={`p-1.5 rounded hover:bg-slate-100 transition-colors ${activeStyles.strikeThrough ? 'bg-slate-200 text-slate-900' : ''}`}
              title="Strikethrough"
            >
              <Strikethrough size={18} strokeWidth={2.5} />
            </button>

            <div className="w-px h-5 bg-slate-200 mx-1" />

            {/* Link */}
            <button type="button" onClick={handleLink} className="p-1.5 rounded hover:bg-slate-100 transition-colors" title="Insert Link">
              <LinkIcon size={18} strokeWidth={2.25} />
            </button>

            <div className="w-px h-5 bg-slate-200 mx-1" />

            {/* Unordered List */}
            <button
              type="button"
              onClick={() => executeCommand('insertUnorderedList')}
              className={`p-1.5 rounded hover:bg-slate-100 transition-colors ${activeStyles.unorderedList ? 'bg-slate-200 text-slate-900' : ''}`}
              title="Unordered List"
            >
              <List size={18} strokeWidth={2.25} />
            </button>

            {/* Ordered List */}
            <button
              type="button"
              onClick={() => executeCommand('insertOrderedList')}
              className={`p-1.5 rounded hover:bg-slate-100 transition-colors ${activeStyles.orderedList ? 'bg-slate-200 text-slate-900' : ''}`}
              title="Ordered List"
            >
              <ListOrdered size={18} strokeWidth={2.25} />
            </button>

            <div className="w-px h-5 bg-slate-200 mx-1" />

            {/* Undo */}
            <button type="button" onClick={() => executeCommand('undo')} className="p-1.5 rounded hover:bg-slate-100 transition-colors" title="Undo">
              <Undo size={18} strokeWidth={2.25} />
            </button>

            {/* Redo */}
            <button type="button" onClick={() => executeCommand('redo')} className="p-1.5 rounded hover:bg-slate-100 transition-colors" title="Redo">
              <Redo size={18} strokeWidth={2.25} />
            </button>
          </div>

          {/* AI Generation Action Button */}
          <PrimaryButton
            type="button"
            className="flex items-center gap-1.5 bg-linear-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-medium text-xs py-1.5 px-3 rounded-lg shadow-sm transition-all active:scale-[0.98]"
          >
            <Sparkles size={14} className="fill-white/20" />
            Generate with AI
          </PrimaryButton>
        </div>

        {/* Text Input Canvas Wrapper */}
        <div onClick={handleWrapperClick} className="min-h-37.5 p-4 bg-white cursor-text">
          <div
            ref={editorRef}
            contentEditable
            onKeyUp={updateToolbarState}
            onMouseUp={updateToolbarState}
            className="w-full h-full text-slate-800 text-sm focus:outline-none select-text
              [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5
              [&_a]:text-blue-600 [&_a]:underline"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Textarea;
