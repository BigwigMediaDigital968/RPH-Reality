"use client";
import { X, FileText, Loader2, Mail, Phone, MapPin, Briefcase, Calendar } from "lucide-react";
import { Application } from "@/app/lib/api/applications";

// View Details Modal
interface ViewModalProps {
  application: Application | null;
  onClose: () => void;
}

export function ViewDetailsModal({ application, onClose }: ViewModalProps) {
  if (!application) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status: Application["status"]) => {
    const colors = {
      pending: "bg-blue-100 text-blue-700",
      reviewed: "bg-yellow-100 text-yellow-700",
      interviewed: "bg-purple-100 text-purple-700",
      rejected: "bg-red-100 text-red-700",
      hired: "bg-green-100 text-green-700",
    };
    return colors[status];
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-border px-6 py-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-navy-900">
            Application Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-cream rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="font-display text-lg font-semibold text-navy-900 mb-4">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-sans font-semibold text-text-muted">
                  Full Name
                </label>
                <p className="text-sm font-sans text-navy-900 mt-1">
                  {application.name}
                </p>
              </div>
              <div>
                <label className="text-sm font-sans font-semibold text-text-muted">
                  Status
                </label>
                <div className="mt-1">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-sans font-semibold ${getStatusColor(
                      application.status
                    )}`}
                  >
                    {application.status}
                  </span>
                </div>
              </div>
              {application.email && (
                <div>
                  <label className="text-sm font-sans font-semibold text-text-muted flex items-center gap-1">
                    <Mail size={14} />
                    Email
                  </label>
                  <p className="text-sm font-sans text-navy-900 mt-1">
                    {application.email}
                  </p>
                </div>
              )}
              {application.phone && (
                <div>
                  <label className="text-sm font-sans font-semibold text-text-muted flex items-center gap-1">
                    <Phone size={14} />
                    Phone
                  </label>
                  <p className="text-sm font-sans text-navy-900 mt-1">
                    {application.phone}
                  </p>
                </div>
              )}
              {application.city && (
                <div>
                  <label className="text-sm font-sans font-semibold text-text-muted flex items-center gap-1">
                    <MapPin size={14} />
                    City
                  </label>
                  <p className="text-sm font-sans text-navy-900 mt-1">
                    {application.city}
                  </p>
                </div>
              )}
              {application.position && (
                <div>
                  <label className="text-sm font-sans font-semibold text-text-muted flex items-center gap-1">
                    <Briefcase size={14} />
                    Position
                  </label>
                  <p className="text-sm font-sans text-navy-900 mt-1">
                    {application.position}
                  </p>
                </div>
              )}
              <div>
                <label className="text-sm font-sans font-semibold text-text-muted">
                  Experience
                </label>
                <p className="text-sm font-sans text-navy-900 mt-1">
                  {application.experience || "Not specified"}
                </p>
              </div>
              <div>
                <label className="text-sm font-sans font-semibold text-text-muted flex items-center gap-1">
                  <Calendar size={14} />
                  Applied Date
                </label>
                <p className="text-sm font-sans text-navy-900 mt-1">
                  {formatDate(application.appliedDate)}
                </p>
              </div>
            </div>
          </div>

          {/* Resume */}
          {application.resume?.url && (
            <div>
              <h3 className="font-display text-lg font-semibold text-navy-900 mb-4">
                Resume
              </h3>
              <a
                href={application?.resume?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-cream transition-colors"
              >
                <div className="p-3 bg-gold-100 rounded-lg">
                  <FileText className="text-gold-600" size={24} />
                </div>
                <div className="flex-1">
                  <p className="font-sans font-semibold text-navy-900">
                    View Resume
                  </p>
                  <p className="text-xs font-sans text-text-muted mt-1">
                    Click to open in new tab
                  </p>
                </div>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// View Resume Modal
interface ResumeModalProps {
  resumeUrl: string | null;
  onClose: () => void;
}

export function ViewResumeModal({ resumeUrl, onClose }: ResumeModalProps) {
  if (!resumeUrl) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="font-display text-xl font-bold text-navy-900">
            Resume Preview
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-cream rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-hidden">
          <iframe
            src={resumeUrl}
            className="w-full h-full"
            title="Resume Preview"
          />
        </div>

        <div className="px-6 py-4 border-t border-border flex justify-end">
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gold-400 text-navy-900 rounded-lg font-sans font-semibold hover:bg-gold-500 transition-colors"
          >
            Open in New Tab
          </a>
        </div>
      </div>
    </div>
  );
}

// Delete Confirmation Modal
interface DeleteModalProps {
  applicationName: string | null;
  isDeleting: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export function DeleteConfirmModal({
  applicationName,
  isDeleting,
  onConfirm,
  onClose,
}: DeleteModalProps) {
  if (!applicationName) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <h3 className="font-display text-xl font-bold text-navy-900 mb-2">
            Delete Application
          </h3>
          <p className="text-sm font-sans text-text-secondary mb-4">
            Are you sure you want to delete the application from{" "}
            <span className="font-semibold">{applicationName}</span>? This action
            cannot be undone.
          </p>
          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              disabled={isDeleting}
              className="px-4 py-2 border border-border rounded-lg text-sm font-sans font-semibold text-navy-900 hover:bg-cream transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isDeleting}
              className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-sans font-semibold hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isDeleting && <Loader2 className="animate-spin" size={16} />}
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}