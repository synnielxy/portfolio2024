"use client";
import { Environment } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Noise,
  Vignette
} from "@react-three/postprocessing";
import clsx from "clsx";
import React, { Suspense, useState, useEffect } from "react";
import { OrbitControls } from "@react-three/drei";
//Camera Position: Vector3 {x: -0.0003484217338598324, y: -0.12276436134790858, z: 0.3646121510502436}
//Camera Rotation: Euler {isEuler: true, _x: 0.3247761333028029, _y: -0.0009056388158811209, _z: 0.000304927172282712, _order: 'XYZ',
const CameraControls = () => {
  const { camera, gl } = useThree(); // 只能在 Canvas 提供的上下文内调用
  return (
    // <OrbitControls  />
    <OrbitControls
    enableZoom={true}
      args={[camera, gl.domElement]}
      onChange={() => {
        console.log("Camera Position:", camera.position); // 打印相机位置
        console.log("Camera Rotation:", camera.rotation); // 打印相机旋转
      }}
    />
  );
};

const RenderModel = ({ children, className }) => {
  return (
    <Canvas
    camera={{
      position: [-0.0003484217338598324, -0.12276436134790858, 0.3646121510502436],
      rotation: [0.3247761333028029, -0.0009056388158811209, 0.000304927172282712],
      fov: 70,
    }}
      // className={clsx("w-screen h-screen -z-10 relative", className)}
      shadows={false}
      dpr={[1, 2]}
      // dpr is the device pixel ratio. Here we are setting it to 1 and 2 for retina displays to prevent blurriness in the model rendering on high resolution screens.
    >
      <Suspense fallback={null}>{children}</Suspense>
      <Environment preset="dawn" />
      {/* <CameraControls /> */}
      <EffectComposer multisampling={0} disableNormalPass={true}>
        <DepthOfField
          focusDistance={0}
          focalLength={0.02}
          bokehScale={2}
          height={480}
        />
        <Bloom
          luminanceThreshold={0}
          luminanceSmoothing={0.9}
          height={300}
          opacity={.05}
        />
        <Noise opacity={0.025} />
        {/* <Vignette eskil={false} offset={0.1} darkness={1.1} /> */}
      </EffectComposer>
    </Canvas>
  );
};

export default RenderModel;
