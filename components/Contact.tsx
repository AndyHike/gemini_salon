import React, { useState, useRef } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data';
import { MapPin, Phone, Mail, Clock, CheckCircle, Paperclip, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { createItem, uploadFiles } from '@directus/sdk';
import { directus } from '../lib/directus';

interface ContactProps {
  lang: Language;
}

export const Contact: React.FC<ContactProps> = ({ lang }) => {
  // Стан для текстових полів
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // Стан для файлу
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Стан відправки
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      let attachmentId = null;

      // 1. Якщо є файл, спочатку вантажимо його в Directus Files
      if (selectedFile) {
        const formDataObj = new FormData();
        formDataObj.append('folder', ''); // Можна вказати ID папки, якщо треба
        formDataObj.append('file', selectedFile);
        
        // Відправляємо файл
        const fileResponse = await directus.request(uploadFiles(formDataObj));
        // Directus може повернути об'єкт або масив, беремо ID
        attachmentId = fileResponse.id || (fileResponse as any)[0]?.id; 
      }

      // 2. Створюємо повідомлення з прив'язкою файлу (якщо є)
      await directus.request(createItem('contact_messages', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        attachment: attachmentId, // Прив'язуємо ID картинки
        subject: 'Нова заявка з сайту (+ фото)'
      }));

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      removeFile();
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
              {/* Адреса */}
              <div className="flex items-start gap-4">
                <MapPin className="text-gold-500 w-6 h-6 mt-1" />
                <div>
                  <h4 className="font-serif text-lg text-stone-900">Address</h4>
                  <p className="text-stone-600 font-light">123 Luxury Avenue, Kyiv, Ukraine</p>
                </div>
              </div>

              {/* Телефон */}
              <div className="flex items-start gap-4">
                <Phone className="text-gold-500 w-6 h-6 mt-1" />
                <div>
                  <h4 className="font-serif text-lg text-stone-900">Phone</h4>
                  <p className="text-stone-600 font-light">+380 44 123 4567</p>
                </div>
              </div>

              {/* Пошта */}
              <div className="flex items-start gap-4">
                <Mail className="text-gold-500 w-6 h-6 mt-1" />
                <div>
                  <h4 className="font-serif text-lg text-stone-900">Email</h4>
                  <p className="text-stone-600 font-light">concierge@luxesalon.com</p>
                </div>
              </div>

              {/* Години */}
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
             className="bg-white p-8 md:p-12 shadow-sm border border-stone-100 min-h-[400px] flex items-center rounded-xl"
          >
            {status === 'success' ? (
                // SUCCESS STATE
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
                // FORM STATE
                <form onSubmit={handleSubmit} className="space-y-5 w-full">
                
                {/* Ім'я */}
                <div>
                    <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2 font-medium">
                        {TRANSLATIONS.name_placeholder[lang]}
                    </label>
                    <input 
                    type="text" 
                    name="name"
                    autoComplete="name" // Автозаповнення
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-cream-50 border border-stone-200 p-3 rounded-md focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-all"
                    placeholder="Ім'я"
                    />
                </div>
                
                {/* Email */}
                <div>
                    <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2 font-medium">
                        {TRANSLATIONS.email_placeholder[lang]}
                    </label>
                    <input 
                    type="email" 
                    name="email"
                    autoComplete="email" // Автозаповнення
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-cream-50 border border-stone-200 p-3 rounded-md focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-all"
                    placeholder="example@gmail.com"
                    />
                </div>

                {/* Телефон (НОВЕ) */}
                <div>
                    <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2 font-medium">
                        Телефон
                    </label>
                    <input 
                    type="tel" 
                    name="phone"
                    autoComplete="tel" // Автозаповнення
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-cream-50 border border-stone-200 p-3 rounded-md focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-all"
                    placeholder="+380..."
                    />
                </div>

                {/* Повідомлення */}
                <div>
                    <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2 font-medium">
                        {TRANSLATIONS.message_placeholder[lang]}
                    </label>
                    <textarea 
                    name="message"
                    rows={3}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-cream-50 border border-stone-200 p-3 rounded-md focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-all resize-none"
                    placeholder="Ваш коментар..."
                    />
                </div>

                {/* Завантаження файлу (НОВЕ) */}
                <div>
                    <input 
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*" // Тільки картинки
                    />
                    
                    {!selectedFile ? (
                        <button 
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="flex items-center gap-2 text-stone-500 hover:text-gold-600 transition-colors text-sm"
                        >
                            <Paperclip className="w-4 h-4" />
                            <span>Прикріпити фото (референс)</span>
                        </button>
                    ) : (
                        <div className="flex items-center gap-2 bg-stone-100 px-3 py-2 rounded-md inline-flex">
                            <span className="text-sm text-stone-700 truncate max-w-[200px]">
                                {selectedFile.name}
                            </span>
                            <button 
                                type="button" 
                                onClick={removeFile}
                                className="text-stone-400 hover:text-red-500"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>

                <button 
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-stone-900 text-white py-4 text-sm uppercase tracking-widest hover:bg-gold-600 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed rounded-md mt-2 shadow-lg shadow-stone-200"
                >
                    {status === 'loading' ? 'Відправка...' : TRANSLATIONS.send_message[lang]}
                </button>

                {status === 'error' && (
                    <p className="text-red-500 text-center text-sm">Виникла помилка. Перевірте з'єднання.</p>
                )}
                </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
};