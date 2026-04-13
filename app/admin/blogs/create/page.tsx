"use client";
import { useRouter } from "next/navigation";
import { useCreateBlog } from "@/app/admin/Hooks/useBlogs";
import BlogForm from "@/app/admin/components/BlogForm";

export default function CreateBlogPage() {
  const router = useRouter();
  const createBlog = useCreateBlog();

  const handleSubmit = (formData: FormData, status: "draft" | "published") => {
    createBlog.mutate(formData, {
      onSuccess: () => {
        router.push("/admin/blogs");
      },
    });
  };

  return (
    <BlogForm
      mode="create"
      onSubmit={handleSubmit}
      isSubmitting={createBlog.isPending}
    />
  );
}