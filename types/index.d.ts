export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  email: string;
  twitterHandle: string;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  links: {
    twitter: string;
    facebook: string;
    instagram: string;
    whatsapp: string;
    phone: string;
  };
};
