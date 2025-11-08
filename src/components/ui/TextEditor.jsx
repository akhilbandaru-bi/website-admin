import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Extension } from '@tiptap/core';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import TextStyle from '@tiptap/extension-text-style';
import OrderedList from '@tiptap/extension-ordered-list';
import './TextEditor.css';

const HEADING_LEVELS = [1, 2, 3];
const FONT_SIZE_MIN = 1;
const FONT_SIZE_MAX = 100;

const CustomOrderedList = OrderedList.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      listStyleType: {
        default: 'decimal',
        parseHTML: (element) =>
          element.style.listStyleType || element.getAttribute('data-list-style') || 'decimal',
        renderHTML: (attributes) => ({
          'data-list-style': attributes.listStyleType,
          style: `list-style-type: ${attributes.listStyleType};`,
        }),
      },
    };
  },
});

const FontSize = Extension.create({
  name: 'fontSize',
  addGlobalAttributes() {
    return [
      {
        types: ['textStyle'],
        attributes: {
          fontSize: {
            default: null,
            renderHTML: (attributes) => {
              if (!attributes.fontSize) {
                return {};
              }

              return {
                style: `font-size: ${attributes.fontSize};`,
              };
            },
            parseHTML: (element) => element.style.fontSize || null,
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setFontSize:
        (fontSize) =>
        ({ chain }) => {
          if (!fontSize) {
            return chain().unsetMark('textStyle').run();
          }

          return chain().setMark('textStyle', { fontSize }).run();
        },
    };
  },
});

const normalizeHtml = (html) => {
  if (!html || html === '<p></p>') {
    return '';
  }
  return html;
};

const TextEditor = ({
  id,
  value = '',
  onChange,
  placeholder = 'Start writing...',
  className = '',
  readOnly = false,
}) => {
  const fileInputRef = useRef(null);
  const memoizedPlaceholder = useMemo(() => placeholder, [placeholder]);
  const [fontSizeValue, setFontSizeValue] = useState('');

  const editor = useEditor(
    {
      extensions: [
        StarterKit.configure({
          heading: {
            levels: HEADING_LEVELS,
          },
          orderedList: false,
        }),
        CustomOrderedList,
        TextStyle,
        FontSize,
        Underline,
        Link.configure({
          autolink: true,
          openOnClick: false,
          HTMLAttributes: {
            rel: 'noopener noreferrer nofollow',
          },
        }),
        Image.configure({
          allowBase64: true,
        }),
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        Placeholder.configure({
          placeholder: memoizedPlaceholder,
        }),
      ],
      content: value || '<p></p>',
      editable: !readOnly,
      editorProps: {
        attributes: {
          id,
          class: 'text-editor-content ProseMirror',
        },
      },
      onUpdate: ({ editor: tiptapEditor }) => {
        if (!onChange) {
          return;
        }
        const html = normalizeHtml(tiptapEditor.getHTML());
        onChange(html);
      },
    },
    [memoizedPlaceholder, readOnly],
  );

  useEffect(() => {
    if (editor) {
      editor.setEditable(!readOnly);
    }
  }, [editor, readOnly]);

  useEffect(() => {
    if (!editor) {
      return;
    }
    const current = normalizeHtml(editor.getHTML());
    const next = normalizeHtml(value);
    if (current !== next) {
      editor.commands.setContent(next || '<p></p>', false);
    }
  }, [editor, value]);

  useEffect(() => {
    if (!editor) {
      return;
    }

    const updateFontSize = () => {
      const size = editor.getAttributes('textStyle')?.fontSize || '';
      setFontSizeValue(size ? size.replace('px', '') : '');
    };

    editor.on('selectionUpdate', updateFontSize);
    editor.on('update', updateFontSize);
    updateFontSize();

    return () => {
      editor.off('selectionUpdate', updateFontSize);
      editor.off('update', updateFontSize);
    };
  }, [editor]);

  const handleHeadingChange = useCallback(
    (event) => {
      const level = event.target.value;
      if (!editor) {
        return;
      }
      if (level === 'paragraph') {
        editor.chain().focus().setParagraph().run();
      } else {
        editor.chain().focus().toggleHeading({ level: Number(level) }).run();
      }
    },
    [editor],
  );

  const handleToggle = useCallback(
    (callback) => {
      if (!editor || readOnly) {
        return;
      }
      callback(editor.chain().focus()).run();
    },
    [editor, readOnly],
  );

  const handleFontSizeChange = useCallback(
    (event) => {
      if (!editor || readOnly) {
        return;
      }

      const rawValue = event.target.value;

      if (!rawValue) {
        editor.chain().focus().setFontSize(null).run();
        setFontSizeValue('');
        return;
      }

      const numericValue = Math.max(
        FONT_SIZE_MIN,
        Math.min(FONT_SIZE_MAX, Number.parseInt(rawValue, 10) || FONT_SIZE_MIN),
      );

      editor.chain().focus().setFontSize(`${numericValue}px`).run();
      setFontSizeValue(String(numericValue));
    },
    [editor, readOnly],
  );

  const resetFontSize = useCallback(() => {
    if (!editor || readOnly) {
      return;
    }

    editor.chain().focus().setFontSize(null).run();
    setFontSizeValue('');
  }, [editor, readOnly]);

  const handleOrderedList = useCallback(
    (listStyleType = 'decimal') => {
      if (!editor || readOnly) {
        return;
      }

      if (editor.isActive('orderedList', { listStyleType })) {
        editor.chain().focus().toggleOrderedList().run();
        return;
      }

      if (!editor.isActive('orderedList')) {
        editor.chain().focus().toggleOrderedList().run();
      }

      editor.chain().focus().updateAttributes('orderedList', { listStyleType }).run();
    },
    [editor, readOnly],
  );

  const handleLink = useCallback(() => {
    if (!editor || readOnly) {
      return;
    }
    const previousUrl = editor.getAttributes('link').href || '';
    const url = window.prompt('Enter URL', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: url })
      .run();
  }, [editor, readOnly]);

  const handleImageUpload = useCallback(
    (event) => {
      if (!editor || readOnly) {
        return;
      }
      const file = event.target.files?.[0];
      if (!file || !file.type.startsWith('image/')) {
        event.target.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const src = reader.result;
        if (typeof src === 'string') {
          editor.chain().focus().setImage({ src }).run();
        }
      };
      reader.readAsDataURL(file);
      event.target.value = '';
    },
    [editor, readOnly],
  );

  const handleImageButton = useCallback(() => {
    if (!readOnly) {
      fileInputRef.current?.click();
    }
  }, [readOnly]);

  if (!editor) {
    return (
      <div className={`text-editor ${className}`}>
        <div className="text-editor-toolbar skeleton" />
        <div className="text-editor-content skeleton" />
      </div>
    );
  }

  const activeHeading =
    HEADING_LEVELS.find((level) => editor.isActive('heading', { level }))?.toString() ||
    'paragraph';

  const orderedListAttributes = editor.getAttributes('orderedList');
  const orderedListStyle = orderedListAttributes?.listStyleType || 'decimal';
  const isOrderedListActive = editor.isActive('orderedList');
  const decimalListActive = isOrderedListActive && orderedListStyle === 'decimal';
  const romanListActive =
    isOrderedListActive && (orderedListStyle === 'lower-roman' || orderedListStyle === 'upper-roman');

  const isDisabled = readOnly;

  return (
    <div className={`text-editor ${className}`}>
      <div className="text-editor-toolbar">
        <div className="toolbar-section">
          <select
            className="editor-select"
            value={activeHeading}
            onChange={handleHeadingChange}
            disabled={isDisabled}
            title="Heading level"
          >
            <option value="paragraph">Normal</option>
            <option value="1">H1</option>
            <option value="2">H2</option>
            <option value="3">H3</option>
          </select>
        </div>

        <div className="toolbar-section">
          <div className="font-size-control">
            <input
              type="number"
              min={FONT_SIZE_MIN}
              max={FONT_SIZE_MAX}
              value={fontSizeValue}
              onChange={handleFontSizeChange}
              onBlur={handleFontSizeChange}
              disabled={isDisabled}
              placeholder="Size"
              className="font-size-input"
              title="Font size (px)"
            />
            <button
              type="button"
              className="editor-btn clear-font-size-btn"
              onClick={resetFontSize}
              disabled={isDisabled || !fontSizeValue}
              title="Reset font size"
            >
              ⌫
            </button>
          </div>
        </div>

        <div className="toolbar-section">
          <button
            type="button"
            className={`editor-btn ${editor.isActive('bold') ? 'active' : ''}`}
            onClick={() => handleToggle((chain) => chain.toggleBold())}
            aria-label="Bold"
            disabled={isDisabled}
            title="Bold"
          >
            <span className="editor-icon editor-icon-strong">B</span>
          </button>
          <button
            type="button"
            className={`editor-btn ${editor.isActive('italic') ? 'active' : ''}`}
            onClick={() => handleToggle((chain) => chain.toggleItalic())}
            aria-label="Italic"
            disabled={isDisabled}
            title="Italic"
          >
            <span className="editor-icon editor-icon-em">I</span>
          </button>
          <button
            type="button"
            className={`editor-btn ${editor.isActive('underline') ? 'active' : ''}`}
            onClick={() => handleToggle((chain) => chain.toggleUnderline())}
            aria-label="Underline"
            disabled={isDisabled}
            title="Underline"
          >
            <span className="editor-icon editor-icon-underline">U</span>
          </button>
          <button
            type="button"
            className={`editor-btn ${editor.isActive('strike') ? 'active' : ''}`}
            onClick={() => handleToggle((chain) => chain.toggleStrike())}
            aria-label="Strikethrough"
            disabled={isDisabled}
            title="Strikethrough"
          >
            <span className="editor-icon editor-icon-strike">S</span>
          </button>
        </div>

        <div className="toolbar-section">
          <button
            type="button"
            className={`editor-btn ${editor.isActive('bulletList') ? 'active' : ''}`}
            onClick={() => handleToggle((chain) => chain.toggleBulletList())}
            aria-label="Bullet list"
            disabled={isDisabled}
            title="Bullet list"
          >
            <span className="editor-icon">• •</span>
          </button>
          <button
            type="button"
            className={`editor-btn ${decimalListActive ? 'active' : ''}`}
            onClick={() => handleOrderedList('decimal')}
            aria-label="Numbered list"
            disabled={isDisabled}
            title="Numbered list"
          >
            <span className="editor-icon">1.</span>
          </button>
          <button
            type="button"
            className={`editor-btn ${romanListActive ? 'active' : ''}`}
            onClick={() => handleOrderedList('lower-roman')}
            aria-label="Roman numeral list"
            disabled={isDisabled}
            title="Roman numerals"
          >
            <span className="editor-icon">I.</span>
          </button>
          <button
            type="button"
            className={`editor-btn ${editor.isActive('blockquote') ? 'active' : ''}`}
            onClick={() => handleToggle((chain) => chain.toggleBlockquote())}
            aria-label="Blockquote"
            disabled={isDisabled}
            title="Blockquote"
          >
            <span className="editor-icon">“”</span>
          </button>
        </div>

        <div className="toolbar-section">
          <button
            type="button"
            className={`editor-btn ${editor.isActive('link') ? 'active' : ''}`}
            onClick={handleLink}
            aria-label="Insert link"
            disabled={isDisabled}
            title="Insert link"
          >
            <span className="editor-icon">🔗</span>
          </button>
          <button
            type="button"
            className="editor-btn"
            onClick={handleImageButton}
            aria-label="Insert image"
            disabled={isDisabled}
            title="Insert image"
          >
            <span className="editor-icon">🖼</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageUpload}
          />
        </div>

        <div className="toolbar-section">
          <button
            type="button"
            className={`editor-btn ${editor.isActive({ textAlign: 'left' }) ? 'active' : ''}`}
            onClick={() => handleToggle((chain) => chain.setTextAlign('left'))}
            aria-label="Align left"
            disabled={isDisabled}
            title="Align left"
          >
            <span className="editor-icon">⯇</span>
          </button>
          <button
            type="button"
            className={`editor-btn ${editor.isActive({ textAlign: 'center' }) ? 'active' : ''}`}
            onClick={() => handleToggle((chain) => chain.setTextAlign('center'))}
            aria-label="Align center"
            disabled={isDisabled}
            title="Align center"
          >
            <span className="editor-icon">≡</span>
          </button>
          <button
            type="button"
            className={`editor-btn ${editor.isActive({ textAlign: 'right' }) ? 'active' : ''}`}
            onClick={() => handleToggle((chain) => chain.setTextAlign('right'))}
            aria-label="Align right"
            disabled={isDisabled}
            title="Align right"
          >
            <span className="editor-icon">⯈</span>
          </button>
        </div>

        <div className="toolbar-section">
          <button
            type="button"
            className="editor-btn"
            onClick={() => handleToggle((chain) => chain.undo())}
            aria-label="Undo"
            disabled={isDisabled}
            title="Undo"
          >
            <span className="editor-icon">↺</span>
          </button>
          <button
            type="button"
            className="editor-btn"
            onClick={() => handleToggle((chain) => chain.redo())}
            aria-label="Redo"
            disabled={isDisabled}
            title="Redo"
          >
            <span className="editor-icon">↻</span>
          </button>
          <button
            type="button"
            className="editor-btn"
            onClick={() => handleToggle((chain) => chain.unsetAllMarks().clearNodes())}
            aria-label="Clear formatting"
            disabled={isDisabled}
            title="Clear formatting"
          >
            <span className="editor-icon">✕</span>
          </button>
        </div>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
};

export default TextEditor;
