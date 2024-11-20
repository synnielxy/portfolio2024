"use client";
import React, { useState } from "react";

import { motion } from "framer-motion";
import { slideUp } from "./animation";
import Button from "@/common/Button";
import Minimap from "@/components/Minimap";
import Link from "next/link";

import { projectsData } from "@/app/data";

const Index = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  let debounceTimeout;
  let startY = 0;
  const handleScroll = (e) => {
    clearTimeout(debounceTimeout); // 清除之前的计时器

    debounceTimeout = setTimeout(() => {
      const delta = e.deltaY;

      if (delta > 0 && currentIndex < projectsData.length - 1) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else if (delta < 0 && currentIndex > 0) {
        setCurrentIndex((prevIndex) => prevIndex - 1);
      }
    }, 100); // 设置去抖时间（200ms）
  };
  // 触摸开始
  const handleTouchStart = (e) => {
    startY = e.touches[0].clientY;
  };

  // 触摸结束
  const handleTouchEnd = (e) => {
    const endY = e.changedTouches[0].clientY;
    const deltaY = startY - endY;

    if (deltaY > 30 && currentIndex < projectsData.length - 1) {
      // 向上滑动
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else if (deltaY < -30 && currentIndex > 0) {
      // 向下滑动
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const currentProject = projectsData[currentIndex];

  return (
    <div
      className="flex-grow z-2 h-full flex flex-col md:flex-row justify-between items-center px-10 py-10 xs:px-16 lg:px-32"
      onWheel={handleScroll} // Attach the onWheel event
      onTouchStart={handleTouchStart} // 监听触摸开始
      onTouchEnd={handleTouchEnd} // 监听触摸结束
    >
      {/* Left Section */}
      <div className="flex">
        <div className="text-xs flex text-gray-500 italic">
          {/* 根据屏幕大小切换内容 */}
          <p className="hidden md:block">scroll</p>
          <p className="block md:hidden">swipe to explore</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-3/4 flex flex-col justify-between items-center">
        <div className="flex text-5xl md:text-6xl lg:text-7xl xl:text-8xl overflow-hidden h-[110px] cursor-pointer">
          <Link href={`/projects/${currentProject.link}`}>
            <motion.div
              key={currentIndex}
              initial="initial"
              animate="open"
              className="font-inria text-center"
              variants={slideUp}
              layoutId="shared-element"
            >
              {currentProject.title}
            </motion.div>
          </Link>
        </div>

        <div className="overflow-hidden">
          <motion.p
            key={`subtitle-${currentIndex}`}
            initial="initial"
            animate="open"
            custom={1}
            variants={slideUp}
            className="font-inria-normal text-xs text-gray-500 mt-3"
          >
            {currentProject.subTitle}
          </motion.p>
        </div>

        <div className="w-full flex flex-col items-center justify-center mt-6 text-sm md:flex-row md:justify-between">
          <div className="overflow-hidden w-full md:w-1/2">
            <motion.p
              key={`desc-${currentIndex}`}
              initial="initial"
              animate="open"
              custom={2}
              variants={slideUp}
              className="font-inria text-gray-500 text-center"
            >
              {currentProject.desc}
            </motion.p>
          </div>
          <div className="mt-6 overflow-hidden w-1/2 max-w-64 min-w-60 flex justify-center items-center">
            <motion.p
              key={`btn-${currentIndex}`}
              initial="initial"
              animate="open"
              custom={3}
              variants={slideUp}
              className="w-1/2"
            >
              <Button href={`/projects/${currentProject.link}`}>VISIT</Button>
              {/* <button
        className="border
          border-black  py-1 px-4 rounded-lg flex items-center
            justify-between
           text-xs w-full "
      >
        <div className="">xxx</div>
        <p className="">
          
        </p>
      </button> */}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className=" text-xs flex ml-auto md:ml-0 text-gray-500 italic ">
        <Minimap
          idx={currentIndex}
          total={projectsData.length}
          setCurrentIndex={setCurrentIndex}
        />
      </div>
    </div>
  );
};

export default Index;
