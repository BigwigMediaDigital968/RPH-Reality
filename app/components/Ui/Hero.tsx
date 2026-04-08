import Image from "next/image";
import { motion } from "framer-motion";
import SectionLabel from "./SectionLabel";

export default function Hero({
    title,
    image,
    label
}: {
    title: React.ReactNode,
    image: string,
    label: string
}) {
    return (
        <>
            <section className="relative h-[30vh] sm:h-[60vh] flex items-center justify-center overflow-hidden">
                <Image
                    src={image}
                    alt="Luxury Office"
                    fill
                    className="object-cover"
                    unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-b from-navy-700/40 to-navy-700/60" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10 text-center space-y-4 mt-10 sm:mt-0"
                >
                    <SectionLabel>{label}</SectionLabel>
                    <h1 className="text-3xl sm:text-5xl md:text-7xl text-white font-bold font-display tracking-tight">
                        {title}
                    </h1>
                </motion.div>
            </section>
        </>
    )
}