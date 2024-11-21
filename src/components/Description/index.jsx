"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { slideUp } from "./animation";
import gsap from "gsap";
import Button from "@/common/Button";
import Minimap from "@/components/Minimap";
import Link from "next/link";
import Image from "next/image";
import { projectsData } from "@/app/data";

const scaleAnimation = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  enter: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    opacity: 0,
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
  },
};

const MAX_MODALS = 5; // Maximum number of modals allowed
const ADD_INTERVAL = 200; // Minimum interval to add a modal (in ms)

const Index = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const debounceTimeout = useRef(null);
  let startY = 0;
  const handleScroll = (e) => {
    if (e.target.closest(".modal-class")) {
      // 如果滚动事件来源是 modal，则忽略
      return;
    }

    clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      const delta = e.deltaY;

      if (delta > 0) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % projectsData.length);
      } else if (delta < 0) {
        setCurrentIndex(
          (prevIndex) =>
            (prevIndex - 1 + projectsData.length) % projectsData.length
        );
      }
    }, 100); // 设置去抖时间（200ms）
  };

  const handleTouchStart = (e) => {
    startY = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const endY = e.changedTouches[0].clientY;
    const deltaY = startY - endY;
    console.log(currentIndex, projectsData.length);
    if (deltaY > 30) {
      // 向上滑动
      setCurrentIndex((prevIndex) => (prevIndex + 1) % projectsData.length);
    } else if (deltaY < -30) {
      // 向下滑动
      setCurrentIndex(
        (prevIndex) =>
          (prevIndex - 1 + projectsData.length) % projectsData.length
      );
    }
  };

  const currentProject = projectsData[currentIndex];

  const [visibleModals, setVisibleModals] = useState([]); // Store active modals
  const accumulatedDistance = useRef(0);
  const lastMousePosition = useRef({ x: 0, y: 0 });
  const lastAddTime = useRef(0); // Timestamp of the last added modal
  const nextId = useRef(0); // Unique ID for each modal

  // Mouse move handler
  const handleMouseMove = (e) => {
    const now = Date.now();
    const { x: prevX, y: prevY } = lastMousePosition.current;

    const dx = e.clientX - prevX;
    const dy = e.clientY - prevY;

    // Calculate distance
    const distance = Math.sqrt(dx * dx + dy * dy);
    accumulatedDistance.current += distance;

    if (
      accumulatedDistance.current >= 50 &&
      now - lastAddTime.current >= ADD_INTERVAL &&
      visibleModals.length < MAX_MODALS
    ) {
      const id = nextId.current++; // Generate unique ID for the modal
      const x = e.clientX;
      const y = e.clientY;
      // Add new modal to the list
      setVisibleModals((prev) => [
        ...prev,
        {
          id,
          x,
          y,
          image:
            projectsData[currentIndex].img[
              id % projectsData[currentIndex].img.length
            ],
        },
      ]);
      // Reset accumulated distance
      accumulatedDistance.current = 0;
      lastAddTime.current = now;
      // Remove the modal after 1 second
      setTimeout(() => {
        setVisibleModals((prev) => prev.filter((modal) => modal.id !== id));
      }, 500);
    }

    // Update last positions and time
    lastMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  useEffect(() => {
    // Initialize last mouse position
    lastMousePosition.current = { x: 0, y: 0 };

    accumulatedDistance.current = 0; // Reset distance
  }, []);

  // useEffect(() => {
  //   console.log(visibleModals);
  // }, [visibleModals]);

  return (
    <>
      <div
        className="flex-grow z-2 h-full flex flex-col md:flex-row justify-between items-center px-10 py-10 xs:px-16 lg:px-32"
        onWheel={handleScroll} // Attach the onWheel event
        onTouchStart={handleTouchStart} // 监听触摸开始
        onTouchEnd={handleTouchEnd} // 监听触摸结束
        onMouseMove={handleMouseMove}
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
                <Button href={`/projects/${currentProject.link}`}>OPEN</Button>
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
      <AnimatePresence>
        {visibleModals.map((modal, index) => (
          <motion.div
            key={modal.id}
            // ref={(el) => (modelRefs.current[index] = el)}
            variants={scaleAnimation}
            initial="initial"
            animate="enter"
            exit="closed"
            className="fixed pointer-events-none no-scroll modal-class"
            onScroll={(e) => e.stopPropagation()} // 阻止事件冒泡
            style={{
              width: "300px",
              aspectRatio: "3 / 2",
              left: modal.x,
              top: modal.y,
              zIndex: index, // Stagger z-index to create depth
            }}
          >
            <div className="w-full h-full flex items-center justify-center overflow-hidden rounded-xl">
              {/* <Image
              src={currentProject.img[index % currentProject.img.length]}
              width={150}
              height={150}
              alt={`image-${index}`}
            /> */}
              <img
                src={modal.image}
                alt={`image-${modal.id}`}
                className="object-cover w-full h-full" // 确保图片适配容器
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
};

export default Index;
