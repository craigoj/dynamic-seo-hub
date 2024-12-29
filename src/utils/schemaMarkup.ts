interface FAQ {
  question: string;
  answer: string;
}

interface SchemaData {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  provider: {
    "@type": string;
    name: string;
    description: string;
  };
  areaServed: string;
  serviceType: string;
  offers: {
    "@type": string;
    availability: string;
  };
  mainEntity?: Array<{
    "@type": string;
    name: string;
    acceptedAnswer: {
      "@type": string;
      text: string;
    };
  }>;
}

export const injectSchemaMarkup = (
  service: string,
  city: string | undefined,
  metaDescription: string,
  faqs?: FAQ[]
) => {
  const existingSchema = document.querySelector('script[type="application/ld+json"]');
  if (existingSchema) {
    existingSchema.remove();
  }

  const schemaScript = document.createElement('script');
  schemaScript.type = 'application/ld+json';
  
  const schemaData: SchemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${service} Services${city ? ` in ${city}` : ''}`,
    "description": metaDescription,
    "provider": {
      "@type": "Organization",
      "name": "CTRL Tech",
      "description": "Professional IT Services Provider"
    },
    "areaServed": city || "All locations",
    "serviceType": service,
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock"
    }
  };

  if (faqs) {
    schemaData.mainEntity = faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }));
  }

  schemaScript.textContent = JSON.stringify(schemaData);
  document.head.appendChild(schemaScript);

  return () => {
    schemaScript.remove();
  };
};