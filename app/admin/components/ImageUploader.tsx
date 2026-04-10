"use client";
import { useState, useRef } from "react";
import {
    ImageIcon,
    Trash2,
    Loader2,
    Star,
    X,
    Upload,
} from "lucide-react";
import { ImageItem } from "@/app/types";

interface ImageUploaderProps {
    images: ImageItem[];
    onChange: (images: ImageItem[]) => void;
    maxImages?: number;
    maxSizeMB?: number;
}

export default function ImageUploader({
    images,
    onChange,
    maxImages = 10,
    maxSizeMB = 5,
}: ImageUploaderProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (files: FileList | null) => {
        if (!files) return;

        const maxSizeBytes = maxSizeMB * 1024 * 1024;
        const remainingSlots = maxImages - images.length;
        const filesToProcess = Array.from(files).slice(0, remainingSlots);

        const newImages: ImageItem[] = [];

        filesToProcess.forEach((file) => {
            if (file.size > maxSizeBytes) {
                alert(`${file.name} is larger than ${maxSizeMB}MB`);
                return;
            }

            if (!file.type.startsWith("image/")) {
                alert(`${file.name} is not an image file`);
                return;
            }

            const id = `new-${Date.now()}-${Math.random()}`;
            const url = URL.createObjectURL(file);

            newImages.push({
                id,
                url,
                file,
                isNew: true,
                order: images.length + newImages.length,
            });
        });

        if (newImages.length > 0) {
            onChange([...images, ...newImages]);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        handleFileSelect(e.dataTransfer.files);
    };

    const handleRemove = (index: number) => {
        const imageToRemove = images[index];
        if (imageToRemove.isNew && imageToRemove.url.startsWith("blob:")) {
            URL.revokeObjectURL(imageToRemove.url);
        }

        const newImages = images.filter((_, i) => i !== index);
        // Reorder
        const reorderedImages = newImages.map((img, i) => ({
            ...img,
            order: i,
        }));
        onChange(reorderedImages);
    };

    const handleSetPrimary = (index: number) => {
        if (index === 0) return;

        const newImages = [...images];
        const [primaryImage] = newImages.splice(index, 1);
        newImages.unshift(primaryImage);

        // Reorder
        const reorderedImages = newImages.map((img, i) => ({
            ...img,
            order: i,
        }));
        onChange(reorderedImages);
    };

    // Drag and drop reordering
    const handleDragStart = (index: number) => {
        setDraggedIndex(index);
    };

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === index) return;

        const newImages = [...images];
        const draggedItem = newImages[draggedIndex];
        newImages.splice(draggedIndex, 1);
        newImages.splice(index, 0, draggedItem);

        // Reorder
        const reorderedImages = newImages.map((img, i) => ({
            ...img,
            order: i,
        }));

        setDraggedIndex(index);
        onChange(reorderedImages);
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
    };

    return (
        <div className="space-y-4">
            {/* Upload Area */}
            <div
                onDrop={handleDrop}
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragging
                    ? "border-gold-400 bg-gold-50"
                    : "border-border hover:border-gold-400 hover:bg-cream"
                    } ${images.length >= maxImages ? "opacity-50 cursor-not-allowed" : ""}`}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleFileSelect(e.target.files)}
                    disabled={images.length >= maxImages}
                    className="hidden"
                />

                <div className="flex flex-col items-center gap-3">
                    <div className="p-3 bg-cream rounded-full">
                        {isDragging ? (
                            <Upload className="w-8 h-8 text-gold-600" />
                        ) : (
                            <ImageIcon className="w-8 h-8 text-text-muted" />
                        )}
                    </div>

                    <div>
                        <p className="text-sm font-sans font-semibold text-navy-900">
                            {isDragging ? "Drop images here" : "Click to upload or drag and drop"}
                        </p>
                        <p className="text-xs font-sans text-text-muted mt-1">
                            PNG, JPG, WEBP up to {maxSizeMB}MB (Max {maxImages} images)
                        </p>
                    </div>

                    <div className="text-xs font-sans text-text-muted">
                        {images.length} / {maxImages} images
                    </div>
                </div>
            </div>

            {/* Image Grid */}
            {images.length > 0 && (
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-sans font-semibold text-navy-900">
                            Uploaded Images ({images.length})
                        </p>
                        <p className="text-xs font-sans text-text-muted">
                            Drag to reorder • First image is primary
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {images.map((image, index) => (
                            <div
                                key={image.id}
                                draggable
                                onDragStart={() => handleDragStart(index)}
                                onDragOver={(e) => handleDragOver(e, index)}
                                onDragEnd={handleDragEnd}
                                className={`relative group rounded-lg border-2 overflow-hidden aspect-square cursor-move ${draggedIndex === index
                                    ? "border-gold-400 opacity-50"
                                    : "border-border"
                                    }`}
                            >
                                <img
                                    src={image.url}
                                    alt={`Property ${index + 1}`}
                                    className="w-full h-full object-cover"
                                    draggable={false}
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    {index !== 0 && (
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleSetPrimary(index);
                                            }}
                                            className="p-2 bg-gold-400 text-navy-900 rounded-lg hover:bg-gold-500 transition-colors"
                                            title="Set as primary"
                                        >
                                            <Star size={18} fill="currentColor" />
                                        </button>
                                    )}

                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleRemove(index);
                                        }}
                                        className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                        title="Remove image"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>

                                {/* Badges */}
                                <div className="absolute top-2 left-2 flex flex-col gap-1">
                                    {index === 0 && (
                                        <span className="px-2 py-1 bg-gold-400 text-navy-900 text-xs font-sans font-semibold rounded flex items-center gap-1 shadow-lg">
                                            <Star size={10} fill="currentColor" />
                                            Primary
                                        </span>
                                    )}

                                    {image.isNew && (
                                        <span className="px-2 py-1 bg-green-500 text-white text-xs font-sans font-semibold rounded shadow-lg">
                                            New
                                        </span>
                                    )}
                                </div>

                                {/* Order Number */}
                                <div className="absolute bottom-2 right-2">
                                    <span className="px-2 py-1 bg-black/70 text-white text-xs font-sans font-semibold rounded">
                                        #{index + 1}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}