import { useState, useRef, ChangeEvent, DragEvent } from "react";
import { CiMinimize1 } from "react-icons/ci";
import { MdOutlineAttachment } from "react-icons/md";

interface BackgroundImageProps {
  onBackgroundChange: (file: File | null) => void;
}

export default function BackgroundImage({ onBackgroundChange }: BackgroundImageProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const processFile = (file: File) => {
    const validTypes = ["image/png", "image/jpg", "image/jpeg", "video/mp4"];
    if (!validTypes.includes(file.type)) {
      alert("Invalid file format. Please use PNG, JPG, JPEG, or MP4.");
      return;
    }

    if (file.size > 500 * 1024 * 1024) {
      alert("File size exceeds 500MB limit.");
      return;
    }

    onBackgroundChange(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div
      className={`bg-white w-full max-w-[56.25rem] ${isMinimized ? "h-[5rem]" : "h-auto"} flex flex-col rounded-xl mt-6 p-4 transition-all duration-300`}
    >
      <div className="w-full flex flex-row justify-between items-center">
        <h1 className="text-base sm:text-lg underline font-semibold">Background Image</h1>
        <button onClick={toggleMinimize}>
          <CiMinimize1
            className={`w-8 h-8 text-[#6C7074] ${isMinimized ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {!isMinimized && (
        <button
          className={`bg-[#EBEBEB] w-full mt-4 rounded-lg ${
            isDragging ? "border-2 border-blue-500" : ""
          }`}
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{ height: "14.625rem" }}
        >
          <div className="w-full h-full flex flex-col justify-center items-center gap-y-1 text-center px-2">
            <MdOutlineAttachment className="w-6 h-6" />
            <h1 className="underline text-[#6B6B6B] text-sm font-medium">
              Drag and drop files, or <span className="text-[#0584F9]">Browse</span>
            </h1>
            <h2 className="underline text-[#6B6B6B] text-xs font-normal">
              Support formats : png, jpg, jpeg, mp4.
            </h2>
            <h3 className="underline text-[#6B6B6B] text-xs font-normal">
              Max size : 500Mb
            </h3>
          </div>
        </button>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".png,.jpg,.jpeg,.mp4"
        className="hidden"
      />
    </div>
  );
}