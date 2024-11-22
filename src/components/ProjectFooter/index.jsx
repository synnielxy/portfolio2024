import React from "react";
import Link from "next/link";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

const Index = ({ projects }) => {
  return (
    <div className="flex justify-between py-10 px-6 md:px-10 lg:px-16 z-10">
      {projects.previous && (
        <Link href={projects.previous || ""}>
          <div className="flex flex-col">
            <div className="text-sm flex">
              <p>Previous Project</p>
            </div>
            <GoArrowLeft />
          </div>
        </Link>
      )}
      {projects.next && (
        <Link
          href={projects.next || ""}
          className={`flex flex-col ${
            !projects.previous ? "ml-auto" : "" // 如果没有 previous，右对齐
          }`}
        >
          <div className="flex flex-col items-end">
            <div className="text-sm flex">
              <p>Next Project</p>
            </div>
            <GoArrowRight />
          </div>
        </Link>
      )}
    </div>
  );
};

export default Index;
