import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { generateSitemap } from "@/utils/generateSitemap";

const SitemapXML = () => {
  useEffect(() => {
    const fetchAndGenerateSitemap = async () => {
      try {
        // Try to get from cache first
        const { data: cacheData } = await supabase
          .from('page_cache')
          .select('content')
          .eq('url', '/sitemap.xml')
          .single();

        if (cacheData) {
          document.open('text/xml');
          document.write('<?xml version="1.0" encoding="UTF-8"?>\n');
          document.write('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n');
          document.write(cacheData.content);
          document.write('</urlset>');
          document.close();
          return;
        }

        // If no cache, fetch industries and generate sitemap
        const { data: industries } = await supabase
          .from('industries')
          .select('slug');

        if (!industries) return;

        const sitemap = generateSitemap(industries);

        // Cache the sitemap
        await supabase
          .from('page_cache')
          .upsert({
            url: '/sitemap.xml',
            content: sitemap,
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'url'
          });

        // Write the sitemap
        document.open('text/xml');
        document.write('<?xml version="1.0" encoding="UTF-8"?>\n');
        document.write('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n');
        document.write(sitemap);
        document.write('</urlset>');
        document.close();
      } catch (error) {
        console.error('Error generating sitemap:', error);
      }
    };

    fetchAndGenerateSitemap();
  }, []);

  // Set content type in the head
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Type';
    meta.content = 'text/xml; charset=utf-8';
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  return null;
};

export default SitemapXML;