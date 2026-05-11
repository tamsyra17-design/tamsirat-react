import { useEffect, useMemo, useState } from 'react';
import { getImages, localized, normalizedStatus } from '../utils/productUtils';

const STORAGE_KEY = 'tamsirat_v3';

function loadCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function useCart(products, lang, onAdded, onUnavailable) {
  const [cart, setCart] = useState(loadCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.qty || 0), 0),
    [cart],
  );

  const count = useMemo(() => cart.reduce((sum, item) => sum + Number(item.qty || 0), 0), [cart]);

  function addToCart(productId, qty = 1) {
    const product = products.find((item) => item.id === productId);
    if (!product) return false;
    if (normalizedStatus(product.status) === 'out') {
      onUnavailable?.();
      return false;
    }

    setCart((current) => {
      const existing = current.find((item) => item.id === productId);
      if (existing) {
        return current.map((item) => (item.id === productId ? { ...item, qty: item.qty + qty } : item));
      }

      const images = getImages(product);
      return [
        ...current,
        {
          id: product.id,
          name: localized(product, lang, 'name_ar', 'name_en'),
          price: Number(product.price || 0),
          qty,
          img: images[0] || '',
        },
      ];
    });

    onAdded?.();
    return true;
  }

  function removeFromCart(productId) {
    setCart((current) => current.filter((item) => item.id !== productId));
  }

  function changeQuantity(productId, delta) {
    setCart((current) =>
      current
        .map((item) => (item.id === productId ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0),
    );
  }

  return {
    cart,
    total,
    count,
    addToCart,
    removeFromCart,
    changeQuantity,
  };
}
