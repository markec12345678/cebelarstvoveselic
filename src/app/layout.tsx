import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Čebelarstvo Veselič — Ekološki med iz Bele krajine | Organic Honey Slovenia",
  description:
    "Tri generacije čebelarjev. 100+ panjev na čistih kraskih pašnikih. 6 vrst ekološko certificiranega medu: akacijev, lipov, kostanjev, cvetlični, gozdni in med brstov smreke. Dostava po Sloveniji in EU.",
  keywords: [
    "čebelarstvo Veselič",
    "med Bela krajina",
    "ekološki med Slovenija",
    "akacijev med",
    "lipov med",
    "kostanjev med",
    "gozdni med",
    "med brstov smreke",
    "cvetlični med",
    "čebelarstvo Metlika",
    "čebelarstvo Slovenija",
    "organik med",
    "domači med",
    "Slovenian honey",
    "organic honey Slovenia",
    "Bela krajina honey",
    "Čebelarstvo Veselič Metlika",
    "med Čurile",
    "kranjska čebela",
    "Apis mellifera carnica",
    "Eko sklad certifikat",
    "panj Čebelarstvo Veselič",
    "degustacija medu Bela krajina",
    "obisk čebeljaka",
  ],
  authors: [{ name: "Čebelarstvo Veselič, Jožef Veselič" }],
  creator: "Čebelarstvo Veselič",
  publisher: "Čebelarstvo Veselič",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  metadataBase: new URL("https://cebelarstvo-veselic.si"),
  alternates: {
    canonical: "/",
    languages: {
      "sl-SI": "/",
      "en": "/?lang=en",
    },
  },
  openGraph: {
    title: "Čebelarstvo Veselič — Ekološki med iz Bele krajine",
    description:
      "Tri generacije čebelarjev. 100+ panjev. 6 vrst ekološko certificiranega medu. Raziščite našo ponudbo in obiščite čebeljnjak v srcu Bele krajine.",
    url: "https://cebelarstvo-veselic.si",
    siteName: "Čebelarstvo Veselič",
    type: "website",
    locale: "sl_SI",
    alternateLocale: "en_US",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1152,
        height: 864,
        alt: "Čebelarstvo Veselič — Panji v Beli krajini ob sončnem zahodu",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Čebelarstvo Veselič — Ekološki med iz Bele krajine",
    description:
      "Tri generacije čebelarjev. 100+ panjev. 6 vrst ekološko certificiranega medu.",
    images: ["/images/hero.jpg"],
    creator: "@cebelarstvo_veselic",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code-here",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://cebelarstvo-veselic.si/#business",
        name: "Čebelarstvo Veselič",
        description:
          "Ekološko certificirano čebelarstvo z 6 vrstami medu iz Bele krajine. Tri generacije tradicije.",
        url: "https://cebelarstvo-veselic.si",
        telephone: "+38641234567",
        email: "info@cebelarstvo-veselic.si",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Čurile 4a",
          addressLocality: "Metlika",
          addressRegion: "Bela krajina",
          postalCode: "8330",
          addressCountry: "SI",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "45.6424",
          longitude: "15.3231",
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "08:00",
            closes: "17:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Saturday",
            opens: "09:00",
            closes: "13:00",
          },
        ],
        priceRange: "€€",
        image: "https://cebelarstvo-veselic.si/images/hero.jpg",
        sameAs: [],
      },
      {
        "@type": "Product",
        name: "Akacijev med — Čebelarstvo Veselič",
        description:
          "Svetlo zlaten rumen, ekološko certificiran akacijev med iz doline reke Kolpe, Bela krajina. Neto 450 g.",
        brand: {
          "@type": "Brand",
          name: "Čebelarstvo Veselič",
        },
        manufacturer: {
          "@type": "Organization",
          name: "Čebelarstvo Veselič",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Čurile 4a",
            addressLocality: "Metlika",
            postalCode: "8330",
            addressCountry: "SI",
          },
        },
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "EUR",
          lowPrice: "8.90",
          highPrice: "14.90",
          offerCount: "6",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "127",
          bestRating: "5",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Ali je vaš med res 100 % ekološki?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Da. Naš med je certificiran po shemi Eko sklad v skladu z EU uredbami o ekološkem kmetijstvu (EU) 2018/848. Brez sintetičnih kemikalij, brez antibiotikov, brez dodanega sladkorja, brez segrevanja nad 40 °C.",
            },
          },
          {
            "@type": "Question",
            name: "Kako poteka dostava?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Po Sloveniji dostavljamo s Pošto Slovenije v 1–3 delovnih dneh (brezplačna dostava nad 35 €). V EU dostavljamo v 5–7 delovnih dneh.",
            },
          },
          {
            "@type": "Question",
            name: "Ali organizirate obiske čebeljaka za skupine?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Da. Organiziramo vodene obiske za posameznike, družine, šole in podjetja. Ogled vključuje sprehod med panji, opazovanje čebel, degustacijo vseh sort medu. Obiski na rezervacijo, najmanj 2 dni vnaprej, od aprila do septembra.",
            },
          },
          {
            "@type": "Question",
            name: "Zakaj se med kristalizira?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Kristalizacija je naraven proces, ki potrjuje pristnost medu. Če želite medu vrniti tekoče stanje, ga postavite v vodno kopel pri največ 40 °C.",
            },
          },
          {
            "@type": "Question",
            name: "Kako shranjujem med?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Med shranjujte na sobni temperaturi (15–25 °C), stran od neposredne sončne svetlobe in vlage. Naših kozarcev ni treba hladiti.",
            },
          },
        ],
      },
    ],
  };

  return (
    <html lang="sl" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
