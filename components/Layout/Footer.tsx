import React from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

import { LocationPinIcon, MailIcon, PhoneIcon } from '@/components/Icons';
import { Image } from '@/components/Image';
import { Link } from '@/components/Link';
import { siteConfig } from '@/config/site';

const Social = [
  {
    name: 'Instagram',
    href: siteConfig.links.instagram,
    icon: FaInstagram,
  },
  {
    name: 'WhatsApp',
    href: siteConfig.links.whatsapp,
    icon: FaWhatsapp,
  },
  {
    name: 'Facebook',
    href: siteConfig.links.facebook,
    icon: FaFacebook,
  },
];

const Legal = [
  {
    name: 'Terms of Service',
    href: '/tos',
  },
  {
    name: 'Privacy Policy',
    href: '/privacy-policy',
  },
  {
    name: 'Refund Policy',
    href: '/refund-policy',
  },
  {
    name: 'Shipping Policy',
    href: '/shipping-policy',
  },
];

const Contact = [
  {
    name: 'email@something.com',
    href: 'mailto:',
    icon: MailIcon,
  },
  {
    name: siteConfig.links.phone,
    href: `tel:${siteConfig.links.phone}`,
    icon: PhoneIcon,
  },
  {
    name: siteConfig.location,
    href: '#',
    icon: LocationPinIcon,
  },
];
export const Footer = () => (
  <footer className="">
    <div className="mx-auto max-w-screen-xl px-4 pb-6 pt-16 sm:px-6 lg:px-8 lg:pt-24">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div>
          <Image
            src="/images/logo/logo.jpg"
            height={60}
            width={60}
            alt="logo"
            className="mx-auto rounded-full md:mx-0"
          />
          <div className="mt-1 flex justify-center sm:justify-start">Plexolyt</div>

          <p className="mt-6 max-w-md text-center leading-relaxed text-muted-foreground sm:max-w-xs sm:text-left">
            GST No 07ABAFG3982A1ZP <br /> Manufacturer Of PVC Insulated Flexible Wire, Multi Strand Wire Aluminum Cable
            Since 2023
          </p>

          <ul className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8">
            {Social.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className=" transition ">
                  <span className="sr-only">Facebook</span>
                  <item.icon className="h-6 w-6" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:col-span-2">
          <p className="hidden md:block"></p>
          <div className="text-center sm:text-left">
            <p className="text-lg font-medium text-foreground">Legal</p>

            <ul className="mt-8 space-y-4 text-sm">
              {Legal.map((item) => (
                <li key={item.name}>
                  <Link className="text-muted-foreground transition hover:text-muted-foreground/75" href={item.href}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <p className="text-lg font-medium text-foreground">Contact</p>
            <ul className="mt-8 space-y-4 text-sm">
              {Contact.map((item) => (
                <li key={item.name}>
                  <Link
                    className="flex flex-col items-center justify-center gap-1.5 md:flex-row md:items-start "
                    href={item.href}
                  >
                    <item.icon className="size-5 shrink-0 text-foreground" />
                    <span className="flex-1 text-muted-foreground">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-100 pt-6">
        <div className="text-center sm:flex sm:justify-between sm:text-left">
          <p className="text-sm text-muted-foreground">
            <span className="block sm:inline"></span>

            <Link className="inline-block  transition hover:text-teal-600/75" href="https://wolmer.me/">
              Website by Wolmer Studios
            </Link>
          </p>

          <p className="mt-4 text-sm text-muted-foreground sm:order-first sm:mt-0">
            &copy; 2024 Plexolyt, All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
);
