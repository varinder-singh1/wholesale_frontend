import Image from "next/image";
import { useState } from "react";
import ImageModal from "./ImageModel";
type FieldSectionProps = {
  title: string;
  color: string;
  emoji: string;
  status: number;
  formData: Record<string, any>;
  labelMap: Record<string, string>;
  onFixRejected?: () => void;
  isRejected?: boolean;
};

const FieldSection = ({
  title,
  color,
  emoji,
  status,
  formData,
  labelMap,
  onFixRejected,
  isRejected = false,
}: FieldSectionProps) => {
  const [picshowModal, setPicshowModal] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState("");

  const getFieldsByStatus = (status: number) => {
 console.log(status,"this is status ")
console.log("ll",formData);


    return Object.entries(formData).filter(([_, field]) => field?.status === status);
  };

  const fields = getFieldsByStatus(status);
  if (fields.length === 0) return null;
  console.log(picshowModal,"this is model")
  const handleImageClick = (url: string) => {
    setModalImageUrl(url);
    setPicshowModal(true);
  };
  return (
    <>
      <h3 className={`text-xl font-semibold mb-4 text-${color}-600`}>
        {emoji} {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {fields.map(([key, field]) => (
          // key != "country" &&    key != "state" &&
          field.value && ![
            'id', 'uuid', 'status', 'created_at', 'updated_at',
            'deleted_at', 'createdAt', 'updatedAt', 'deletedAt',"device_detail"
          ].includes(key) &&
          <div key={key} className={`border border-${color}-500 p-4 rounded shadow-sm`}>
            <p className="text-sm text-gray-500">
              {labelMap[key] || key}{" "}
              <span className={`text-${color}-600`}>
                ({title})
              </span>
            </p>
            <div className="mt-1">
              {key === "shop_photo" ? (
                <Image
                onClick={() => handleImageClick(`${process.env.NEXT_PUBLIC_S3_IMG_URL}${field.value}`)}
                height={200}
                width={200}
                  src={`${process.env.NEXT_PUBLIC_S3_IMG_URL}${field.value}`}
                  alt="Shop Photo"
                  className="w-[150px] h-[80px] rounded-lg shadow-lg"
                />
              ) : (
                <p className="text-lg font-semibold">{["country","state"].includes(key)? field.value.name :  field.value}</p>
              )}
            </div>
            {field.description && field.status !== 1 && (
              <p className="mt-2 text-sm text-red-500 italic">Reason: {field.description}</p>
            )}
          </div>
        ))}
      </div>

      {isRejected && onFixRejected && (
        <div className="mt-6">
          <button
            onClick={onFixRejected}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Fix Rejected Fields
          </button>
        </div>
      )}
       <ImageModal
        isOpen={picshowModal}
        imageUrl={modalImageUrl}
        onClose={() => setPicshowModal(false)}
      />
    </>
  );
};

export default FieldSection;
