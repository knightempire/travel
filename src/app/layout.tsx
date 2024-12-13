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
          name="Travel based Recommendation System"
          content="A Travel Recommendation System & Trip Planning Platform. Welcome to ExploreIQ! This platform helps users plan their trips by recommending destinations, activities, and experiences based on personalized preferences."
        />
        <meta name="author" content="ExploreIQ Team - https://github.com/knightempire/travel" />

     <meta name="keywords" content="travel recommendation, trip planning, personalized travel, vacation planning, destinations, activities, experiences, ExploreIQ, Explore , Explore IQ " />

<meta name="description" content="ExploreIQ is a personalized travel recommendation system to help you plan your trips with curated destinations, activities, and experiences tailored to your preferences." />
<meta name="application-name" content="ExploreIQ" />


<meta property="og:title" content="ExploreIQ - Personalized Travel Recommendations" />
<meta property="og:description" content="Plan your next trip with ExploreIQ, a travel platform offering personalized recommendations for destinations and activities based on your unique preferences." />
<meta property="og:image" content="https://www.exploreiq.com/images/og-image.jpg" />
<meta property="og:url" content="https://www.exploreiq.com/" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="ExploreIQ" />

<link rel="icon" href="https://www.exploreiq.com/favicon.ico" />

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
