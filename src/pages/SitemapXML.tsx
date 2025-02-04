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

        let xmlContent = '';
        
        if (cacheData) {
          xmlContent = cacheData.content;
        } else {
          // If no cache, fetch industries and generate sitemap
          const { data: industries } = await supabase
            .from('industries')
            .select('slug');

          if (!industries) return;

          xmlContent = generateSitemap(industries);

          // Cache the sitemap
          await supabase
            .from('page_cache')
            .upsert({
              url: '/sitemap.xml',
              content: xmlContent,
              updated_at: new Date().toISOString()
            }, {
              onConflict: 'url'
            });
        }

        // Set the content type
        const meta = document.createElement('meta');
        meta.setAttribute('http-equiv', 'Content-Type');
        meta.setAttribute('content', 'application/xml');
        document.head.appendChild(meta);

        // Write the XML content directly
        document.documentElement.innerHTML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlContent}
</urlset>`;

      } catch (error) {
        console.error('Error generating sitemap:', error);
      }
    };

    fetchAndGenerateSitemap();
  }, []);

  return null;
};

export default SitemapXML;