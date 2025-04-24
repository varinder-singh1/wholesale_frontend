'use client';

import { motion } from 'framer-motion';
import Head from 'next/head';

export default function TermsAndConditions() {
  return (
    <>
      <Head>
        <title>Terms and Conditions | Kayhan Audio</title>
        <meta name="description" content="Read the Terms and Conditions of Kayhan Audio's website." />
      </Head>

      <div className="container mx-auto px-4 py-10 text-black">
        <motion.h1
          className="text-3xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Wholesale Account Terms and Conditions
        </motion.h1>
        <motion.h3
          className="text-sm font-bold text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Kayhan Audio
          <br />
          updated Date: 24-04-2025

        </motion.h3>
        <motion.h3
          className="text-sm  text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
         These Terms and Conditions ("Agreement") govern the relationship between Kayhan Audio ("Kayhan Audio", "we", "our", or "us") and the wholesale account holder ("you", "your", or "the Partner"). By registering for a wholesale account, you agree to comply with the terms outlined below.
        </motion.h3>

        <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <motion.div
            className="w-full bg-white shadow-md rounded-2xl p-6 border hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl  mb-2">1. Eligibility</h2>
            <p className="text-gray-700">
            To be eligible for a wholesale account with Kayhan Audio, you must:
            </p>
            <li>Be a registered business entity or authorized representative engaged in the resale or installation of automotive electronics.</li>
            <li>Provide valid business documentation upon request.</li>
            <li>Operate in a manner consistent with Kayhan Audio’s brand and product standards.</li>
          </motion.div>

          <motion.div
            className="w-full bg-white shadow-md rounded-2xl p-6 border hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl font-semibold mb-2">2. Minimum Purchase Requirements</h2>
            <p className="text-gray-700">
            To maintain an active wholesale account, the following purchase targets must be met:
            </p>
            <li>	<span className='font-bold' >Annual Minimum:</span> AUD $20,000</li>
            <li>	<span className='font-bold' >	Monthly Average:</span> : AUD $1,666</li>
            <li>	<span className='font-bold' >	Weekly Average:</span>: AUD $384</li>
            <p className="text-gray-700">
            Kayhan Audio reserves the right to review and potentially suspend or close accounts that consistently fail to meet these targets over any rolling 3-month period.
            </p>
          </motion.div>

          <motion.div
            className="w-full bg-white shadow-md rounded-2xl p-6 border hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl font-semibold mb-2">3. Pricing and Confidentiality</h2>
            {/* <p className="text-gray-700">
            To be eligible for a wholesale account with Kayhan Audio, you must:
            </p> */}
            <li>	Wholesale pricing is exclusive and confidential</li>
            <li>	Prices are subject to change with or without prior notice. Updated price lists will be communicated accordingly.</li>
            <li>	Wholesale customers must not disclose pricing or sell below Kayhan Audio's suggested retail price (SRP) without written consent</li>
          </motion.div>

          <motion.div
            className="w-full bg-white shadow-md rounded-2xl p-6 border hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl font-semibold mb-2">4. Payment Terms</h2>
            <p className="text-gray-700">
            All wholesale purchases must be paid in full before any order is processed or shipped. Payment terms are strictly as follows:
            </p>
            <li>	•	Manual Invoice Orders: Payment must be made in full via bank transfer or approved payment method upon receipt of invoice. Orders will not be processed until payment is confirmed.</li>
            <li>	•	Online Orders: Payment must be made instantly at checkout. If payment fails or is incomplete, the order will not be placed or reserved.</li>
            <p className="text-gray-700">
            We do not offer credit terms. Continued failure to adhere to payment requirements may result in account suspension or revocation.
            </p>
          </motion.div>

         

          <motion.div
            className="w-full bg-white shadow-md rounded-2xl p-6 border hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl font-semibold mb-2">5. Ordering Process</h2>
            {/* <p className="text-gray-700">
              We strive to keep all information accurate and up to date. However, we do not guarantee: The website will always be error-free or available. Messages or requests sent through the website will be delivered. The accuracy or completeness of all website content. We reserve the right to change website content, including product descriptions and pricing, without prior notice.
            </p> */}
            <li>Orders must be placed through the Kayhan Audio wholesale portal or directly with an account representative.</li>
            <li>	Some products may require minimum order quantities (MOQs), which will be stated clearly</li>
            <li>	Once payment is confirmed, orders are typically processed within 1–3 business days.</li>
            <li>	Special Orders will take approximately 7 to 10 business days to process. You will be informed of the expected timeframe at the time of order confirmation</li>
          </motion.div>

          <motion.div
            className="w-full bg-white shadow-md rounded-2xl p-6 border hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl font-semibold mb-2">6. Shipping and Delivery</h2>
            <li>	Shipping charges are included in the total cost at the time of checkout on the website or in the manual invoice. No separate shipping fees are added</li>
            <li>		All orders are shipped using trusted courier services.</li>
            <li>	Once payment is confirmed, orders are typically processed within 1–3 business days.</li>
            <li>		Delivery timelines provided are estimates only and may vary based on destination, public holidays, or courier service availability</li>
          </motion.div>

          <motion.div
            className="w-full bg-white shadow-md rounded-2xl p-6 border hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl font-semibold mb-2">7. Returns and Warranty</h2>
            <li>	All products are covered under a 12-month manufacturer’s warranty for defects.</li>
            <li>			Faulty or damaged items must be reported within 7 days of delivery.</li>
            <li>	Once payment is confirmed, orders are typically processed within 1–3 business days.</li>
            <li>		Returns are only accepted with prior authorization. A restocking fee may apply for change-of-mind returns or incorrect orders placed by the buyer.</li>
          </motion.div>
          <motion.div
            className="w-full bg-white shadow-md rounded-2xl p-6 border hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl font-semibold mb-2">8. Use of Kayhan Audio Brand</h2>
            <li>	You agree to market and represent Kayhan Audio products accurately and professionally.</li>
            <li>Unauthorized modification of branding, product names, or packaging is strictly prohibited.</li>
            <li>•	All use of trademarks, logos, and promotional materials must be approved in writing by Kayhan Audio</li>
          </motion.div>
          <motion.div
            className="w-full bg-white shadow-md rounded-2xl p-6 border hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl font-semibold mb-2"> 9. Account Suspension or Termination</h2>
          <p>Kayhan Audio reserves the right to suspend or terminate your wholesale account under the following conditions:</p>
            <li>	Breach of any of the terms outlined in this Agreement.</li>
            <li>	Consistent failure to meet purchase or payment requirements</li>
            <li>Misrepresentation of the Kayhan Audio brand or products.</li>
            <p>In such cases, any outstanding invoices must be paid immediately, and no further orders will be accepted.</p>
          </motion.div>
          <motion.div
            className="w-full bg-white shadow-md rounded-2xl p-6 border hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl font-semibold mb-2">10. Limitation of Liability</h2>
            <p className="text-gray-700">
            To the extent permitted by law, Kayhan Audio shall not be liable for indirect, incidental, or consequential damages arising out of or related to wholesale transactions. Liability is limited to the replacement or refund of defective products in accordance with our warranty policy.
            </p>
          </motion.div>
        </motion.div>
        <motion.div
            className="w-full bg-white shadow-md rounded-2xl my-2 p-6 border hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl font-semibold mb-2">11. Governing Law</h2>
            <p className="text-gray-700">
            These terms and conditions are governed by and construed in accordance with the laws of the State of Victoria, Australia. You agree to submit to the exclusive jurisdiction of the courts located within Victoria for the resolution of any disputes.
            </p>
          </motion.div>
          <motion.div
            className="w-full bg-white shadow-md rounded-2xl p-6 border hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl font-semibold mb-2">12. Amendments</h2>
            <p className="text-gray-700">
            Kayhan Audio reserves the right to modify these Terms and Conditions at any time. Updated versions will be posted on our wholesale platform. Continued use of the wholesale account constitutes acceptance of any changes.
            </p>
          </motion.div>
        {/* </motion.div> */}
      </div>
    </>
  );
}
