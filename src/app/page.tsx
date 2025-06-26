"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Button from "@/components/button";
import BackgroundImage from "./backgroundImage";
import ProfileImage from "./profileImage";
import Profile from "./profile";
import Portofolio from "./portofolio";
import Suzy from "../../public/images/assets/suzy.jpg";
import Background from "../../public/images/assets/bg_profile.jpg";

interface PortfolioItem {
  id: number;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

export default function EditPage() {
  const [backgroundImageFile] = useState<File | null>(null);
  const [backgroundPreviewUrl, setBackgroundPreviewUrl] = useState<string | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profilePreviewUrl, setProfilePreviewUrl] = useState<string | null>(null);

  const [portfolios, setPortfolios] = useState<PortfolioItem[]>([
    {
      id: 1,
      title: "Front End Developer",
      company: "MySkill",
      startDate: "Januari 2023",
      endDate: "Desember 2023",
      description: "Deskripsi, lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
    },
  ]);

  const [profileInfo, setProfileInfo] = useState({
    nama: "Nama",
    title: "Title",
    deskripsi: "Deskripsi, lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
  });

  // Batas maksimal portfolio
  const MAX_PORTFOLIOS = 10;

  // Ref untuk container portfolio preview
  const portfolioContainerRef = useRef<HTMLDivElement>(null);

