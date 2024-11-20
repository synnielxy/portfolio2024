import React from "react";

const Minimap = ({ idx, total, setCurrentIndex }) => {
  return (
    <div className="flex flex-col gap-2 items-end md:items-center w-10">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-[1px] transition-all ease-in-out duration-300 cursor-pointer bg-black ${
            i === idx ? "w-8 " : "w-4 "
          }`}
          onClick={() => setCurrentIndex(i)}
        />
      ))}
    </div>
  );
};

export default Minimap;
