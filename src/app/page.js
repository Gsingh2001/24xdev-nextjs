"use client";

import IntroSection from "@/components/IntroSection";
import { useTheme } from "./assets/ThemeContext";
import AboutSection from "@/components/AboutSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import CallToAction from "@/components/CallToAction";
import Features from "@/components/Features";
import Portfolio from "@/components/Portolio";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import IntroductionToCEO from "@/components/IntroductionToCEO";
import { ToastContainer } from "react-toastify";

export default function Home() {
  const { currentTheme } = useTheme();

  return (

    <>
     
      <IntroSection currentTheme={currentTheme} />
      <AboutSection currentTheme={currentTheme} />
      <WhyChooseUs currentTheme={currentTheme} />
      <CallToAction currentTheme={currentTheme} />
      <Features currentTheme={currentTheme} />
      <Portfolio currentTheme={currentTheme} />
      {/* <Pricing currentTheme={currentTheme} /> */}
      <FAQ currentTheme={currentTheme} />
      <Testimonials currentTheme={currentTheme} />
      <IntroductionToCEO currentTheme={currentTheme} />

    </>
  );
}
