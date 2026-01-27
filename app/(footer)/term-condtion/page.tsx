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
          content="Wholesale Terms & Conditions for Kayhan Audio business customers."
        />
      </Head>

      <div className="container mx-auto px-4 py-10 text-black">
        <motion.h1
          className="text-3xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Wholesale Terms & Conditions
        </motion.h1>

        <motion.p
          className="text-sm text-center mb-8 text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Kayhan Audio<br />
          Effective Date: 01 February 2026
        </motion.p>

        <motion.p
          className="text-sm text-center mb-10 max-w-3xl mx-auto text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          These Wholesale Terms & Conditions (“Terms”) apply to all wholesale
          accounts and transactions between Kayhan Audio and approved wholesale
          customers. By applying for or using a wholesale account, you confirm
          that goods are acquired in the course of business and agree to be bound
          by these Terms.
        </motion.p>

        <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

          {/* 1 */}
          <Section title="1. Purpose">
            These Terms regulate the approval, operation, and ongoing use of a
            Kayhan Audio wholesale account, including the supply of products for
            resale, installation, or commercial distribution.
          </Section>

          {/* 2 */}
          <Section title="2. Wholesale Application & Verification">
            <ul className="list-disc pl-5 space-y-2">
              <li>Wholesale accounts are available only to bona fide businesses in the automotive audio or electronics industry.</li>
              <li>You must provide accurate and current business information.</li>
              <li>Kayhan Audio may request proof of industry operation, trade references, business registration, or photo ID.</li>
            </ul>
          </Section>

          {/* 3 */}
          <Section title="3. Minimum Purchase Requirements">
            <p>
              The minimum annual wholesale spend is <strong>AUD $20,000</strong>.
              Kayhan Audio may monitor account performance and suspend or close
              accounts that fail to meet this requirement.
            </p>
          </Section>

          {/* 4 */}
          <Section title="4. Wholesale Pricing & Confidentiality">
            <ul className="list-disc pl-5 space-y-2">
              <li>Wholesale pricing is strictly confidential.</li>
              <li>Pricing must not be disclosed, published, or shared with third parties.</li>
              <li>Wholesale pricing must not be used for personal or misleading consumer sales.</li>
            </ul>
          </Section>

          {/* 5 */}
          <Section title="5. Orders & Payment">
            <ul className="list-disc pl-5 space-y-2">
              <li>All orders are prepaid unless otherwise agreed in writing.</li>
              <li>Kayhan Audio may change payment methods or account terms at its discretion.</li>
              <li>Orders will not be processed until payment is received in full.</li>
            </ul>
          </Section>

          {/* 6 */}
          <Section title="6. Shipping, Collection & Risk">
            <ul className="list-disc pl-5 space-y-2">
              <li>Shipping costs and delivery times vary by location.</li>
              <li>Risk passes to the buyer upon dispatch or collection.</li>
              <li>Delivery timeframes are estimates only.</li>
            </ul>
          </Section>

          {/* 7 */}
          <Section title="7. Warranty & Returns">
            <ul className="list-disc pl-5 space-y-2">
              <li>Products are supplied with a 12-month manufacturer warranty.</li>
              <li>Warranty does not cover misuse, incorrect installation, or modification.</li>
              <li>Returns require prior written approval.</li>
            </ul>
          </Section>

          {/* 8 */}
          <Section title="8. Marketing & Branding">
            <ul className="list-disc pl-5 space-y-2">
              <li>Kayhan Audio branding must not be altered or misrepresented.</li>
              <li>Brand assets may only be used with written approval.</li>
            </ul>
          </Section>

          {/* 9 */}
          <Section title="9. Account Suspension or Termination">
            Kayhan Audio may suspend or terminate a wholesale account for breach
            of these Terms, inactivity, misleading conduct, or commercial risk.
          </Section>

          {/* 10 */}
          <Section title="10. Limitation of Liability">
            To the extent permitted by law, Kayhan Audio’s liability is limited
            to repair, replacement, or refund of goods supplied.
          </Section>

          {/* 11 */}
          <Section title="11. Governing Law">
            These Terms are governed by the laws of Victoria, Australia. You
            submit to the exclusive jurisdiction of Victorian courts.
          </Section>

          {/* 12 */}
          <Section title="12. Amendments">
            Kayhan Audio may amend these Terms at any time. Continued use of a
            wholesale account constitutes acceptance of updated Terms.
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
    transition={{ duration: 0.5 }}
  >
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    <div className="text-gray-700">{children}</div>
  </motion.div>
);
