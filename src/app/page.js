"use client";
import { useEffect } from "react";
import Footer from "@/components/Footer";
import Description from "@/components/Description";

export default function Home() {
  useEffect(() => {
    const preventScroll = (event) => {
      event.preventDefault();
    };

    window.addEventListener("wheel", preventScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", preventScroll);
    };
  }, []);
  return (
    <>
      <Description />

      <Footer />
    </>
  );
}
