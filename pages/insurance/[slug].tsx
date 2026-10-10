import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../../components/Layout';
import SEO from '../../components/SEO';
import Reveal from '../../components/Reveal';
import { useReveal } from '../../lib/useReveal';
import { getMockPersonalInfo, PersonalInfo } from '../../lib/wordpress';
import {
  insuranceServices,
  getInsuranceServiceBySlug,
  insuranceDisclaimer,
  independentAdviceNote,
} from '../../lib/insuranceServices';
import { segregatedFunds, ulInvestmentAccounts, fundDataAsOf } from '../../lib/segFunds';
import FundTable from '../../components/insurance/FundTable';
import SegFundGuaranteeChart from '../../components/insurance/charts/SegFundGuaranteeChart';
import EstateTaxChart from '../../components/insurance/charts/EstateTaxChart';
import TermLifePremiumChart from '../../components/insurance/charts/TermLifePremiumChart';
import DisabilityElimPeriodChart from '../../components/insurance/charts/DisabilityElimPeriodChart';
import WholeLifeCashValueChart from '../../components/insurance/charts/WholeLifeCashValueChart';
import { getInsuranceDeepDive, DeepDiveTable, Lead } from '../../lib/insuranceDeepDives';
import styles from '../../styles/InsuranceDetail.module.css';

