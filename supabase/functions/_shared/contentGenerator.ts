import { IndustryContent } from './industryData.ts';

export const generateContent = (industry: string, industryInfo: IndustryContent) => {
  const metaTitle = `${industryInfo.name} IT Services & AI Solutions - CTRL Tech`;
  const metaDescription = `Transform your ${industryInfo.name.toLowerCase()} business with CTRL Tech's tailored IT services and AI automation solutions. Expert support for your industry-specific challenges.`;

  const content = {
    introduction: `
      <section class="prose prose-lg max-w-none mb-12">
        <h1 class="text-4xl font-bold mb-6">IT Services & AI Solutions for ${industryInfo.name}</h1>
        <p class="text-xl leading-relaxed">
          CTRL Tech understands the unique challenges faced by ${industryInfo.name.toLowerCase()} businesses. 
          Our tailored IT services and AI automation solutions help you overcome these challenges while driving 
          growth and efficiency in your operations.
        </p>
      </section>
    `,
    challenges: `
      <section class="mb-12">
        <h2 class="text-3xl font-bold mb-6">Common Challenges in ${industryInfo.name}</h2>
        <div class="grid md:grid-cols-2 gap-6">
          ${industryInfo.painPoints.map(point => `
            <div class="bg-white p-6 rounded-lg shadow-md">
              <h3 class="text-xl font-semibold mb-3">${point}</h3>
              <p class="text-gray-600">We understand the complexity of ${point.toLowerCase()} and provide solutions to address this challenge effectively.</p>
            </div>
          `).join('')}
        </div>
      </section>
    `,
    solutions: `
      <section class="mb-12 bg-gray-50 p-8 rounded-lg">
        <h2 class="text-3xl font-bold mb-6">Our ${industryInfo.name} Solutions</h2>
        <div class="grid md:grid-cols-2 gap-6">
          ${industryInfo.solutions.map(solution => `
            <div class="bg-white p-6 rounded-lg shadow-md">
              <h3 class="text-xl font-semibold mb-3">${solution}</h3>
              <p class="text-gray-600">Implement cutting-edge technology solutions designed specifically for ${industryInfo.name.toLowerCase()} businesses.</p>
            </div>
          `).join('')}
        </div>
      </section>
    `,
    benefits: `
      <section class="mb-12">
        <h2 class="text-3xl font-bold mb-6">Benefits for Your ${industryInfo.name} Business</h2>
        <div class="grid md:grid-cols-3 gap-6">
          ${industryInfo.benefits.map(benefit => `
            <div class="bg-white p-6 rounded-lg shadow-md">
              <h3 class="text-xl font-semibold mb-3">${benefit}</h3>
              <p class="text-gray-600">Experience tangible improvements in your operations with our tailored solutions.</p>
            </div>
          `).join('')}
        </div>
      </section>
    `,
    cta: `
      <section class="bg-blue-600 text-white p-8 rounded-lg text-center">
        <h2 class="text-3xl font-bold mb-4">Transform Your ${industryInfo.name} Business Today</h2>
        <p class="text-xl mb-6">
          Ready to overcome your IT challenges and leverage AI automation for growth? 
          Contact CTRL Tech for a personalized consultation.
        </p>
        <a href="/contact" class="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
          Schedule a Consultation
        </a>
      </section>
    `
  };

  return { content, metaTitle, metaDescription };
};