"use client";

import React from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import Image from "next/image";

interface UploadSingleFileProps {
  values: Record<string, any>;
  setValues: React.Dispatch<React.SetStateAction<any>>;
  customClass?: string;
  errors: Record<string, string>;
  name: string;
  folder: string;
  customSetValue?: (name :string, val: string) => void;
  value?: string;
}

const UploadSingleFile: React.FC<UploadSingleFileProps> = ({
  values,
  setValues,
  customClass,
  errors,
  name,
  folder,
  customSetValue, // Optional prop
  value,
}) => {
  const updateValue = (value: string) => {
    if (customSetValue) {
      customSetValue(name, value);
    } else {
      setValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formDat = new FormData();
    formDat.append("file", file);
    formDat.append("folder,", folder);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_ADDRESS}/v1/upload?folder=${folder}`,
        formDat,

        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success("Image uploaded successfully");
      updateValue(response.data?.data?.data?.key);
    } catch {
      toast.error("Image is not uploaded");
    }
  };

  return (
    <div className={customClass || ""}>
      <label className="block mt-6 text-lg font-medium">Image</label>
      <div className="flex items-center gap-2">
        <input
          type="file"
          onChange={handleFileChange}
          accept=".jpg,.jpeg,.png,.webp"
          className="cursor-pointer w-full border-2 px-2 py-1 rounded focus:border-primary-300 focus:ring focus:ring-primary-200"
        />
        {values[name] && (
          <Image
            width={100}
            height={100}
            src={process.env.NEXT_PUBLIC_S3_IMG_URL + ( value ? value : values[name])}
            alt="Uploaded Preview"
            className="w-16 h-auto object-cover rounded border"
          />
        )}
      </div>
      {errors[name] && <p className="text-red-500 mt-1">{errors[name]}</p>}
    </div>
  );
};

export default UploadSingleFile;
