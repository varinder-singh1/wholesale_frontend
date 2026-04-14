"use client";

import React, { ChangeEvent, useMemo } from "react";
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
  customSetValue?: (name: string, val: string) => void;
  value?: string;
  label?: string;
  isRequired?: boolean;
}

const imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".bmp", ".svg", ".avif"];

const UploadSingleFile: React.FC<UploadSingleFileProps> = ({
  values,
  setValues,
  customClass,
  errors,
  name,
  folder,
  customSetValue,
  value,
  label,
  isRequired,
}) => {
  const updateValue = (newValue: string) => {
    if (customSetValue) {
      customSetValue(name, newValue);
    } else {
      setValues((prev: Record<string, any>) => ({
        ...prev,
        [name]: newValue,
      }));
    }
  };

  const filePath = value || values[name] || "";

  const fileUrl = useMemo(() => {
    if (!filePath) return "";
    return `${process.env.NEXT_PUBLIC_S3_IMG_URL}${filePath}`;
  }, [filePath]);

  const isImageFile = useMemo(() => {
    if (!filePath) return false;
    const lowerPath = filePath.toLowerCase();
    return imageExtensions.some((ext) => lowerPath.endsWith(ext));
  }, [filePath]);

  const fileName = useMemo(() => {
    if (!filePath) return "";
    return filePath.split("/").pop() || "Uploaded file";
  }, [filePath]);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_ADDRESS}/v1/upload?folder=${folder}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const uploadedKey = response?.data?.data?.data?.key;

      if (!uploadedKey) {
        toast.error("Upload succeeded but file path was not returned");
        return;
      }

      updateValue(uploadedKey);
      toast.success("File uploaded successfully");
    } catch (error) {
      console.error("File upload error:", error);
      toast.error("File was not uploaded");
    } finally {
      event.target.value = "";
    }
  };

  return (
    <div className={customClass || ""}>
      <label className="block mt-6 text-lg font-medium">
        {label || "Upload File"}
      </label>

      <div className="flex flex-col gap-3">
        <input
          type="file"
          // required={!!isRequired}
          onChange={handleFileChange}
          className="cursor-pointer w-full border-2 px-2 py-2 rounded focus:border-primary-300 focus:ring focus:ring-primary-200"
        />

        {filePath && (
          <div className="border rounded p-3 bg-gray-50">
            {isImageFile ? (
              <div className="flex items-start gap-3">
                <Image
                  width={100}
                  height={100}
                  src={fileUrl}
                  alt="Uploaded Preview"
                  className="w-20 h-20 object-cover rounded border"
                />
                <div className="flex flex-col">
                  <p className="text-sm font-medium break-all">{fileName}</p>
                  <a
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 underline"
                  >
                    View file
                  </a>
                </div>
              </div>
            ) : (
              <div className="flex flex-col">
                <p className="text-sm font-medium break-all">{fileName}</p>
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 underline"
                >
                  Open uploaded file
                </a>
              </div>
            )}
          </div>
        )}
      </div>

      {errors[name] && <p className="text-red-500 mt-1">{errors[name]}</p>}
    </div>
  );
};

export default UploadSingleFile;