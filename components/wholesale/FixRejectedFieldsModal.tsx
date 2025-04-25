"use client";

import React from "react";
import UploadSingleFile from "@/components/globals/Fields/UploadSingleFile";
import { WHOLESALE_REQUEST_STATUS } from "@/app/constants";
import { CountrySelect, StateSelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

interface FixRejectedFieldsModalProps {
  show: boolean;
  setShow: (val: boolean) => void;
  formData: Record<string, any>;
  setFormData: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  labelMap: Record<string, string>;
  handleChange: (name: string, value: any) => void;
  handleSubmit: () => void;
}

const FixRejectedFieldsModal: React.FC<FixRejectedFieldsModalProps> = ({
  show,
  setShow,
  formData,
  setFormData,
  labelMap,
  handleChange,
  handleSubmit,
}) => {
  const getRejectedFields = () =>
    Object.entries(formData).filter(
      ([_, field]) => field?.status != WHOLESALE_REQUEST_STATUS.approved
    );

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Fix Rejected Fields</h2>
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          {getRejectedFields().map(
            ([key, field]) =>
              // key != "country" &&
              // key != "state" &&
              field?.value &&
              ![
                "id",
                "uuid",
                "status",
                "created_at",
                "updated_at",
                "deleted_at",
                "createdAt",
                "updatedAt",
                "deletedAt",
                "device_detail",
              ].includes(key) && (
                <div key={key}>
                  <label className="block font-medium text-sm mb-1">
                    {labelMap[key] || key}
                  </label>
                  {key === "shop_photo" ? (
                    <UploadSingleFile
                      value={formData["shop_photo"]?.value}
                      customSetValue={handleChange}
                      name="shop_photo"
                      customClass="col-span-2"
                      values={formData}
                      setValues={setFormData}
                      errors={{}}
                      folder="wholesalerequest"
                    />
                  ) : key == "country" || key == "state" ? (
                    <>
                    {key == "country" &&
                      <div>
                      <label className="block text-lg font-medium mb-1">
                        Country
                      </label>
                      <CountrySelect
                               defaultValue ={field?.value}
                        inputClassName="w-full h-10 px-3 border rounded"
                        onChange={(e) => {
                          const t = {
                            id: e.id,
                            name: e.name,
                            iso3: e.iso3,
                            iso2: e.iso2,
                          };
                          handleChange(key, t);
                          // setF((prev) => ({
                          //   ...prev,
                          // country: e.name,
                          // country_iso2: e.iso2,
                          // country_iso3: e.iso3,
                          //   country: {
                          //     id: e.id,
                          //     name: e.name,
                          //     iso3: e.iso3,
                          //     iso2: e.iso2,
                          //   },
                          // }));
                        }}
                        placeHolder="Select Country"
                      />
                    </div>
                    }
                       {key == "state" &&
                      <div>
                      <label className="block text-lg font-medium mb-1">
                        Country
                      </label>
                      <StateSelect
                       countryid={formData["country"]?.value?.id}
                               defaultValue ={field?.value}
                        inputClassName="w-full h-10 px-3 border rounded"
                        onChange={(e) => {
                          const t = {id:e.id,name:e.name,state_code:e.state_code};
                          handleChange(key, t);
                        
                        }}
                        placeHolder="Select Country"
                      />
                    </div>
                    }
                    
                    </>
                  ) : (
                    <input
                      type="text"
                      value={field?.value}
                      onChange={(e) => handleChange(key, e.target.value)}
                      className="w-full border px-3 py-2 rounded"
                    />
                  )}
                  <p className="text-xs text-red-500 mt-1 italic">
                    Reason: {field?.reason}
                  </p>
                </div>
              )
          )}
        </div>

        <div className="flex justify-end mt-6 gap-3">
          <button
            onClick={() => setShow(false)}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Submit Corrections
          </button>
        </div>
      </div>
    </div>
  );
};

export default FixRejectedFieldsModal;
