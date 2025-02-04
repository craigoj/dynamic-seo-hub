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
          // Set XML content type
          document.contentType = 'application/xml';
          document.open('application/xml');
          document.write('<?xml version="1.0" encoding="UTF-8"?>\n');
          document.write(cacheData.content);
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

        // Set XML content type and write the sitemap
        document.contentType = 'application/xml';
        document.open('application/xml');
        document.write('<?xml version="1.0" encoding="UTF-8"?>\n');
        document.write(sitemap);
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
    meta.content = 'application/xml; charset=utf-8';
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  return null;
};

export default SitemapXML;