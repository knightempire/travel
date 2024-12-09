"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { Inter } from "next/font/google";
import "node_modules/react-modal-video/css/modal-video.css";
import "../styles/index.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <title>ExploreIQ</title>
        
        {/* Meta tags for SEO */}
        <meta
          name="description"
          content="Travel Recommendation System & Trip Planning Platform. Welcome to ExploreIQ! This platform helps users plan their trips by recommending destinations, activities, and experiences based on personalized preferences. The system leverages machine learning (ML) models for recommendations and integrates a seamless itinerary planning experience."
        />
        <meta name="author" content="ExploreIQ Team - https://github.com/knightempire/travel" />
        
        {/* Favicon and Apple Touch Icon */}
        <link rel="icon" href="https://i.imgur.com/W97mSaU.png"  />

      </head>
      <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        <Providers>
          <Header />
          {children}
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}

import { Providers } from "./providers";
