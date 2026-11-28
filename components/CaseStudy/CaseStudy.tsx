import Link from "next/link";
import { CONVERSATIONS, PEOPLE, type Project } from "@/data/content";
import type { CaseStudy as CaseStudyData } from "@/data/caseStudies";
import { FadeIn, Parallax, PixelReveal, ScrambleText, ScrollRevealText } from "@/components/effects";
import ReadingProgress from "./ReadingProgress";
import styles from "./CaseStudy.module.css";

type Props = {
  project: Project;
  study: CaseStudyData;
  next: Project;
};

const pad = (n: number) => String(n).padStart(2, "0");

// Review klien diambil dari percakapan di section Testimoni
function getReview(personKey?: string) {
  if (!personKey) return null;
  const convo = CONVERSATIONS.find((c) => c.client === personKey);
  const review = convo?.messages.find((m) => m.kind === "review");
  const person = PEOPLE[personKey];
  if (!review || review.kind !== "review" || !person) return null;
  return { text: review.text, person };
}

export default function CaseStudy({ project, study, next }: Props) {
  const review = getReview(study.testimonial);
  const meta = [
    { label: "Client", value: study.client },
    { label: "Services", value: study.services.join(", ") },
    { label: "Year", value: String(project.year) },
    { label: "Timeline", value: study.timeline },
  ];

  return (
    <article className={styles.page}>
      <ReadingProgress />

      {/* ---------- Hero ---------- */}
      <header className={`container ${styles.hero}`}>
        {/* Kiri: tombol kembali, kanan: judul project */}
        <div className={styles.heroTop}>
          <FadeIn>
            <Link href="/work" className={styles.back}>
              All work
            </Link>
          </FadeIn>

          <div>
            <p className={styles.eyebrow}>
              {project.tag} · {project.year}
            </p>
            <ScrambleText as="h1" text={project.title} className={styles.title} />
            <FadeIn delay={200}>
              <p className={styles.tagline}>{project.tagline}</p>
            </FadeIn>
          </div>
        </div>

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
      <div className="container">
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

      {/* ---------- Goals ---------- */}
      <section className={`container ${styles.row}`}>
        <p className={styles.label}>Goals</p>
        <ol className={styles.goals}>
          {study.goals.map((goal, i) => (
            <FadeIn as="li" key={goal} delay={i * 100} className={styles.goal}>
              <span className={styles.goalNum}>{pad(i + 1)}</span>
              <span>{goal}</span>
            </FadeIn>
          ))}
        </ol>
      </section>

      {/* ---------- Process ---------- */}
      <section className={`container ${styles.row}`}>
        <p className={styles.label}>Process</p>
        <ol className={styles.process}>
          {study.process.map((step, i) => (
            <FadeIn as="li" key={step.title} delay={i * 120} className={styles.step}>
              <span className={styles.stepNum}>{pad(i + 1)}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepText}>{step.text}</p>
            </FadeIn>
          ))}
        </ol>
      </section>

      {/* ---------- Solution ---------- */}
      <section className={`container ${styles.row}`}>
        <p className={styles.label}>Solution</p>
        <div className={styles.solution}>
          {study.solution.map((item, i) => (
            <FadeIn key={item.title} delay={(i % 2) * 120} className={styles.feature}>
              <span className={styles.featureIcon} aria-hidden="true" />
              <h3 className={styles.featureTitle}>{item.title}</h3>
              <p className={styles.featureText}>{item.text}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ---------- Visual system ---------- */}
      <section className={`container ${styles.row}`}>
        <p className={styles.label}>Visual system</p>
        <div className={styles.visual}>
          <div className={styles.palette}>
            {study.palette.map((c, i) => (
              <FadeIn key={c.hex} delay={i * 100} className={styles.swatch}>
                <span className={styles.swatchColor} style={{ background: c.hex }} />
                <span className={styles.swatchName}>{c.name}</span>
                <span className={styles.swatchHex}>{c.hex}</span>
              </FadeIn>
            ))}
          </div>
          <FadeIn className={styles.type}>
            <p className={styles.typeSample} aria-hidden="true">
              Aa
            </p>
            <div>
              <p className={styles.typeName}>{study.typeface.name}</p>
              <p className={styles.typeNote}>{study.typeface.note}</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ---------- Gallery (tampil kalau diisi) ---------- */}
      {study.gallery.length > 0 && (
        <section className={`container ${styles.gallery}`} aria-label="Project images">
          {study.gallery.map((img, i) => (
            <figure
              key={i}
              className={`${styles.shot} ${img.span === "full" ? styles.shotFull : styles.shotHalf}`}
            >
              <PixelReveal color="#0a0a0a" className={styles.fill} delay={(i % 2) * 120}>
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

      {/* ---------- Testimoni klien (tampil kalau ada) ---------- */}
      {review && (
        <section className={`container ${styles.row}`}>
          <p className={styles.label}>Client words</p>
          <FadeIn as="figure" className={styles.quote}>
            <blockquote className={styles.quoteText}>“{review.text}”</blockquote>
            <figcaption className={styles.quoteBy}>
              {review.person.photo ? (
                <img src={review.person.photo} alt="" className={styles.quoteAvatar} />
              ) : (
                <span className={styles.quoteAvatar} style={{ background: review.person.color }}>
                  {review.person.initial}
                </span>
              )}
              <span>
                <span className={styles.quoteName}>{review.person.name}</span>
                <span className={styles.quoteRole}>{review.person.company}</span>
              </span>
            </figcaption>
          </FadeIn>
        </section>
      )}

      {/* ---------- Deliverables ---------- */}
      <section className={`container ${styles.row}`}>
        <p className={styles.label}>Deliverables</p>
        <ul className={styles.deliverables}>
          {study.deliverables.map((d, i) => (
            <FadeIn as="li" key={d} delay={i * 80} className={styles.deliverable}>
              {d}
            </FadeIn>
          ))}
        </ul>
      </section>

      {/* ---------- CTA ---------- */}
      <section className={`container ${styles.ctaWrap}`}>
        <FadeIn className={styles.cta}>
          <p className={styles.ctaTitle}>Have a project like this in mind?</p>
          <Link href="/#contact" className={styles.ctaButton}>
            Start a project <span aria-hidden="true">↗</span>
          </Link>
        </FadeIn>
      </section>

      {/* ---------- Next project ---------- */}
      <section className={`container ${styles.nextWrap}`}>
        <Link href={`/work/${next.slug}`} className={styles.next}>
          <div>
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
