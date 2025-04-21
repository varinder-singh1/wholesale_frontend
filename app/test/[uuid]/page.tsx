'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { getuserList, updateUser } from '@/store/actions/admin/usereqest';
import { useParams } from 'next/navigation';
import UploadSingleFile from '@/components/globals/Fields/UploadSingleFile';
import Image from 'next/image';
import { WHOLESALE_REQUEST_STATUS } from '@/app/constants';


const labelMap: Record<string, string> = {
  company_name: 'Company Name',
  buisness_trading_name: 'Business Trading Name',
  abn_acn: 'ABN/ACN',
  contact_name: 'Contact Name',
  country: 'Country',
  state: 'State',
  city: 'City',
  street_address: 'Street Address',
  postcode: 'Postcode',
  phone: 'Phone',
  account_payable_email: 'Payable Email',
  name_of_social_media_channel: 'Social Media Channel',
  facebook: 'Facebook',
  youtube: 'YouTube',
  x: 'X (Twitter)',
  tiktok: 'TikTok',
  last_year_turn_over: 'Last Year Turnover',
  no_of_employee: 'No of Employees',
  current_method_of_sales: 'Current Method of Sales',
  website: 'Website',
  ebay_and_other_ecommerce_platform: 'eBay / Other Platforms',
  website_url: 'Website URL',
  shop_photo: 'Shop Photo',
};

const AcceptedAndRejectedFieldsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { uuid } = useParams() as { uuid: string };
  const [showModal, setShowModal] = useState(false);
  const [submittedData, setSubmittedData] = useState<Record<string, any>>({});
  const [acceptedFields, setAcceptedFields] = useState<string[]>([]);
  const [rejectedFields, setRejectedFields] = useState<{ name: string; reason: string }[]>([]);
  const [inProgressFields, setInProgressFields] = useState<string[]>([]);
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const fetchData = async () => {
    const res = await dispatch(getuserList({uuid}));
    const result = (res?.payload as any)?.data?.result;

    if (!result) return;

    const accepted: string[] = [];
    const rejected: { name: string; reason: string }[] = [];
    const inProgress: string[] = [];
    const formVals: Record<string, string> = {};
    const displayVals: Record<string, any> = {};

    Object.entries(result).forEach(([key, entry]: any) => {
      if (
        ['id', 'uuid', 'status', 'created_at', 'updated_at', 'deleted_at', 'createdAt', 'updatedAt', 'deletedAt'].includes(key)
      )
        return;

      if (!entry || typeof entry !== 'object' || !('status' in entry)) return;

      let value = entry.value;

      if (typeof value === 'object' && value?.name) {
        value = value.name;
      }

      if (entry.status === WHOLESALE_REQUEST_STATUS.approved) {
        accepted.push(key);
        displayVals[key] = value || '';
      } else if (entry.status === WHOLESALE_REQUEST_STATUS.rejected) {
        rejected.push({ name: key, reason: 'Field rejected by admin.' });
        formVals[key] = value || '';
        displayVals[key] = value || '';
      } else if (entry.status === WHOLESALE_REQUEST_STATUS.pending) {
        displayVals[key] = value || '';
      } else if (entry.status === WHOLESALE_REQUEST_STATUS.in_progress) {
        inProgress.push(key);
        displayVals[key] = value || '';
      }
    });

    setAcceptedFields(accepted);
    setRejectedFields(rejected);
    setInProgressFields(inProgress);
    setFormValues(formVals);
    setSubmittedData(displayVals);
  };
  useEffect(() => {
    if (!uuid) return;
    fetchData();
  }, [uuid, dispatch]);

  const handleChange = (name: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const combinedData: Record<string, { value: string; status: number }> = {};

    acceptedFields.forEach((key) => {
      combinedData[key] = {
        value: submittedData[key],
        status: WHOLESALE_REQUEST_STATUS.approved,
      };
    });

    rejectedFields.forEach((field) => {
      const currentValue = formValues[field.name] || '';
      const originalValue = submittedData[field.name];
      const hasChanged = currentValue !== originalValue;

      combinedData[field.name] = {
        value: currentValue,
        status: hasChanged ? WHOLESALE_REQUEST_STATUS.in_progress : WHOLESALE_REQUEST_STATUS.rejected,
      };
    });

    try {
      const res = await dispatch(updateUser({ uuid, data: combinedData }));
      if ((res?.payload as any)?.success) {
        // alert('Update successful!');
        setShowModal(false);
      } else {
        // alert('Something went wrong while updating.');
      }
    } catch (err) {
      console.error('Error updating user:', err);
      alert('An error occurred while submitting the form.');
    }
  };

  

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 text-black">
      <h2 className="text-3xl font-bold mb-6">Wholesale Application Field Status</h2>

      {/* Accepted Fields */}
      {acceptedFields.length > 0 && (
  <>
    <h3 className="text-xl font-semibold mb-4 text-green-600">✅ Accepted Fields</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
    {acceptedFields.map((name) => (
  <div key={name} className="border border-green-500 p-4 rounded shadow-sm">
    <p className="text-sm text-gray-500">
      {labelMap[name] || name} <span className="text-green-600">(Accepted)</span>
    </p>
    <div className="mt-1">
      {name === 'shop_photo' ? (
        <>
        {console.log(submittedData[name] ,"res")}
         <img
          src={`${process.env.NEXT_PUBLIC_S3_IMG_URL}${submittedData[name]}`}
          alt="Shop Photo"
          className="w-full h-full rounded-lg shadow-lg"
        />
        </>
       
      ) : (
        <p className="text-lg font-semibold">{submittedData[name]}</p>
      )}
    </div>
  </div>
))}

    </div>
  </>
)}

  {inProgressFields.length > 0 && (
        <>
          <h3 className="text-xl font-semibold mb-4 text-yellow-600">🟡 In Progress Fields</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {inProgressFields.map((name) => (
              <div key={name} className="border border-yellow-500 p-4 rounded shadow-sm">
                <p className="text-sm text-gray-500">
                  {labelMap[name] || name} <span className="text-yellow-600">(In Progress)</span>
                </p>
                <p className="text-lg font-semibold mt-1">{submittedData[name] || '—'}</p>
              </div>
            ))}
          </div>
        </>
      )}
      {/* Rejected Fields */}
      {rejectedFields.length > 0 && (
        <>
          <h3 className="text-xl font-semibold mb-4 text-red-600">❌ Rejected Fields</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rejectedFields.map((field) => (
              <div key={field.name} className="border border-red-500 p-4 rounded shadow-sm">
                <p className="text-sm text-gray-500">
                  {labelMap[field.name] || field.name} <span className="text-red-600">(Rejected)</span>
                </p>
                <p className="text-lg font-semibold mt-1">{submittedData[field.name] || '—'}</p>
                <p className="mt-2 text-sm text-red-500 italic">Reason: {field.reason}</p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Fix Rejected Fields
            </button>
          </div>
        </>
      )}

      {/* In Progress Fields */}
    

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-2xl rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Fix Rejected Fields</h2>
            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              {rejectedFields.map((field) => (
                <div key={field.name}>
                  <label className="block font-medium text-sm mb-1">
                    {labelMap[field.name] || field.name}
                  </label>

                  {field.name === 'shop_photo' ? (
                    <UploadSingleFile
                      name="shop_photo"
                      customClass="col-span-2"
                      values={formValues}
                      setValues={setFormValues}
                      errors={{}}
                      folder="wholesalerequest"
                    />
                  ) : (
                    <input
                      type="text"
                      value={formValues[field.name]}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      className="w-full border px-3 py-2 rounded"
                    />
                  )}

                  <p className="text-xs text-red-500 mt-1 italic">Reason: {field.reason}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-6 gap-3">
              <button
                onClick={() => setShowModal(false)}
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
      )}
    </div>
  );
};

export default AcceptedAndRejectedFieldsPage;
