interface ContentParams {
  service: string;
  city?: string;
  industry?: string;
  state?: string;
}

export const generateSEOContent = ({ service, city, industry, state }: ContentParams) => {
  const locationText = city ? ` in ${city}, ${state}` : '';
  const industryText = industry ? ` for ${industry}` : '';
  
  const metaTitle = `${service} Services${industryText}${locationText} | Expert IT Solutions`;
  const metaDescription = `Transform your business with professional ${service} services${locationText}. Tailored solutions${industryText}, 24/7 support, and proven expertise. Get your free consultation today!`;
  
  const content = `
    <div class="prose max-w-none">
      <h2 class="text-3xl font-bold mb-6">Professional ${service} Solutions${industryText}${locationText}</h2>
      <p class="text-lg mb-8">${city ? `${city}'s` : 'Local'} businesses deserve reliable and efficient IT solutions. Our ${service} services combine cutting-edge technology with expert support to help you achieve your business goals.</p>
      
      <h2 class="text-2xl font-bold mb-4">Why Choose Our ${service} Services${locationText}?</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div class="bg-gray-50 p-6 rounded-lg">
          <h3 class="text-xl font-semibold mb-3">Expert Support</h3>
          <p>24/7 technical assistance from certified professionals${city ? ` in ${city}` : ''}</p>
        </div>
        <div class="bg-gray-50 p-6 rounded-lg">
          <h3 class="text-xl font-semibold mb-3">Custom Solutions</h3>
          <p>Tailored ${service.toLowerCase()} strategies for your specific needs</p>
        </div>
      </div>
      
      <h2 class="text-2xl font-bold mb-4">Our Comprehensive Approach</h2>
      <ul class="space-y-4 mb-8">
        <li class="flex items-start gap-3">
          <span class="text-blue-600">✓</span>
          <span>Proactive monitoring and maintenance</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="text-blue-600">✓</span>
          <span>Regular security updates and patches</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="text-blue-600">✓</span>
          <span>Performance optimization</span>
        </li>
      </ul>
      
      <h2 class="text-2xl font-bold mb-4">Industries We Serve${locationText}</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div class="p-4 border rounded-lg">
          <h3 class="font-semibold mb-2">Healthcare</h3>
          <p class="text-sm">HIPAA-compliant solutions</p>
        </div>
        <div class="p-4 border rounded-lg">
          <h3 class="font-semibold mb-2">Finance</h3>
          <p class="text-sm">Secure banking solutions</p>
        </div>
        <div class="p-4 border rounded-lg">
          <h3 class="font-semibold mb-2">Manufacturing</h3>
          <p class="text-sm">Streamlined operations</p>
        </div>
      </div>
    </div>
  `;

  return {
    content,
    metaTitle,
    metaDescription,
    features: [
      "24/7 Expert Support",
      "Proactive Monitoring",
      "Security Management",
      "Performance Optimization",
      "Regular Maintenance"
    ],
    benefits: [
      "Improved System Reliability",
      "Enhanced Security",
      "Reduced Downtime",
      "Cost Efficiency",
      "Scalable Solutions"
    ],
    faqs: [
      {
        question: `What makes your ${service} services${locationText} unique?`,
        answer: `We combine industry expertise with local support${city ? ` in ${city}` : ''} to deliver personalized ${service.toLowerCase()} solutions that meet your specific needs. Our 24/7 support and proactive approach ensure your systems run smoothly.`
      },
      {
        question: "How quickly can you respond to issues?",
        answer: `We provide rapid response times${city ? ` in ${city}` : ''}, typically addressing critical issues within 1 hour. Our local team ensures quick on-site support when needed.`
      },
      {
        question: "Do you offer customized solutions?",
        answer: `Yes, we tailor our ${service.toLowerCase()} services to your business requirements${city ? ` in ${city}` : ''}, ensuring you get exactly what you need to succeed.`
      }
    ]
  };
};