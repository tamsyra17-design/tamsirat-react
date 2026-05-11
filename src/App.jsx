import { useEffect, useMemo, useState } from 'react';
import CartDrawer from './components/CartDrawer';
import Categories from './components/Categories';
import FloatingButtons from './components/FloatingButtons';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import Loader from './components/Loader';
import NavDrawer from './components/NavDrawer';
import ProductModal from './components/ProductModal';
import ProductView from './components/ProductView';
import PromoBar from './components/PromoBar';
import Toast from './components/Toast';
import TrustBar from './components/TrustBar';
import { useCart } from './hooks/useCart';
import { useStoreData } from './hooks/useStoreData';
import { T } from './i18n/translations';
import { localized } from './utils/productUtils';
import { openWhatsApp } from './utils/whatsapp';

function App() {
  const [lang, setLang] = useState('ar');
  const [view, setView] = useState('home');
  const [activeCat, setActiveCat] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [navOpen, setNavOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeProductId, setActiveProductId] = useState(null);
  const [toast, setToast] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [loaderHidden, setLoaderHidden] = useState(false);

  const dictionary = T[lang];
  const { products, loading } = useStoreData();

  function showToast(message, duration = 2000) {
    setToast(message);
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => setToast(''), duration);
  }

  const cart = useCart(
    products,
    lang,
    () => {
      showToast(dictionary.addedCart);
      setCartOpen(true);
    },
    () => showToast(dictionary.outStock, 1500),
  );

  const activeProduct = useMemo(
    () => products.find((product) => product.id === activeProductId) || null,
    [products, activeProductId],
  );

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.toggle('rtl', lang === 'ar');
    document.body.classList.toggle('ltr', lang === 'en');
  }, [lang]);

  useEffect(() => {
    if (!loading) {
      const timer = window.setTimeout(() => setLoaderHidden(true), 600);
      return () => window.clearTimeout(timer);
    }
  }, [loading]);

  useEffect(() => {
    function onScroll() {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(maxScroll > 0 ? Math.min((window.scrollY / maxScroll) * 100, 100) : 0);
      setShowScrollTop(window.scrollY > 400);
      setHeaderScrolled(window.scrollY > 60);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key !== 'Escape') return;
      if (activeProductId) setActiveProductId(null);
      else if (cartOpen) setCartOpen(false);
      else if (navOpen) setNavOpen(false);
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [activeProductId, cartOpen, navOpen]);

  function goHome() {
    setActiveCat('all');
    setSearchTerm('');
    setView('home');
  }

  function openCategory(category) {
    setActiveCat(category);
    setSearchTerm('');
    setView('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleSearch(value) {
    setSearchTerm(value);
    if (value.trim()) {
      setActiveCat('all');
      setView('products');
    }
  }

  function clearSearch() {
    setSearchTerm('');
    if (view === 'home') goHome();
  }

  function toggleLanguage() {
    setLang((current) => (current === 'ar' ? 'en' : 'ar'));
  }

  function scrollToCategories() {
    const element = document.getElementById('catView');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  }

  function handleWhatsApp(product) {
    const name = localized(product, lang, 'name_ar', 'name_en');
    const price = Number(product.price || 0).toFixed(3);
    const message = lang === 'ar'
      ? `السلام عليكم، أرغب في شراء:\nالمنتج: ${name}\nالسعر: ${price} ريال عماني`
      : `Hello, I'd like to purchase:\nItem: ${name}\nPrice: OMR ${price}`;
    openWhatsApp(message);
  }

  function checkout() {
    if (!cart.cart.length) {
      showToast(dictionary.emptyCart, 1500);
      return;
    }

    let message = '';
    cart.cart.forEach((item) => {
      const subtotal = Number(item.price || 0) * Number(item.qty || 0);
      message += `• ${item.name} × ${item.qty} = ${subtotal.toFixed(3)} OMR\n`;
    });
    message += `\n${dictionary.total}: ${cart.total.toFixed(3)} OMR\n\n`;
    message += lang === 'ar' ? 'أود تأكيد الطلب' : 'I would like to confirm this order';
    openWhatsApp(message);
  }

  return (
    <>
      <div id="scrollBar" aria-hidden="true" style={{ width: `${scrollProgress}%` }} />
      <Loader hidden={loaderHidden} />
      <PromoBar />

      <Header
        t={dictionary}
        cartCount={cart.count}
        lang={lang}
        searchTerm={searchTerm}
        scrolled={headerScrolled}
        onMenu={() => setNavOpen(true)}
        onCart={() => setCartOpen(true)}
        onLanguage={toggleLanguage}
        onSearch={handleSearch}
        onClearSearch={clearSearch}
      />

      <NavDrawer
        open={navOpen}
        products={products}
        activeCat={activeCat}
        lang={lang}
        t={dictionary}
        onClose={() => setNavOpen(false)}
        onSelectCategory={openCategory}
        onHome={goHome}
      />

      <Hero t={dictionary} lang={lang} onExplore={scrollToCategories} />

      <main>
        <TrustBar t={dictionary} />
        {view === 'home' ? (
          <Categories products={products} lang={lang} t={dictionary} onSelectCategory={openCategory} />
        ) : (
          <ProductView
            products={products}
            activeCat={activeCat}
            searchTerm={searchTerm}
            lang={lang}
            t={dictionary}
            onBack={goHome}
            onAddCart={cart.addToCart}
            onOpenModal={setActiveProductId}
            onWhatsApp={handleWhatsApp}
          />
        )}
      </main>

      <FloatingButtons showScrollTop={showScrollTop} onTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
      <Footer t={dictionary} />
      <Toast message={toast} />

      <ProductModal
        product={activeProduct}
        products={products}
        lang={lang}
        t={dictionary}
        open={Boolean(activeProduct)}
        onClose={() => setActiveProductId(null)}
        onAddCart={cart.addToCart}
        onWhatsApp={handleWhatsApp}
      />

      <CartDrawer
        open={cartOpen}
        cart={cart.cart}
        total={cart.total}
        t={dictionary}
        onClose={() => setCartOpen(false)}
        onQty={cart.changeQuantity}
        onRemove={cart.removeFromCart}
        onCheckout={checkout}
      />
    </>
  );
}

export default App;
