import { Mail, PhoneCall } from 'lucide-react';
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

import { Header } from '@/components/Layout';

const ForSellersPage = () => (
  <main>
    <Header title="Contact Us" description="Contact us for more information about our products and services."></Header>
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-3 px-10 *:rounded-2xl *:border *:p-6 *:shadow-lg md:grid-cols-3 md:px-0">
      <div className="flex items-start gap-2 hover:ring-2 md:justify-center">
        <Mail /> Send an Email
      </div>
      <div className="flex items-start gap-2 hover:ring-2 md:justify-center">
        <FaWhatsapp className="text-2xl" /> Send a Message on WhatsApp
      </div>
      <div className="flex items-start gap-2 hover:ring-2 md:justify-center">
        <PhoneCall /> Call us
      </div>
    </div>
  </main>
);

export default ForSellersPage;
