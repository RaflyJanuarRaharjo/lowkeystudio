import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES } from "@/data/content";
import { SERVICE_PAGES } from "@/data/servicePages";
import Navbar from "@/components/Navbar";
import ServiceDetail from "@/components/ServiceDetail";
import Footer from "@/components/Footer";

type Params = { params: Promise<{ slug: string }> };

// Semua halaman service dibuat saat build (static)
export function generateStaticParams() {
  return SERVICES.filter((s) => SERVICE_PAGES[s.slug]).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.title} — Lowkey Studio`,
    description: service.summary,
  };
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const index = SERVICES.findIndex((s) => s.slug === slug);
  const page = SERVICE_PAGES[slug];
  if (index === -1 || !page) notFound();

  // Service berikutnya (kembali ke awal setelah yang terakhir)
  const next = SERVICES[(index + 1) % SERVICES.length];

  return (
    <>
      <Navbar />
      <main>
        <ServiceDetail service={SERVICES[index]} index={index} page={page} next={next} />
      </main>
      <Footer />
    </>
  );
}
