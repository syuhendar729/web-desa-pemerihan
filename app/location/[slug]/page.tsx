import LocationGallery from "@/components/nonShared/locationGallery";
import WhatsAppButtonTourSpot from "@/components/nonShared/whatsAppButtonTourSpot";
import { getTourSpotData } from "@/services/getTourSpotData-tourSpotPage";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [tourSpotData, imagesUrl] = await getTourSpotData(slug);

  if (!tourSpotData) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Produk Tidak Ditemukan atau bermasalah
          </h2>
          <p className="text-gray-500">Maaf, data produk tidak tersedia.</p>
        </div>
      </div>
    );
  }

  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Number(tourSpotData.entryFee));

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      {/* Container utama agar tidak terlalu lebar di layar besar */}
      <div className="mx-auto md:max-w-6xl bg-white rounded-xl overflow-hidden border border-gray-100">
        <div className="gap-8 p-6">
          <LocationGallery
            images={imagesUrl as string[]}
            productName={tourSpotData.name}
          />

          <div className="justify-between mt-5">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                {tourSpotData.name}
              </h1>
              <p className="text-lg text-gray-600 font-medium">
                Biaya masuk: {formattedPrice}
              </p>
              <p className="text-lg text-gray-600 font-medium">
                Buka jam{" "}
                {tourSpotData.openTimeFrom.toLocaleTimeString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}{" "}
                -{" "}
                {tourSpotData.openTimeTo.toLocaleTimeString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}{" "}
                WIB
              </p>
              <p className="text-lg text-gray-600 font-medium">
                Buka Setiap Hari
              </p>
            </div>

            <div className="mb-6 pt-6">
              <h3 className="text-sm font-medium text-gray-900">Deskripsi</h3>
              <div className="mt-2 prose prose-sm text-gray-600 whitespace-pre-line leading-relaxed">
                {tourSpotData.description ||
                  "Tidak ada deskripsi untuk produk ini."}
              </div>
            </div>

            <div>
              <div className="mt-4">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-500 mb-1">Hubungi Penjual:</p>
                  <p className="text-lg font-semibold text-gray-800 break-all">
                    {tourSpotData.owner}
                  </p>
                  <p className="text-lg font-semibold text-gray-600 break-all">
                    +{tourSpotData.contact}
                  </p>
                  <WhatsAppButtonTourSpot tourSpot={tourSpotData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
