import { useState, useRef } from 'react';
import { Bold, Italic, List, ListOrdered, Link as LinkIcon, Heading1, Heading2 } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

export default function RichTextEditor({ value, onChange, placeholder, rows = 10 }: RichTextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');

  const insertMarkdown = (before: string, after: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);

    onChange(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 0);
  };

  const handleBold = () => insertMarkdown('**', '**');
  const handleItalic = () => insertMarkdown('*', '*');
  const handleH1 = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const lineStart = value.lastIndexOf('\n', start - 1) + 1;
    const newText = value.substring(0, lineStart) + '# ' + value.substring(lineStart);
    onChange(newText);
  };
  const handleH2 = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const lineStart = value.lastIndexOf('\n', start - 1) + 1;
    const newText = value.substring(0, lineStart) + '## ' + value.substring(lineStart);
    onChange(newText);
  };
  const handleList = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const lineStart = value.lastIndexOf('\n', start - 1) + 1;
    const newText = value.substring(0, lineStart) + '- ' + value.substring(lineStart);
    onChange(newText);
  };
  const handleOrderedList = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const lineStart = value.lastIndexOf('\n', start - 1) + 1;
    const newText = value.substring(0, lineStart) + '1. ' + value.substring(lineStart);
    onChange(newText);
  };

  const handleLinkClick = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);

    setLinkText(selectedText);
    setLinkUrl('');
    setShowLinkModal(true);
  };

  const insertLink = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const linkMarkdown = `[${linkText}](${linkUrl})`;
    const newText = value.substring(0, start) + linkMarkdown + value.substring(end);

    onChange(newText);
    setShowLinkModal(false);
    setLinkUrl('');
    setLinkText('');
  };

  return (
    <div>
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-300 px-3 py-2 flex items-center gap-1">
          <button
            type="button"
            onClick={handleBold}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title="Bold (Ctrl+B)"
          >
            <Bold size={18} />
          </button>
          <button
            type="button"
            onClick={handleItalic}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title="Italic (Ctrl+I)"
          >
            <Italic size={18} />
          </button>
          <div className="w-px h-6 bg-gray-300 mx-1" />
          <button
            type="button"
            onClick={handleH1}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title="Heading 1"
          >
            <Heading1 size={18} />
          </button>
          <button
            type="button"
            onClick={handleH2}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title="Heading 2"
          >
            <Heading2 size={18} />
          </button>
          <div className="w-px h-6 bg-gray-300 mx-1" />
          <button
            type="button"
            onClick={handleList}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title="Bullet List"
          >
            <List size={18} />
          </button>
          <button
            type="button"
            onClick={handleOrderedList}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title="Numbered List"
          >
            <ListOrdered size={18} />
          </button>
          <div className="w-px h-6 bg-gray-300 mx-1" />
          <button
            type="button"
            onClick={handleLinkClick}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title="Insert Link"
          >
            <LinkIcon size={18} />
          </button>
          <div className="flex-1" />
          <span className="text-xs text-gray-500">Markdown supported</span>
        </div>

        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="w-full px-4 py-3 focus:outline-none resize-y"
        />
      </div>

      {showLinkModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold text-[#001641] mb-4">Insert Link</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#001641] mb-2">
                  Link Text
                </label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="Click here"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8A00]"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#001641] mb-2">
                  URL
                </label>
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8A00]"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={insertLink}
                  disabled={!linkText || !linkUrl}
                  className="flex-1 bg-[#FF8A00] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#e67d00] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Insert Link
                </button>
                <button
                  type="button"
                  onClick={() => setShowLinkModal(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
