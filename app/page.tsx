import Image from "next/image";
import Hero from "./components/Home/Hero";
import PropertyListingSection3D from "./components/Home/PropertyListingSection";
import AboutUs from "./components/Home/AboutUs";
import Features from "./components/Home/Features";
import Developers from "./components/Home/Developers";
import Testimonials from "./components/Home/Testimonials";
import ServicesFan from "./components/Home/ServicesFan";
import DevelopersDesign from "./components/Home/DevelopersDesign";
import LeadForm from "./components/Home/LeadForm";
import Blogs from "./components/Home/Blogs";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutUs />
      <div>
        <PropertyListingSection3D />
      </div>
      <Features />
      <ServicesFan />
      {
        /*       <DevelopersDesign />
      */
      }      <LeadForm />
      <Testimonials />
      <Blogs />
    </>
  );
}
