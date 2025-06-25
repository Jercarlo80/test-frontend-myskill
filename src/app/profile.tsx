import React, { useState } from "react";
import InputField from "@/components/inputField";
import { CiMinimize1 } from "react-icons/ci";

interface ProfileProps {
  onProfileChange: (field: string, value: string) => void;
}

export default function Profile({ onProfileChange }: ProfileProps) {
  const [nama, setNama] = useState("");
  const [title, setTitle] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);

  const handleChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    field: string,
    value: string
  ) => {
    setter(value);
    onProfileChange(field, value);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div
      className={`bg-white w-full max-w-[56.25rem] ${isMinimized ? "h-[5rem]" : "h-auto"} flex flex-col rounded-xl mt-6 p-4 transition-all duration-300`}
    >
      <div className="w-full flex flex-row justify-between items-center">
        <h1 className="text-base sm:text-lg underline font-semibold ml-2 sm:ml-2">
          Profile
        </h1>
        <button onClick={toggleMinimize}>
          <CiMinimize1
            className={`w-8 h-8 text-[#6C7074] ${isMinimized ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {!isMinimized && (
        <div className="flex flex-col gap-y-4 w-full mt-4">
          <InputField
            styleInputField="w-full h-[3.5rem] border border-[#919EAB] text-[#919EAB] underline px-4 rounded-lg"
            type="text"
            placeholder="Nama"
            value={nama}
            onChange={(e) => handleChange(setNama, "nama", e.target.value)}
            name="nama"
            required
          />
          <InputField
            styleInputField="w-full h-[3.5rem] border border-[#919EAB] text-[#919EAB] underline px-4 rounded-lg"
            type="text"
            placeholder="Title/Posisi"
            value={title}
            onChange={(e) => handleChange(setTitle, "title", e.target.value)}
            name="title"
            required
          />
          <InputField
            styleInputField="w-full h-[8rem] border border-[#919EAB] text-[#919EAB] underline px-4 pt-2 rounded-lg"
            type="textarea"
            placeholder="Deskripsi"
            value={deskripsi}
            onChange={(e) => handleChange(setDeskripsi, "deskripsi", e.target.value)}
            name="deskripsi"
            required
          />
        </div>
      )}
    </div>
  );
}