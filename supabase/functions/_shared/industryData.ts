import { professionalServices } from './industries/professional.ts';
import { healthcare } from './industries/healthcare.ts';
import { retail } from './industries/retail.ts';
import { manufacturing } from './industries/manufacturing.ts';

export interface IndustryContent {
  name: string;
  painPoints: string[];
  solutions: string[];
  benefits: string[];
}

export const industryData: Record<string, IndustryContent> = {
  "professional-services": professionalServices,
  "healthcare-and-wellness": healthcare,
  "retail-and-ecommerce": retail,
  "manufacturing-and-logistics": manufacturing
};