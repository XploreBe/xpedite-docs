import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
    const {siteConfig} = useDocusaurusContext();
    return (
        <header className={styles.heroBanner}>
            <div className="container">
                <Heading as="h1" className="hero__title">
                    {siteConfig.title}
                </Heading>
                <p className="hero__subtitle">{siteConfig.tagline}</p>
                <div className={styles.buttons}>
                    <Link className="button button--primary button--lg" to="/docs/getting-started/quick-start">
                        Snelstart →
                    </Link>
                    <Link className="button button--secondary button--lg" to="/docs">
                        Documentatie
                    </Link>
                </div>
            </div>
        </header>
    );
}

function Feature({emoji, title, description}: {emoji: string; title: string; description: string}) {
    return (
        <div className="col col--4">
            <div className="text--center padding-horiz--md padding-vert--lg">
                <div style={{fontSize: '3rem'}}>{emoji}</div>
                <Heading as="h3">{title}</Heading>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default function Home(): ReactNode {
    const {siteConfig} = useDocusaurusContext();
    return (
        <Layout description={siteConfig.tagline}>
            <HomepageHeader />
            <main>
                <section style={{padding: '4rem 0'}}>
                    <div className="container">
                        <div className="row">
                            <Feature
                                emoji="🛡️"
                                title="Afgedwongen kwaliteitsstandaarden"
                                description="Hooks en skills die automatisch Checkstyle, PMD, JaCoCo en OpenRewrite toepassen — zodat de AI-output aan dezelfde lat voldoet als elke menselijke contributor."
                            />
                            <Feature
                                emoji="🔒"
                                title="Veilige, onbeheerde uitvoering"
                                description="Een sandboxinglaag met resourcelimieten en guardrails. Dien een taak in en loop gerust weg — Xpedite houdt de controle."
                            />
                            <Feature
                                emoji="📊"
                                title="Volledige observability"
                                description="Een realtime dashboard om agents te monitoren, logs te streamen, diffs te reviewen en kosten bij te houden."
                            />
                        </div>
                    </div>
                </section>
            </main>
        </Layout>
    );
}