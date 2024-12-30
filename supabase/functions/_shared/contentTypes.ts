export interface ServiceContent {
  metaTitle: string;
  metaDescription: string;
  content: string;
  features: string[];
  benefits: string[];
  faqs: Array<{ question: string; answer: string }>;
}

export interface ContentParams {
  service?: string;
  city?: string;
  industry?: string;
  type?: 'custom' | 'service';
  prompt?: string;
}