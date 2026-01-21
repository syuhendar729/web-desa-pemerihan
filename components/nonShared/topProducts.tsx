"use client";
import { useState, useEffect } from "react";
import { getShopItemImages } from "@/helpers/presignedDownloadHelper";
import formatRupiah from "@/helpers/rupiahFormat";
import Link from "next/link";

interface ShopItem {
  name: string;
  price: number;
  slug: string;
  contact: string;
  description: string;
  imagesUrl: string[];
  createdAt: string;
}

export default function TopProducts() {
  const [products, setProducts] = useState<ShopItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imgArr, setImgArr] = useState<string[]>([]);
  const [imgDownloadArr, setImgDownloadArr] = useState<(string | null)[]>([]);

  // Fetch presigned URLs for images
  useEffect(() => {
    if (imgArr.length === 0) return;

    const getPresigned = async () => {
      const url = await getShopItemImages(imgArr);
      setImgDownloadArr(url);
    };
    getPresigned();
  }, [imgArr]);

  // Fetch products from API
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/shopitem/client?page=1&limit=3");
        const result = await response.json();

        if (result.success && result.data) {
          const collectedImages = result.data.map((product: ShopItem) =>
            product.imagesUrl[0]
          );
          setImgArr(collectedImages);
          setProducts(result.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-green-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
          Produk Unggulan
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Produk-produk terbaik dari Desa Pemerihan
        </p>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-600 border-r-transparent"></div>
            <p className="text-gray-600 mt-4">Memuat produk...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Belum ada produk tersedia</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-xl cursor-pointer border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <Link href={`/shop/${product.slug}`}>
                  <div className="relative">
                    <img
                      src={imgDownloadArr[index] || "/images/placeholder.jpg"}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="font-bold text-gray-800 mb-2 line-clamp-2">
                      {product.name}
                    </h4>
                    <p className="text-amber-600 font-bold text-lg">
                      {formatRupiah(product.price)}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link href="/shop">
            <button className="bg-amber-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-amber-700 transition">
              Lihat Semua Produk →
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
