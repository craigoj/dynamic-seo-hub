export interface IndustryContent {
  name: string;
  painPoints: string[];
  solutions: string[];
  benefits: string[];
}

export const industryData: Record<string, IndustryContent> = {
  "professional-services": {
    name: "Professional Services",
    painPoints: [
      "Managing client data securely",
      "Streamlining workflow processes",
      "Maintaining regulatory compliance",
      "Coordinating remote teams"
    ],
    solutions: [
      "Secure client portal systems",
      "Automated workflow management",
      "Compliance monitoring tools",
      "Collaborative workspace solutions"
    ],
    benefits: [
      "Enhanced client data security",
      "Improved operational efficiency",
      "Simplified compliance management",
      "Better team collaboration"
    ]
  },
  "healthcare": {
    name: "Healthcare and Wellness",
    painPoints: [
      "Managing sensitive patient data securely",
      "Meeting strict regulatory compliance standards (HIPAA)",
      "Streamlining patient care workflows",
      "Reducing administrative overhead"
    ],
    solutions: [
      "Advanced cybersecurity systems for patient data protection",
      "Automated compliance monitoring and reporting",
      "AI-powered workflow optimization",
      "Integrated healthcare management systems"
    ],
    benefits: [
      "Enhanced patient data security and privacy",
      "Streamlined operations and reduced costs",
      "Improved patient care quality",
      "Simplified compliance management"
    ]
  },
  "real-estate": {
    name: "Real Estate",
    painPoints: [
      "Managing property listings efficiently",
      "Securing client information",
      "Coordinating showings and appointments",
      "Maintaining compliance with real estate regulations"
    ],
    solutions: [
      "Property management software integration",
      "Secure client data management",
      "Automated scheduling systems",
      "Compliance tracking tools"
    ],
    benefits: [
      "Streamlined property management",
      "Enhanced data security",
      "Improved client service",
      "Efficient compliance management"
    ]
  },
  "trades-and-home-services": {
    name: "Trades and Home Services",
    painPoints: [
      "Scheduling and dispatching efficiently",
      "Managing customer information",
      "Tracking inventory and equipment",
      "Processing payments securely"
    ],
    solutions: [
      "Smart scheduling and dispatch systems",
      "Customer relationship management tools",
      "Inventory management software",
      "Secure payment processing"
    ],
    benefits: [
      "Optimized service delivery",
      "Better customer satisfaction",
      "Improved inventory control",
      "Enhanced payment security"
    ]
  },
  "retail-and-ecommerce": {
    name: "Retail and E-commerce",
    painPoints: [
      "Managing inventory across channels",
      "Securing customer data",
      "Processing online transactions",
      "Coordinating shipping and fulfillment"
    ],
    solutions: [
      "Integrated inventory management",
      "Secure payment processing",
      "Order fulfillment automation",
      "Customer data protection systems"
    ],
    benefits: [
      "Improved inventory accuracy",
      "Enhanced customer trust",
      "Streamlined operations",
      "Better data security"
    ]
  },
  "technology-and-startups": {
    name: "Technology and Startups",
    painPoints: [
      "Scaling infrastructure securely",
      "Managing rapid growth",
      "Protecting intellectual property",
      "Ensuring system reliability"
    ],
    solutions: [
      "Scalable cloud infrastructure",
      "Growth management tools",
      "IP protection systems",
      "Reliability monitoring"
    ],
    benefits: [
      "Secure scalability",
      "Controlled growth",
      "Protected innovation",
      "Improved reliability"
    ]
  },
  "creative-industries": {
    name: "Creative Industries",
    painPoints: [
      "Managing large media files",
      "Protecting creative assets",
      "Collaborating remotely",
      "Tracking project progress"
    ],
    solutions: [
      "Digital asset management",
      "Creative asset protection",
      "Remote collaboration tools",
      "Project management systems"
    ],
    benefits: [
      "Efficient asset management",
      "Secure creative work",
      "Enhanced collaboration",
      "Better project tracking"
    ]
  },
  "education-and-non-profits": {
    name: "Education and Non-Profits",
    painPoints: [
      "Managing donor/student data",
      "Ensuring data privacy",
      "Coordinating programs",
      "Budget optimization"
    ],
    solutions: [
      "Secure data management",
      "Privacy compliance tools",
      "Program management systems",
      "Financial optimization tools"
    ],
    benefits: [
      "Better data protection",
      "Compliance assurance",
      "Improved coordination",
      "Optimized resources"
    ]
  },
  "hospitality-and-travel": {
    name: "Hospitality and Travel",
    painPoints: [
      "Managing bookings and reservations",
      "Securing guest data",
      "Coordinating services",
      "Maintaining quality standards"
    ],
    solutions: [
      "Booking management systems",
      "Guest data protection",
      "Service coordination tools",
      "Quality monitoring systems"
    ],
    benefits: [
      "Streamlined bookings",
      "Enhanced guest privacy",
      "Better service delivery",
      "Consistent quality"
    ]
  },
  "manufacturing-and-logistics": {
    name: "Manufacturing and Logistics",
    painPoints: [
      "Supply chain visibility",
      "Quality control",
      "Inventory management",
      "Production efficiency"
    ],
    solutions: [
      "Supply chain tracking",
      "Quality management systems",
      "Inventory optimization",
      "Production monitoring"
    ],
    benefits: [
      "Enhanced visibility",
      "Improved quality",
      "Optimized inventory",
      "Increased efficiency"
    ]
  },
  "local-governments": {
    name: "Local Governments and Public Services",
    painPoints: [
      "Managing public records",
      "Ensuring data security",
      "Coordinating services",
      "Budget management"
    ],
    solutions: [
      "Records management systems",
      "Security compliance tools",
      "Service coordination platforms",
      "Budget tracking systems"
    ],
    benefits: [
      "Efficient record-keeping",
      "Enhanced security",
      "Better service delivery",
      "Improved budget control"
    ]
  }
};