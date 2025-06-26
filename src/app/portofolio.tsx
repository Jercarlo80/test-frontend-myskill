import React, { useState } from "react";
import InputField from "@/components/inputField";
import { CiMinimize1 } from "react-icons/ci";
import { IoCloseCircleOutline } from "react-icons/io5";

interface PortfolioItem {
  id: number;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface PortfolioProps {
  portfolio: PortfolioItem;
  onChange: (id: number, field: string, value: string) => void;
  onDelete: (id: number) => void;
}

function formatMonthYear(value: string) {
  if (!value) return "";
  const [year, month] = value.split("-");
  const monthInt = parseInt(month, 10);
  if (isNaN(monthInt) || monthInt < 1 || monthInt > 12) {
    return value;
  }
  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  return `${monthNames[monthInt - 1]} ${year}`;
}
export default function Portofolio({ portfolio, onChange, onDelete }: PortfolioProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [dateError, setDateError] = useState("");
  const handleChange = (field: string, value: string) => {
    if (field === "startDate" || field === "endDate") {
      const start = field === "startDate" ? value : portfolio.startDate;
      const end = field === "endDate" ? value : portfolio.endDate;
      if (start && end && new Date(start) > new Date(end)) {
        setDateError("Tanggal mulai harus lebih awal dari tanggal selesai.");
      } else {
        setDateError("");
      }
    }
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
            <div className="w-full">
              <label className="text-sm text-[#212B36] font-medium">Tanggal Mulai</label>
              <input
                className="w-full h-[3.5rem] border border-[#919EAB] text-black px-4 rounded-lg"
                type="month"
                value={portfolio.startDate}
                onChange={(e) => handleChange("startDate", e.target.value)}
              />
              {portfolio.startDate && (
                <p className="text-sm text-[#637381] italic">
                  {formatMonthYear(portfolio.startDate)}
                </p>
              )}
            </div>
            <div className="w-full">
              <label className="text-sm text-[#212B36] font-medium">Tanggal Selesai</label>
              <input
                className="w-full h-[3.5rem] border border-[#919EAB] text-black px-4 rounded-lg"
                type="month"
                value={portfolio.endDate}
                onChange={(e) => handleChange("endDate", e.target.value)}
              />
              {portfolio.endDate && (
                <p className="text-sm text-[#637381] italic">
                  {formatMonthYear(portfolio.endDate)}
                </p>
              )}
            </div>
          </div>
          {dateError && <p className="text-red-500 text-sm">{dateError}</p>}
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