"use client"
import { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';
import { getPresignedUploadUrl } from '@/app/action';

// kode ini gunanya biar react quill gk dirender secara ssr di development biar gk error
const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <p>Loading Editor...</p>,
});

export default function Page() {
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleAddArticle = async () => {
    try {
      const token = localStorage.getItem("auth");

      const res = await fetch("http://localhost:3000/api/article", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title,
          content: value,
          featuredImageUrl: "xxxxxx",
          additionalImages: ["xxxxxx"]
        }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      alert("Berhasil terkirim")
    } catch (err) {
      alert("Gagal terkirim")
      console.error(err);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    const token = localStorage.getItem("auth");

    try {
      // 1. Minta URL ke Server Action
      const { success, url, objectName, error } = await getPresignedUploadUrl(file.name, file.type);

      if (!success || !url || !objectName) {
        throw new Error(error || 'Gagal mendapatkan URL upload');
      }

      // 2. Upload Fisik ke Minio (Direct from Browser)
      const uploadRes = await fetch(url, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type, // PENTING!
        },
      });

      if (!uploadRes.ok) {
        throw new Error('Gagal upload ke Minio (Cek CORS?)');
      }

      const res = await fetch("http://localhost:3000/api/article", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title,
          content: value,
          featuredImageUrl: objectName,
          // additionalImages: ["xxxxxx"]
        }),
      });

    } catch (err: any) {
      console.error(err);
    }

  }
console.log(process.env.MINIO_ACCESS_KEY)

  return (
    <>
      <div className='m-10'>
        <div className='flex items-center gap-5 mb-5'>
          <p>Judul: </p>
          <input
            className='border px-2 py-1 border-gray-300'
            size={50}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            setFile(e.target.files?.[0] || null);
            // setStatus('idle');
            // setMsg('');
          }}
          className="mb-4 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />

        <p>Isi artikel: </p>
        <ReactQuill theme="snow" value={value} onChange={setValue} />


        <div className="my-5 flex justify-end">
          <div
            className="border rounded-2xl py-1 px-2 bg-[#CFEAFF] text-[#008AFC] cursor-pointer hover:bg-[#8CCCFF]"
            onClick={handleUpload}
          >
            <p>Kirim Artikel</p>
          </div>
        </div>
      </div>
    </>
  )
}
