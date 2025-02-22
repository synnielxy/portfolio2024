import React from "react";
import Link from "next/link";

import { GoArrowUpRight } from "react-icons/go";

const Index = ({ href, onClick, children, newtab=false }) => {
  const content = (
    <button
      className="border border-black py-1 px-4 rounded-lg flex items-center justify-between text-xs w-full"
      onClick={onClick}
    >
      <div className="">{children}</div>
      <p className="">
        <GoArrowUpRight />
      </p>
    </button>
  );

  return href ? (
    <Link href={href} passHref legacyBehavior>
      <a
        target={newtab ? "_blank" : undefined}
        rel={newtab ? "noopener noreferrer" : undefined}
      >
        {content}
      </a>
    </Link>
  ) : (
    content
  );
};

export default Index;
