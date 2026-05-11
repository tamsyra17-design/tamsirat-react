import { useEffect, useState } from 'react';
import { DEMO_PRODUCTS } from '../data/demoProducts';
import { DATA_URL } from '../utils/config';
import { normalizeProducts } from '../utils/productUtils';

export function useStoreData() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState('api');

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      try {
        const response = await fetch(DATA_URL);
        if (!response.ok) throw new Error(`Request failed: ${response.status}`);
        const payload = await response.json();
        if (active) {
          setProducts(normalizeProducts(payload));
          setSource('api');
        }
      } catch (error) {
        console.warn('Using demo data because API failed:', error);
        if (active) {
          setProducts(normalizeProducts(DEMO_PRODUCTS));
          setSource('demo');
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadProducts();
    return () => {
      active = false;
    };
  }, []);

  return { products, loading, source };
}
