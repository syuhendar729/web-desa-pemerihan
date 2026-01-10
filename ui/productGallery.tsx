"use client"; // Wajib agar bisa pakai useState

import { useState } from "react";

interface ProductGalleryProps {
  images: string[] | null;
  productName: string;
}

export default function ProductGallery({
  images,
  productName,
}: ProductGalleryProps) {
  // Jika images null/undefined, inisialisasi dengan array kosong
  const safeImages = images || [];

  // State untuk menyimpan URL gambar yang sedang aktif/ditampilkan
  const [activeImage, setActiveImage] = useState<string | null>(
    safeImages.length > 0 ? safeImages[0] : null,
  );

  return (
    <div className="flex flex-col gap-4">
      {/* --- GAMBAR UTAMA --- */}
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center">
        {activeImage ? (
          <img
            src={activeImage}
            alt={productName}
            className="h-full w-full object-cover transition-all duration-300"
          />
        ) : (
          // Placeholder jika tidak ada gambar sama sekali
          <div className="text-gray-400 flex flex-col items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-sm font-medium">Gambar tidak tersedia</span>
          </div>
        )}
      </div>

      {/* --- THUMBNAIL GALLERY --- */}
      {safeImages.length > 0 && (
        <div className="grid grid-cols-5 gap-2">
          {safeImages.map((img, index) => (
            <div
              key={index}
              onClick={() => setActiveImage(img)} // Logic ganti gambar utama
              className={`
                relative aspect-square w-full cursor-pointer overflow-hidden rounded-md border-2 
                transition-all duration-200 hover:opacity-100
                ${
                  activeImage === img
                    ? "border-blue-600 opacity-100 ring-1 ring-blue-600" // Style saat aktif
                    : "border-transparent opacity-60 hover:border-gray-300" // Style saat tidak aktif
                }
              `}
            >
              <img
                src={img}
                alt={`${productName} ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
