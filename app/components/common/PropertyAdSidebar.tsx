"use client";

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProperties } from '@/app/lib/api/properties';
import PropertyCard, { PropertyCardLoader } from './PropertyCard';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function PropertyAdSidebar() {
  const { data: propertiesData, isLoading, error } = useQuery({
    queryKey: ["latest-property-ad"],
    queryFn: () => getProperties({
      page: 1,
      limit: 1,
      sort: "desc",
      sortBy: "createdAt",
    }),
  });

  const property = propertiesData?.data?.[0];

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h4 className="font-bold text-navy-900 px-1">Featured Property</h4>
        <PropertyCardLoader />
      </div>
    );
  }

  if (error || !property) {
    return null; // Or some fallback
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-1">
        <h4 className="font-bold text-navy-900">Latest Property</h4>
        <Link 
          href="/properties" 
          className="text-xs font-bold text-gold-600 hover:text-gold-700 transition-colors flex items-center gap-1"
        >
          View All <ArrowRight size={12} />
        </Link>
      </div>
      
      <div className="transform transition-transform hover:-translate-y-1 duration-300">
        <PropertyCard property={property} />
      </div>

      <div className="bg-navy-900 rounded-2xl p-6 text-white overflow-hidden relative group">
        <div className="relative z-10">
          <p className="text-gold-400 text-xs font-bold uppercase tracking-widest mb-2">Expert Consultation</p>
          <h5 className="text-xl font-bold mb-4">Looking for something specific?</h5>
          <Link 
            href="/contact" 
            className="inline-flex items-center justify-center w-full py-3 bg-gold-500 text-navy-900 font-bold rounded-xl hover:bg-gold-400 transition-all"
          >
            Contact Agent
          </Link>
        </div>
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-gold-500/10 rounded-full blur-2xl group-hover:bg-gold-500/20 transition-all" />
      </div>
    </div>
  );
}
