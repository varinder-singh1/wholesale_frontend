// components/ImageModal.tsx
import React from "react";
import Image from "next/image";
type ImageModalProps = {
  imageUrl: string;
  isOpen: boolean;
  onClose: () => void;
};

const ImageModal = ({ imageUrl, isOpen, onClose }: ImageModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="relative bg-white p-2 rounded-md shadow-lg max-w-[90vw] max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-black rounded-full px-2 py-1 hover:bg-gray-800"
        >
          ✕
        </button>
        <Image
        height={800}
        width={800}
          src={imageUrl}
          alt="Preview"
          className= "w-[350px] md:w-[700px] h-full object-contain rounded-md"
        />
      </div>
    </div>
  );
};

export default ImageModal;
