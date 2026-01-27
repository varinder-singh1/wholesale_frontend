'use client';

import { motion } from 'framer-motion';
import Head from 'next/head';

export default function TermsAndConditions() {
  return (
    <>
      <Head>
        <title>Wholesale Terms & Conditions | Kayhan Audio</title>
        <meta
          name="description"
          content="Kayhan Audio – Wholesale Terms & Conditions (Business-to-Business)."
        />
      </Head>

      <div className="container mx-auto px-4 py-10 text-black">
        <motion.h1
          className="text-3xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Wholesale Terms & Conditions (Business-to-Business)
        </motion.h1>

        <motion.p
          className="text-sm text-center mb-6 text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Effective Date: 01 February 2026<br />
          Last Updated: 01 February 2026
        </motion.p>

        <motion.p
          className="text-sm text-center mb-10 max-w-4xl mx-auto text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          These Wholesale Terms & Conditions (Terms) apply to all wholesale
          accounts, transactions, and dealings between Kayhan Audio of Unit 3,
          151 Dohertys Rd, Laverton North VIC 3026 (Kayhan Audio, we, us, our) and
          any approved wholesale customer (Wholesaler, you, your).
          <br /><br />
          By applying for, accessing, or using a Kayhan Audio wholesale account,
          you acknowledge and agree that goods are acquired in the course of
          carrying on a business, and that these Terms are legally binding.
        </motion.p>

        <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

          <Section title="1. Purpose">
            These Terms regulate the application, approval, operation, and
            ongoing use of a Kayhan Audio wholesale account, including the supply
            of products at wholesale pricing for resale, installation, or
            commercial distribution.
          </Section>

          <Section title="2. Wholesale Application & Verification">
            Wholesale accounts are available strictly to bona fide businesses
            operating within the automotive audio/electronics industry or
            closely related trade industries.
            <br /><br />
            You must provide complete, accurate, and current information and
            promptly notify Kayhan Audio of any changes.
          </Section>

          <Section title="2.1 Proof of Industry Operation">
            Kayhan Audio may require one or more of the following:
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Automotive workshop or installer licence/registration (where applicable)</li>
              <li>Business registration evidencing automotive-related activity</li>
              <li>Two (2) trade references from recognised suppliers</li>
              <li>Photos of shopfront, workshop, signage, or fitment facilities</li>
              <li>Invoices or purchase history from relevant suppliers</li>
            </ul>
          </Section>

          <Section title="2.2 Proof of Ownership or Authority">
            Kayhan Audio may require ASIC/ABR extracts, business registration
            certificates, and government-issued photo ID to verify ownership
            and/or authority to act on behalf of the business.
          </Section>

          <Section title="3. Minimum Purchase Requirements">
            Minimum annual wholesale spend: <strong>AUD $20,000</strong>. Account
            performance may be monitored and reviewed.
          </Section>

          <Section title="4. Wholesale Pricing & Use Restrictions">
            Wholesale pricing is confidential and must not be disclosed,
            published, or shared with any third party.
            <br /><br />
            Wholesale pricing must not be used for personal purchases, consumer
            resale that misrepresents the relationship with Kayhan Audio, or any
            other misuse as determined by Kayhan Audio.
          </Section>

          <Section title="5. Orders & Payment">
            All orders are prepaid unless otherwise agreed by Kayhan Audio in
            writing.
            <br /><br />
            Kayhan Audio may set or change payment methods, credit limits (if
            any), and account terms at its discretion.
          </Section>

          <Section title="6. Shipping, Collection & Risk">
            Shipping costs and delivery timeframes vary by location and carrier.
            <br /><br />
            Risk in the goods passes to you upon dispatch from Kayhan Audio’s
            premises (or upon collection, if collected by you or your carrier).
          </Section>

          <Section title="7. Warranty, Returns & Support">
            Unless otherwise stated in writing, products are supplied with a
            12-month manufacturer warranty.
            <br /><br />
            Warranty does not cover damage caused by incorrect installation,
            misuse, modification, accident, water ingress, or unauthorised
            repairs.
            <br /><br />
            Return requests must be submitted to Kayhan Audio for approval prior
            to sending any goods back.
          </Section>

          <Section title="8. Marketing, Branding & Listings">
            You must not alter, distort, or misrepresent Kayhan Audio branding,
            product names, specifications, or imagery.
            <br /><br />
            Any Kayhan Audio brand assets provided to you may only be used to
            promote Kayhan Audio products and must be used in accordance with
            any brand guidelines provided.
          </Section>

          <Section title="9. Compliance & Conduct">
            You must comply with all applicable Australian laws and regulations,
            including the Australian Consumer Law (ACL) where relevant.
            <br /><br />
            You must not engage in misleading or deceptive conduct, false
            advertising, or any conduct that may harm Kayhan Audio’s reputation.
          </Section>

          <Section title="10. Account Suspension or Termination">
            Kayhan Audio may suspend or terminate a wholesale account at any
            time if:
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>you breach these Terms</li>
              <li>you provide false, misleading, or incomplete information</li>
              <li>your account is inactive for an extended period</li>
              <li>you fail to meet minimum purchase requirements</li>
              <li>Kayhan Audio reasonably believes continued supply may cause commercial, legal, or reputational risk</li>
            </ul>
          </Section>

          <Section title="11. Confidentiality">
            All wholesale information (including pricing, product releases,
            account terms, and commercial arrangements) is confidential.
            <br /><br />
            You must not disclose confidential information to any third party
            without Kayhan Audio’s prior written consent.
          </Section>

          <Section title="12. Australian Consumer Law (Trade Supply)">
            Nothing in these Terms excludes, restricts, or modifies any rights
            you may have under the ACL that cannot legally be excluded.
            <br /><br />
            To the extent permitted by law, Kayhan Audio’s liability is limited
            (at Kayhan Audio’s option) to repair, replacement, or refund of the
            goods, or resupply of services.
          </Section>

          <Section title="13. Amendments">
            Kayhan Audio may amend these Terms from time to time. Updated Terms
            will be published and/or provided to wholesale account holders.
            Continued use of the wholesale account after changes take effect
            constitutes acceptance of the updated Terms.
          </Section>

          <Section title="14. General">
            These Terms are governed by the laws of Victoria, Australia.
            <br /><br />
            If any provision is found to be invalid or unenforceable, the
            remaining provisions remain in full force and effect.
            <br /><br />
            These Terms form the entire agreement between the parties regarding
            wholesale supply, unless otherwise agreed in writing.
          </Section>

        </motion.div>
      </div>
    </>
  );
}

/* Reusable Section Component */
const Section = ({ title, children }: any) => (
  <motion.div
    className="w-full bg-white shadow-md rounded-2xl p-6 border hover:shadow-xl transition-all duration-300"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    <div className="text-gray-700 text-sm leading-relaxed">{children}</div>
  </motion.div>
);
