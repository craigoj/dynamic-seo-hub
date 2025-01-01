import { IndustryContent } from './industryData.ts';

export const generateContent = (industry: string, industryInfo: IndustryContent) => {
  const content = {
    name: industryInfo.name,
    description: industryInfo.description,
    painPoints: industryInfo.painPoints,
    solutions: industryInfo.solutions,
    benefits: industryInfo.benefits
  };

  return { 
    content: JSON.stringify(content),
    metaTitle: industryInfo.metaTitle,
    metaDescription: industryInfo.metaDescription
  };
};