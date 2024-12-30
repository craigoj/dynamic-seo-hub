interface ContentParams {
  service: string;
  city?: string;
  industry?: string;
  state?: string;
}

export const generateSEOContent = ({ service, city, industry, state }: ContentParams) => {
  const locationText = city ? ` in ${city}, ${state}` : '';
  const industryText = industry ? ` for ${industry}` : '';
  
  const metaTitle = `${service} Services${industryText}${locationText} | CTRL Tech`;
  const metaDescription = `Discover how CTRL Tech's ${service} services help${industryText ? ` ${industry}` : ' businesses'}${locationText} streamline operations, boost productivity, and secure their business. Learn more today!`;
  
  const content = `
    <div class="prose max-w-none">
      <h2>Expert ${service} Solutions${industryText}${locationText}</h2>
      <p>${city ? `${city}'s` : 'Local'} businesses deserve tools as innovative as their ambitions. CTRL Tech empowers organizations with ${service} services and AI automation, helping them secure data, optimize workflows, and provide exceptional experiences.</p>
      
      <h2>Common Challenges We Solve</h2>
      <ul>
        <li>Managing sensitive data while ensuring compliance</li>
        <li>Time lost on manual and repetitive tasks</li>
        <li>Difficulty scaling operations without increasing costs</li>
      </ul>
      
      <h2>Our ${service} Solutions</h2>
      <p>CTRL Tech helps businesses${locationText} tackle these challenges with tailored solutions, including advanced cybersecurity, automated workflows, and scalable systems.</p>
      
      <h2>Benefits of Our Services</h2>
      <ul>
        <li>Strengthen security and compliance</li>
        <li>Save time with automation</li>
        <li>Scale operations efficiently</li>
        <li>Enhance team productivity</li>
        <li>Reduce operational costs</li>
      </ul>
      
      <h2>Why Choose CTRL Tech${locationText}</h2>
      <ul>
        <li>Deep understanding of ${industry || 'business'} challenges</li>
        <li>${city ? `Local support and expertise in the ${city} market` : 'Nationwide support and expertise'}</li>
        <li>Proven success in helping small businesses thrive with AI solutions</li>
      </ul>
      
      <h2>Get Started Today</h2>
      <p>Ready to transform your business${locationText}? Contact CTRL Tech today for a free consultation and see how we can help you grow.</p>
    </div>
  `;

  return {
    content,
    metaTitle,
    metaDescription,
    features: [
      "24/7 Monitoring and Support",
      "Proactive Maintenance",
      "Security and Compliance",
      "AI-Powered Automation",
      "Cloud Solutions"
    ],
    benefits: [
      "Enhanced Security and Compliance",
      "Improved Efficiency",
      "Reduced Operational Costs",
      "Increased Productivity",
      "Better Customer Experience"
    ],
    faqs: [
      {
        question: `What ${service} services does CTRL Tech offer${locationText}?`,
        answer: `We offer comprehensive ${service} solutions including 24/7 monitoring, proactive maintenance, security, and AI automation${city ? ` to businesses in ${city}` : ''}.`
      },
      {
        question: "How quickly can you respond to issues?",
        answer: `We provide 24/7 support with rapid response times${city ? ` in ${city}` : ''}, typically addressing critical issues within 1 hour or less.`
      },
      {
        question: "Do you offer customized solutions?",
        answer: `Yes, we tailor our ${service} services to meet your specific business needs and requirements${city ? ` in ${city}` : ''}.`
      }
    ]
  };
};