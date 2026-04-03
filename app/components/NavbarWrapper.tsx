"use client";

import { useEffect, useState } from "react";
import Navbar from "./Navbar";

export default function NavbarWrapper() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <Navbar scrolled={scrolled} />;
}