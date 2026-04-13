"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import RichTextEditor from "./RichTextEditor";
import {
    Save,
    Eye,
    ArrowLeft,
    Upload,
    X,
    Plus,
    Trash2,
    Loader2,
} from "lucide-react";
import { FAQ } from "@/app/lib/api/blogs";

interface BlogFormProps {
    mode: "create" | "edit";
    initialData?: any;
    onSubmit: (formData: FormData, status: "draft" | "published") => void;
    isSubmitting: boolean;
}

export default function BlogForm({
    mode,
    initialData,
    onSubmit,
    isSubmitting,
}: BlogFormProps) {
    const router = useRouter();

    // Form state
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [featuredImage, setFeaturedImage] = useState<File | null>(null);
    const [featuredImagePreview, setFeaturedImagePreview] = useState<string>("");
    const [removeFeaturedImage, setRemoveFeaturedImage] = useState(false);

    // SEO state
    const [metaTitle, setMetaTitle] = useState("");
    const [metaDescription, setMetaDescription] = useState("");
    const [metaKeywords, setMetaKeywords] = useState<string[]>([]);

    // FAQ state
    const [faqs, setFaqs] = useState<FAQ[]>([]);

    // Input states
    const [tagInput, setTagInput] = useState("");
    const [keywordInput, setKeywordInput] = useState("");

    // Errors
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Load initial data for edit mode
    useEffect(() => {
        if (mode === "edit" && initialData) {
            setTitle(initialData.title || "");
            setContent(initialData.content || "");
            setExcerpt(initialData.excerpt || "");
            setCategory(initialData.category || "");
            setTags(initialData.tags || []);
            setMetaTitle(initialData.metaTitle || "");
            setMetaDescription(initialData.metaDescription || "");
            setMetaKeywords(initialData.metaKeywords || []);
            setFaqs(initialData.faqs || []);
            setFeaturedImagePreview(initialData.blogImage?.url || "");
        }
    }, [mode, initialData]);

    const handleFeaturedImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setErrors((prev) => ({
                ...prev,
                featuredImage: "Please select an image file",
            }));
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setErrors((prev) => ({
                ...prev,
                featuredImage: "Image size should be less than 5MB",
            }));
            return;
        }

        setFeaturedImage(file);
        setFeaturedImagePreview(URL.createObjectURL(file));
        setRemoveFeaturedImage(false);
        setErrors((prev) => ({ ...prev, featuredImage: "" }));
    };

    const removeImage = () => {
        setFeaturedImage(null);
        setFeaturedImagePreview("");
        setRemoveFeaturedImage(true);
    };

    // Tag handlers
    const addTag = (tag: string) => {
        const trimmedTag = tag.trim();
        if (trimmedTag && !tags.includes(trimmedTag)) {
            setTags([...tags, trimmedTag]);
        }
    };

    const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addTag(tagInput);
            setTagInput("");
        }
    };

    const removeTag = (index: number) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    const handleTagPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedText = e.clipboardData.getData("text");
        const newTags = pastedText
            .split(/[,\n]/)
            .map((tag) => tag.trim())
            .filter((tag) => tag && !tags.includes(tag));
        setTags([...tags, ...newTags]);
        setTagInput("");
    };

    // Keyword handlers
    const addKeyword = (keyword: string) => {
        const trimmedKeyword = keyword.trim();
        if (trimmedKeyword && !metaKeywords.includes(trimmedKeyword)) {
            setMetaKeywords([...metaKeywords, trimmedKeyword]);
        }
    };

    const handleKeywordInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addKeyword(keywordInput);
            setKeywordInput("");
        }
    };

    const removeKeyword = (index: number) => {
        setMetaKeywords(metaKeywords.filter((_, i) => i !== index));
    };

    const handleKeywordPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedText = e.clipboardData.getData("text");
        const newKeywords = pastedText
            .split(/[,\n]/)
            .map((kw) => kw.trim())
            .filter((kw) => kw && !metaKeywords.includes(kw));
        setMetaKeywords([...metaKeywords, ...newKeywords]);
        setKeywordInput("");
    };

    // FAQ handlers
    const addFAQ = () => {
        setFaqs([...faqs, { question: "", answer: "" }]);
    };

    const updateFAQ = (index: number, field: "question" | "answer", value: string) => {
        const updatedFaqs = [...faqs];
        updatedFaqs[index][field] = value;
        setFaqs(updatedFaqs);
    };

    const removeFAQ = (index: number) => {
        setFaqs(faqs.filter((_, i) => i !== index));
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!title.trim()) {
            newErrors.title = "Title is required";
        }

        if (!content.trim() || content === "<p></p>") {
            newErrors.content = "Content is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (submitStatus: "draft" | "published") => {
        if (!validateForm()) {
            return;
        }

        const formData = new FormData();
        formData.append("title", title.trim());
        formData.append("content", content);
        formData.append("excerpt", excerpt.trim());
        formData.append("category", category.trim());
        formData.append("status", submitStatus);
        formData.append("tags", JSON.stringify(tags));
        formData.append("metaTitle", metaTitle.trim() || title.trim());
        formData.append(
            "metaDescription",
            metaDescription.trim() || excerpt.trim()
        );
        formData.append("metaKeywords", JSON.stringify(metaKeywords));
        formData.append(
            "faqs",
            JSON.stringify(faqs.filter((f) => f.question && f.answer))
        );

        if (featuredImage) {
            formData.append("featuredImage", featuredImage);
        }

        if (removeFeaturedImage) {
            formData.append("removeFeaturedImage", "true");
        }

        onSubmit(formData, submitStatus);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="p-2 hover:bg-cream rounded-lg transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-navy-900 font-display">
                            {mode === "create" ? "Create New Blog" : "Edit Blog"}
                        </h1>
                        <p className="text-text-muted mt-1">
                            {mode === "create"
                                ? "Write and publish your blog post"
                                : "Update your blog post"}
                        </p>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => handleSubmit("draft")}
                        disabled={isSubmitting}
                        className="flex items-center gap-2 px-6 py-3 border border-border text-navy-900 rounded-lg font-semibold hover:bg-cream transition-colors disabled:opacity-50"
                    >
                        {isSubmitting ? (
                            <Loader2 size={18} className="animate-spin" />
                        ) : (
                            <Save size={18} />
                        )}
                        Save as Draft
                    </button>
                    <button
                        onClick={() => handleSubmit("published")}
                        disabled={isSubmitting}
                        className="flex items-center gap-2 px-6 py-3 bg-gold-400 text-navy-900 rounded-lg font-semibold hover:bg-gold-500 transition-colors disabled:opacity-50"
                    >
                        {isSubmitting ? (
                            <Loader2 size={18} className="animate-spin" />
                        ) : (
                            <Eye size={18} />
                        )}
                        {mode === "create" ? "Publish" : "Update"}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Title */}
                    <div className="bg-white rounded-lg border border-border p-6">
                        <label className="block text-sm font-sans font-semibold text-navy-900 mb-2">
                            Blog Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                                if (errors.title) setErrors((prev) => ({ ...prev, title: "" }));
                            }}
                            placeholder="Enter an engaging title for your blog"
                            className={`w-full px-4 py-3 border ${errors.title ? "border-red-400" : "border-border"
                                } rounded-lg text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-gold-400`}
                        />
                        {errors.title && (
                            <p className="text-xs text-red-500 mt-2">{errors.title}</p>
                        )}
                    </div>

                    {/* Featured Image */}
                    <div className="bg-white rounded-lg border border-border p-6">
                        <label className="block text-sm font-sans font-semibold text-navy-900 mb-2">
                            Featured Image
                        </label>
                        {featuredImagePreview ? (
                            <div className="relative">
                                <img
                                    src={featuredImagePreview}
                                    alt="Featured"
                                    className="w-full h-64 object-cover rounded-lg"
                                />
                                <button
                                    type="button"
                                    onClick={removeImage}
                                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        ) : (
                            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-cream transition-colors">
                                <Upload className="text-text-muted mb-2" size={40} />
                                <p className="text-sm text-text-secondary font-semibold">
                                    Click to upload featured image
                                </p>
                                <p className="text-xs text-text-muted mt-1">PNG, JPG up to 5MB</p>
                                <input
                                    type="file"
                                    onChange={handleFeaturedImageChange}
                                    accept="image/*"
                                    className="hidden"
                                />
                            </label>
                        )}
                        {errors.featuredImage && (
                            <p className="text-xs text-red-500 mt-2">{errors.featuredImage}</p>
                        )}
                    </div>

                    {/* Content Editor */}
                    <div className="bg-white rounded-lg border border-border p-6">
                        <label className="block text-sm font-sans font-semibold text-navy-900 mb-2">
                            Blog Content <span className="text-red-500">*</span>
                        </label>
                        <RichTextEditor
                            content={content}
                            onChange={(newContent) => {
                                setContent(newContent);
                                if (errors.content)
                                    setErrors((prev) => ({ ...prev, content: "" }));
                            }}
                            placeholder="Start writing your amazing blog content..."
                        />
                        {errors.content && (
                            <p className="text-xs text-red-500 mt-2">{errors.content}</p>
                        )}
                    </div>

                    {/* FAQs Section */}
                    <div className="bg-white rounded-lg border border-border p-6">
                        <div className="flex items-center justify-between mb-4">
                            <label className="block text-sm font-sans font-semibold text-navy-900">
                                FAQs (Optional)
                            </label>
                            <button
                                type="button"
                                onClick={addFAQ}
                                className="flex items-center gap-2 px-3 py-2 bg-gold-400 text-navy-900 rounded-lg text-sm font-semibold hover:bg-gold-500 transition-colors"
                            >
                                <Plus size={16} />
                                Add FAQ
                            </button>
                        </div>

                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className="p-4 border border-border rounded-lg space-y-3"
                                >
                                    <div className="flex justify-between items-start">
                                        <span className="text-sm font-semibold text-text-muted">
                                            FAQ #{index + 1}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => removeFAQ(index)}
                                            className="text-red-500 hover:text-red-600"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    <input
                                        type="text"
                                        value={faq.question}
                                        onChange={(e) => updateFAQ(index, "question", e.target.value)}
                                        placeholder="Question"
                                        className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                                    />
                                    <textarea
                                        value={faq.answer}
                                        onChange={(e) => updateFAQ(index, "answer", e.target.value)}
                                        placeholder="Answer"
                                        rows={3}
                                        className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 resize-none"
                                    />
                                </div>
                            ))}

                            {faqs.length === 0 && (
                                <p className="text-center text-sm text-text-muted py-4">
                                    No FAQs added yet. Click "Add FAQ" to get started.
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Excerpt */}
                    <div className="bg-white rounded-lg border border-border p-6">
                        <label className="block text-sm font-sans font-semibold text-navy-900 mb-2">
                            Excerpt
                        </label>
                        <textarea
                            value={excerpt}
                            onChange={(e) => setExcerpt(e.target.value)}
                            placeholder="Brief summary of your blog (recommended)"
                            rows={4}
                            maxLength={300}
                            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 resize-none"
                        />
                        <p className="text-xs text-text-muted mt-2">
                            {excerpt.length}/300 characters
                        </p>
                    </div>

                    {/* Category */}
                    <div className="bg-white rounded-lg border border-border p-6">
                        <label className="block text-sm font-sans font-semibold text-navy-900 mb-2">
                            Category
                        </label>
                        <input
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            placeholder="e.g., Real Estate, Investment"
                            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                        />
                    </div>

                    {/* Tags */}
                    <div className="bg-white rounded-lg border border-border p-6">
                        <label className="block text-sm font-sans font-semibold text-navy-900 mb-2">
                            Tags
                        </label>
                        <div className="space-y-2">
                            <input
                                type="text"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={handleTagInput}
                                onPaste={handleTagPaste}
                                placeholder="Type tag and press Enter or comma"
                                className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                            />
                            {tags.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center gap-1 px-3 py-1 bg-cream text-navy-900 rounded-full text-sm font-sans"
                                        >
                                            {tag}
                                            <button
                                                type="button"
                                                onClick={() => removeTag(index)}
                                                className="hover:text-red-500 transition-colors"
                                            >
                                                <X size={14} />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}
                            <p className="text-xs text-text-muted">
                                Press Enter or comma to add tags. Paste comma-separated tags to add
                                multiple at once.
                            </p>
                        </div>
                    </div>

                    {/* SEO Settings */}
                    <div className="bg-white rounded-lg border border-border p-6">
                        <h3 className="text-sm font-sans font-semibold text-navy-900 mb-4">
                            SEO Settings
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-sans font-semibold text-text-muted mb-1">
                                    Meta Title
                                </label>
                                <input
                                    type="text"
                                    value={metaTitle}
                                    onChange={(e) => setMetaTitle(e.target.value)}
                                    placeholder="SEO title (defaults to blog title)"
                                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-sans font-semibold text-text-muted mb-1">
                                    Meta Description
                                </label>
                                <textarea
                                    value={metaDescription}
                                    onChange={(e) => setMetaDescription(e.target.value)}
                                    placeholder="SEO description (defaults to excerpt)"
                                    rows={3}
                                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-sans font-semibold text-text-muted mb-1">
                                    Meta Keywords
                                </label>
                                <div className="space-y-2">
                                    <input
                                        type="text"
                                        value={keywordInput}
                                        onChange={(e) => setKeywordInput(e.target.value)}
                                        onKeyDown={handleKeywordInput}
                                        onPaste={handleKeywordPaste}
                                        placeholder="Type keyword and press Enter or comma"
                                        className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                                    />
                                    {metaKeywords.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {metaKeywords.map((keyword, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-sans"
                                                >
                                                    {keyword}
                                                    <button
                                                        type="button"
                                                        onClick={() => removeKeyword(index)}
                                                        className="hover:text-red-500 transition-colors"
                                                    >
                                                        <X size={12} />
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}