function DeepTable({ table }: { table: DeepDiveTable }) {
  return (
    <div className={styles.tableWrap}>
      <table className={`${styles.table}${table.headers.length >= 3 ? ` ${styles.tableStackMobile}` : ''}`}>
        <thead>
          <tr>
            {table.headers.map((header, i) => (
              <th key={i}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} data-label={table.headers[j]}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LeadList({ items, className }: { items: Lead[]; className: string }) {
  return (
    <ul className={className}>
      {items.map((item, i) => (
        <li key={i}>
          <strong>{item.lead}</strong> {item.text}
        </li>
      ))}
    </ul>
  );
}

interface InsuranceDetailProps {
  slug: string;
  personalInfo: PersonalInfo;
}

export default function InsuranceDetail({ slug, personalInfo }: InsuranceDetailProps) {
  const service = getInsuranceServiceBySlug(slug);
  const { ref: heroRef, visible: heroVisible } = useReveal<HTMLDivElement>(0.3);

  if (!service) return null;

  const Icon = service.icon;
  const Diagram = service.diagram;
  const { comparisonTable, howItWorks, costFactors, faqs, watchFor, exampleWalkthrough, advantageNote } = service.detail;
  const deep = getInsuranceDeepDive(slug);

  return (
    <>
      <SEO
        title={`${service.name} Insurance`}
        description={service.detail.summary}
        canonical={`/insurance/${slug}/`}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Insurance', path: '/insurance/' },
          { name: service.name, path: `/insurance/${slug}/` },
        ]}
      />

      <Layout personalInfo={personalInfo}>
        <section className={styles.section}>
          <div className="container">
            {/* 1. Hero */}
            <Reveal>
              <Link href="/insurance" className={styles.backLink}>← All insurance services</Link>
              <span className="eyebrow">Insurance</span>
              <h1 className={styles.title}>{service.name}</h1>
              <p className={styles.summary}>{service.detail.summary}</p>
            </Reveal>

            {deep && (
              <Reveal delay={0.05}>
                <figure className={styles.heroPhoto}>
                  <Image
                    src={`/images/insurance/${slug}.webp`}
                    alt={service.photoAlt}
                    width={1200}
                    height={800}
                    priority
                    className={styles.heroPhotoImg}
                  />
                  <figcaption className={styles.heroPhotoCaption}>
                    <span className={styles.heroPhotoHeading}>{deep.photo.heading}</span>
                    <span>{deep.photo.caption}</span>
                  </figcaption>
                </figure>
              </Reveal>
            )}

            <div ref={heroRef} data-reveal className={`${styles.heroDiagram}${heroVisible ? ' is-visible' : ''}`} style={{ '--reveal-delay': '0.1s' } as React.CSSProperties}>
              <Icon active={heroVisible} />
            </div>

            {/* 2. What it is */}
            <div className={styles.sectionBlock}>
              <Reveal>
                <span className="eyebrow">What it is</span>
                <h2 className={styles.sectionHeading}>The basics</h2>
                <div className={styles.bodyText}>
                  {service.detail.whatItIs.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* 2b. From zero */}
            {deep && (
              <div className={styles.sectionBlock}>
                <Reveal>
                  <span className="eyebrow">From zero</span>
                  <h2 className={styles.sectionHeading}>{deep.fromZero.heading}</h2>
                  <div className={styles.bodyText}>
                    {deep.fromZero.intro.map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                  <p className={styles.subHeading}>{deep.fromZero.splitHeading}</p>
                  <ol className={styles.splitList}>
                    {deep.fromZero.split.map((item, i) => (
                      <li key={i}>
                        <strong>{item.lead}:</strong> {item.text}
                      </li>
                    ))}
                  </ol>
                  <div className={styles.proCon}>
                    <div>
                      <p className={styles.subHeading}>Why people like it</p>
                      <ul className={styles.bulletList}>
                        {deep.fromZero.likes.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className={styles.subHeading}>Why it can bite</p>
                      <ul className={styles.watchList}>
                        {deep.fromZero.bites.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <p className={styles.leadPara}>
                    <strong>{deep.fromZero.keyQuestion.lead}</strong> {deep.fromZero.keyQuestion.text}
                  </p>
                  <blockquote className={styles.plainTerms}>
                    <span className={styles.plainTermsLabel}>In plain terms</span>
                    {deep.fromZero.plainTerms}
                  </blockquote>
                </Reveal>
              </div>
            )}

            {/* 3. How it works — step by step */}
            <div className={styles.sectionBlock}>
              <Reveal>
                <span className="eyebrow">How it works</span>
                <h2 className={styles.sectionHeading}>Step by step</h2>
                <ol className={styles.stepList}>
                  {howItWorks.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </Reveal>
            </div>

            {/* 3b. What drives the cost */}
            <div className={styles.sectionBlock}>
              <Reveal>
                <span className="eyebrow">Pricing</span>
                <h2 className={styles.sectionHeading}>What drives the cost</h2>
                <ul className={styles.factorList}>
                  {costFactors.map((factor, i) => (
                    <li key={i}>{factor}</li>
                  ))}
                </ul>
              </Reveal>
            </div>

            {deep && (
              <>
                {/* 3b-1. Structures */}
                <div className={styles.sectionBlock}>
                  <Reveal>
                    <span className="eyebrow">Structures</span>
                    <h2 className={styles.sectionHeading}>{deep.structures.heading}</h2>
                    <p className={styles.tableIntro}>{deep.structures.intro}</p>
                    <DeepTable table={deep.structures.table} />
                    <p className={styles.leadPara}>
                      <strong>{deep.structures.forYou.lead}</strong> {deep.structures.forYou.text}
                    </p>
                    <p className={styles.subHeading}>Other design terms you will hear</p>
                    <LeadList items={deep.structures.otherTerms} className={styles.leadList} />
                  </Reveal>
                </div>

                {/* 3b-2. What's inside */}
                <div className={styles.sectionBlock}>
                  <Reveal>
                    <span className="eyebrow">Inside the product</span>
                    <h2 className={styles.sectionHeading}>{deep.inside.heading}</h2>
                    <p className={styles.tableIntro}>{deep.inside.intro}</p>
                    <DeepTable table={deep.inside.table} />
                    <p className={styles.subHeading}>Key points to explain</p>
                    <LeadList items={deep.inside.keyPoints} className={styles.leadList} />
                    <p className={styles.leadPara}>
                      <strong>{deep.inside.rule.lead}</strong> {deep.inside.rule.text}
                    </p>
                  </Reveal>
                </div>

                {/* 3b-3. Canadian tax rules */}
                <div className={styles.sectionBlock}>
                  <Reveal>
                    <span className="eyebrow">Tax</span>
                    <h2 className={styles.sectionHeading}>{deep.tax.heading}</h2>
                    <p className={styles.tableIntro}>{deep.tax.intro}</p>
                    <ol className={styles.ruleList}>
                      {deep.tax.rules.map((rule, i) => (
                        <li key={i}>
                          <strong>{rule.lead}</strong> {rule.text}
                        </li>
                      ))}
                    </ol>
                  </Reveal>
                </div>
              </>
            )}

            {/* 3c. Comparison table */}
            <div className={styles.sectionBlock}>
              <Reveal>
                <span className="eyebrow">At a glance</span>
                <h2 className={styles.sectionHeading}>{comparisonTable.title}</h2>
                <div className={styles.tableWrap}>
                  <table className={`${styles.table}${comparisonTable.headers.length >= 3 ? ` ${styles.tableStackMobile}` : ''}`}>
                    <thead>
                      <tr>
                        {comparisonTable.headers.map((header, i) => (
                          <th key={i}>{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonTable.rows.map((row, i) => (
                        <tr key={i}>
                          {row.map((cell, j) => (
                            <td key={j} data-label={comparisonTable.headers[j]}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Reveal>
              {advantageNote && (
                <Reveal className={styles.advantageBox} delay={0.08}>
                  {advantageNote.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </Reveal>
              )}
            </div>

            {/* 3d. Alternatives */}
            {deep && (
              <div className={styles.sectionBlock}>
                <Reveal>
                  <span className="eyebrow">Alternatives</span>
                  <h2 className={styles.sectionHeading}>{deep.alternatives.heading}</h2>
                  <p className={styles.tableIntro}>{deep.alternatives.intro}</p>
                  <DeepTable table={deep.alternatives.table} />
                  <p className={styles.subHeading}>Quick takes</p>
                  <ul className={styles.bulletList}>
                    {deep.alternatives.quickTakes.map((take, i) => (
                      <li key={i}>{take}</li>
                    ))}
                  </ul>
                  <p className={styles.leadPara}>
                    <strong>{deep.alternatives.honest.lead}</strong> {deep.alternatives.honest.text}
                  </p>
                </Reveal>
              </div>
            )}

            {/* 4. Visual breakdown */}
            <div className={styles.sectionBlock}>
              <Reveal>
                <span className="eyebrow">Visual breakdown</span>
                <h2 className={styles.sectionHeading}>How the mechanism works</h2>
              </Reveal>
              <Reveal className={styles.breakdownDiagram} delay={0.08}>
                <Diagram />
              </Reveal>
            </div>

            {/* 5. Who it's typically for */}
            <div className={styles.sectionBlock}>
              <Reveal>
                <span className="eyebrow">Who it&apos;s typically for</span>
                <h2 className={styles.sectionHeading}>Is this a fit?</h2>
                <ul className={styles.bulletList}>
                  {service.detail.whoItsFor.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </Reveal>
            </div>

            {/* 5b. Watch for */}
            <div className={styles.sectionBlock}>
              <Reveal>
                <span className="eyebrow">Watch for</span>
                <h2 className={styles.sectionHeading}>Things to keep an eye on</h2>
                <ul className={styles.watchList}>
                  {watchFor.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </Reveal>
            </div>

            {/* 5c. FAQs */}
            <div className={styles.sectionBlock}>
              <Reveal>
                <span className="eyebrow">Common questions</span>
                <h2 className={styles.sectionHeading}>FAQs</h2>
                <div className={styles.faqList}>
                  {faqs.map((faq, i) => (
                    <div key={i} className={styles.faqItem}>
                      <p className={styles.faqQuestion}>{faq.question}</p>
                      <p className={styles.faqAnswer}>{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Available funds — segregated-funds and whole-life (Equitable Generations UL) only */}
            {(slug === 'segregated-funds' || slug === 'whole-life') && (
              <div className={styles.sectionBlock}>
                <Reveal>
                  <span className="eyebrow">Available funds</span>
                  <h2 className={styles.sectionHeading}>
                    {slug === 'segregated-funds' ? 'Equitable GIF segregated fund lineup' : 'Equitable Generations™ investment accounts'}
                  </h2>
                  <p className={styles.tableIntro}>
                    Data as of {fundDataAsOf}, sourced from Equitable&apos;s public fund tool. A representative subset
                    spanning every asset class and risk band shown here — not the full lineup of several hundred
                    share-class variants. MER varies by the guarantee level you choose (75/75, 75/100, or 100/100)
                    for segregated funds; the figure shown is one representative series.{' '}
                    {slug === 'segregated-funds'
                      ? 'This covers current Equitable GIF contracts only — legacy contracts (Pivotal Select, Pivotal Solutions, Pivotal Solutions II, Personal Investment Portfolio) have a separate, closed fund lineup.'
                      : 'Equitable Generations™ is the current universal life series; Equation Generation IV and other Equation-series contracts are legacy products with their own fund lineup.'}
                  </p>
                  <FundTable
                    funds={slug === 'segregated-funds' ? segregatedFunds : ulInvestmentAccounts}
                    showRisk={slug === 'segregated-funds'}
                  />
                  <p className={styles.disclaimer}>
                    Past performance does not guarantee future results. Fund values fluctuate and are invested at the
                    contract holder&apos;s risk. Read the Contract and Information Folder before investing.{' '}
                    <a
                      href={slug === 'segregated-funds' ? 'https://equitablelife.fundata.com/' : 'https://equitableul.fundata.com/'}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      See the complete, current fund list ↗
                    </a>
                  </p>
                </Reveal>
              </div>
            )}

            {/* 6. Illustrative example */}
            <Reveal className={styles.exampleBox}>
              <span className={styles.exampleLabel}>Illustrative example only — not a quote</span>
              <div className={styles.exampleSteps}>
                {exampleWalkthrough.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
              <p className={styles.disclaimer}>{insuranceDisclaimer} Figures are rounded for illustration and will differ from your actual quote.</p>
            </Reveal>

            {/* 6b. Visualized */}
            {slug === 'segregated-funds' && (
              <div className={styles.sectionBlock}>
                <Reveal>
                  <span className="eyebrow">Visualized</span>
                  <h2 className={styles.sectionHeading}>The guarantee and the estate bypass, charted</h2>
                  <SegFundGuaranteeChart />
                  <EstateTaxChart />
                </Reveal>
              </div>
            )}
            {slug === 'term-life' && (
              <div className={styles.sectionBlock}>
                <Reveal>
                  <span className="eyebrow">Visualized</span>
                  <h2 className={styles.sectionHeading}>Cost by age at purchase</h2>
                  <TermLifePremiumChart />
                </Reveal>
              </div>
            )}
            {slug === 'disability' && (
              <div className={styles.sectionBlock}>
                <Reveal>
                  <span className="eyebrow">Visualized</span>
                  <h2 className={styles.sectionHeading}>The elimination period trade-off</h2>
                  <DisabilityElimPeriodChart />
                </Reveal>
              </div>
            )}
            {slug === 'whole-life' && (
              <div className={styles.sectionBlock}>
                <Reveal>
                  <span className="eyebrow">Visualized</span>
                  <h2 className={styles.sectionHeading}>Premiums vs. cash value, over time</h2>
                  <WholeLifeCashValueChart />
                </Reveal>
              </div>
            )}

            <p className={styles.adviceNote}>{independentAdviceNote}</p>

            {/* 7. Learn more */}
            <Reveal className={styles.calloutBox}>
              <span className={styles.calloutLabel}>Learn more</span>
              <div className={styles.calloutLinks}>
                {service.detail.learnMore.map((link) => (
                  <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className={styles.calloutLink}>
                    <span className={styles.calloutLinkLabel}>{link.label} ↗</span>
                    <span className={styles.calloutLinkNote}>{link.note}</span>
                  </a>
                ))}
              </div>
            </Reveal>

            {/* 8. Back + CTA */}
            <Reveal className={styles.ctaRow}>
              <Link href="/insurance" className={styles.secondaryLink}>← Back to insurance services</Link>
              <Link href="/#contact" className={styles.primaryLink}>Get in touch</Link>
            </Reveal>
          </div>
        </section>
      </Layout>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: insuranceServices.map((service) => ({ params: { slug: service.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const personalInfo = getMockPersonalInfo();
  return { props: { slug, personalInfo } };
};
