import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import ProjectThumbnail from '../components/ProjectThumbnail';
import StatCounter from '../components/StatCounter';
import ContactForm from '../components/ContactForm';
import NorleaseCard from '../components/NorleaseCard';
import Reveal from '../components/Reveal';
import SEO from '../components/SEO';
import { getMockProjects, getMockPersonalInfo, Project, PersonalInfo } from '../lib/wordpress';
import { insuranceStats } from '../lib/insuranceServices';
import styles from '../styles/Home.module.css';

// Homepage highlights — edit this list to change which projects appear here.
const FEATURED_PROJECT_IDS = [10, 9, 1];

const FEATURED_SUMMARIES: Record<number, string> = {
  10: 'Resume Engine rewrites career achievements into role-aligned narratives with ATS-aware language, secure PDF export, and semantic resume optimization for hiring pipelines.',
  9: 'LEON is a voice-first adaptive learning platform that listens, understands, and responds with natural speech, generating personalized curricula, spaced repetition reviews, and quizzes.',
  1: 'Video Understanding brings multimodal perception, scene segmentation, and timeline analysis together in a demo-ready platform for research and product development.',
};

interface HomeProps {
  projects: Project[];
  personalInfo: PersonalInfo;
}

const MAX_HOME_TECHNOLOGIES = 5;

function formatTechnologies(technologies?: string): string {
  if (!technologies) return 'Software Development';
  const items = technologies.split('·').map((t) => t.trim()).filter(Boolean);
  return items.slice(0, MAX_HOME_TECHNOLOGIES).join(' · ');
}

export default function Home({ projects, personalInfo }: HomeProps) {
  const featuredProjects = FEATURED_PROJECT_IDS
    .map((id) => projects.find((project) => project.id === id))
    .filter(Boolean) as Project[];

  return (
    <>
      <SEO canonical="/" ogType="profile" isProfilePage />

      <Layout personalInfo={personalInfo}>
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroGrid}>
              <div className={styles.heroText}>
                <span className={styles.eyebrow}>Bio</span>
                <h1 className={styles.heroTitle}>Achyut Niroula</h1>
                <p className={styles.heroBio}>
                  {personalInfo.bio}
                </p>
                <div className={styles.heroLinks}>
                  <a href="#projects">View projects</a>
                  <a href="#finance">Financial services</a>
                  <a href={personalInfo.resume_url} download>Download resume</a>
                </div>
              </div>

              <div className={styles.heroPhotoFrame}>
                <Image
                  src={personalInfo.profile_image}
                  alt="Portrait of Achyut Niroula"
                  width={520}
                  height={640}
                  className={styles.heroPhoto}
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} id="projects">
          <div className="container">
            <Reveal>
              <h2 className={styles.eyebrow}>Projects</h2>
              <hr className="rule" />
            </Reveal>

            <Reveal>
              <NorleaseCard />
            </Reveal>

            <div className={styles.projectList}>
              {featuredProjects.map((project, index) => (
                <Reveal key={project.id} className={styles.projectRow} delay={index * 0.08}>
                  <div className={styles.projectRowBox}>
                    <ProjectThumbnail projectId={project.id} />
                  </div>
                  <div className={styles.projectRowInfo}>
                    <h3>{project.title.rendered}</h3>
                    <p>{FEATURED_SUMMARIES[project.id] || 'A hand-crafted software project focused on intelligent systems and thoughtful architecture.'}</p>
                    <span className={styles.projectRowMeta}>{formatTechnologies(project.acf?.technologies)}</span>
                  </div>
                </Reveal>
              ))}
            </div>

            <Link href="/projects" className={styles.moreLink}>View all projects</Link>
          </div>
        </section>

        <section className={styles.section} id="finance">
          <div className="container">
            <Reveal>
              <h2 className={styles.eyebrow}>Finance</h2>
              <hr className="rule" />
            </Reveal>

            <Reveal className={styles.insuranceIntro}>
              <p>
                Licensed under Ontario&apos;s LLQP, I help individuals and families choose the right coverage —
                from term life to group benefits — with straightforward, no-pressure guidance.
              </p>
            </Reveal>

            <div className={styles.statsRow}>
              <StatCounter label="Services offered" value={insuranceStats.servicesOffered} suffix="+" />
              <StatCounter label="Clients helped" value={insuranceStats.clientsHelped} suffix="+" />
              <StatCounter label="in deposits processed" value={insuranceStats.premiumPlaced} prefix="$" suffix="+" />
            </div>

            <Link href="/insurance" className={styles.moreLink}>View products</Link>
          </div>
        </section>

        <section className={styles.section} id="contact">
          <div className="container">
            <Reveal>
              <h2 className={`${styles.eyebrow} ${styles.eyebrowStrong}`}>Get in touch</h2>
              <hr className="rule" />
            </Reveal>

            <Reveal>
              <ContactForm email={personalInfo.email} />
            </Reveal>
          </div>
        </section>
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const projects = getMockProjects();
  const personalInfo = getMockPersonalInfo();

  return {
    props: {
      projects,
      personalInfo,
    },
  };
};
