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

        // Create a new document with XML content
        const xmlDoc = new XMLSerializer().serializeToString(
          new DOMParser().parseFromString(
            '<?xml version="1.0" encoding="UTF-8"?>\n' +
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
            xmlContent +
            '</urlset>',
            'application/xml'
          )
        );

        // Replace the entire document content with the XML
        document.documentElement.innerHTML = '';
        const pre = document.createElement('pre');
        pre.textContent = xmlDoc;
        document.documentElement.appendChild(pre);
      } catch (error) {
        console.error('Error generating sitemap:', error);
      }
    };

    fetchAndGenerateSitemap();
  }, []);

  return null;
};

export default SitemapXML;