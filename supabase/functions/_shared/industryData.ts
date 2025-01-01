export interface IndustryContent {
  name: string;
  description: string;
  painPoints: string[];
  solutions: string[];
  benefits: string[];
  metaTitle: string;
  metaDescription: string;
}

export const healthcare = {
  name: "Healthcare and Wellness",
  description: "At CTRL Tech, we specialize in delivering innovative IT services and AI automation solutions tailored to the unique needs of healthcare providers. From securing patient data to streamlining clinical workflows, we empower healthcare organizations to overcome challenges and deliver exceptional patient care.",
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
  ],
  metaTitle: "Healthcare IT Services & AI Solutions - CTRL Tech",
  metaDescription: "Transform your healthcare organization with CTRL Tech's tailored IT services and AI automation solutions. Expert support for HIPAA compliance, patient data security, and workflow optimization."
};

export const professionalServices = {
  name: "Professional Services",
  description: "CTRL Tech empowers professional service firms with cutting-edge IT solutions and AI automation. We help law firms, accounting practices, and consulting agencies optimize their operations, protect client data, and deliver superior services.",
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
  ],
  metaTitle: "Professional Services IT & AI Solutions - CTRL Tech",
  metaDescription: "Elevate your professional services firm with CTRL Tech's tailored IT and AI solutions. Expert support for secure client management, workflow automation, and compliance."
};

export const retail = {
  name: "Retail and E-commerce",
  description: "CTRL Tech delivers innovative IT solutions and AI automation tailored for retail and e-commerce businesses. We help merchants optimize their operations, secure customer data, and deliver exceptional shopping experiences across all channels.",
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
  ],
  metaTitle: "Retail & E-commerce IT Solutions - CTRL Tech",
  metaDescription: "Transform your retail business with CTRL Tech's IT services and AI automation. Expert solutions for inventory management, payment processing, and customer data security."
};

export const manufacturing = {
  name: "Manufacturing and Logistics",
  description: "CTRL Tech specializes in IT solutions and AI automation for manufacturing and logistics companies. We help optimize production processes, manage supply chains efficiently, and maintain quality control through innovative technology solutions.",
  painPoints: [
    "Complex Supply Chain Management",
    "Quality Control and Compliance",
    "Equipment Maintenance and Downtime",
    "Inventory Management",
    "Production Planning and Scheduling",
    "Resource Optimization"
  ],
  solutions: [
    "AI-Powered Predictive Maintenance",
    "Real-time Production Monitoring",
    "Automated Quality Control Systems",
    "Smart Inventory Management",
    "Supply Chain Optimization",
    "Digital Twin Technology"
  ],
  benefits: [
    "Reduced Operational Costs",
    "Improved Production Efficiency",
    "Enhanced Quality Control",
    "Better Resource Utilization",
    "Streamlined Supply Chain",
    "Data-Driven Decision Making"
  ],
  metaTitle: "Manufacturing & Logistics IT Solutions - CTRL Tech",
  metaDescription: "Optimize your manufacturing operations with CTRL Tech's IT services and AI automation. Expert solutions for production monitoring, quality control, and supply chain management."
};

export const education = {
  name: "Education and Non-Profits",
  description: "CTRL Tech empowers educational institutions and non-profits with innovative IT solutions and AI automation. We help organizations optimize resources, protect sensitive data, and enhance their impact through technology.",
  painPoints: [
    "Resource Management and Budget Constraints",
    "Student Data Management and Privacy",
    "Remote Learning Infrastructure",
    "Administrative Efficiency",
    "Communication with Stakeholders",
    "Program Impact Tracking"
  ],
  solutions: [
    "Cloud-Based Learning Management Systems",
    "Secure Student Information Systems",
    "Virtual Classroom Solutions",
    "Automated Administrative Tools",
    "Stakeholder Communication Platforms",
    "Impact Analytics and Reporting"
  ],
  benefits: [
    "Enhanced Learning Experience",
    "Improved Administrative Efficiency",
    "Better Resource Allocation",
    "Increased Stakeholder Engagement",
    "Data-Driven Decision Making",
    "Streamlined Operations"
  ],
  metaTitle: "Education & Non-Profit IT Solutions - CTRL Tech",
  metaDescription: "Empower your educational institution with CTRL Tech's IT services and AI automation. Expert solutions for learning management, student data security, and administrative efficiency."
};

export const industryData: Record<string, IndustryContent> = {
  "professional-services": professionalServices,
  "healthcare-and-wellness": healthcare,
  "retail-and-ecommerce": retail,
  "manufacturing-and-logistics": manufacturing,
  "education-and-non-profits": education
};