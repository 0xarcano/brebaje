import type { ReactNode } from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Automated Trusted Setup Phase 2",
    Svg: require("@site/static/img/logo.svg").default,
    description: (
      <>
        <strong>Brebaje</strong> toolkit automates the setup, execution, coordination, and
        finalization of Phase 2 Trusted Setup ceremonies for one or more zkSNARK circuits— reducing
        time and operational overhead.
      </>
    ),
  },
  {
    title: "Agnostic, public-good toolkit",
    Svg: require("@site/static/img/docusaurus_with_flask.svg").default,
    description: (
      <>
        <strong>Brebaje</strong> aims to be ceremony-agnostic and usable by everyone—helping teams
        make their Groth16 zk applications safely production-ready by running Phase 2 Trusted Setup
        ceremonies.
      </>
    ),
  },
  {
    title: "Built by a community founded by experts from PSE",
    Svg: require("@site/static/img/test_tube.svg").default,
    description: (
      <>
        Formerly known as the MPC Phase 2 Suite, <strong>Brebaje</strong> is a project born from the
        <strong> MACI/QFI</strong> team at <strong>PSE</strong> and maintained by a commited
        community, bringing engineering, security, and operational rigor to multi-circuit
        ceremonies.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
