'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getuserList } from '@/store/actions/admin/usereqest';
import { useParams } from 'next/navigation';
const submittedData = {
  company_name: 'A',
  abn_acn: '123',
  contact_name: 'John Smith',
  country: 'Australia',
  state: 'Victoria',
  city: 'Melbourne',
  shop_photo: '',
};

const acceptedFields = ['contact_name', 'city'];

const rejectedFields = [
  { name: 'company_name', reason: 'Company name must be at least 3 characters.' },
  { name: 'abn_acn', reason: 'Invalid ABN format.' },
  { name: 'country', reason: 'Country is required.' },
  { name: 'state', reason: 'Please select a valid state.' },
  { name: 'shop_photo', reason: 'Image is blurry or not relevant.' },
];

const labelMap: Record<string, string> = {
  company_name: 'Company Name',
  abn_acn: 'ABN/ACN',
  contact_name: 'Contact Name',
  country: 'Country',
  state: 'State',
  city: 'City',
  shop_photo: 'Shop Photo',
};

const AcceptedAndRejectedFieldsPage = () => {

  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { uuid } = useParams();

  const fetchUserList = (uuid: string) => {
    dispatch(getuserList({uuid}));
  };

  useEffect(() => {
    if (uuid) {
      fetchUserList(uuid); 
    }
  }, [uuid]);
  const [formValues, setFormValues] = useState(
    rejectedFields.reduce((acc, field) => {
      acc[field.name] = submittedData[field.name] || '';
      return acc;
    }, {} as Record<string, string>)
  );
  useEffect(()=>{
    
  })
  const handleChange = (name: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log('Updated rejected values:', formValues);
    setShowModal(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 text-bla">
      <h2 className="text-3xl font-bold mb-6">Application Field Status</h2>

      {/* Accepted */}
      <h3 className="text-xl font-semibold mb-4 text-green-600">✅ Accepted Fields</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {acceptedFields.map((name) => (
          <div
            key={name}
            className="border border-green-500 p-4 rounded shadow-sm"
          >
            <p className="text-sm text-gray-500">
              {labelMap[name]} <span className="text-green-600">(Accepted)</span>
            </p>
            <p className="text-lg font-semibold mt-1">{submittedData[name]}</p>
          </div>
        ))}
      </div>

      {/* Rejected */}
      <h3 className="text-xl font-semibold mb-4 text-red-600">❌ Rejected Fields</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rejectedFields.map((field) => (
          <div
            key={field.name}
            className="border border-red-500 p-4 rounded shadow-sm"
          >
            <p className="text-sm text-gray-500">
              {labelMap[field.name]} <span className="text-red-600">(Rejected)</span>
            </p>
            <p className="text-lg font-semibold mt-1">
              {submittedData[field.name] || '—'}
            </p>
            <p className="mt-2 text-sm text-red-500 italic">
              Reason: {field.reason}
            </p>
          </div>
        ))}
      </div>

      {/* Fix Button */}
      <div className="mt-6">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Fix Rejected Fields
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-2xl rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Fix Rejected Fields</h2>
            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              {rejectedFields.map((field) => (
                <div key={field.name}>
                  <label className="block font-medium text-sm mb-1">
                    {labelMap[field.name]}
                  </label>
                  <input
                    type="text"
                    value={formValues[field.name]}
                    onChange={(e) =>
                      handleChange(field.name, e.target.value)
                    }
                    className="w-full border px-3 py-2 rounded"
                  />
                  <p className="text-xs text-red-500 mt-1 italic">
                    Reason: {field.reason}
                  </p>
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
