import { APPSHEET, FALLBACK_IMAGE } from './config';

export function imageUrl(fileName) {
  if (!fileName) return '';
  const value = String(fileName).trim();
  if (!value) return '';
  if (value.startsWith('http')) return value;

  const params = new URLSearchParams({
    appName: APPSHEET.appName,
    tableName: APPSHEET.tableName,
    fileName: value,
    appVersion: '1.000005',
    signature: APPSHEET.sig,
  });

  return `${APPSHEET.baseUrl}?${params.toString()}`;
}

export function normalizeProducts(rawProducts) {
  const raw = Array.isArray(rawProducts) ? rawProducts : [];
  return raw
    .filter((product) => product && product.id && (product.name_ar || product.name_en))
    .map((product) => {
      let images = [];
      if (Array.isArray(product.images)) {
        images = product.images.map(imageUrl).filter(Boolean);
      } else if (product.image) {
        const url = imageUrl(product.image);
        if (url) images = [url];
      }

      return {
        id: String(product.id),
        name_ar: String(product.name_ar || ''),
        name_en: String(product.name_en || ''),
        category_ar: String(product.category_ar || product.category || ''),
        category_en: String(product.category_en || ''),
        description_ar: String(product.description_ar || product.description || ''),
        description_en: String(product.description_en || ''),
        material_ar: String(product.material_ar || product.material || ''),
        material_en: String(product.material_en || ''),
        price: Number(String(product.price || 0).replace(/[^0-9.]/g, '')) || 0,
        image: images[0] || '',
        images,
        status: String(product.status || 'متوفر'),
        badge: String(product.badge || ''),
      };
    });
}

export function getImages(product) {
  if (Array.isArray(product?.images) && product.images.length) {
    return product.images.map(imageUrl).filter(Boolean);
  }
  if (product?.image) {
    const url = imageUrl(product.image);
    return url ? [url] : [FALLBACK_IMAGE];
  }
  return [FALLBACK_IMAGE];
}

export function localized(product, lang, arKey, enKey) {
  const preferred = lang === 'en' ? product?.[enKey] : product?.[arKey];
  const fallback = lang === 'en' ? product?.[arKey] : product?.[enKey];
  return preferred && String(preferred).trim() ? String(preferred).trim() : String(fallback || '').trim();
}

export function categoryName(categoryAr, products, lang) {
  if (lang === 'en') {
    const sample = products.find((product) => (product.category_ar || product.category) === categoryAr);
    if (sample?.category_en?.trim()) return sample.category_en.trim();
  }
  return categoryAr;
}

export function normalizedStatus(status) {
  const value = String(status || '').trim().toLowerCase();
  if (!value) return 'in';
  if (value.includes('نفذ') || value.includes('out') || value.includes('sold') || value === 'false' || value === '0') return 'out';
  if (value.includes('limited') || value.includes('محدود')) return 'lim';
  return 'in';
}

export function statusLabel(status, dictionary) {
  const statusKey = normalizedStatus(status);
  if (statusKey === 'out') return dictionary.outStock;
  if (statusKey === 'lim') return dictionary.limited;
  return dictionary.inStock;
}

export function badgeLabel(badge, dictionary) {
  const value = String(badge || '').trim().toLowerCase();
  if (!value) return '';
  if (value === 'new' || value === 'جديد') return dictionary.badgeNew;
  if (value === 'bestseller' || value === 'الأكثر مبيعاً') return dictionary.badgeBest;
  if (value === 'limited' || value === 'محدود') return dictionary.limited;
  return String(badge || '');
}

export function productCategories(products) {
  return [...new Set(products.map((product) => product.category_ar || product.category).filter(Boolean))];
}
