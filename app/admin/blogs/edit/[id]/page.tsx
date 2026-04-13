"use client";
import { useParams, useRouter } from "next/navigation";
import { useBlog, useUpdateBlog } from "@/app/admin/Hooks/useBlogs";
import BlogForm from "@/app/admin/components/BlogForm";
import { Loader2 } from "lucide-react";

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { data: blogData, isLoading: isBlogLoading } = useBlog(id);
  const updateBlog = useUpdateBlog();

  const handleSubmit = (formData: FormData, status: "draft" | "published") => {
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
          <span className="text-lg text-text-muted">Loading blog...</span>
        </div>
      </div>
    );
  }

  return (
    <BlogForm
      mode="edit"
      initialData={blogData?.data}
      onSubmit={handleSubmit}
      isSubmitting={updateBlog.isPending}
    />
  );
}