  const handleProfileChange = (field: string, value: string) => {
    setProfileInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handlePortfolioChange = (id: number, field: string, value: string) => {
    setPortfolios((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleBackgroundChange = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setBackgroundPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setBackgroundPreviewUrl(null);
    }
  };

  const handleProfileImageChange = (file: File | null) => {
    setProfileImageFile(file);
  };

  useEffect(() => {
    if (profileImageFile) {
      const objectUrl = URL.createObjectURL(profileImageFile);
      setProfilePreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setProfilePreviewUrl(null);
    }
  }, [profileImageFile]);

  useEffect(() => {
    const savedData = localStorage.getItem("portfolioEditorData");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setProfileInfo(
        parsed.profileInfo || { nama: "Nama", title: "Title", deskripsi: "..." }
      );
      setPortfolios(parsed.portfolios || []);
      setBackgroundPreviewUrl(parsed.backgroundImage || null);
      setProfilePreviewUrl(parsed.profileImage || null);
    }
  }, []);

  const addPortfolio = () => {
    // Cek apakah sudah mencapai batas maksimal
    if (portfolios.length >= MAX_PORTFOLIOS) {
      alert(`Maksimal hanya dapat menambahkan ${MAX_PORTFOLIOS} portfolio`);
      return;
    }

    const newPortfolio: PortfolioItem = {
      id: portfolios.length + 1,
      title: `Portfolio ${portfolios.length + 1}`,
      company: "Perusahaan",
      startDate: "Mulai",
      endDate: "Selesai",
      description: "Deskripsi portfolio baru",
    };
    setPortfolios([...portfolios, newPortfolio]);
  };

  const handlePortfolioDelete = (id: number) => {
    setPortfolios((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSaveToLocalStorage = () => {
    const dataToSave = {
      backgroundImage: backgroundPreviewUrl,
      profileImage: profilePreviewUrl,
      profileInfo,
      portfolios,
    };

    try {
      localStorage.setItem("portfolioEditorData", JSON.stringify(dataToSave));
      alert("Perubahan berhasil disimpan ke browser (localStorage)");
    } catch (error) {
      console.error("Gagal menyimpan data ke localStorage:", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-[#FAFAFA] p-4 lg:p-0">
      <div className="w-full lg:w-1/2 lg:ml-[7rem] mt-10 lg:mt-[4.625rem] mb-[10rem]">
        <div className="w-full max-w-[56.25rem] mx-auto flex flex-row justify-between items-center">
          <h1 className="font-bold text-2xl">Editor</h1>
          <Button
            text="Simpan Perubahan"
            styleButton="bg-[#919EAB3D] w-[12.5rem] h-[3rem] rounded-md"
            styleText="text-[#919EABCC] text-sm font-bold flex justify-center items-center h-full"
            onClick={handleSaveToLocalStorage}
          />
        </div>

        <div className="flex flex-col gap-6 items-center w-full max-w-[56.25rem] mt-10">
          <BackgroundImage onBackgroundChange={handleBackgroundChange} />
          <ProfileImage onProfileImageChange={handleProfileImageChange} />
          <Profile onProfileChange={handleProfileChange} />

          {portfolios.map((portfolio) => (
            <Portofolio
              key={portfolio.id}
              portfolio={portfolio}
              onChange={handlePortfolioChange}
              onDelete={handlePortfolioDelete}
            />
          ))}

          <Button
            text="Tambah Portfolio"
            styleButton={`${
              portfolios.length >= MAX_PORTFOLIOS
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-[#919EAB3D]"
            } w-[12.5rem] h-[3rem] rounded-md`}
            styleText={`${
              portfolios.length >= MAX_PORTFOLIOS
                ? "text-gray-400"
                : "text-[#919EABCC]"
            } text-sm font-bold flex justify-center items-center h-full`}
            onClick={addPortfolio}
            disabled={portfolios.length >= MAX_PORTFOLIOS}
          />
        </div>
      </div>
      <div className="hidden lg:block w-px h-[78.813rem] bg-[#D9D9D9] mx-8 mt-[3.938rem]" />
      <div className="w-full lg:w-1/2 mt-10 lg:mt-[4.625rem] px-4 lg:px-0">
        <h1 className="font-bold text-2xl">Preview</h1>
        <div className="bg-white w-full max-w-[40.938rem] mt-10 rounded-xl overflow-hidden">
          <div className="flex flex-col items-center w-full">
            {backgroundImageFile?.type?.startsWith("video/") ? (
              <video
                src={backgroundPreviewUrl || ""}
                className="w-full h-60 object-cover"
                autoPlay
                loop
                muted
              />
            ) : backgroundPreviewUrl ? (
              <Image
                src={backgroundPreviewUrl}
                alt="Background Preview"
                width={1280}
                height={360}
                className="w-full h-60 object-cover"
                unoptimized
              />
            ) : (
              <Image
                src={Background.src}
                alt="Default Background"
                width={1280}
                height={360}
                className="w-full h-60 object-cover"
              />
            )}

            <div className="w-full flex justify-center relative bottom-28">
              {profileImageFile?.type?.startsWith("video/") ? (
                <video
                  src={profilePreviewUrl || ""}
                  className="w-40 h-40 rounded-full object-cover border-4 border-white"
                  autoPlay
                  loop
                  muted
                />
              ) : profilePreviewUrl ? (
                <Image
                  src={profilePreviewUrl}
                  alt="Profile Preview"
                  width={160}
                  height={160}
                  className="w-40 h-40 rounded-full object-cover border-4 border-white"
                  unoptimized
                />
              ) : (
                <Image
                  src={Suzy.src}
                  alt="Default Profile"
                  width={160}
                  height={160}
                  className="w-40 h-40 rounded-full object-cover border-4 border-white"
                />
              )}
            </div>

            <div className="flex flex-col items-center relative bottom-20">
              <h1 className="text-xl font-bold">{profileInfo.nama}</h1>
              <h2 className="text-base text-[#878787] font-bold">
                {profileInfo.title}
              </h2>
              <p className="w-72 min-h-[3.75rem] text-xs text-center">
                {profileInfo.deskripsi}
              </p>
            </div>

            <div className="w-full flex flex-col items-center px-4 pb-4 ml-8">
              <h1 className="w-full text-left font-bold text-base mb-4">
                Portfolio
              </h1>
              <div 
                ref={portfolioContainerRef}
                className="w-full max-h-[25rem] overflow-y-auto custom-scrollbar"
              >
                {portfolios.map((portfolio) => (
                  <div
                    key={portfolio.id}
                    className="bg-white shadow-lg w-full max-w-[33.188rem] rounded-md mb-4 p-4"
                  >
                    <h1 className="text-base font-medium">{portfolio.title}</h1>
                    <h2 className="text-sm text-[#717984] font-medium">
                      {portfolio.company}
                    </h2>
                    <div className="flex gap-2 text-sm text-[#717984] font-normal">
                      <span>{portfolio.startDate}</span>
                      <span>-</span>
                      <span>{portfolio.endDate}</span>
                    </div>
                    <p className="text-sm mt-2 font-normal">
                      {portfolio.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}