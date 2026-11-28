import Link from "next/link";
import { PROJECTS, SERVICES } from "@/data/content";
import type { ServicePage } from "@/data/servicePages";
import { FadeIn, Parallax, PixelReveal, ScrambleText, ScrollRevealText } from "@/components/effects";
import ReadingProgress from "@/components/CaseStudy/ReadingProgress";
// Pakai gaya dasar yang sama dengan halaman study case supaya konsisten
import cs from "@/components/CaseStudy/CaseStudy.module.css";
import styles from "./ServiceDetail.module.css";

type Service = (typeof SERVICES)[number];

type Props = {
  service: Service;
  index: number;
  page: ServicePage;
  next: Service;
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function ServiceDetail({ service, index, page, next }: Props) {
  const related = page.relatedCategory
    ? PROJECTS.filter((p) => p.category === page.relatedCategory).slice(0, 3)
    : [];

  const meta = [
    { label: "Timeline", value: page.timeline },
    { label: "Best for", value: page.bestFor },
    { label: "Includes", value: service.tags.join(", ") },
  ];

  return (
    <article className={cs.page}>
      <ReadingProgress />

      {/* ---------- Hero ---------- */}
      <header className={`container ${cs.hero}`}>
        <div className={cs.heroTop}>
          <FadeIn>
            <Link href="/#services" className={cs.back}>
              All services
            </Link>
          </FadeIn>

          <div>
            <p className={cs.eyebrow}>Service {pad(index + 1)}</p>
            <ScrambleText as="h1" text={service.title} className={cs.title} />
            <FadeIn delay={200}>
              <p className={cs.tagline}>{service.summary}</p>
            </FadeIn>
          </div>
        </div>

        <FadeIn delay={350}>
          <dl className={`${cs.meta} ${styles.meta}`}>
            {meta.map((m) => (
              <div key={m.label} className={cs.metaItem}>
                <dt>{m.label}</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </dl>
        </FadeIn>
      </header>

      {/* ---------- Cover ---------- */}
      <div className="container">
        <div className={`${cs.cover} ${styles.cover}`}>
          <Parallax speed={0.06} className={cs.coverParallax}>
            <PixelReveal color="#0a0a0a" className={cs.fill}>
              <img src={service.image} alt={service.title} className={cs.imgCover} />
            </PixelReveal>
          </Parallax>
        </div>
      </div>

      {/* ---------- Overview ---------- */}
      <section className={`container ${cs.row}`}>
        <p className={cs.label}>Overview</p>
        <ScrollRevealText text={page.overview} className={cs.lead} />
      </section>

      {/* ---------- Yang bisa dikerjakan ---------- */}
      <section className={`container ${cs.row}`}>
        <p className={cs.label}>What we do</p>
        <div className={styles.capabilities}>
          {page.capabilities.map((item, i) => (
            <FadeIn key={item.title} delay={(i % 3) * 100} className={cs.feature}>
              <span className={styles.capNum}>{pad(i + 1)}</span>
              <h3 className={cs.featureTitle}>{item.title}</h3>
              <p className={cs.featureText}>{item.text}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ---------- Proses ---------- */}
      <section className={`container ${cs.row}`}>
        <p className={cs.label}>How we work</p>
        <ol className={styles.process}>
          {page.process.map((step, i) => (
            <FadeIn as="li" key={step.title} delay={i * 120} className={styles.step}>
              <div className={styles.stepHead}>
                <span className={cs.stepNum}>{pad(i + 1)}</span>
                <span className={styles.duration}>{step.duration}</span>
              </div>
              {/* Garis progres antar tahap */}
              <span className={styles.stepLine} aria-hidden="true" />
              <h3 className={cs.stepTitle}>{step.title}</h3>
              <p className={cs.stepText}>{step.text}</p>
            </FadeIn>
          ))}
        </ol>
      </section>

      {/* ---------- Deliverables ---------- */}
      <section className={`container ${cs.row}`}>
        <p className={cs.label}>What you get</p>
        <ul className={`${cs.deliverables} ${styles.deliverables}`}>
          {page.deliverables.map((d, i) => (
            <FadeIn as="li" key={d} delay={(i % 2) * 80} className={cs.deliverable}>
              {d}
            </FadeIn>
          ))}
        </ul>
      </section>

      {/* ---------- Related work (tampil kalau ada) ---------- */}
      {related.length > 0 && (
        <section className={`container ${cs.row}`}>
          <p className={cs.label}>Related work</p>
          <div className={styles.related}>
            {related.map((p, i) => (
              <FadeIn key={p.slug} delay={i * 120}>
                <Link href={`/work/${p.slug}`} className={styles.card}>
                  <div className={styles.cardMedia}>
                    <img
                      src={p.image}
                      alt={p.title}
                      className={p.crop ? cs.imgCropped : cs.imgCover}
                      style={p.crop}
                    />
                  </div>
                  <p className={styles.cardTitle}>{p.title}</p>
                  <p className={styles.cardMeta}>
                    {p.tag} · {p.year}
                  </p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </section>
      )}

      {/* ---------- FAQ ---------- */}
      <section className={`container ${cs.row}`}>
        <p className={cs.label}>Questions</p>
        <div className={styles.faqs}>
          {page.faqs.map((f) => (
            <details key={f.q} className={styles.faq}>
              <summary className={styles.faqQ}>
                {f.q}
                <span className={styles.faqIcon} aria-hidden="true" />
              </summary>
              <p className={styles.faqA}>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className={`container ${cs.ctaWrap}`}>
        <FadeIn className={cs.cta}>
          <p className={cs.ctaTitle}>Need {service.title.toLowerCase()} for your project?</p>
          <Link href="/#contact" className={cs.ctaButton}>
            Start a project <span aria-hidden="true">↗</span>
          </Link>
        </FadeIn>
      </section>

      {/* ---------- Next service ---------- */}
      <section className={`container ${cs.nextWrap}`}>
        <Link href={`/services/${next.slug}`} className={cs.next}>
          <div>
            <p className={cs.label}>Next service</p>
            <p className={cs.nextTitle}>{next.title}</p>
            <p className={cs.nextMeta}>
              {next.description} <span aria-hidden="true">↗</span>
            </p>
          </div>
          <div className={cs.nextImage}>
            <img src={next.image} alt="" className={cs.imgCover} />
          </div>
        </Link>
      </section>
    </article>
  );
}
