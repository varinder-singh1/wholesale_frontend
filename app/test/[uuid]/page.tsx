'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { getuserList, updateUser } from '@/store/actions/admin/usereqest';
import { useParams } from 'next/navigation';
import { WHOLESALE_REQUEST_STATUS } from '@/app/constants';
import FixRejectedFieldsModal from '@/components/wholesale/FixRejectedFieldsModal';
import FieldSection from '@/components/wholesale/FieldSection';

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

  const [formData, setFormData] = useState<Record<string, any>>({});
  const [showModal, setShowModal] = useState(false);
  const fetchData = async () => {
    const res = await dispatch(getuserList({ uuid }));
    const result = (res?.payload as any)?.data?.result;
    if (!result) return;

    const excludedKeys = new Set([
      'id', 'uuid', 'status', 'created_at', 'updated_at',
      'deleted_at', 'createdAt', 'updatedAt', 'deletedAt',
    ]);

    const newData = Object.entries(result).reduce((acc, [key, entry]: any) => {
      if (
        excludedKeys.has(key) ||
        !entry ||
        typeof entry !== 'object' ||
        !('status' in entry)
      ) {
        return acc;
      }

      const rawValue = entry.value;
      const value = typeof rawValue === 'object' && rawValue?.name
      ? rawValue.name
      : rawValue || '';
      console.log(key ,entry.value,"value")

      acc[key] = {
        value,
        status: entry.status,
        reason: entry.reason || 'Field rejected by admin.',
      };
      console.log(acc,
        'cc'
      )
      return acc;
    }, {} as Record<string, any>);

    setFormData(newData);
  };



  useEffect(() => {
    if (!uuid) return;
    fetchData();
  }, [uuid, dispatch]);
 
  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        value,
      },
    }));
  };

  const handleSubmit = async () => {
    const updatedPayload = Object.fromEntries(
      Object.entries(formData).map(([key, field]) => [
        key,
        {
          value: field.value,
          status: field.status === WHOLESALE_REQUEST_STATUS.rejected && field.originalValue !== field.value
            ? WHOLESALE_REQUEST_STATUS.in_progress
            : field.status,
        },
      ])
    );
    console.log(updatedPayload,'dada in payload')
    const res = await dispatch(updateUser({ uuid, data: updatedPayload }));
    if (res?.payload?.success) setShowModal(false);
  };


  const getFieldsByStatus = (status: number) => {
    return Object.entries(formData).filter(([_, field]) => field.status === status);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 text-black">
      <h2 className="text-3xl font-bold mb-6">Wholesale Application Field Status</h2>

      {/* Accepted Fields */}
      <FieldSection
        title="Accepted Fields"
        emoji="✅"
        color="green"
        status={WHOLESALE_REQUEST_STATUS.approved}
        formData={formData}
        labelMap={labelMap}
      />

      {/* In Progress Fields */}
      <FieldSection
        title="In Progress Fields"
        emoji="🟡"
        color="yellow"
        status={WHOLESALE_REQUEST_STATUS.in_progress}
        formData={formData}
        labelMap={labelMap}
      />

      {/* Rejected Fields */}
      <FieldSection
        title="Rejected Fields"
        emoji="❌"
        color="red"
        status={WHOLESALE_REQUEST_STATUS.rejected}
        formData={formData}
        labelMap={labelMap}
        isRejected
        onFixRejected={() => setShowModal(true)}
      />

      {/* Modal */}
      <FixRejectedFieldsModal
        show={showModal}
        setShow={setShowModal}
        formData={formData}
        setFormData={setFormData}
        labelMap={labelMap}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

    </div>
  );
};

export default AcceptedAndRejectedFieldsPage;
