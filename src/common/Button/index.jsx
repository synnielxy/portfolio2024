import React from "react";
import Link from "next/link";

import { GoArrowUpRight } from "react-icons/go";

const Index = ({ href, children }) => {
  return (
    <Link href={href}>
      <button
        className="border
          border-black  py-1 px-4 rounded-lg flex items-center
            justify-between
           text-xs w-full "
      >
        <div className="">{children}</div>
        <p className="">
          <GoArrowUpRight />
        </p>
      </button>
    </Link>
  );
};

export default Index;
