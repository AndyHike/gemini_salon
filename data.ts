import { Service, GalleryItem, NavItem } from './types';

export const SERVICES: Service[] = [
  // Hair
  {
    id: 1,
    name_en: "Luxury Haircut & Style",
    name_uk: "Люкс стрижка та укладка",
    name_cs: "Luxusní střih a styling",
    price: 80,
    currency: "USD",
    category: "hair"
  },
  {
    id: 2,
    name_en: "Balayage Color",
    name_uk: "Фарбування Балаяж",
    name_cs: "Barvení Balayage",
    price: 150,
    currency: "USD",
    category: "hair"
  },
  {
    id: 3,
    name_en: "Keratin Treatment",
    name_uk: "Кератинове вирівнювання",
    name_cs: "Keratinové ošetření",
    price: 200,
    currency: "USD",
    category: "hair"
  },
  // Nails
  {
    id: 4,
    name_en: "Classic Manicure",
    name_uk: "Класичний манікюр",
    name_cs: "Klasická manikúra",
    price: 35,
    currency: "USD",
    category: "nails"
  },
  {
    id: 5,
    name_en: "Gel Pedicure",
    name_uk: "Гель-педикюр",
    name_cs: "Gelová pedikúra",
    price: 55,
    currency: "USD",
    category: "nails"
  },
  // Face
  {
    id: 6,
    name_en: "Deep Cleansing Facial",
    name_uk: "Глибока чистка обличчя",
    name_cs: "Hloubkové čištění pleti",
    price: 90,
    currency: "USD",
    category: "face"
  },
  {
    id: 7,
    name_en: "Anti-Aging Gold Mask",
    name_uk: "Антивікова золота маска",
    name_cs: "Omlazující zlatá maska",
    price: 120,
    currency: "USD",
    category: "face"
  },
  // Spa
  {
    id: 8,
    name_en: "Aromatherapy Massage",
    name_uk: "Аромамасаж",
    name_cs: "Aromaterapeutická masáž",
    price: 100,
    currency: "USD",
    category: "spa"
  }
];

export const GALLERY: GalleryItem[] = [
  { id: 1, url: "https://picsum.photos/600/800?random=1", alt: "Modern Interior" },
  { id: 2, url: "https://picsum.photos/800/600?random=2", alt: "Hair Styling" },
  { id: 3, url: "https://picsum.photos/600/600?random=3", alt: "Nail Art" },
  { id: 4, url: "https://picsum.photos/600/900?random=4", alt: "Facial Treatment" },
  { id: 5, url: "https://picsum.photos/800/800?random=5", alt: "Products" },
  { id: 6, url: "https://picsum.photos/600/800?random=6", alt: "Reception" }
];

export const NAV_ITEMS: NavItem[] = [
  { key: 'home', label_en: 'Home', label_uk: 'Головна', label_cs: 'Domů', href: '/#home' },
  { key: 'services', label_en: 'Services', label_uk: 'Послуги', label_cs: 'Služby', href: '/#services' },
  { key: 'gallery', label_en: 'Gallery', label_uk: 'Галерея', label_cs: 'Galerie', href: '/#gallery' },
  { key: 'contact', label_en: 'Contact', label_uk: 'Контакти', label_cs: 'Kontakt', href: '/#contact' },
];

export const TRANSLATIONS = {
  hero_title: {
    en: "Timeless Elegance & Beauty",
    uk: "Вічна Елегантність та Краса",
    cs: "Nadčasová Elegance a Krása"
  },
  hero_subtitle: {
    en: "Experience the art of luxury care at Luxe Salon.",
    uk: "Відчуйте мистецтво розкішного догляду в Luxe Salon.",
    cs: "Zažijte umění luxusní péče v Luxe Salon."
  },
  book_now: {
    en: "Book Appointment",
    uk: "Записатись",
    cs: "Rezervovat"
  },
  our_services: {
    en: "Our Services",
    uk: "Наші Послуги",
    cs: "Naše Služby"
  },
  gallery_title: {
    en: "Moments of Beauty",
    uk: "Моменти Краси",
    cs: "Okamžiky Краси"
  },
  contact_us: {
    en: "Contact Us",
    uk: "Зв'яжіться з Нами",
    cs: "Kontaktujte Nás"
  },
  send_message: {
    en: "Send Message",
    uk: "Надіслати",
    cs: "Odeslat Zprávu"
  },
  name_placeholder: {
    en: "Your Name",
    uk: "Ваше Ім'я",
    cs: "Vaše Jméno"
  },
  email_placeholder: {
    en: "Email Address",
    uk: "Електронна пошта",
    cs: "E-mailová adresa"
  },
  message_placeholder: {
    en: "How can we help you?",
    uk: "Чим ми можемо допомогти?",
    cs: "Jak vám můžeme pomoci?"
  },
  footer_rights: {
    en: "All rights reserved.",
    uk: "Всі права захищено.",
    cs: "Všechna práva vyhrazena."
  }
};