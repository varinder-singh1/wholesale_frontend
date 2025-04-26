import React from "react";
import Image from "next/image";

interface InfoCardProps {
  title: string;
  icon: any;
  value?: any;  // Optional since not all cards might have an image
}

const InfoCard: React.FC<InfoCardProps> = ({ title, icon, value }) => (
  <div
 
  className="bg-white p-4 sm:p-6 rounded-lg shadow flex items-center gap-4"
>
  <div className="text-2xl sm:text-3xl">{icon}</div>
  <div>
    <p className="text-sm sm:text-base text-gray-600">{title}</p>
    <h3 className="text-lg sm:text-2xl font-semibold">
      {value}
    </h3>
  </div>
</div>
);

export default InfoCard;
