"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/admin/dashboard/article");
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen w-screen bg-[#333446] text-[#EAEFEF] text-3xl font-bold flex justify-center items-center">
      Welcome to Admin Dashboard
    </div>
  );
}
