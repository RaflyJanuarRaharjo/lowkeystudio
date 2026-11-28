import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS } from "@/data/content";
import { CASE_STUDIES } from "@/data/caseStudies";
import Navbar from "@/components/Navbar";
import CaseStudy from "@/components/CaseStudy";
import Footer from "@/components/Footer";

type Params = { params: Promise<{ slug: string }> };

// Semua halaman study case dibuat saat build (static)
export function generateStaticParams() {
  return PROJECTS.filter((p) => CASE_STUDIES[p.slug]).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Lowkey Studio`,
    description: project.summary,
  };
}

export default async function WorkPage({ params }: Params) {
  const { slug } = await params;
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  const study = CASE_STUDIES[slug];
  if (index === -1 || !study) notFound();

  const project = PROJECTS[index];
  // Project berikutnya (kembali ke awal setelah yang terakhir)
  const next = PROJECTS[(index + 1) % PROJECTS.length];

  return (
    <>
      <Navbar />
      <main>
        <CaseStudy project={project} study={study} next={next} />
      </main>
      <Footer />
    </>
  );
}
