import Link from "next/link";
import type { Project } from "@/data/content";
import type { CaseStudy as CaseStudyData } from "@/data/caseStudies";
import {
  FadeIn,
  Parallax,
  PixelReveal,
  ScrambleText,
  ScrollRevealText,
} from "@/components/effects";
import styles from "./CaseStudy.module.css";

type Props = {
  project: Project;
  study: CaseStudyData;
  next: Project;
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function CaseStudy({ project, study, next }: Props) {
  const meta = [
    { label: "Client", value: study.client },
    { label: "Services", value: study.services.join(", ") },
    { label: "Year", value: String(project.year) },
    { label: "Timeline", value: study.timeline },
  ];

  return (
    <article className={styles.page}>
      {/* ---------- Hero ---------- */}
      <header className={`container ${styles.hero}`}>
        <FadeIn>
          <Link href="/#portfolio" className={styles.back}>
            <span aria-hidden="true">←</span> All work
          </Link>
        </FadeIn>

        <p className={styles.eyebrow}>
          {project.tag} · {project.year}
        </p>
        <ScrambleText as="h1" text={project.title} className={styles.title} />
        <FadeIn delay={200}>
          <p className={styles.tagline}>{project.tagline}</p>
        </FadeIn>

        <FadeIn delay={350}>
          <dl className={styles.meta}>
            {meta.map((m) => (
              <div key={m.label} className={styles.metaItem}>
                <dt>{m.label}</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </dl>
        </FadeIn>
      </header>

      {/* ---------- Cover ---------- */}
      <div className={`container ${styles.coverWrap}`}>
        <div className={styles.cover}>
          <Parallax speed={0.06} className={styles.coverParallax}>
            <PixelReveal color="#0a0a0a" className={styles.fill}>
              <img
                src={project.image}
                alt={project.title}
                className={project.crop ? styles.imgCropped : styles.imgCover}
                style={project.crop}
              />
            </PixelReveal>
          </Parallax>
        </div>
      </div>

      {/* ---------- Overview ---------- */}
      <section className={`container ${styles.row}`}>
        <p className={styles.label}>Overview</p>
        <ScrollRevealText text={study.overview} className={styles.lead} />
      </section>

      {/* ---------- Challenge & approach ---------- */}
      <section className={`container ${styles.row}`}>
        <p className={styles.label}>The brief</p>
        <div className={styles.twoCol}>
          <FadeIn>
            <h2 className={styles.subTitle}>Challenge</h2>
            <p className={styles.body}>{study.challenge}</p>
          </FadeIn>
          <FadeIn delay={150}>
            <h2 className={styles.subTitle}>Approach</h2>
            <p className={styles.body}>{study.approach}</p>
          </FadeIn>
        </div>
      </section>

      {/* ---------- Gallery (tampil kalau diisi) ---------- */}
      {study.gallery.length > 0 && (
        <section
          className={`container ${styles.gallery}`}
          aria-label="Project images"
        >
          {study.gallery.map((img, i) => (
            <figure
              key={i}
              className={`${styles.shot} ${img.span === "full" ? styles.shotFull : styles.shotHalf}`}
            >
              <PixelReveal
                color="#0a0a0a"
                className={styles.fill}
                delay={(i % 2) * 120}
              >
                <img
                  src={img.src ?? project.image}
                  alt={img.alt}
                  className={styles.imgCover}
                  style={{
                    objectPosition: img.focus,
                    transform: img.zoom ? `scale(${img.zoom})` : undefined,
                    transformOrigin: img.focus,
                  }}
                />
              </PixelReveal>
            </figure>
          ))}
        </section>
      )}

      {/* ---------- Process ---------- */}
      <section className={`container ${styles.row}`}>
        <p className={styles.label}>Process</p>
        <ol className={styles.process}>
          {study.process.map((step, i) => (
            <FadeIn
              as="li"
              key={step.title}
              delay={i * 120}
              className={styles.step}
            >
              <span className={styles.stepNum}>{pad(i + 1)}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepText}>{step.text}</p>
            </FadeIn>
          ))}
        </ol>
      </section>

      {/* ---------- Results (tampil kalau diisi) ---------- */}
      {study.results.length > 0 && (
        <section className={`container ${styles.row}`}>
          <p className={styles.label}>Results</p>
          <div className={styles.results}>
            {study.results.map((r, i) => (
              <FadeIn key={r.label} delay={i * 120} className={styles.result}>
                <p className={styles.resultValue}>{r.value}</p>
                <p className={styles.resultLabel}>{r.label}</p>
              </FadeIn>
            ))}
          </div>
        </section>
      )}

      {/* ---------- Deliverables ---------- */}
      <section className={`container ${styles.row}`}>
        <p className={styles.label}>Deliverables</p>
        <ul className={styles.deliverables}>
          {study.deliverables.map((d, i) => (
            <FadeIn
              as="li"
              key={d}
              delay={i * 80}
              className={styles.deliverable}
            >
              {d}
            </FadeIn>
          ))}
        </ul>
      </section>

      {/* ---------- Next project ---------- */}
      <section className={`container ${styles.nextWrap}`}>
        <Link href={`/work/${next.slug}`} className={styles.next}>
          <div className={styles.nextText}>
            <p className={styles.label}>Next project</p>
            <p className={styles.nextTitle}>{next.title}</p>
            <p className={styles.nextMeta}>
              {next.tag} · {next.year} <span aria-hidden="true">↗</span>
            </p>
          </div>
          <div className={styles.nextImage}>
            <img
              src={next.image}
              alt=""
              className={next.crop ? styles.imgCropped : styles.imgCover}
              style={next.crop}
            />
          </div>
        </Link>
      </section>
    </article>
  );
}
