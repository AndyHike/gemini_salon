import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data';
import { MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react'; // Додав іконку успіху
import { motion } from 'framer-motion';
import { createItem } from '@directus/sdk';
import { directus } from '../lib/directus'; // Переконайтесь, що шлях правильний

interface ContactProps {
  lang: Language;
}

export const Contact: React.FC<ContactProps> = ({ lang }) => {
  // Стан форми
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Стан відправки: 'idle' | 'loading' | 'success' | 'error'
  const [status, setStatus] = useState('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.type === 'email' ? 'email' : e.target.type === 'text' ? 'name' : 'message']: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Зупиняємо перезавантаження сторінки
    setStatus('loading');

    try {
      await directus.request(createItem('contact_messages', {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        subject: 'Нове повідомлення з сайту' // Заповнюємо службове поле
      }));

      setStatus('success');
      setFormData({ name: '', email: '', message: '' }); // Очистити форму
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-cream-50 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute -top-20 -right-20 w-96 h-96 border border-gold-400/20 rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Info Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div>
                <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-6">
                    {TRANSLATIONS.contact_us[lang]}
                </h2>
                <div className="h-px w-16 bg-gold-400" />
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="text-gold-500 w-6 h-6 mt-1" />
                <div>
                  <h4 className="font-serif text-lg text-stone-900">Address</h4>
                  <p className="text-stone-600 font-light">123 Luxury Avenue, Kyiv, Ukraine</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="text-gold-500 w-6 h-6 mt-1" />
                <div>
                  <h4 className="font-serif text-lg text-stone-900">Phone</h4>
                  <p className="text-stone-600 font-light">+380 44 123 4567</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="text-gold-500 w-6 h-6 mt-1" />
                <div>
                  <h4 className="font-serif text-lg text-stone-900">Email</h4>
                  <p className="text-stone-600 font-light">concierge@luxesalon.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="text-gold-500 w-6 h-6 mt-1" />
                <div>
                  <h4 className="font-serif text-lg text-stone-900">Working Hours</h4>
                  <p className="text-stone-600 font-light">Mon - Sat: 09:00 - 20:00</p>
                  <p className="text-stone-600 font-light">Sun: 10:00 - 18:00</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div 
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="bg-white p-8 md:p-12 shadow-sm border border-stone-100 min-h-[400px] flex items-center"
          >
            {status === 'success' ? (
                // Блок успішної відправки
                <div className="w-full text-center space-y-4">
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-serif text-2xl text-stone-800">Дякуємо!</h3>
                    <p className="text-stone-600">Ваше повідомлення успішно надіслано.</p>
                    <button 
                        onClick={() => setStatus('idle')}
                        className="text-gold-600 hover:text-gold-700 underline text-sm mt-4"
                    >
                        Надіслати ще одне
                    </button>
                </div>
            ) : (
                // Форма
                <form onSubmit={handleSubmit} className="space-y-6 w-full">
                <div>
                    <label className="block text-sm uppercase tracking-wider text-stone-500 mb-2">
                        {TRANSLATIONS.name_placeholder[lang]}
                    </label>
                    <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-cream-50 border-b border-stone-300 p-3 focus:outline-none focus:border-gold-400 transition-colors"
                    />
                </div>
                
                <div>
                    <label className="block text-sm uppercase tracking-wider text-stone-500 mb-2">
                        {TRANSLATIONS.email_placeholder[lang]}
                    </label>
                    <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-cream-50 border-b border-stone-300 p-3 focus:outline-none focus:border-gold-400 transition-colors"
                    />
                </div>

                <div>
                    <label className="block text-sm uppercase tracking-wider text-stone-500 mb-2">
                        {TRANSLATIONS.message_placeholder[lang]}
                    </label>
                    <textarea 
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-cream-50 border-b border-stone-300 p-3 focus:outline-none focus:border-gold-400 transition-colors resize-none"
                    />
                </div>

                <button 
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-stone-900 text-white py-4 text-sm uppercase tracking-widest hover:bg-gold-500 transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {status === 'loading' ? 'Sending...' : TRANSLATIONS.send_message[lang]}
                </button>

                {status === 'error' && (
                    <p className="text-red-500 text-center text-sm">Виникла помилка. Спробуйте пізніше.</p>
                )}
                </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
};