"use client";

import React, { useState } from "react";
import UploadSingleFile from "../globals/Fields/UploadSingleFile";

interface UploadPdfModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UploadPdfModal: React.FC<UploadPdfModalProps> = ({ isOpen, onClose }) => {
  const [values, setValues] = useState<{ pdf?: string }>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!values.pdf) {
      setErrors({ pdf: "PDF is required" });
      return;
    }

    setLoading(true);

    try {
      // 🔥 submit pdf key to backend
      await fetch(`${process.env.NEXT_PUBLIC_ADDRESS}/v1/submit-pdf`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pdf: values.pdf,
        }),
      });

      alert("PDF submitted successfully");
      onClose();
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">Upload PDF</h2>

        <UploadSingleFile
          values={values}
          setValues={setValues}
          errors={errors}
          name="pdf"
          folder="documents"
          label="Upload PDF"
          isRequired
        />

        {values.pdf && (
          <p className="text-sm mt-2 text-green-600">
            PDF uploaded successfully ✔
          </p>
        )}

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-primary text-white rounded disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadPdfModal;
