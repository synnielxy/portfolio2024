import React from "react";

import { GoArrowUpRight } from "react-icons/go";
const Index = ({ name, href }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center text-center "
    >
      <p className="mr-2">{name}</p>
      <GoArrowUpRight />
    </a>
  );
};

export default Index;
