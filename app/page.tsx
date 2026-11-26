import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Showcase from "@/components/Showcase";
import Team from "@/components/Team";
import Mission from "@/components/Mission";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Showcase />
        <Team />
        <Mission />
        <Projects />
        <Testimonials />
      </main>
    </>
  );
}
