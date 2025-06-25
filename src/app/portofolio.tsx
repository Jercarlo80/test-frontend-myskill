import React, { useState } from "react";
import InputField from "@/components/inputField";
import { CiMinimize1 } from "react-icons/ci";
import { IoCloseCircleOutline } from "react-icons/io5";

// Definisikan tipe portfolio
interface PortfolioItem {
  id: number;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface PortfolioProps {
  portfolio: PortfolioItem; // Gunakan tipe yang spesifik
  onChange: (id: number, field: string, value: string) => void;
  onDelete: (id: number) => void;
}

export default function Portofolio({ portfolio, onChange, onDelete }: PortfolioProps) {
  const [isMinimized, setIsMinimized] = useState(false);

  const handleChange = (field: string, value: string) => {
    onChange(portfolio.id, field, value);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleDelete = () => {
    onDelete(portfolio.id);
  };

  return (
    <div className={`bg-white w-full max-w-[56.25rem] ${isMinimized ? "h-[5rem]" : "h-auto"} flex flex-col rounded-xl mt-6 p-4 transition-all duration-300`}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-base sm:text-lg underline font-semibold">Portofolio</h1>
        <div className="flex gap-x-2">
          <button onClick={toggleMinimize}>
            <CiMinimize1 className={`w-8 h-8 text-[#6C7074] ${isMinimized ? 'rotate-180' : ''}`} />
          </button>
          <button onClick={handleDelete}>
            <IoCloseCircleOutline className="w-8 h-8 text-[#6C7074]" />
          </button>
        </div>
      </div>
      {!isMinimized && (
        <div className="flex flex-col gap-y-4">
          <InputField
            styleInputField="w-full h-[3.5rem] border border-[#919EAB] text-black px-4 rounded-lg"
            type="text"
            placeholder="Title/Posisi"
            value={portfolio.title}
            onChange={(e) => handleChange("title", e.target.value)}
            name="title"
            required
          />
          <InputField
            styleInputField="w-full h-[3.5rem] border border-[#919EAB] text-black px-4 rounded-lg"
            type="text"
            placeholder="Perusahaan"
            value={portfolio.company}
            onChange={(e) => handleChange("company", e.target.value)}
            name="company"
            required
          />
          <div className="flex flex-col sm:flex-row gap-4">
            <InputField
              styleInputField="w-full h-[3.5rem] border border-[#919EAB] text-black px-4 rounded-lg"
              type="text"
              placeholder="Tanggal Mulai"
              value={portfolio.startDate}
              onChange={(e) => handleChange("startDate", e.target.value)}
              name="startDate"
              required
            />
            <InputField
              styleInputField="w-full h-[3.5rem] border border-[#919EAB] text-black px-4 rounded-lg"
              type="text"
              placeholder="Tanggal Selesai"
              value={portfolio.endDate}
              onChange={(e) => handleChange("endDate", e.target.value)}
              name="endDate"
              required
            />
          </div>
          <InputField
            styleInputField="w-full h-[8rem] border border-[#919EAB] text-black px-4 pt-2 rounded-lg"
            type="text"
            placeholder="Deskripsi"
            value={portfolio.description}
            onChange={(e) => handleChange("description", e.target.value)}
            name="description"
            required
          />
        </div>
      )}
    </div>
  );
}