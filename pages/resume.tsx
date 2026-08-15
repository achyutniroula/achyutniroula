import { GetStaticProps } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout';
import { FaDownload, FaGraduationCap, FaBriefcase, FaCode, FaWrench, FaUser, FaCertificate } from 'react-icons/fa';
import { getMockPersonalInfo, PersonalInfo } from '../lib/wordpress';
import styles from '../styles/Resume.module.css';

interface ResumeProps {
  personalInfo: PersonalInfo;
}

export default function Resume({ personalInfo }: ResumeProps) {
  return (
    <>
      <Head>
        <title>Resume — Achyut Niroula</title>
        <meta name="description" content="Resume and CV of Achyut Niroula" />
      </Head>

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

            {/* Summary Section */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <FaUser className={styles.icon} />
                <h2>Summary</h2>
              </div>
              <div className={styles.content}>
                <p className={styles.summary}>
                  Recent Computer Science Honours graduate (Nipissing University, May 2026, GPA 3.7/4.0) with hands-on experience across full-stack development, distributed systems, and applied AI. Built production AI/computer vision infrastructure as a research engineer, founded a full-stack SaaS product solo in six weeks, and has three years of prior research and web development experience at Nipissing. Comfortable owning a system end to end, from architecture through production incident response.
                </p>
              </div>
            </div>

            {/* Experience Section */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <FaBriefcase className={styles.icon} />
                <h2>Experience</h2>
              </div>
              <div className={styles.content}>
                <div className={styles.item}>
                  <h3>Software Engineer, Researcher</h3>
                  <p className={styles.institution}>Nipissing University — North Bay, ON</p>
                  <p className={styles.date}>Jan. 2026 – Apr. 2026</p>
                  <ul className={styles.details}>
                    <li>Designed and deployed distributed REST APIs on AWS (EC2, S3, SQS) connecting 8 neural models in an async computer vision pipeline; owned service architecture and deployment for high availability with no senior engineering oversight.</li>
                    <li>Containerized all microservices on Linux/EC2 with Docker; wrote 9 automated test suites covering frame-level correctness and pipeline edge cases.</li>
                    <li>Implemented observability across all model endpoints; authored root-cause reports and API documentation consumed by internal engineering stakeholders; served as sole on-call engineer for production incidents.</li>
                  </ul>
                </div>
                <div className={styles.item}>
                  <h3>Founder</h3>
                  <p className={styles.institution}>Norlease (northlease.ca) — North Bay, ON</p>
                  <p className={styles.date}>Aug. 2026 – present</p>
                  <ul className={styles.details}>
                    <li>Identified a structural gap in the rental market — widespread listing fraud on Kijiji/Facebook Marketplace combined with rising vacancy rates — and built a verified rental listings platform for North Bay/northern Ontario around it.</li>
                    <li>Designed a verification system (phone OTP plus manually reviewed government ID and selfie) that closes the fraud gap without triggering Ontario Human Rights Code exposure from income or credit filtering; built and stress-tested the verification pipeline myself against dozens of real ID/selfie test cases before launch.</li>
                    <li>Architected and built the full stack solo: Next.js 16/React 19/TypeScript/Tailwind 4, Postgres 17 with PostGIS and pg_trgm on Neon, Drizzle ORM, Hetzner + Coolify + Docker, Cloudflare R2, Clerk auth, Telnyx SMS OTP, self-hosted Protomaps/MapLibre tile pipeline, pg-boss for job queuing.</li>
                    <li>Ran founder-led sales in parallel with development, securing founding landlord partners ahead of public launch, on a fixed six-week build-to-launch timeline.</li>
                  </ul>
                </div>
                <div className={styles.item}>
                  <h3>Research Assistant &amp; Web Developer, Dr. Vesko Valov</h3>
                  <p className={styles.institution}>Nipissing University — North Bay, ON</p>
                  <p className={styles.date}>May – Aug. 2023, 2024, 2025 (three consecutive summer contracts)</p>
                  <ul className={styles.details}>
                    <li>Built and maintained a faculty research portfolio site in WordPress, cataloguing a professor&apos;s full body of published work and keeping every entry accurate as new papers were added.</li>
                    <li>Coordinated with University Technology Services and Media &amp; Communications to secure access, permissions, and approvals for site changes.</li>
                    <li>Set up a guided, step-by-step process on the professor&apos;s campus workstation so he could self-serve future edits to published research without developer involvement.</li>
                    <li>Continued attending in-person and Teams meetings after each contract ended to troubleshoot WordPress and campus software issues, unpaid, because the work wasn&apos;t finished.</li>
                    <li>Contributed to Multimodal Video Understanding research (AWS, 8+ neural models, WebSocket validation), handling the software implementation side and documenting results for a non-technical audience.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Projects Section */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <FaWrench className={styles.icon} />
                <h2>Projects</h2>
              </div>
              <div className={styles.content}>
                <div className={styles.item}>
                  <h3>LEON (LearnOne)</h3>
                  <p className={styles.institution}>Python, FastAPI, PostgreSQL, pgvector, fastembed, React, TypeScript, Claude API</p>
                  <ul className={styles.details}>
                    <li>A public, no-auth tool that indexes a GitHub repository and generates a book-style explainer of the codebase — preface, contents, pipeline breakdown, and in-depth sections, with &quot;noobie&quot; and &quot;normal&quot; reading modes and Mermaid diagrams for architecture visualization.</li>
                    <li>Built the core RAG pipeline and multi-stage &quot;thinker&quot; LLM chain that reasons through a repository&apos;s structure and produces the explanatory content.</li>
                    <li>Switched embedding generation from a rate-limited external API to local in-process embeddings via fastembed, cutting indexing time from 10–25+ minutes down to a few minutes per repo with no external rate limits.</li>
                    <li>Added real-time indexing progress tracking and staleness-recovery for orphaned background jobs, e.g. after server restarts.</li>
                    <li>Deliberately scaled the project down from an earlier, broader scope (voice interaction, chat, curriculum generation, quiz/review/progress tracking, auth) to a minimal, focused, public tool — a scope cut made to ship something reliable rather than keep expanding an unfinished feature set.</li>
                  </ul>
                </div>
                <div className={styles.item}>
                  <h3>JobHunt AI + ResOptimum</h3>
                  <p className={styles.institution}>Python, FastAPI, React, TypeScript, Docker, Nginx, SQLite, Claude API, pdfplumber</p>
                  <ul className={styles.details}>
                    <li>Distributed job-scraping platform pulling from 7 boards concurrently using async I/O and connection pooling; processes 1,200+ listings per run with sub-3-second per-board response handling; semantic matching and ATS classification on collected listings.</li>
                    <li>ResOptimum, the integrated resume-optimization module: structured LLM prompts with JSON schema validation, role detection, and prompt chaining; REST API ingesting PDF and job description input to produce ATS-targeted LaTeX output, with a second LLM pass enforcing one-page fit and factual accuracy.</li>
                    <li>Full pytest integration test coverage across every API endpoint; containerized end-to-end with Docker Compose and Nginx as reverse proxy.</li>
                  </ul>
                </div>
                <div className={styles.item}>
                  <h3>Inventory</h3>
                  <p className={styles.institution}>Python, Flask, Docker, Firebase, Google Cloud Run</p>
                  <ul className={styles.details}>
                    <li>Cloud-native inventory management system deployed to Google Cloud Run with Docker containerization; role-based access control, RESTful API endpoints, Firebase Realtime Database for persistent storage, Cloudinary CDN for asset management.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Education Section */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <FaGraduationCap className={styles.icon} />
                <h2>Education</h2>
              </div>
              <div className={styles.content}>
                <div className={styles.item}>
                  <h3>B.Sc. Honours Specialization in Computer Science</h3>
                  <p className={styles.institution}>Nipissing University — North Bay, ON</p>
                  <p className={styles.date}>May 2026 | GPA: 3.7/4.0</p>
                  <ul className={styles.details}>
                    <li>Awards: President&apos;s Scholarship (2021), Carl Sanders Scholarship (2022, 2023, 2024, 2025)</li>
                    <li>Relevant coursework: Distributed Systems (96%), Databases &amp; Data Management (96%), Software Engineering (89%), Artificial Neural Networks (83%)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Certifications Section */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <FaCertificate className={styles.icon} />
                <h2>Certifications</h2>
              </div>
              <div className={styles.content}>
                <div className={styles.item}>
                  <h3>Life License Qualification Program (LLQP)</h3>
                  <p className={styles.institution}>Licensed Life &amp; Accident and Sickness Insurance Agent, Ontario</p>
                  <p className={styles.date}>2026</p>
                </div>
              </div>
            </div>

            {/* Technical Skills Section */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <FaCode className={styles.icon} />
                <h2>Technical Skills</h2>
              </div>
              <div className={styles.content}>
                <div className={styles.skillsGrid}>
                  <div className={styles.skillCategory}>
                    <h3>Languages</h3>
                    <div className={styles.skillTags}>
                      <span>Python</span><span>Java</span><span>TypeScript</span><span>JavaScript</span><span>SQL</span><span>C++</span>
                    </div>
                  </div>
                  <div className={styles.skillCategory}>
                    <h3>Frameworks &amp; APIs</h3>
                    <div className={styles.skillTags}>
                      <span>FastAPI</span><span>Flask</span><span>React</span><span>Node.js</span><span>RESTful APIs</span><span>microservices</span><span>Nginx</span>
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
        </section>
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const personalInfo = getMockPersonalInfo();
  return { props: { personalInfo } };
};
