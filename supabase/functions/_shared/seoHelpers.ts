export const generateMetaTags = (service: string, city?: string, industry?: string) => {
  const locationText = city ? ` in ${city}` : '';
  const industryText = industry ? ` for ${industry}` : '';
  
  return {
    title: `${service} Services${industryText}${locationText} | CTRL Tech`,
    description: `Discover how CTRL Tech's ${service} services help${industry ? ` ${industry}` : ' businesses'}${locationText} streamline operations, boost productivity, and secure their business. Learn more today!`
  };
};

export const generateServiceContent = (service: string, city?: string, industry?: string) => {
  const locationText = city ? ` in ${city}` : '';
  const industryText = industry ? ` for ${industry} businesses` : '';
  
  return `
    <div class="prose prose-lg max-w-none dark:prose-invert">
      <section class="mb-12">
        <h2 class="text-3xl font-bold mb-6">Expert ${service} Solutions${locationText}${industryText}</h2>
        <p class="text-lg leading-relaxed mb-6">
          In today's rapidly evolving digital landscape, having robust ${service} solutions is crucial for business success${industryText}. 
          At CTRL Tech, we deliver comprehensive ${service} services${locationText} that protect your assets, optimize your operations, and drive growth.
        </p>
        <p class="text-lg leading-relaxed">
          Our team of certified experts combines industry best practices with cutting-edge technology to provide solutions that are secure, 
          scalable, and tailored to your specific needs${locationText}.
        </p>
      </section>

      <section class="mb-12">
        <h2 class="text-3xl font-bold mb-6">Common Challenges We Solve${locationText}</h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-card rounded-lg p-6 shadow-sm">
            <h3 class="text-xl font-semibold mb-4">Security & Compliance</h3>
            <p>Protect your sensitive data and maintain compliance with industry regulations${industryText}.</p>
          </div>
          <div class="bg-card rounded-lg p-6 shadow-sm">
            <h3 class="text-xl font-semibold mb-4">Operational Efficiency</h3>
            <p>Streamline your workflows and reduce manual tasks through intelligent automation.</p>
          </div>
          <div class="bg-card rounded-lg p-6 shadow-sm">
            <h3 class="text-xl font-semibold mb-4">Scalability</h3>
            <p>Grow your business without the growing pains, supported by flexible IT infrastructure.</p>
          </div>
          <div class="bg-card rounded-lg p-6 shadow-sm">
            <h3 class="text-xl font-semibold mb-4">Cost Management</h3>
            <p>Optimize your technology investments while maintaining high-quality service delivery.</p>
          </div>
        </div>
      </section>

      <section class="mb-12">
        <h2 class="text-3xl font-bold mb-6">Why Choose CTRL Tech for ${service}${locationText}?</h2>
        <div class="grid md:grid-cols-3 gap-6">
          <div class="bg-card rounded-lg p-6 shadow-sm">
            <h3 class="text-xl font-semibold mb-4">Proven Expertise</h3>
            <ul class="space-y-2">
              <li>✓ Certified Professionals</li>
              <li>✓ Industry Best Practices</li>
              <li>✓ Continuous Training</li>
            </ul>
          </div>
          <div class="bg-card rounded-lg p-6 shadow-sm">
            <h3 class="text-xl font-semibold mb-4">Superior Support</h3>
            <ul class="space-y-2">
              <li>✓ 24/7 Availability</li>
              <li>✓ Rapid Response Times</li>
              <li>✓ Dedicated Team</li>
            </ul>
          </div>
          <div class="bg-card rounded-lg p-6 shadow-sm">
            <h3 class="text-xl font-semibold mb-4">Business Focus</h3>
            <ul class="space-y-2">
              <li>✓ Cost-Effective Solutions</li>
              <li>✓ Scalable Services</li>
              <li>✓ ROI-Driven Approach</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="mb-12">
        <h2 class="text-3xl font-bold mb-6">Our Comprehensive ${service} Services</h2>
        <p class="text-lg mb-6">
          We offer a full spectrum of ${service} solutions${locationText} designed to protect, optimize, and transform your business:
        </p>
        <ul class="list-none space-y-4">
          <li class="flex items-start gap-4">
            <div class="bg-primary/10 p-3 rounded-full">
              <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-semibold mb-2">Strategic Planning & Implementation</h3>
              <p>Develop and execute comprehensive ${service} strategies aligned with your business objectives.</p>
            </div>
          </li>
          <li class="flex items-start gap-4">
            <div class="bg-primary/10 p-3 rounded-full">
              <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-semibold mb-2">Proactive Monitoring & Maintenance</h3>
              <p>24/7 system monitoring, regular updates, and preventive maintenance to ensure optimal performance.</p>
            </div>
          </li>
          <li class="flex items-start gap-4">
            <div class="bg-primary/10 p-3 rounded-full">
              <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-semibold mb-2">Advanced Security Solutions</h3>
              <p>Comprehensive security measures to protect your data and systems from evolving threats.</p>
            </div>
          </li>
        </ul>
      </section>
    </div>
  `;
};

export const generateFeatures = (service: string) => [
  `Strategic ${service} Planning & Implementation`,
  "24/7 Monitoring & Support",
  "Proactive Maintenance & Updates",
  "Advanced Security Solutions",
  "Scalable Infrastructure Management",
  "Disaster Recovery & Business Continuity",
  "Performance Optimization",
  "Compliance Management"
];

export const generateBenefits = () => [
  "Enhanced Security & Protection",
  "Improved Operational Efficiency",
  "Reduced Downtime & Risks",
  "Cost-Effective Solutions",
  "Scalable Infrastructure",
  "Expert Technical Support",
  "Proactive Problem Prevention",
  "Peace of Mind"
];

export const generateFAQs = (service: string, city?: string, industry?: string) => {
  const locationText = city ? ` in ${city}` : '';
  const industryText = industry ? ` for ${industry}` : '';

  return [
    {
      question: `What ${service} services does CTRL Tech offer${locationText}?`,
      answer: `We provide comprehensive ${service} solutions including strategic planning, 24/7 monitoring, proactive maintenance, security management, and expert support${locationText}${industryText}.`
    },
    {
      question: "How quickly can you respond to issues?",
      answer: "We provide 24/7 support with rapid response times, typically addressing critical issues within 1 hour or less to minimize any potential impact on your business operations."
    },
    {
      question: "Do you offer customized solutions?",
      answer: `Yes, we tailor our ${service} services to meet your specific business needs and requirements${locationText}. Our solutions are scalable and can grow with your business.`
    },
    {
      question: "What makes CTRL Tech different from other providers?",
      answer: `We combine industry expertise, proactive support, and cutting-edge technology to deliver superior ${service} solutions${locationText}. Our focus is on building long-term partnerships and ensuring your success.`
    }
  ];
};