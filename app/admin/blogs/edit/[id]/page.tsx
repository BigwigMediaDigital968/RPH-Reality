// app/admin/blogs/edit/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useBlog, useUpdateBlog } from "@/app/admin/Hooks/useBlogs";
import RichTextEditor from "@/app/admin/components/RichTextEditor";
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
import Select from "react-select";
import { FAQ } from "@/app/lib/api/blogs";

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { data: blogData, isLoading: isBlogLoading } = useBlog(id);
  const updateBlog = useUpdateBlog();

  // Form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [tags, setTags] = useState<string[]>([]);
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [featuredImagePreview, setFeaturedImagePreview] = useState<string>("");
  const [existingImageUrl, setExistingImageUrl] = useState<string>("");
  const [removeFeaturedImage, setRemoveFeaturedImage] = useState(false);

  // SEO state
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState<string[]>([]);

  // FAQ state
  const [faqs, setFaqs] = useState<FAQ[]>([]);

  // Errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load blog data
  useEffect(() => {
    if (blogData?.data) {
      const blog = blogData.data;
      setTitle(blog.title);
      setContent(blog.content);
      setExcerpt(blog.excerpt || "");
      setCategory(blog.category || "");
      setStatus(blog.status);
      setTags(blog.tags || []);
      setMetaTitle(blog.metaTitle || "");
      setMetaDescription(blog.metaDescription || "");
      setMetaKeywords(blog.metaKeywords || []);
      setFaqs(blog.faqs || []);
      setExistingImageUrl(blog.blogImage?.url || "");
      setFeaturedImagePreview(blog.blogImage?.url || "");
    }
  }, [blogData]);

  const handleFeaturedImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, featuredImage: "Please select an image file" }));
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

  const handleSubmit = async (submitStatus: "draft" | "published") => {
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
    formData.append("metaDescription", metaDescription.trim() || excerpt.trim());
    formData.append("metaKeywords", JSON.stringify(metaKeywords));
    formData.append("faqs", JSON.stringify(faqs.filter((f) => f.question && f.answer)));

    if (featuredImage) {
      formData.append("featuredImage", featuredImage);
    }

    if (removeFeaturedImage) {
      formData.append("removeFeaturedImage", "true");
    }

    updateBlog.mutate(
      { id, data: formData },
      {
        onSuccess: () => {
          router.push("/admin/blogs");
        },
      }
    );
  };

  if (isBlogLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-2">
          <Loader2 className="animate-spin text-gold-500" size={32} />
          <span className="text-lg text-slate-600">Loading blog...</span>
        </div>
      </div>
    );
  }

  const tagOptions = tags.map((tag) => ({ value: tag, label: tag }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-navy-900 font-display">Edit Blog</h1>
            <p className="text-slate-500 mt-1">Update your blog post</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => handleSubmit("draft")}
            disabled={updateBlog.isPending}
            className="flex items-center gap-2 px-6 py-3 border border-slate-300 text-navy-900 rounded-lg font-semibold hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            {updateBlog.isPending ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Save size={18} />
            )}
            Save as Draft
          </button>
          <button
            onClick={() => handleSubmit("published")}
            disabled={updateBlog.isPending}
            className="flex items-center gap-2 px-6 py-3 bg-gold-400 text-navy-900 rounded-lg font-semibold hover:bg-gold-500 transition-colors disabled:opacity-50"
          >
            {updateBlog.isPending ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Eye size={18} />
            )}
            {status === "published" ? "Update" : "Publish"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="bg-white rounded-lg border border-border p-6">
            <label className="block text-sm font-bold text-navy-900 mb-2">
              Blog Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors((prev) => ({ ...prev, title: "" }));
              }}
              placeholder="Enter an engaging title for your blog"
              className={`w-full px-4 py-3 border ${
                errors.title ? "border-red-400" : "border-slate-200"
              } rounded-lg text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-gold-400`}
            />
            {errors.title && (
              <p className="text-xs text-red-500 mt-2">{errors.title}</p>
            )}
          </div>

          {/* Featured Image */}
          <div className="bg-white rounded-lg border border-border p-6">
            <label className="block text-sm font-bold text-navy-900 mb-2">
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
                  onClick={removeImage}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                <Upload className="text-slate-400 mb-2" size={40} />
                <p className="text-sm text-slate-500 font-semibold">
                  Click to upload featured image
                </p>
                <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 5MB</p>
                <input
                  type="file"
                  onChange={handleFeaturedImageChange}
                  accept="image/*"
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Content Editor */}
          <div className="bg-white rounded-lg border border-border p-6">
            <label className="block text-sm font-bold text-navy-900 mb-2">
              Blog Content *
            </label>
            <RichTextEditor
              content={content}
              onChange={(newContent) => {
                setContent(newContent);
                if (errors.content) setErrors((prev) => ({ ...prev, content: "" }));
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
              <label className="block text-sm font-bold text-navy-900">
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
                  className="p-4 border border-slate-200 rounded-lg space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-semibold text-slate-600">
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
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                  />
                  <textarea
                    value={faq.answer}
                    onChange={(e) => updateFAQ(index, "answer", e.target.value)}
                    placeholder="Answer"
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                  />
                </div>
              ))}

              {faqs.length === 0 && (
                <p className="text-center text-sm text-slate-400 py-4">
                  No FAQs added yet. Click "Add FAQ" to get started.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar - Same as Create page */}
        <div className="lg:col-span-1 space-y-6">
          {/* Excerpt */}
          <div className="bg-white rounded-lg border border-border p-6">
            <label className="block text-sm font-bold text-navy-900 mb-2">
              Excerpt
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief summary of your blog (recommended)"
              rows={4}
              maxLength={300}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
            />
            <p className="text-xs text-slate-400 mt-2">
              {excerpt.length}/300 characters
            </p>
          </div>

          {/* Category */}
          <div className="bg-white rounded-lg border border-border p-6">
            <label className="block text-sm font-bold text-navy-900 mb-2">
              Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., Real Estate, Investment"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
            />
          </div>

          {/* Tags */}
          <div className="bg-white rounded-lg border border-border p-6">
            <label className="block text-sm font-bold text-navy-900 mb-2">Tags</label>
            <Select
              isMulti
              value={tagOptions}
              onChange={(selected) => setTags(selected.map((s) => s.value))}
              placeholder="Add tags..."
              className="text-sm"
              styles={{
                control: (base) => ({
                  ...base,
                  borderColor: "#e2e8f0",
                  "&:hover": { borderColor: "#d4af37" },
                }),
              }}
              components={{
                DropdownIndicator: () => null,
                IndicatorSeparator: () => null,
              }}
              isClearable={false}
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.currentTarget instanceof HTMLInputElement) {
                  e.preventDefault();
                  const newTag = e.currentTarget.value.trim();
                  if (newTag && !tags.includes(newTag)) {
                    setTags([...tags, newTag]);
                  }
                }
              }}
            />
            <p className="text-xs text-slate-400 mt-2">Press Enter to add tags</p>
          </div>

          {/* SEO Settings */}
          <div className="bg-white rounded-lg border border-border p-6">
            <h3 className="text-sm font-bold text-navy-900 mb-4">SEO Settings</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder="SEO title (defaults to blog title)"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Meta Description
                </label>
                <textarea
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="SEO description (defaults to excerpt)"
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Meta Keywords
                </label>
                <Select
                  isMulti
                  value={metaKeywords.map((k) => ({ value: k, label: k }))}
                  onChange={(selected) =>
                    setMetaKeywords(selected.map((s) => s.value))
                  }
                  placeholder="Add keywords..."
                  className="text-sm"
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderColor: "#e2e8f0",
                      "&:hover": { borderColor: "#d4af37" },
                    }),
                  }}
                  components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                  }}
                  isClearable={false}
                  onKeyDown={(e:React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === "Enter" && e.currentTarget.value) {
                      e.preventDefault();
                      const newKeyword = e.currentTarget.value.trim();
                      if (newKeyword && !metaKeywords.includes(newKeyword)) {
                        setMetaKeywords([...metaKeywords, newKeyword]);
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}