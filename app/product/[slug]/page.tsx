 

import Detail from "@/components/product/DetailProduct";
import React from "react";

const page = () => {
  return (
    <div className="container mx-auto lg:p-6 p-2 ">
      <div className="mx-auto w-full  bg-white shadow-xl  rounded-lg lg:p-8 p-2">
        <Detail />

        {/* <RecommendedProducts title="Related Products" /> */}
      </div>
    </div>
  );
};

export default page;
