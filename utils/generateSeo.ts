import { Metadata } from 'next';

import { siteConfig } from '@/config/site';

interface Props {
  title: string;
  description: string;
  url: string;
  image?: {
    url?: string;
    width?: number;
    height?: number;
  };
}

export const generateSeo = ({ title, description, url, image }: Props): Metadata => ({
  title,
  description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
  openGraph: {
    title,
    description,
    siteName: siteConfig.name,
    url,
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: image?.url ? image.url : siteConfig.ogImage,
        width: image?.width ? image.width : 1200,
        height: image?.height ? image.height : 675,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: siteConfig.twitterHandle,
    title,
    description,
    images: [
      {
        url: image?.url ? image.url : siteConfig.ogImage,
        width: image?.width ? image.width : 1200,
        height: image?.height ? image.height : 675,
      },
    ],
  },
  alternates: {
    canonical: url,
  },
});
