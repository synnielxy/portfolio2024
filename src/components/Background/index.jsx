"use client";
import React, { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import colors from "nice-color-palettes";
import vertexShader from "./shaders/vertexShader";
import fragmentShader from "./shaders/fragmentShader";

const Plane = () => {
  // 随机选择调色板并映射到 THREE.Color
  const numbers = [71, 1, 4, 9, 92, 47];
  const idx = 71; //numbers[Math.floor(Math.random() * 6)];
  const palette = colors[idx].map((color) => new THREE.Color(color));

  const meshRef = useRef();
  const { viewport } = useThree();
  const [planeSize, setPlaneSize] = useState([1, 1]); // 动态平面尺寸

  const uniforms = useRef({
    uTime: { value: 0.0 },
    uColor: { value: palette },
    resolution: { value: new THREE.Vector4() },
  });

  // 设置平面宽高为屏幕宽高的比例
  // useEffect(() => {
  //   const handleResize = () => {
  //     setPlaneSize([viewport.width, viewport.height]);
  //   };
  //   handleResize(); // 初始化
  //   console.log(planeSize)
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  useEffect(() => {
    console.log(idx); // 71好看
  }, [idx]);
  // }, [viewport, planeSize]);

  // 使用 useFrame 在每帧更新时更新时间
  useFrame(({ clock }) => {
    if (uniforms.current) {
      uniforms.current.uTime.value = clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[1.6, 1.6, 300, 300]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export default Plane;
