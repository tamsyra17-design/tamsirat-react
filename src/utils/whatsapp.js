import { WHATSAPP_PHONE } from './config';

export function whatsappUrl(text) {
  return `https://api.whatsapp.com/send/?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(text)}`;
}

export function openWhatsApp(text) {
  window.open(whatsappUrl(text), '_blank', 'noopener');
}
