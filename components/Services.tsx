import React, { useEffect, useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data';
import { Service, directus } from '../lib/directus';
import { readItems } from '@directus/sdk';
import { getLocalizedText, formatPrice } from '../utils';
import { motion } from 'framer-motion';

interface ServicesProps {
  lang: Language;
}

export const Services: React.FC<ServicesProps> = ({ lang }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const result = await directus.request(readItems('services'));
        if (Array.isArray(result)) {
            setServices(result);
        }
      } catch (err) {
        console.error("Failed to fetch services:", err);
        setError(true);
      }
    };

    fetchServices();
  }, []);

  const categories = Array.from(new Set(services.map(s => s.category)));

  if (error && services.length === 0) {
      return (
          <section className="py-24 text-center text-stone-400 font-light">
              <p>Please check your Directus URL in lib/directus.ts</p>
          </section>
      );
  }

  return (
    <section id="services" className="py-32 px-6 md:px-12 bg-cream-50 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-24">
          <span className="text-gold-500 uppercase tracking-[0.3em] text-sm mb-4 block">Pricelist</span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-stone-900 mb-6">
            {TRANSLATIONS.our_services[lang]}
          </h2>
          <div className="h-px w-24 bg-gold-400 mx-auto opacity-50" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-16">
          {categories.map((category, catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.1 }}
              className="space-y-10"
            >
              <h3 className="text-3xl font-serif text-stone-900 mb-8 capitalize tracking-tight flex items-center gap-4">
                {category}
                <span className="h-px flex-1 bg-stone-200" />
              </h3>
              
              <div className="space-y-12">
                {services.filter(s => s.category === category).map((service) => (
                  <div key={service.id} className="group">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1 pr-6">
                        <h4 className="text-xl font-medium text-stone-900 group-hover:text-gold-500 transition-colors duration-300 mb-2">
                          {getLocalizedText(service, lang, 'name')}
                        </h4>
                        {/* Render Rich Text (HTML) safely */}
                        <div 
                          className="text-stone-500 text-sm leading-relaxed font-light prose-sm"
                          dangerouslySetInnerHTML={{ __html: getLocalizedText(service, lang, 'description') }}
                        />
                      </div>
                      <div className="text-gold-500 font-serif text-xl whitespace-nowrap pt-1">
                        {formatPrice(service.price)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};