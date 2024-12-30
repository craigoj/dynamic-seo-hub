import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const industries = [
  {
    title: "Professional Services",
    description: "Specialized business services for various professional fields",
    subIndustries: [
      "Law Firms: Small legal practices, family law, personal injury, corporate law",
      "Accounting Firms: CPAs, tax consultants, bookkeeping services",
      "Financial Advisors: Wealth management, retirement planning, investment advisors",
      "Consulting Firms: Management consultants, marketing consultants, HR consultants"
    ]
  },
  {
    title: "Healthcare and Wellness",
    description: "Medical and wellness services for comprehensive health care",
    subIndustries: [
      "Medical Practices: Primary care, specialist practices (cardiology, dermatology)",
      "Dental Clinics: Orthodontics, general dentistry",
      "Therapists and Counselors: Mental health, physical therapy, occupational therapy",
      "Fitness Centers: Gyms, personal training studios, wellness centers"
    ]
  },
  {
    title: "Real Estate",
    description: "Property-related services and investments",
    subIndustries: [
      "Real Estate Agencies: Residential, commercial, property management",
      "Real Estate Investors: Flipping, rental properties, real estate development",
      "Home Inspectors: Residential and commercial inspection services",
      "Title Companies: Closing and escrow services"
    ]
  },
  {
    title: "Trades and Home Services",
    description: "Essential services for home and property maintenance",
    subIndustries: [
      "Construction Companies: General contractors, home builders, renovation specialists",
      "Plumbing Services: Residential and commercial plumbing",
      "Electricians: Wiring, lighting, and smart home services",
      "HVAC Services: Heating, ventilation, and air conditioning",
      "Landscaping and Lawn Care: Lawn maintenance, design, irrigation systems",
      "Cleaning Services: Residential, commercial, post-construction cleaning"
    ]
  },
  {
    title: "Retail and E-commerce",
    description: "Traditional and online retail businesses",
    subIndustries: [
      "Local Retail Stores: Boutiques, grocery stores, specialty shops",
      "Online Retailers: Niche e-commerce brands, dropshipping businesses",
      "Franchise Locations: Fast food, coffee shops, gym franchises",
      "Product Manufacturers: Small-scale producers looking to sell direct-to-consumer"
    ]
  },
  {
    title: "Technology and Startups",
    description: "Innovative tech companies and digital service providers",
    subIndustries: [
      "IT Support Providers: Managed IT, cybersecurity firms",
      "Tech Startups: SaaS, app development, hardware startups",
      "Digital Marketing Agencies: SEO, PPC, content marketing",
      "Software Development Firms: Custom software, mobile app developers"
    ]
  },
  {
    title: "Creative Industries",
    description: "Creative and digital content services",
    subIndustries: [
      "Marketing Agencies: Social media, branding, advertising",
      "Design Studios: Graphic design, UX/UI design, branding agencies",
      "Photography and Videography: Event, corporate, lifestyle photography services",
      "Content Creators: Freelance writers, bloggers, podcasters"
    ]
  },
  {
    title: "Education and Non-Profits",
    description: "Educational institutions and non-profit organizations",
    subIndustries: [
      "Private Schools: K-12, Montessori, charter schools",
      "Tutoring Services: Test prep, academic support",
      "Non-Profit Organizations: Advocacy groups, community services",
      "Educational Tech Companies: E-learning platforms, course creators"
    ]
  },
  {
    title: "Hospitality and Travel",
    description: "Tourism and hospitality services",
    subIndustries: [
      "Hotels and Inns: Boutique hotels, B&Bs, vacation rentals",
      "Event Planners: Corporate events, weddings, parties",
      "Tour Operators: Local tours, adventure tourism, travel agencies",
      "Food and Beverage: Restaurants, food trucks, catering services"
    ]
  },
  {
    title: "Manufacturing and Logistics",
    description: "Production and supply chain services",
    subIndustries: [
      "Manufacturing Companies: Small to mid-size production businesses",
      "Logistics and Supply Chain: Warehousing, distribution, and transportation",
      "Custom Fabrication: Metalworking, woodworking, prototyping",
      "Import/Export Businesses: Specialty goods, international trade"
    ]
  },
  {
    title: "Local Governments and Public Services",
    description: "Government and public utility services",
    subIndustries: [
      "Municipal Offices: Local government IT and administrative support",
      "Public Utilities: Water, electricity, and waste management"
    ]
  }
];

export const IndustriesSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Industries We Serve</h2>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          CTRL Tech provides tailored AI solutions across diverse industries, helping businesses optimize their operations and grow efficiently.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry) => (
            <Card key={industry.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{industry.title}</CardTitle>
                <CardDescription>{industry.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  <AccordionItem value="sub-industries">
                    <AccordionTrigger>View Sub-Industries</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-sm text-gray-600">
                        {industry.subIndustries.map((subIndustry, index) => (
                          <li key={index} className="list-disc ml-4">
                            {subIndustry}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};