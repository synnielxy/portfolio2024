import React from "react";
import Link from "next/link";
const Index = () => {
  return (
    <div className="flex justify-between z-10 items-center px-6 md:px-10 lg:px-16 py-10">
      <div className="flex">
        <Link href="/">
          <div className="text-sm flex ">
            <p>SYNNIE LI</p>
          </div>
        </Link>
        {/* <div className='ml-20'>San Jose, 00:20 PM PST</div> */}
      </div>

      <div className="flex text-sm gap-6">
        <Link href="/">WORK</Link>
        <Link href="/about">ABOUT</Link>
      </div>
    </div>
  );
};

export default Index;
