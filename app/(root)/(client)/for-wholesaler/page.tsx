import { Mail, PhoneCall } from 'lucide-react';
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

import { Header } from '@/components/Layout';
import { Link } from '@/components/Link';
import { siteConfig } from '@/config/site';

const ForSellersPage = () => (
  <main>
    <Header title="Contact Us" description="Contact us for more information about our products and services."></Header>
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-3 px-10 *:rounded-2xl *:border *:p-6 *:shadow-lg md:grid-cols-3 md:px-0">
      <Link href={``} className="flex items-start gap-2 hover:ring-2 md:justify-center">
        <Mail /> Send an Email
      </Link>
      <Link href={siteConfig.links.whatsapp} className="flex items-start gap-2 hover:ring-2 md:justify-center">
        <FaWhatsapp className="text-2xl" /> Send a Message on WhatsApp
      </Link>
      <Link href={`tel:${siteConfig.links.phone}`} className="flex items-start gap-2 hover:ring-2 md:justify-center">
        <PhoneCall /> Call us
      </Link>
    </div>
  </main>
);

export default ForSellersPage;
