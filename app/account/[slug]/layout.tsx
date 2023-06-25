import { Metadata } from "next"
import styles from "@/styles/Home.module.css"
export default async function Layout({ children }: {
    children: React.ReactNode;
  }) {
 
    return (
        <>{children}</>
    );
  }

export const metadata: Metadata = {
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 1,
    },
    title: "Account",
    description: "Rate your landlord. Search and review any property.",
    twitter: {
      card: 'summary_large_image',
      title: 'renterly',
      description: 'Search and review any property.',
      images: ['https://d3h42dhdxazsqn.cloudfront.net/renterlyblue.png'],
    },
    openGraph: {
      title: "renterly",
      description: "Search and review any property. A voice for every renter.",
      url: `https://renterly.org/`,
      images: [
        {
        url: `https://d3h42dhdxazsqn.cloudfront.net/renterlyblue.png`,
        width: 1200,
        height: 675,
        alt: "renterly"
        }
      ],
      type: "website",
      locale: "en-US"
    },
  }  


  
