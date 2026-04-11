// app/admin/blogs/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  Loader2,
  Filter,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { useBlogs, useDeleteBlog, useBlogStats } from "@/app/admin/Hooks/useBlogs";
import { BlogFilters } from "@/app/lib/api/blogs";

export default function BlogsListPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const filters: BlogFilters = {
    page: currentPage,
    limit,
    search: searchTerm || undefined,
    status: statusFilter === "all" ? undefined : statusFilter,
    category: categoryFilter === "all" ? undefined : categoryFilter,
    sortBy: "createdAt",
    sort: "desc",
  };

  const { data, isLoading, isError } = useBlogs(filters);
  const { data: stats } = useBlogStats();
  const deleteBlog = useDeleteBlog();

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteBlog.mutate(id);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    return status === "published"
      ? "bg-green-100 text-green-700"
      : "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-sans text-text-muted">Total Blogs</p>
              <p className="text-3xl font-bold text-navy-900 mt-1">
                {stats?.data.total || 0}
              </p>
            </div>
            <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-gold-500" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-sans text-text-muted">Published</p>
              <p className="text-3xl font-bold text-green-600 mt-1">
                {stats?.data.published || 0}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Eye className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-sans text-text-muted">Drafts</p>
              <p className="text-3xl font-bold text-yellow-600 mt-1">
                {stats?.data.draft || 0}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Edit className="text-yellow-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-sans text-text-muted">Total Views</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">
                {stats?.data.totalViews || 0}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-blue-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-border p-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                size={20}
              />
              <input
                type="text"
                placeholder="Search blogs by title, content, or tags..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-11 pr-4 py-3 border border-border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-3 border border-border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent bg-white"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-3 border border-border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent bg-white"
            >
              <option value="all">All Categories</option>
              {data?.filters.categories.map((category:any) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <button
              onClick={() => router.push("/admin/blogs/create")}
              className="flex items-center gap-2 px-4 py-2 bg-gold-400 text-navy-900 rounded-lg font-sans font-semibold hover:bg-gold-500 transition-colors"
            >
              <Plus size={18} />
              New Blog
            </button>
          </div>
        </div>
      </div>

      {/* Blogs Table */}
      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-cream">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-sans font-semibold text-navy-900 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-xs font-sans font-semibold text-navy-900 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-sans font-semibold text-navy-900 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-sans font-semibold text-navy-900 uppercase tracking-wider">
                  Views
                </th>
                <th className="px-6 py-4 text-left text-xs font-sans font-semibold text-navy-900 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-sans font-semibold text-navy-900 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="animate-spin text-gold-500" size={24} />
                      <span className="text-text-muted">Loading blogs...</span>
                    </div>
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <p className="text-red-600">Failed to load blogs</p>
                  </td>
                </tr>
              ) : data?.data.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <p className="text-text-muted">No blogs found</p>
                  </td>
                </tr>
              ) : (
                data?.data.map((blog:any) => (
                  <tr key={blog._id} className="hover:bg-cream/30">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {blog.blogImage.url && (
                          <img
                            src={blog.blogImage.url}
                            alt={blog.title}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        )}
                        <div>
                          <div className="font-sans font-medium text-navy-900 line-clamp-1">
                            {blog.title}
                          </div>
                          <div className="text-xs text-text-muted line-clamp-1">
                            {blog.excerpt}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-sans text-text-secondary">
                      {blog.category || "Uncategorized"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-sans font-semibold ${getStatusColor(
                          blog.status
                        )}`}
                      >
                        {blog.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-sans text-text-secondary">
                      {blog.views}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-sans text-text-secondary">
                      {formatDate(blog.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => window.open(`/blog/${blog.slug}`, "_blank")}
                          className="p-2 text-gold-500 hover:bg-gold-50 rounded-lg transition-colors"
                          title="Preview"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => router.push(`/admin/blogs/edit/${blog._id}`)}
                          className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(blog._id, blog.title)}
                          disabled={deleteBlog.isPending}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {data && data.data.length > 0 && (
          <div className="border-t border-border px-6 py-4 flex items-center justify-between">
            <p className="text-sm font-sans text-text-muted">
              Showing{" "}
              <span className="font-semibold">
                {(currentPage - 1) * limit + 1}-
                {Math.min(currentPage * limit, data.pagination.total)}
              </span>{" "}
              of <span className="font-semibold">{data.pagination.total}</span> blogs
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={!data.pagination.hasPrevPage}
                className="px-4 py-2 border border-border rounded-lg text-sm font-sans font-semibold text-navy-900 hover:bg-cream transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(data.pagination.totalPages, prev + 1)
                  )
                }
                disabled={!data.pagination.hasNextPage}
                className="px-4 py-2 bg-gold-400 text-navy-900 rounded-lg text-sm font-sans font-semibold hover:bg-gold-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}