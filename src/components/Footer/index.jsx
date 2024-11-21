import React from "react";
import Link from "@/common/Link";
const Index = () => {
  return (
    <div className="flex flex-col z-[2] ">
      <div className="w-full h-[1px] bg-black" />

      <div className="flex justify-between items-center px-6 md:px-10 lg:px-16 py-10">
        <div className="flex ">
          <div className="text-sm flex">
            <p>{`Fullstack Developer`}</p>
          </div>
          {/* <div className='ml-20'>San Jose, 00:20 PM PST</div> */}
        </div>

        <div className="flex text-sm gap-6">
          <Link name={"Email"} href={"mailto:li.xinyi8@northeastern.edu?subject=Hello"} />
          <Link name={"Linkedin"} href={"https://www.linkedin.com/in/synnie/"} />
          <Link name={"X"} href={"https://x.com/yi_xin50341"} />
        </div>
      </div>
    </div>
  );
};

export default Index;
