"use client";
import React, { useState, useEffect } from "react";
import { Inter, Inria_Serif } from "next/font/google";
import Head from "next/head";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import RenderModel from "@/components/RenderModel";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const inriaSerif = Inria_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  variable: "--font-inria-serif",
});

const inriaSerifNormal = Inria_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
  variable: "--font-inria-serif-normal",
});

const Plane = dynamic(() => import("@/components/Background"), {
  ssr: false,
});

const LoadingAnimation = ({ progress }) => (
  <div className="w-full h-screen flex items-center justify-center bg-[#FEF3E5] absolute top-0 left-0">
    <div className="relative w-full">
      <div
        className="loading-line"
        style={{
          width: `${progress}%`, // 线条宽度根据 progress 动态变化
          transform: "translateX(-50%)", // 确保线条中心对齐屏幕
        }}
      ></div>
    </div>
  </div>
);
export default function RootLayout({ children }) {
  const [viewportHeight, setViewportHeight] = useState("100vh");

  useEffect(() => {
    const updateHeight = () => {
      // 设置视口高度为实际窗口高度
      setViewportHeight(`${window.innerHeight}px`);
    };

    // 初始化高度
    updateHeight();

    // 监听窗口变化事件
    window.addEventListener("resize", updateHeight);

    return () => {
      // 清除事件监听
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // 控制加载动画是否显示

  useEffect(() => {
    const duration = 1000; // 2 秒
    const interval = 20; // 每 20ms 更新一次
    const increment = 100 / (duration / interval); // 每次增加的 progress

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev + increment >= 100) {
          clearInterval(timer); // 进度达到 100 时清除计时器
          return 100;
        }
        return prev + increment;
      });
    }, interval);

    // 停顿 1 秒后让动画消失
    if (progress === 100) {
      const timeout = setTimeout(() => setIsLoading(false), 1000); // 停顿 1 秒
      return () => clearTimeout(timeout); // 清除副作用
    }

    return () => clearInterval(timer); // 清除计时器
  }, [progress]);

  return (
    <html lang="en">
      <Head>
        <title>Synnie Li</title>
        <meta
          name="description"
          content="Explore Synnie Li's portfolio – a showcase of innovative projects, creative web designs, and technical expertise."
        />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <body
        className={`${inter.variable} ${inriaSerif.variable} ${inriaSerifNormal.variable}`}
      >
        <main
          className="font-sans flex w-screen overflow-hidden flex-col justify-between relative"
          style={{ height: viewportHeight }}
        >
          {isLoading && <LoadingAnimation progress={progress} />}
          <div className="w-full h-screen absolute -z-10">
            <RenderModel>
              <Plane />
            </RenderModel>
          </div>
          {!isLoading && (
            <>
              <Header />
              {children}
            </>
          )}
        </main>
      </body>
    </html>
  );
}
