import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import WorkIndex from "@/components/WorkIndex";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Work — Lowkey Studio",
  description: "Selected branding, website and mobile app projects by Lowkey Studio.",
};

export default function WorkPage() {
  return (
    <>
      <Navbar />
      <main>
        <WorkIndex />
      </main>
      <Footer />
    </>
  );
}
