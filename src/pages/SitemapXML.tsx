import { useEffect, useState } from "react";
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
          document.open();
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

        // Set the content type and write the XML
        document.open();
        document.write(sitemap);
        document.close();
      } catch (error) {
        console.error('Error generating sitemap:', error);
      }
    };

    fetchAndGenerateSitemap();
  }, []);

  return null;
};

export default SitemapXML;