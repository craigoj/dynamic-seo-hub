import { coreServices } from "@/config/services";
import { allLocations, states } from "@/config/locations";

export const generateSitemap = (industries: { slug: string }[]) => {
  const baseUrl = window.location.origin;
  const today = new Date().toISOString();

  const urls = [
    // Core pages
    { url: '/', priority: '1.0' },
    { url: '/about', priority: '0.8' },
    { url: '/contact', priority: '0.8' },
    { url: '/services', priority: '0.8' },
    { url: '/industries', priority: '0.8' },
    { url: '/locations', priority: '0.8' },
    { url: '/ai-services', priority: '0.8' },
    { url: '/sitemap', priority: '0.5' },

    // Service pages
    ...coreServices.map(service => ({
      url: `/services/${service.slug}`,
      priority: '0.7'
    })),

    // Industry pages
    ...industries.map(industry => ({
      url: `/industries/${industry.slug}`,
      priority: '0.7'
    })),

    // State pages
    ...states.map(state => ({
      url: `/locations/${state}`,
      priority: '0.6'
    })),

    // City pages
    ...allLocations.map(location => ({
      url: `/locations/${location.state}/${location.city}`,
      priority: '0.6'
    })),

    // Location-based service pages
    ...allLocations.flatMap(location => 
      coreServices.map(service => ({
        url: `/services/${service.slug}/${location.state}/${location.city}`,
        priority: '0.5'
      }))
    ),

    // Location-based industry pages
    ...allLocations.flatMap(location => 
      industries.map(industry => ({
        url: `/industries/${industry.slug}/${location.state}/${location.city}`,
        priority: '0.5'
      }))
    )
  ];

  return urls.map(({ url, priority }) => `
  <url>
    <loc>${baseUrl}${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`).join('');
};