import { useState, useEffect, useRef, useCallback } from 'react';
import { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { FaDownload, FaGraduationCap, FaBriefcase, FaCode, FaWrench, FaUser, FaCertificate, FaRocket, FaUsers } from 'react-icons/fa';
import { getMockPersonalInfo, PersonalInfo } from '../lib/wordpress';
import styles from '../styles/Resume.module.css';

interface ResumeProps {
  personalInfo: PersonalInfo;
}

export default function Resume({ personalInfo }: ResumeProps) {
  const [markerY, setMarkerY] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);
  const entryRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Recompute the marker's rail-local Y from the live viewport center on every
  // call (not a cached snapshot), so it tracks continuously as the page scrolls.
  // At the very top/bottom of the page it pins to the first/last entry's real
  // header position instead, since those can't reach true viewport center.
  const updateMarkerPosition = useCallback(() => {
    const rail = railRef.current;
    const entries = entryRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!rail || entries.length === 0) return;

    const railRect = rail.getBoundingClientRect();
    const maxMarkerY = railRect.height - 10;

    const headerCenterY = (el: HTMLDivElement) => {
      const header = el.querySelector('h2, h3') || el;
      const rect = header.getBoundingClientRect();
      return rect.top + rect.height / 2 - railRect.top - 5;
    };

    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    let targetY: number;
    if (scrollY <= 15) {
      // Top edge case: pin to the first entry's actual position
      targetY = headerCenterY(entries[0]);
    } else if (maxScroll > 0 && scrollY >= maxScroll - 25) {
      // Bottom edge case: pin to the last entry's actual position
      targetY = headerCenterY(entries[entries.length - 1]);
    } else {
      // Live indicator: marker stays at true vertical center of the viewport
      targetY = window.innerHeight / 2 - railRect.top - 5;
    }

    setMarkerY(Math.max(0, Math.min(maxMarkerY, targetY)));
  }, []);

  // Drive marker recalculation from scroll, resize, layout settling, and an
  // IntersectionObserver centered on the viewport middle (catches reflows).
  useEffect(() => {
    const entries = entryRefs.current.filter(Boolean) as HTMLDivElement[];
    if (entries.length === 0) return;

    const observer = new IntersectionObserver(() => updateMarkerPosition(), {
      rootMargin: '-45% 0px -45% 0px',
      threshold: 0,
    });
    entries.forEach((el) => observer.observe(el));

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateMarkerPosition();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateMarkerPosition);
    window.addEventListener('load', updateMarkerPosition);

    updateMarkerPosition();
    requestAnimationFrame(() => requestAnimationFrame(updateMarkerPosition));

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateMarkerPosition);
      window.removeEventListener('load', updateMarkerPosition);
    };
  }, [updateMarkerPosition]);

  return (
    <>
      <SEO
        title="Resume and Academic Background"
        description="Curriculum vitae and professional background of Achyut Niroula, Computer Science Honours graduate from Nipissing University, Software Engineer, and Founder."
        canonical="/resume/"
      />

      <Layout personalInfo={personalInfo}>
        <section className={styles.resumeSection}>
          <div className="container">
            <div className={styles.header}>
              <span className="eyebrow">Resume</span>
              <a href={personalInfo.resume_url} download className={styles.downloadBtn}>
                <FaDownload /> Download PDF
              </a>
            </div>
            <h1 className={styles.title}>Resume</h1>
            <hr className="rule" />

            {/* Timeline wrapper containing left rail and entries */}
            <div className={styles.timelineContainer}>
              <div ref={railRef} className={styles.timelineRail}>
                <div
                  className={styles.timelineMarker}
                  style={{ transform: `translateY(${markerY}px)` }}
                />
              </div>

              {/* Summary Section - Entry 0 */}
              <div
                ref={(el) => { entryRefs.current[0] = el; }}
                className={styles.section}
                data-timeline-entry
              >
                <div className={styles.sectionHeader}>
                  <FaUser className={styles.icon} />
                  <h2>Summary</h2>
                </div>
                <div className={styles.content}>
                  <p className={styles.summary}>
                    Honours Computer Science graduate (Nipissing University, May 2026, GPA 3.7/4.0) and founder of Norlease, where I run operations and engineering for a live rental platform serving Northern Ontario and Quebec. I built the product on Next.js, TypeScript, and PostgreSQL, onboarded about 20 landlords in person, and own production monitoring, alerting, and on-call response. My honours research was a multimodal video understanding platform: a pipeline of 8 models on AWS that turns uploaded video into a written summary. I also completed three summer contracts as a research assistant and web developer at Nipissing, served three years as the elected Computer Science student representative, and hold an Ontario LLQP qualification. I am currently a Management Trainee at Enterprise Rent-A-Car in North Bay.
                  </p>
                </div>
              </div>

              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <FaBriefcase className={styles.icon} />
                  <h2>Experience</h2>
                </div>
                <div className={styles.content}>
                  <div
                    ref={(el) => { entryRefs.current[1] = el; }}
                    className={styles.item}
                    data-timeline-entry
                  >
                    <h3>Management Trainee</h3>
                    <p className={styles.institution}>Enterprise Rent-A-Car — North Bay, ON</p>
                    <p className={styles.date}>Oct. 2026 – present</p>
                    <ul className={styles.details}>
                      <li>Serve as first point of contact for customers in person and by phone, reviewing every detail of each rental agreement, including customer information, qualifications, and rate source, to prevent errors and answer questions clearly.</li>
                      <li>Inspect vehicles for damage, maintain inventory counts and accurate vehicle records, and coordinate with auto and body shops.</li>
                    </ul>
                  </div>

                  <div
                    ref={(el) => { entryRefs.current[2] = el; }}
                    className={styles.item}
                    data-timeline-entry
                  >
                    <h3>Sales Associate II, Tool Rental &amp; Flooring</h3>
                    <p className={styles.institution}>The Home Depot Canada — North Bay, ON</p>
                    <p className={styles.date}>Dec. 2022 – Oct. 2026</p>
                    <ul className={styles.details}>
                      <li>Promoted from Lot Associate to Sales Associate II after nearly 4 years of customer-facing work, covering two departments and collaborating with teammates to resolve customer issues.</li>
                      <li>Diagnosed and repaired rental equipment, and explained product options and procedures to customers of all experience levels.</li>
                    </ul>
                  </div>

                  <div
                    ref={(el) => { entryRefs.current[3] = el; }}
                    className={styles.item}
                    data-timeline-entry
                  >
                    <h3>Research Assistant &amp; Web Developer</h3>
                    <p className={styles.institution}>Nipissing University — North Bay, ON, with Dr. Vesko Valov</p>
                    <p className={styles.date}>May – Aug. 2023, 2024, 2025 (three summer contracts)</p>
                    <ul className={styles.details}>
                      <li>Built and configured a WordPress site with Tailwind CSS and a relational data model in Advanced Custom Fields, cataloguing a professor&apos;s full body of published research and keeping every entry accurate as new papers were added.</li>
                      <li>Worked with University Technology Services and Media &amp; Communications on hosting, compliance, access, permissions, and approvals for site changes.</li>
                      <li>Wrote the user manual and technical documentation, set up a guided self-serve workflow on the professor&apos;s campus workstation, trained non-technical staff, and troubleshot site issues across 3 separate summer contracts.</li>
                      <li>Kept attending in-person and Teams meetings after each contract ended to troubleshoot WordPress and campus software issues, unpaid, because the work was not finished.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <FaRocket className={styles.icon} />
                  <h2>Independent Venture</h2>
                </div>
                <div className={styles.content}>
                  <div
                    ref={(el) => { entryRefs.current[4] = el; }}
                    className={styles.item}
                    data-timeline-entry
                  >
                    <h3>Founder, Operations and Engineering</h3>
                    <p className={styles.institution}>Norlease (northlease.ca) — North Bay, ON</p>
                    <p className={styles.date}>Aug. 2026 – present, alongside full-time work</p>
                    <ul className={styles.details}>
                      <li>Run a live SaaS application (Next.js, TypeScript, PostgreSQL) for Northern Ontario and Quebec, and onboarded about 20 landlords in person, guiding each through setup and answering product questions.</li>
                      <li>Identified a structural gap in the rental market, widespread listing fraud on Kijiji and Facebook Marketplace alongside rising vacancy rates, and designed a verification system (phone OTP plus a manually reviewed government ID and selfie) that closes the fraud gap without the income or credit filtering that would create Ontario Human Rights Code exposure.</li>
                      <li>Own production monitoring, alerting, and on-call response, using GitHub Actions alerts, Docker deployments on Coolify, and application logs for root cause analysis.</li>
                      <li>Secured RESTful API integrations for SMS, email, and authentication with signed webhooks, HMAC verification, Cloudflare Turnstile, and rate limiting; trained a co-founder on the CI/CD workflow.</li>
                      <li>Built the platform&apos;s core stack: Postgres 17 with PostGIS and pg_trgm on Neon, Drizzle ORM, Clerk auth, Telnyx SMS OTP, Cloudflare R2 photo storage, real-time messaging on a self-hosted Soketi server, a self-hosted Protomaps and MapLibre tile pipeline covering Ontario and Quebec, pg-boss job queues, and English and French support with next-intl.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <FaWrench className={styles.icon} />
                  <h2>Projects</h2>
                </div>
                <div className={styles.content}>
                  <div
                    ref={(el) => { entryRefs.current[5] = el; }}
                    className={styles.item}
                    data-timeline-entry
                  >
                    <h3>Honours Research: Multimodal Video Understanding Platform (AI-Video-Analyzer)</h3>
                    <p className={styles.institution}>Python, FastAPI, AWS EC2, S3, SQS, DynamoDB, Docker, ECR</p>
                    <p className={styles.date}>Jan. – Apr. 2026</p>
                    <ul className={styles.details}>
                      <li>Built a FastAPI backend and a pipeline of 8 models, including YOLOv8, SAM2, and Whisper large-v3, to turn uploaded video into a written summary.</li>
                      <li>Configured and deployed the GPU worker on AWS EC2 with Docker and ECR, using SQS, S3, and DynamoDB, and cut cloud spend by stopping the instance when idle.</li>
                      <li>Containerized the services, wrote 9 automated test suites covering frame-level correctness and pipeline edge cases, and added observability across all model endpoints.</li>
                      <li>Authored root-cause reports and API documentation for internal engineering stakeholders, and served as the sole on-call engineer for production incidents.</li>
                    </ul>
                  </div>

                  <div
                    ref={(el) => { entryRefs.current[6] = el; }}
                    className={styles.item}
                    data-timeline-entry
                  >
                    <h3>LEON (LearnOne)</h3>
                    <p className={styles.institution}>Python, FastAPI, PostgreSQL, pgvector, fastembed, React, TypeScript, Claude API</p>
                    <ul className={styles.details}>
                      <li>A public, no-auth tool that indexes a GitHub repository and generates a book-style explainer of the codebase, with &quot;noobie&quot; and &quot;normal&quot; reading modes and Mermaid diagrams for architecture visualization.</li>
                      <li>Built the core RAG pipeline and a multi-stage &quot;thinker&quot; LLM chain that reasons through a repository&apos;s structure and produces the explanatory content.</li>
                      <li>Switched embedding generation from a rate-limited external API to local in-process embeddings via fastembed, cutting indexing time from 10–25+ minutes to a few minutes per repo with no external rate limits.</li>
                      <li>Added real-time indexing progress tracking and staleness recovery for orphaned background jobs, for example after server restarts.</li>
                      <li>Deliberately scaled the project down from a broader scope (voice interaction, chat, curriculum generation, quizzes, auth) to a minimal, public tool, a scope cut made to ship something reliable.</li>
                    </ul>
                  </div>

                  <div
                    ref={(el) => { entryRefs.current[7] = el; }}
                    className={styles.item}
                    data-timeline-entry
                  >
                    <h3>JobHunt AI + ResOptimum</h3>
                    <p className={styles.institution}>Python, FastAPI, React, TypeScript, Docker, Nginx, SQLite, Claude API, pdfplumber</p>
                    <ul className={styles.details}>
                      <li>Distributed job-scraping platform pulling from 7 boards concurrently using async I/O and connection pooling; processes 1,200+ listings per run with sub-3-second per-board response handling, plus semantic matching and ATS classification.</li>
                      <li>ResOptimum, the integrated resume-optimization module: structured LLM prompts with JSON schema validation, role detection, and prompt chaining; a REST API that ingests a PDF and job description and produces ATS-targeted LaTeX, with a second LLM pass enforcing one-page fit and factual accuracy.</li>
                      <li>Full pytest integration coverage across every API endpoint; containerized end to end with Docker Compose and Nginx as reverse proxy.</li>
                    </ul>
                  </div>

                  <div
                    ref={(el) => { entryRefs.current[8] = el; }}
                    className={styles.item}
                    data-timeline-entry
                  >
                    <h3>Inventory</h3>
                    <p className={styles.institution}>Python, Flask, Docker, Firebase, Google Cloud Run</p>
                    <ul className={styles.details}>
                      <li>Cloud-native inventory management system deployed to Google Cloud Run with Docker, with role-based access control, RESTful API endpoints, Firebase Realtime Database for persistent storage, and Cloudinary CDN for asset management.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <FaUsers className={styles.icon} />
                  <h2>Leadership</h2>
                </div>
                <div className={styles.content}>
                  <div
                    ref={(el) => { entryRefs.current[9] = el; }}
                    className={styles.item}
                    data-timeline-entry
                  >
                    <h3>Computer Science Student Representative</h3>
                    <p className={styles.institution}>Nipissing University — North Bay, ON</p>
                    <p className={styles.date}>2022 – 2025</p>
                    <ul className={styles.details}>
                      <li>Served as the elected link between students and the Dean for 3 years, and organized hackathons, seminars, and workshops.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <FaGraduationCap className={styles.icon} />
                  <h2>Education</h2>
                </div>
                <div className={styles.content}>
                  <div
                    ref={(el) => { entryRefs.current[10] = el; }}
                    className={styles.item}
                    data-timeline-entry
                  >
                    <h3>Honours Bachelor of Computer Science</h3>
                    <p className={styles.institution}>Nipissing University — North Bay, ON</p>
                    <p className={styles.date}>May 2026 | GPA: 3.7/4.0</p>
                    <ul className={styles.details}>
                      <li>Awards: President&apos;s Scholarship (2021), Carl Sanders Scholarship (2022, 2023, 2024, 2025).</li>
                      <li>Relevant coursework: Distributed Systems (96%), Databases &amp; Data Management (96%), Software Engineering (89%), Artificial Neural Networks (83%).</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <FaCertificate className={styles.icon} />
                  <h2>Certifications</h2>
                </div>
                <div className={styles.content}>
                  <div
                    ref={(el) => { entryRefs.current[11] = el; }}
                    className={styles.item}
                    data-timeline-entry
                  >
                    <h3>Life License Qualification Program (LLQP)</h3>
                    <p className={styles.institution}>Life Licence Qualification Exam, Collège Boréal, Ontario</p>
                    <p className={styles.date}>Aug. 2026</p>
                  </div>
                </div>
              </div>

              {/* Technical Skills Section - Entry 12 */}
              <div
                ref={(el) => { entryRefs.current[12] = el; }}
                className={styles.section}
                data-timeline-entry
              >
                <div className={styles.sectionHeader}>
                  <FaCode className={styles.icon} />
                  <h2>Technical Skills</h2>
                </div>
                <div className={styles.content}>
                  <div className={styles.skillsGrid}>
                    <div className={styles.skillCategory}>
                      <h3>Technical Support</h3>
                      <div className={styles.skillTags}>
                        <span>First-level troubleshooting</span><span>root cause analysis</span><span>ticket documentation</span><span>escalation</span><span>knowledge articles</span><span>customer communication</span><span>test environment setup</span>
                      </div>
                    </div>
                    <div className={styles.skillCategory}>
                      <h3>Systems &amp; Security</h3>
                      <div className={styles.skillTags}>
                        <span>Docker</span><span>AWS (EC2, S3, SQS)</span><span>Cloudflare</span><span>GitHub Actions</span><span>CI/CD</span><span>log analysis</span><span>monitoring and alerting</span><span>HMAC</span><span>rate limiting</span><span>authentication</span>
                      </div>
                    </div>
                    <div className={styles.skillCategory}>
                      <h3>Languages</h3>
                      <div className={styles.skillTags}>
                        <span>Python</span><span>Java</span><span>TypeScript</span><span>JavaScript</span><span>SQL</span><span>C++</span>
                      </div>
                    </div>
                    <div className={styles.skillCategory}>
                      <h3>Frameworks &amp; APIs</h3>
                      <div className={styles.skillTags}>
                        <span>FastAPI</span><span>Spring Boot</span><span>Next.js</span><span>Flask</span><span>React</span><span>Node.js</span><span>RESTful APIs</span><span>microservices</span><span>Nginx</span>
                      </div>
                    </div>
                    <div className={styles.skillCategory}>
                      <h3>Cloud &amp; DevOps</h3>
                      <div className={styles.skillTags}>
                        <span>AWS (EC2, S3, SQS, DynamoDB)</span><span>Google Cloud Run</span><span>Hetzner</span><span>Coolify</span><span>Docker</span><span>Docker Compose</span><span>Git</span><span>Linux</span>
                      </div>
                    </div>
                    <div className={styles.skillCategory}>
                      <h3>Databases</h3>
                      <div className={styles.skillTags}>
                        <span>PostgreSQL</span><span>PostGIS</span><span>pg_trgm</span><span>pgvector</span><span>Redis</span><span>SQLite</span><span>Firebase (NoSQL)</span>
                      </div>
                    </div>
                    <div className={styles.skillCategory}>
                      <h3>AI &amp; ML</h3>
                      <div className={styles.skillTags}>
                        <span>Computer vision pipelines</span><span>RAG</span><span>LLM integration (Claude API)</span><span>prompt engineering</span><span>prompt chaining</span><span>local embeddings (fastembed)</span><span>semantic similarity</span>
                      </div>
                    </div>
                    <div className={styles.skillCategory}>
                      <h3>Auth &amp; Comms</h3>
                      <div className={styles.skillTags}>
                        <span>Clerk</span><span>Telnyx SMS OTP</span><span>AWS Cognito</span><span>Firebase Authentication</span>
                      </div>
                    </div>
                    <div className={styles.skillCategory}>
                      <h3>Maps &amp; Geospatial</h3>
                      <div className={styles.skillTags}>
                        <span>Self-hosted Protomaps/MapLibre tile pipeline</span><span>PostGIS geospatial search</span>
                      </div>
                    </div>
                    <div className={styles.skillCategory}>
                      <h3>Testing</h3>
                      <div className={styles.skillTags}>
                        <span>pytest</span><span>JUnit</span><span>Playwright</span><span>integration and end-to-end testing</span>
                      </div>
                    </div>
                    <div className={styles.skillCategory}>
                      <h3>Other</h3>
                      <div className={styles.skillTags}>
                        <span>System architecture</span><span>stakeholder communication</span><span>technical writing</span><span>agile/SDLC</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div id="contact-target" className={styles.contactAnchor} />
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const personalInfo = getMockPersonalInfo();
  return { props: { personalInfo } };
};
