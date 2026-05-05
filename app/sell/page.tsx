"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  ClipboardCheck,
  Search,
  Handshake,
  ShieldCheck,
  TrendingUp,
  FileText,
  ArrowRight,
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import Hero from "../components/Ui/Hero";
import SectionLabel from "../components/Ui/SectionLabel";
import EnquiryForm from "../components/EnquiryForm";

export default function page() {
  return (
    <>
      <Hero
        title={
          <>
            Sell your <br />
            <span className="italic text-gold-400"> Property</span>
          </>
        }
        image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80"
        label="List with us"
      />
      <SellSections />
      <section className="relative py-16 bg-[#faf9f7]">
        <div className="w-11/12 md:w-5/6 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            {/* LEFT INFO */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <p className="uppercase tracking-widest text-sm text-gold-500 mb-4 font-heading">
                LIST YOUR PROPERTY
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-900 mb-6">
                Let’s list your property
              </h2>
              <p className="text-gray-600 max-w-md mb-12">
                Partner with us to showcase your property to serious and
                verified buyers across Goa. From accurate pricing to premium
                marketing, we ensure your listing gets maximum visibility and
                the best possible value quickly and seamlessly.
              </p>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <MapPin className="text-navy-950 mt-1" />
                  <p>
                    RPH Realty <br />
                    Unit 402, <br />
                    Goa — 403001, India
                  </p>
                </div>

                <div className="flex gap-4">
                  <Phone className="text-navy-950 mt-1" />
                  <p>+91 98200 12345</p>
                </div>

                <div className="flex gap-4">
                  <Mail className="text-navy-950 mt-1" />
                  <p>info@royalprimehomes.com</p>
                </div>
              </div>
            </motion.div>

            {/* RIGHT FORM */}
            <motion.div
              className="bg-white p-10 md:p-6 shadow-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold mb-4">Send a Message</h3>

              <EnquiryForm
                variant="default"
                btnText="SEND MESSAGE"
                purpose={"sell"}
                source={"sell-page"}
              />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

const SellSections = () => {
  const processSteps = [
    {
      id: "01",
      title: "Share Your Details",
      desc: "Initiate the process through our digital portal or a private consultation to outline your property's unique profile.",
      icon: <ClipboardCheck className="w-6 h-6" />,
      image:
        "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=1174&auto=format&fit=crop",
    },
    {
      id: "02",
      title: "Property Evaluation",
      desc: "Our senior analysts conduct a deep-market audit, ensuring your asset is positioned for the highest possible valuation.",
      icon: <Search className="w-6 h-6" />,
      image:
        "https://plus.unsplash.com/premium_photo-1723874729884-bd2f5d3b58bd?w=600&auto=format&fit=crop&q=60",
    },
    {
      id: "03",
      title: "Close the Deal",
      desc: "Leverage our direct pipeline to global buyers. We manage the complexity of closing while you focus on your next move.",
      icon: <Handshake className="w-6 h-6" />,
      image:
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&auto=format&fit=crop&q=60",
    },
  ];

  return (
    <div className=" text-navy-900/70 selection:bg-gold-500/30">
      {/* SECTION 1: OUR SELLING PROCESS */}
      <section className="py-16 md:py-20 px-6 lg:px-14 relative overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-600/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4" />

        <div className="max-w-7xl mx-auto">
          <header className="mb-16 text-center">
            <SectionLabel>The Strategic Workflow</SectionLabel>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-6 text-4xl lg:text-5xl font-serif text-navy-900 leading-tight"
            >
              Our Selling <span className="italic text-gold-500">Process</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-4 text-charcoal-600 max-w-2xl mx-auto font-sans"
            >
              Discover handpicked luxury homes in Goa's most prestigious
              locations. Each property is carefully curated to match your
              lifestyle and aspirations.
            </motion.p>
          </header>

          <div className="space-y-4 max-w-4xl mx-auto">
            {processSteps.map((step, index) => (
              <ProcessRow key={step.id} step={step} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: WHY SELL WITH US? */}
      <section className="py-32 px-6 lg:px-14 bg-navy-900 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <header className="mb-16 text-center">
            <SectionLabel>Lets Market</SectionLabel>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-6 text-4xl lg:text-5xl font-serif text-white leading-tight"
            >
              Why Market <br />{" "}
              <span className="italic text-gold-500">With Us?</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-4 text-charcoal-600 text-white max-w-2xl mx-auto font-sans"
            >
              We don't just list properties; we engineer success through global
              reach and local precision.
            </motion.p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/10 rounded-3xl overflow-hidden">
            <BenefitCell
              icon={<ShieldCheck className="w-8 h-8" />}
              title="Trusted Network"
              desc="Exclusive access to UHNW individuals and institutional investment funds globally."
            />
            <BenefitCell
              icon={<TrendingUp className="w-8 h-8" />}
              title="Best Market Price"
              desc="Proprietary data analytics to capture the absolute apex of current market trends."
              highlight
            />
            <BenefitCell
              icon={<FileText className="w-8 h-8" />}
              title="Hassle-Free Process"
              desc="Our concierge legal team manages every document, ensuring a seamless transaction."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const ProcessRow = ({ step, index }: { step: any; index: any }) => {
  // Determine if the row is even or odd for alternating layout
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-50px" }}
      className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} 
        items-stretch justify-between gap-0 mb-12 last:mb-0 group overflow-hidden rounded-2xl shadow-xl`}
    >
      {/* Visual Section: Left or Right based on index */}
      <div className="w-full md:w-5/12 relative min-h-[250px] md:min-h-[320px] overflow-hidden">
        <img
          src={step.image}
          alt={step.title}
          className="absolute inset-0 w-full h-full object-cover scale-110 group-hover:scale-100 transition-all duration-1000 ease-out"
        />
        {/* Navy Overlay Wash */}

        {/* Floating Step Tag */}
        <div className={`absolute top-6 ${isEven ? "left-6" : "right-6"} z-10`}>
          <span className="px-4 py-2 bg-navy-950/80 backdrop-blur-md text-gold-400 font-mono text-[10px] tracking-[0.3em] rounded-full border border-gold-500/30">
            PHASE {step.id}
          </span>
        </div>
      </div>

      {/* Content Section: Alternates with Image */}
      <div className="w-full md:w-7/12 bg-navy-950 p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
        {/* Subtle Geometric Background Pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] rotate-45 translate-x-16 -translate-y-16 pointer-events-none" />

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, x: isEven ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="h-[1px] w-8 bg-gold-500" />
            <h3 className="text-2xl md:text-3xl font-light text-white tracking-tight">
              {step.title}
            </h3>
          </motion.div>

          <p className="text-white/50 text-sm md:text-base leading-relaxed font-light max-w-md group-hover:text-white/80 transition-colors duration-500">
            {step.desc}
          </p>

          {/* Premium Bottom Accent */}
          <div
            className={`mt-8 flex ${isEven ? "justify-start" : "justify-end"}`}
          >
            <div className="w-12 h-1 bg-gold-500/20 group-hover:w-24 group-hover:bg-gold-500 transition-all duration-700 rounded-full" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const BenefitCell = ({
  icon,
  title,
  desc,
  highlight,
}: {
  icon: any;
  title: any;
  desc: any;
  highlight?: any;
}) => (
  <div
    className={`p-12 md:p-16 flex flex-col items-start gap-8 border-white/10 ${highlight ? "bg-white/10 md:border-x" : ""} group hover:bg-white/5 transition-colors duration-500`}
  >
    <div className="text-gold-500 mb-4 group-hover:scale-110 transition-transform duration-500">
      {icon}
    </div>
    <div className="space-y-4">
      <h3 className="text-2xl font-semibold tracking-tight text-white">
        {title}
      </h3>
      <p className="text-white/40 font-light leading-relaxed">{desc}</p>
    </div>
  </div>
);
