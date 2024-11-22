"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { slideUp } from "./animation";
import Button from "@/common/Button";
import { projectsData } from "@/app/data";

import ProjectFooter from "@/components/ProjectFooter";
import { useEffect, useState } from "react";
// export const metadata = {
//   title: "Projects ",
// };

export default function ProjectPage({ params }) {
  const { id } = params;
  const [viewing, setViewing] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  function getProjectById(id) {
    const project = projectsData.find((item) => item.link === id);
    return project ? project : null; // 如果未找到，返回 null
  }

  function findAdjacentLinks(projects, currentLink) {
    // 找到当前项目的索引
    const currentIndex = projects.findIndex(
      (project) => project.link === currentLink
    );

    // 如果未找到，返回 null
    if (currentIndex === -1) {
      return { previous: null, next: null };
    }

    // 获取上一个和下一个项目
    const previous = currentIndex > 0 ? projects[currentIndex - 1].link : null;
    const next =
      currentIndex < projects.length - 1
        ? projects[currentIndex + 1].link
        : null;

    return { previous, next };
  }

  const project = getProjectById(id);
  const adjacentLinks = findAdjacentLinks(projectsData, id);

  const projectDetails = [
    { label: "ROLE", value: project.role },
    { label: "CLIENT", value: project.client },
    { label: "DATE", value: project.date },
    {
      label: "TECHNOLOGIES",
      value: project.technologies.join(", "),
    },
  ];

  return (
    <>
      <div className=" md:absolute w-full h-1/2 md:h-screen flex flex-col md:flex-row z-1  px-10 md:px-16">
        <div className="md:h-screen sticky flex flex-col md:w-1/3 md:mt-24">
          <div className="flex text-5xl md:text-6xl lg:text-7xl xl:text-8xl overflow-hidden pb-3 cursor-pointer">
            <motion.div
              layoutId="shared-element"
              // initial="initial"
              // animate="open"
              // className={inriaSerif.className}
              // variants={slideUp}
              className="font-inria"
            >
              {project.title}
            </motion.div>
          </div>
          <div className="overflow-hidden ">
            <motion.p
              initial="initial"
              animate="open"
              custom={2}
              variants={slideUp}
              className="font-inria text-gray-500 max-w-[300px]"
            >
              {project.desc}
            </motion.p>
          </div>
          <div className="overflow-hidden max-w-64 min-w-60 flex mt-6 mb-6 ">
            <motion.p
              initial="initial"
              animate="open"
              custom={3}
              variants={slideUp}
              className=""
            >
              <Button href={project.url}>VISIT</Button>
            </motion.p>
          </div>
        </div>
        <div className="space-y-6 w-full max-w-[800px] p-12 overflow-y-scroll left-0 right-0 hide-scrollbar hidden md:block">
          {project.img.map((img, index) => {
            return (
              <div
                key={index}
                className=" aspect-w-3 aspect-h-2 md:aspect-w-6 md:aspect-h-3 overflow-hidden rounded-xl cursor-pointer"
              >
                <Image
                  src={img}
                  alt={`Project image ${index}`}
                  fill
                  className="object-cover"
                  onClick={(e) => {
                    setViewing(true);
                    setImageSrc(img);
                  }}
                />
              </div>
            );
          })}
        </div>
        <div className="md:h-[400px] flex flex-col  md:grid-cols-1 md:w-1/3 min-w-[210px] md:mt-24 ">
          <div className="overflow-y-hidden flex mx-auto">
            <motion.div
              className="font-inria  items-center hidden md:flex"
              layoutId="shared-title"
            >
              <p className="text-5xl md:text-6xl lg:text-7xl ">0{project.id}</p>
              <p className="text-gray-500 px-3">/</p>
              <p className="text-5xl md:text-6xl lg:text-7xl ">06</p>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-1 gap-4 md:mx-auto mt-3">
            {projectDetails.map((detail, index) => (
              <div key={index} className={`overflow-hidden flex items-start`}>
                <motion.div
                  initial="initial"
                  animate="open"
                  custom={4 + index}
                  variants={slideUp}
                  className=""
                >
                  <p className="text-sm">{detail.label}</p>
                  <p className="text-sm text-gray-500">
                    {detail.label === "TECHNOLOGIES" ? (
                      <span className="inline-flex gap-1 md:gap-2 flex flex-wrap">
                        {project.technologies.map((tech, techIndex) => (
                          <span key={techIndex}>{tech}</span>
                        ))}
                      </span>
                    ) : (
                      detail.value
                    )}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="h-1/2 flex p-12 hide-scrollbar md:hidden overflow-x-scroll overflow-y-hidden space-x-4">
        {project.img.map((img, index) => (
          <div
            key={index}
            className="flex-shrink-0 relative overflow-hidden rounded-xl cursor-pointer"
            style={{ width: "60vw", aspectRatio: "3 / 2" }}
          >
            <Image
              src={img}
              alt={`Project image ${index}`}
              fill
              className="object-cover"
              onClick={(e) => {
                setViewing(true);
                setImageSrc(img);
              }}
            />
          </div>
        ))}
      </div>

      <ProjectFooter projects={adjacentLinks} />

      <div
        className={"lightbox" + (viewing ? ` active` : "")}
        onClick={() => setViewing(false)}
      >
        <Image
          src={imageSrc}
          alt="lightbox of selected image"
          className="img"
          layout="responsive"
          width={800}
          height={600}
          quality={100} 
          sizes="(max-width: 768px) 100vw, 50vw"
          objectFit="contain" 
        />
      </div>
    </>
  );
}
