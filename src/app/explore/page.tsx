import { Metadata } from "next";
import Breadcrumb from "@/components/Common/Breadcrumb";
import ExplorePage from "./ExplorePage";
import Date from "@/components/input/input";

export const metadata: Metadata = {
  title: "Blog Page | Free Next.js Template for Startup and SaaS",
  description: "This is Blog Page for Startup Nextjs Template",
};

export default function Page() {
  return (
    <>
      <ExplorePage />
      <Date />
    </>
  );
}
