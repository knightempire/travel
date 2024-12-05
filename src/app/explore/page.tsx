import { Metadata } from "next";
import ExplorePage from "./ExplorePage";

export const metadata: Metadata = {
  title: "ExporeIQ",
  description: "Explore Beyond Boundaries",
};

export default function Page() {
  return (
    <>
      <ExplorePage />
    </>
  );
}
