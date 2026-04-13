"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import { useState, useCallback, useEffect } from "react";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import FontFamily from "@tiptap/extension-font-family";
import { Extension } from "@tiptap/core";

// Add more icons
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Link as LinkIcon,
  ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Loader2,
  Eye,
  FileCode,
  Type,
  Palette,
  Highlighter,
  ChevronDown,
} from "lucide-react";
import { uploadContentImage } from "@/app/lib/api/blogs";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

// Custom FontSize extension
const FontSize = Extension.create({
  name: "fontSize",

  addOptions() {
    return {
      types: ["textStyle"],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) =>
              element.style.fontSize.replace(/['"]+/g, ""),
            renderHTML: (attributes) => {
              if (!attributes.fontSize) {
                return {};
              }
              return {
                style: `font-size: ${attributes.fontSize}`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setFontSize:
        (fontSize: string) =>
          ({ chain }: any) => {
            return chain().setMark("textStyle", { fontSize }).run();
          },
      unsetFontSize:
        () =>
          ({ chain }: any) => {
            return chain()
              .setMark("textStyle", { fontSize: null })
              .removeEmptyTextStyle()
              .run();
          },
    };
  },
});

export default function RichTextEditor({
  content,
  onChange,
  placeholder = "Start writing your blog content...",
}: RichTextEditorProps) {
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [showImageInput, setShowImageInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [viewMode, setViewMode] = useState<"editor" | "preview" | "code">("editor");
  const [codeContent, setCodeContent] = useState("");
  const [showFontSizeDropdown, setShowFontSizeDropdown] = useState(false);
  const [showHeadingDropdown, setShowHeadingDropdown] = useState(false);
  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
  const [showHighlightColorPicker, setShowHighlightColorPicker] = useState(false);
  const [textColor, setTextColor] = useState("#000000");
  const [highlightColor, setHighlightColor] = useState("#ffff00");
  const [fontSize, setFontSize] = useState("16px");

  console.log(content);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5, 6] },
        bulletList: { keepMarks: true },
        orderedList: { keepMarks: true },
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: "rounded-lg max-w-full h-auto my-4 cursor-pointer",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-gold-500 underline hover:text-gold-600",
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
      }),
      Underline,
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      FontFamily,
      FontSize,
    ],
    // Remove the custom handlePaste from editorProps
    // Clipboard extension handles it automatically
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
      setCodeContent(html);
    },
    editorProps: {
      attributes: {
        class: "be-editor-content prose prose-sm sm:prose lg:prose-lg focus:outline-none max-w-none min-h-[400px] p-4",
      },
    },
    parseOptions: {
      preserveWhitespace: 'full',
    },
  });

  // Sync code content when switching to code view
  const handleViewModeChange = (mode: "editor" | "preview" | "code") => {
    if (mode === "code" && editor) {
      setCodeContent(editor.getHTML());
    } else if (mode === "editor" && viewMode === "code") {
      // Update editor content from code view
      editor?.commands.setContent(codeContent);
      onChange(codeContent);
    }
    setViewMode(mode);
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCodeContent(e.target.value);
  };

  const handleImageUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !editor) return;

      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }

      setIsUploadingImage(true);

      try {
        const response = await uploadContentImage(file);
        if (response.success && response.data.url) {
          editor.chain().focus().setImage({ src: response.data.url }).run();
        }
      } catch (error) {
        console.error("Image upload failed:", error);
        alert("Failed to upload image. Please try again.");
      } finally {
        setIsUploadingImage(false);
        e.target.value = "";
      }
    },
    [editor]
  );

  const handleImageUrl = useCallback(() => {
    if (imageUrl && editor) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl("");
      setShowImageInput(false);
    }
  }, [editor, imageUrl]);

  const handleSetLink = useCallback(() => {
    if (!editor) return;

    if (linkUrl) {
      editor.chain().focus().extendMarkRange("link").setLink({ href: linkUrl }).run();
    } else {
      editor.chain().focus().unsetLink().run();
    }

    setLinkUrl("");
    setShowLinkInput(false);
  }, [editor, linkUrl]);



  const handleFontSizeChange = (size: string) => {
    editor?.chain().focus().setFontSize(size).run();
    setFontSize(size);
    setShowFontSizeDropdown(false);
  };

  const handleHeadingChange = (level: 1 | 2 | 3 | 4 | 5 | 6 | 0) => {
    if (level === 0) {
      editor?.chain().focus().setParagraph().run();
    } else {
      editor?.chain().focus().toggleHeading({ level }).run();
    }
    setShowHeadingDropdown(false);
  };

  const handleTextColorChange = (color: string) => {
    editor?.chain().focus().setColor(color).run();
    setTextColor(color);
  };

  const handleHighlightChange = (color: string) => {
    editor?.chain().focus().setHighlight({ color }).run();
    setHighlightColor(color);
  };




  // Add image resize functionality
  const addResizableImage = useCallback(() => {
    if (!editor) return;

    // Get all images in the editor
    const images = document.querySelectorAll('.ProseMirror img');

    images.forEach((img: any) => {
      if (!img.hasAttribute('data-resizable')) {
        img.setAttribute('data-resizable', 'true');

        // Make image resizable
        let isResizing = false;
        let startX = 0;
        let startWidth = 0;

        img.addEventListener('mousedown', (e: any) => {
          if (e.offsetX > img.offsetWidth - 10 && e.offsetY > img.offsetHeight - 10) {
            isResizing = true;
            startX = e.clientX;
            startWidth = img.offsetWidth;
            e.preventDefault();
          }
        });

        document.addEventListener('mousemove', (e) => {
          if (isResizing) {
            const width = startWidth + (e.clientX - startX);
            img.style.width = `${width}px`;
          }
        });

        document.addEventListener('mouseup', () => {
          isResizing = false;
        });
      }
    });
  }, [editor]);
  // Call this when content updates
  useEffect(() => {
    if (!editor) return;

    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }

    // Get all images in the editor
    const images = document.querySelectorAll('.ProseMirror img');

    images.forEach((img) => {
      if (!img.hasAttribute('data-resizable')) {
        img.setAttribute('data-resizable', 'true');

        // Make image resizable
        let isResizing = false;
        let startX = 0;
        let startWidth = 0;

        const handleMouseDown = (e: MouseEvent) => {
          const target = e.target as HTMLImageElement;
          if (e.offsetX > target.offsetWidth - 10 && e.offsetY > target.offsetHeight - 10) {
            isResizing = true;
            startX = e.clientX;
            startWidth = target.offsetWidth;
            e.preventDefault();
          }
        };

        const handleMouseMove = (e: MouseEvent) => {
          if (isResizing) {
            const width = startWidth + (e.clientX - startX);
            (img as HTMLImageElement).style.width = `${width}px`;
          }
        };

        const handleMouseUp = () => {
          isResizing = false;
        };

        img.addEventListener('mousedown', handleMouseDown as EventListener);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
      }
    });
  }, [editor, content]);

  if (!editor) {
    return null;
  }


  const MenuButton = ({
    onClick,
    isActive = false,
    disabled = false,
    children,
    title,
  }: {
    onClick: () => void;
    isActive?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
    title: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-2 rounded hover:bg-cream transition-colors ${isActive ? "bg-gold-100 text-gold-600" : "text-text-secondary"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  );

  return (
    <>
      <div className="border border-border rounded-xl overflow-hidden bg-white">
        {/* Toolbar */}
        {/* Toolbar */}
        <div className="border-b border-border bg-cream p-2 flex flex-wrap gap-1 items-center">
          {/* View Mode Toggles */}
          <div className="flex gap-1 border-r border-border pr-2">
            <MenuButton
              onClick={() => handleViewModeChange("editor")}
              isActive={viewMode === "editor"}
              title="Editor"
            >
              <Bold size={18} />
            </MenuButton>
            <MenuButton
              onClick={() => handleViewModeChange("preview")}
              isActive={viewMode === "preview"}
              title="Preview"
            >
              <Eye size={18} />
            </MenuButton>
            <MenuButton
              onClick={() => handleViewModeChange("code")}
              isActive={viewMode === "code"}
              title="Code View"
            >
              <FileCode size={18} />
            </MenuButton>
          </div>

          {viewMode === "editor" && (
            <>
              {/* Heading Dropdown */}
              <div className="relative border-r border-border pr-2">
                <button
                  type="button"
                  onClick={() => setShowHeadingDropdown(!showHeadingDropdown)}
                  className="flex items-center gap-1 px-3 py-2 rounded hover:bg-white transition-colors text-sm font-medium text-text-secondary"
                >
                  <Type size={16} />
                  <span>
                    {editor.isActive("heading", { level: 1 })
                      ? "H1"
                      : editor.isActive("heading", { level: 2 })
                        ? "H2"
                        : editor.isActive("heading", { level: 3 })
                          ? "H3"
                          : editor.isActive("heading", { level: 4 })
                            ? "H4"
                            : editor.isActive("heading", { level: 5 })
                              ? "H5"
                              : editor.isActive("heading", { level: 6 })
                                ? "H6"
                                : "Paragraph"}
                  </span>
                  <ChevronDown size={14} />
                </button>
                {showHeadingDropdown && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-border rounded-lg shadow-lg z-10 min-w-[150px]">
                    <button
                      type="button"
                      onClick={() => handleHeadingChange(0)}
                      className="w-full px-4 py-2 text-left hover:bg-cream transition-colors text-base"
                    >
                      Paragraph
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHeadingChange(1)}
                      className="w-full px-4 py-2 text-left hover:bg-cream transition-colors text-2xl font-bold"
                    >
                      Heading 1
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHeadingChange(2)}
                      className="w-full px-4 py-2 text-left hover:bg-cream transition-colors text-xl font-bold"
                    >
                      Heading 2
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHeadingChange(3)}
                      className="w-full px-4 py-2 text-left hover:bg-cream transition-colors text-lg font-bold"
                    >
                      Heading 3
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHeadingChange(4)}
                      className="w-full px-4 py-2 text-left hover:bg-cream transition-colors text-base font-bold"
                    >
                      Heading 4
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHeadingChange(5)}
                      className="w-full px-4 py-2 text-left hover:bg-cream transition-colors text-sm font-bold"
                    >
                      Heading 5
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHeadingChange(6)}
                      className="w-full px-4 py-2 text-left hover:bg-cream transition-colors text-xs font-bold"
                    >
                      Heading 6
                    </button>
                  </div>
                )}
              </div>

              {/* Font Size Dropdown */}
              <div className="relative border-r border-border pr-2">
                <button
                  type="button"
                  onClick={() => setShowFontSizeDropdown(!showFontSizeDropdown)}
                  className="flex items-center gap-1 px-3 py-2 rounded hover:bg-white transition-colors text-sm font-medium text-text-secondary"
                >
                  <span>{fontSize}</span>
                  <ChevronDown size={14} />
                </button>
                {showFontSizeDropdown && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-border rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                    {[
                      "12px",
                      "14px",
                      "16px",
                      "18px",
                      "20px",
                      "24px",
                      "28px",
                      "32px",
                      "36px",
                      "48px",
                      "64px",
                    ].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => handleFontSizeChange(size)}
                        className="w-full px-4 py-2 text-left hover:bg-cream transition-colors"
                        style={{ fontSize: size }}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Text Formatting */}
              <div className="flex gap-1 border-r border-border pr-2">
                <MenuButton
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  isActive={editor.isActive("bold")}
                  title="Bold"
                >
                  <Bold size={18} />
                </MenuButton>
                <MenuButton
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  isActive={editor.isActive("italic")}
                  title="Italic"
                >
                  <Italic size={18} />
                </MenuButton>
                <MenuButton
                  onClick={() => editor.chain().focus().toggleUnderline().run()}
                  isActive={editor.isActive("underline")}
                  title="Underline"
                >
                  <UnderlineIcon size={18} />
                </MenuButton>
                <MenuButton
                  onClick={() => editor.chain().focus().toggleStrike().run()}
                  isActive={editor.isActive("strike")}
                  title="Strikethrough"
                >
                  <Strikethrough size={18} />
                </MenuButton>
                <MenuButton
                  onClick={() => editor.chain().focus().toggleCode().run()}
                  isActive={editor.isActive("code")}
                  title="Inline Code"
                >
                  <Code size={18} />
                </MenuButton>
              </div>

              {/* Text Color */}
              <div className="relative border-r border-border pr-2">
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => setShowTextColorPicker(!showTextColorPicker)}
                    className="p-2 rounded hover:bg-white transition-colors relative"
                    title="Text Color"
                  >
                    <Palette size={18} className="text-text-secondary" />
                    <div
                      className="absolute bottom-0 right-0 w-4 h-1 rounded"
                      style={{ backgroundColor: textColor }}
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setShowHighlightColorPicker(!showHighlightColorPicker)
                    }
                    className="p-2 rounded hover:bg-white transition-colors relative"
                    title="Highlight Color"
                  >
                    <Highlighter size={18} className="text-text-secondary" />
                    <div
                      className="absolute bottom-0 right-0 w-4 h-1 rounded"
                      style={{ backgroundColor: highlightColor }}
                    />
                  </button>
                </div>
                {showTextColorPicker && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-border rounded-lg shadow-lg z-10 p-3">
                    <p className="text-xs font-semibold mb-2">Text Color</p>
                    <div className="grid grid-cols-8 gap-2 mb-2">
                      {[
                        "#000000",
                        "#434343",
                        "#666666",
                        "#999999",
                        "#b7b7b7",
                        "#cccccc",
                        "#d9d9d9",
                        "#efefef",
                        "#f3f3f3",
                        "#ffffff",
                        "#980000",
                        "#ff0000",
                        "#ff9900",
                        "#ffff00",
                        "#00ff00",
                        "#00ffff",
                        "#4a86e8",
                        "#0000ff",
                        "#9900ff",
                        "#ff00ff",
                      ].map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => handleTextColorChange(color)}
                          className="w-6 h-6 rounded border border-border hover:scale-110 transition-transform"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => handleTextColorChange(e.target.value)}
                      className="w-full h-8 rounded cursor-pointer"
                    />
                  </div>
                )}
                {showHighlightColorPicker && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-border rounded-lg shadow-lg z-10 p-3">
                    <p className="text-xs font-semibold mb-2">Highlight Color</p>
                    <div className="grid grid-cols-8 gap-2 mb-2">
                      {[
                        "#ffff00",
                        "#00ff00",
                        "#00ffff",
                        "#ff00ff",
                        "#ff0000",
                        "#0000ff",
                        "#ffa500",
                        "#800080",
                        "#ffc0cb",
                        "#add8e6",
                      ].map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => handleHighlightChange(color)}
                          className="w-6 h-6 rounded border border-border hover:scale-110 transition-transform"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                    <input
                      type="color"
                      value={highlightColor}
                      onChange={(e) => handleHighlightChange(e.target.value)}
                      className="w-full h-8 rounded cursor-pointer"
                    />
                    <button
                      type="button"
                      onClick={() => editor.chain().focus().unsetHighlight().run()}
                      className="w-full mt-2 px-3 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold hover:bg-red-200"
                    >
                      Remove Highlight
                    </button>
                  </div>
                )}
              </div>

              {/* Lists & Quotes */}
              <div className="flex gap-1 border-r border-border pr-2">
                <MenuButton
                  onClick={() => editor.chain().focus().toggleBulletList().run()}
                  isActive={editor.isActive("bulletList")}
                  title="Bullet List"
                >
                  <List size={18} />
                </MenuButton>
                <MenuButton
                  onClick={() => editor.chain().focus().toggleOrderedList().run()}
                  isActive={editor.isActive("orderedList")}
                  title="Numbered List"
                >
                  <ListOrdered size={18} />
                </MenuButton>
                <MenuButton
                  onClick={() => editor.chain().focus().toggleBlockquote().run()}
                  isActive={editor.isActive("blockquote")}
                  title="Quote"
                >
                  <Quote size={18} />
                </MenuButton>
                <MenuButton
                  onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                  isActive={editor.isActive("codeBlock")}
                  title="Code Block"
                >
                  <Code size={18} />
                </MenuButton>
              </div>

              {/* Alignment */}
              <div className="flex gap-1 border-r border-border pr-2">
                <MenuButton
                  onClick={() => editor.chain().focus().setTextAlign("left").run()}
                  isActive={editor.isActive({ textAlign: "left" })}
                  title="Align Left"
                >
                  <AlignLeft size={18} />
                </MenuButton>
                <MenuButton
                  onClick={() => editor.chain().focus().setTextAlign("center").run()}
                  isActive={editor.isActive({ textAlign: "center" })}
                  title="Align Center"
                >
                  <AlignCenter size={18} />
                </MenuButton>
                <MenuButton
                  onClick={() => editor.chain().focus().setTextAlign("right").run()}
                  isActive={editor.isActive({ textAlign: "right" })}
                  title="Align Right"
                >
                  <AlignRight size={18} />
                </MenuButton>
                <MenuButton
                  onClick={() => editor.chain().focus().setTextAlign("justify").run()}
                  isActive={editor.isActive({ textAlign: "justify" })}
                  title="Justify"
                >
                  <AlignJustify size={18} />
                </MenuButton>
              </div>

              {/* Link & Image */}
              <div className="flex gap-1 border-r border-border pr-2">
                <MenuButton
                  onClick={() => setShowLinkInput(!showLinkInput)}
                  isActive={editor.isActive("link")}
                  title="Add Link"
                >
                  <LinkIcon size={18} />
                </MenuButton>
                <MenuButton
                  onClick={() => setShowImageInput(!showImageInput)}
                  title="Add Image"
                >
                  {isUploadingImage ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <ImageIcon size={18} />
                  )}
                </MenuButton>
              </div>

              {/* Undo/Redo */}
              <div className="flex gap-1">
                <MenuButton
                  onClick={() => editor.chain().focus().undo().run()}
                  disabled={!editor.can().undo()}
                  title="Undo"
                >
                  <Undo size={18} />
                </MenuButton>
                <MenuButton
                  onClick={() => editor.chain().focus().redo().run()}
                  disabled={!editor.can().redo()}
                  title="Redo"
                >
                  <Redo size={18} />
                </MenuButton>
              </div>
            </>
          )}
        </div>

        {/* Link Input */}
        {showLinkInput && viewMode === "editor" && (
          <div className="border-b border-border bg-cream p-3 flex gap-2">
            <input
              type="url"
              placeholder="Enter URL"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSetLink();
                }
              }}
              className="flex-1 px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
            />
            <button
              type="button"
              onClick={handleSetLink}
              className="px-4 py-2 bg-gold-500 text-white rounded-lg text-sm font-semibold hover:bg-gold-600 transition-colors"
            >
              Set Link
            </button>
            <button
              type="button"
              onClick={() => setShowLinkInput(false)}
              className="px-4 py-2 border border-border rounded-lg text-sm font-semibold hover:bg-cream transition-colors"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Image Input */}
        {showImageInput && viewMode === "editor" && (
          <div className="border-b border-border bg-cream p-3">
            <div className="flex gap-2 mb-2">
              <input
                type="url"
                placeholder="Enter image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleImageUrl();
                  }
                }}
                className="flex-1 px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
              />
              <button
                type="button"
                onClick={handleImageUrl}
                className="px-4 py-2 bg-gold-500 text-white rounded-lg text-sm font-semibold hover:bg-gold-600 transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-text-muted">OR</span>
              <label className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploadingImage}
                  className="hidden"
                />
                <div className="px-4 py-2 border border-border rounded-lg text-sm font-semibold hover:bg-white transition-colors cursor-pointer text-center">
                  {isUploadingImage ? "Uploading..." : "Upload from Computer"}
                </div>
              </label>
              <button
                type="button"
                onClick={() => setShowImageInput(false)}
                className="px-4 py-2 border border-border rounded-lg text-sm font-semibold hover:bg-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Content Area */}
        {viewMode === "editor" && <EditorContent editor={editor} className="bg-white" />}

        {viewMode === "preview" && (
          <div className="p-4 min-h-[400px] max-h-[600px] overflow-y-auto">
            <div
              className="prose prose-sm sm:prose lg:prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        )}

        {viewMode === "code" && (
          <div className="p-4">
            <textarea
              value={codeContent}
              onChange={handleCodeChange}
              className="w-full min-h-[400px] max-h-[600px] p-4 font-mono text-sm bg-gray-50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
              spellCheck={false}
            />
            <p className="text-xs text-text-muted mt-2">
              Edit the HTML code directly. Switch back to Editor mode to apply changes.
            </p>
          </div>
        )}
      </div>
      <style>{`
        .be-editor-content h1 { font-size:2em; font-weight:800; color:#003720; margin:1.2em 0 0.5em; line-height:1.2; }
        .be-editor-content h2 { font-size:1.5em; font-weight:700; color:#003720; margin:1.1em 0 0.4em; }
        .be-editor-content h3 { font-size:1.25em; font-weight:700; color:#1a1a1a; margin:1em 0 0.3em; }
        .be-editor-content h4 { font-size:1.1em; font-weight:700; color:#1a1a1a; margin:0.9em 0 0.3em; }
        .be-editor-content p { margin:0 0 1em; }
        .be-editor-content ul, .be-editor-content ol { margin:0 0 1em 1.5em; }
        .be-editor-content li { margin-bottom:0.3em; }
        .be-editor-content blockquote { border-left:4px solid #D4A017; padding:10px 16px; margin:1em 0; background:#FFF8E6; border-radius:0 8px 8px 0; font-style:italic; color:#555; }
        .be-editor-content code { background:#F5F2EA; padding:2px 6px; border-radius:4px; font-size:0.88em; color:#7a3a00; font-family:monospace; }
        .be-editor-content pre { background:#1a1a1a; color:#f8f8f2; padding:16px 20px; border-radius:10px; overflow-x:auto; margin:1em 0; }
        .be-editor-content pre code { background:none; color:inherit; font-size:0.9em; }
        .be-editor-content a { color:#D4A017; text-decoration:underline; text-decoration-color:#D4A01750; }
        .be-editor-content a:hover { text-decoration-color:#D4A017; }
        .be-editor-content img { max-width:100%; border-radius:10px; margin:8px 0; box-shadow:0 2px 12px rgba(0,0,0,0.08); }
        .be-editor-content mark { background:#FFF8C5; padding:1px 3px; border-radius:3px; }
        .be-editor-content hr { border:none; border-top:2px solid #E5E0D4; margin:2em 0; }
        .be-editor-content table { border-collapse:collapse; width:100%; margin:1em 0; border-radius:8px; overflow:hidden; border:1px solid #E5E0D4; }
        .be-editor-content th { background:#F9F6EE; padding:10px 14px; text-align:left; font-weight:700; font-size:12px; text-transform:uppercase; letter-spacing:0.05em; color:#8B7355; border:1px solid #E5E0D4; }
        .be-editor-content td { padding:10px 14px; border:1px solid #E5E0D4; font-size:14px; }
        .be-editor-content .ProseMirror-focused { outline:none; }
        .be-editor-content p.is-editor-empty:first-child::before { content:attr(data-placeholder); color:#C5BBA8; float:left; pointer-events:none; height:0; font-style:italic; }
      `}</style>
    </>

  );
}