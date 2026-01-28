"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
// import TermsModal from "./TermsModal";
import Head from 'next/head';

const TermCondition = () => {
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-start">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => {
            if (!checked) {
              e.preventDefault();
              setOpen(true); // open modal instead of checking
            } else {
              setChecked(false);
            }
          }}
          required
          className="mt-1"
        />

        <p className="mx-2 text-sm">
          I have read and agree to the{" "}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="text-blue-600 underline"
          >
            Terms & Conditions
          </button>
        </p>
      </div>

      <TermsModal
        open={open}
        onClose={() => setOpen(false)}
        onAgree={() => {
          setChecked(true);
          setOpen(false);
        }}
      />
    </>
  );
};

export default TermCondition;






import { motion } from "framer-motion";

interface Props {
  open: boolean;
  onClose: () => void;
  onAgree: () => void;
}

const TermsModal = ({ open, onClose, onAgree }: Props) => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (open) {
      setHasScrolled(false);
      setChecked(false);
    }
  }, [open]);

  if (!open) return null;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      setHasScrolled(true);
    }
  };

  const canAgree = hasScrolled && checked;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white w-full max-w-4xl rounded-xl shadow-lg overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 border-b font-semibold text-lg">
          Wholesale Terms & Conditions (B2B)
        </div>

        {/* Scrollable Body */}
        <div
          onScroll={handleScroll}
          className="p-6 max-h-[60vh] overflow-y-auto space-y-4 text-sm leading-relaxed"
        >
          <p><strong>Effective Date:</strong> 01 February 2026</p>

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
        </div>

        {/* Checkbox */}
        <div className="px-6 py-3 border-t flex gap-2 text-sm">
          <input
            type="checkbox"
            disabled={!hasScrolled}
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
          <label>
            I have read and agree to the Wholesale Terms & Conditions
          </label>
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={onAgree}
            disabled={!canAgree}
            className={`px-4 py-2 rounded text-white ${
              canAgree
                ? "bg-black hover:bg-gray-800"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            I Agree
          </button>
        </div>
      </motion.div>
    </div>
  );
};


import { ReactNode } from "react";

interface SectionProps {
  title: string;
  children: ReactNode;
}

const Section = ({ title, children }: SectionProps) => (
  <motion.div
    className="bg-gray-50 rounded-lg p-4 border"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <h3 className="font-semibold mb-1">{title}</h3>
    <div className="text-gray-700">{children}</div>
  </motion.div>
);

