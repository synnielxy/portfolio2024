"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { slideUp } from "./animation";
import { gsap } from "gsap";
import Button from "@/common/Button";

import Link from "@/common/Link";
const skills = [
  "Three.js",
  "Next.js",
  "GLSL",
  "Firebase",
  "React",
  "Node.js",
  "Express",
  "D3.js",
  "Typescript",
  "Redux",
  "Photoshop",
  "After Effects",
  "Blender",
  "Serverless",
  "Docker",
  "Nginx",
  "AWS",
];
const Index = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    // 使用 GSAP 创建上下浮动的动画
    gsap.to(imageRef.current, {
      y: -10, // 上移的距离
      duration: 2, // 动画持续时间
      repeat: -1, // 无限循环
      yoyo: true, // 动画回弹（上下浮动）
      ease: "power1.inOut", // 缓动效果
    });
  }, []);
  return (
    <div className="h-full relative w-full flex items-center justify-center pt-36 md:pt-0">
      <div className="md:h-screen sticky flex flex-col pl-3 w-10/12 md:w-full md:pl-24 md:max-w-[800px] md:mt-36">
        <div className="flex text-5xl md:text-6xl lg:text-7xl xl:text-8xl  pb-3 cursor-pointer">
          <motion.div layoutId="shared-element" className="font-inria">
            About Synnie
          </motion.div>
        </div>
        <div className="overflow-hidden ">
          <motion.p
            initial="initial"
            animate="open"
            custom={2}
            variants={slideUp}
            className="font-inria text-gray-500"
          >
            Full stack developer with experience in designing and building immersive web experiences. 
            Skilled in both front-end and back-end development, with a focus on WebGL, React, and serverless technologies.
          </motion.p>
        </div>
        <div className="mt-3 md:mt-6">
          <div className="overflow-hidden ">
            <motion.p
              initial="initial"
              animate="open"
              custom={3}
              variants={slideUp}
              className="text-sm"
            >
              SKILLS
            </motion.p>
          </div>
          <div className="overflow-hidden">
            <motion.p
              initial="initial"
              animate="open"
              custom={3}
              variants={slideUp}
              className="text-sm text-gray-500 space-x-1 flex flex-wrap"
            >
              {skills.map((skill, index) => (
                <span key={index} className="">{skill}</span>
              ))}
            </motion.p>
          </div>
        </div>
        {/* <Button href={`/projects/`}>Resume</Button> */}
        <div className="overflow-hidden ">
          <motion.div
            initial="initial"
            animate="open"
            custom={4}
            variants={slideUp}
            className="flex flex-col text-sm gap-3 mt-12"
          >
            <Link
              name={"Email"}
              href={"mailto:li.xinyi8@northeastern.edu?subject=Hello"}
            />
            <Link
              name={"Linkedin"}
              href={"https://www.linkedin.com/in/synnie/"}
            />
            <Link name={"X"} href={"https://x.com/yi_xin50341"} />
          </motion.div>
        </div>
      </div>

      <div
        ref={imageRef}
        className="absolute top-[20px] left-[50%] md:top-1/2 md:left-[60%] w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 rounded-full overflow-hidden"
      >
        <img
          src="/images/pic.png"
          alt="Example"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default Index;
