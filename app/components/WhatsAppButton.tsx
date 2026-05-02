"use client";

import React from 'react';
import { MessageCircle } from 'lucide-react';

import { FaWhatsapp } from "react-icons/fa";


interface WhatsAppButtonProps {
  phoneNumber: string; // Format: 919876543210 (Country code + number)
  message?: string;
}

const WhatsAppButton = ({ 
  phoneNumber = "911234567890", 
  message = "Hello! I'd like to book an appointment." 
}: WhatsAppButtonProps) => {
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-10 right-10 z-[9999] group flex items-center justify-center"
      aria-label="Contact us on WhatsApp"
    >


      {/* Pulse Effect Rings */}
      <span className="hidden absolute h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
      
      {/* The Button */}
      <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-300 hover:scale-110 active:scale-95 sm:h-16 sm:w-16">
        <FaWhatsapp  size={32} fill="currentColor" className="sm:h-9 sm:w-9" />
      </div>
    </a>
  );
};

export default WhatsAppButton;