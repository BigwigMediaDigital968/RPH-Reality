"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import { useState, useCallback } from "react";
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
  Loader2,
  Eye,
  FileCode,
} from "lucide-react";
import { uploadContentImage } from "@/app/lib/api/blogs";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

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

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Image.configure({
        inline: true,
        HTMLAttributes: {
          class: "rounded-lg max-w-full h-auto my-4",
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
      }),
      Underline,
    ],
    immediatelyRender: false,
    content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
      setCodeContent(html);
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg focus:outline-none max-w-none min-h-[400px] p-4",
      },
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
    <div className="border border-border rounded-xl overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="border-b border-border bg-cream p-2 flex flex-wrap gap-1">
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
            </div>

            {/* Headings */}
            <div className="flex gap-1 border-r border-border pr-2">
              <MenuButton
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                isActive={editor.isActive("heading", { level: 1 })}
                title="Heading 1"
              >
                <Heading1 size={18} />
              </MenuButton>
              <MenuButton
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                isActive={editor.isActive("heading", { level: 2 })}
                title="Heading 2"
              >
                <Heading2 size={18} />
              </MenuButton>
              <MenuButton
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                isActive={editor.isActive("heading", { level: 3 })}
                title="Heading 3"
              >
                <Heading3 size={18} />
              </MenuButton>
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
  );
}