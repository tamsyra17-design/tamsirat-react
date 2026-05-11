import { useEffect, useMemo, useState } from 'react';
import ProductCard from './ProductCard';
import { PRODUCTS_PER_PAGE } from '../utils/config';
import { categoryName, localized } from '../utils/productUtils';

export default function ProductView({ products, activeCat, searchTerm, lang, t, onBack, onAddCart, onOpenModal, onWhatsApp }) {
  const [sort, setSort] = useState('default');
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [activeCat, searchTerm, sort]);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    let data = [...products];

    if (activeCat && activeCat !== 'all') {
      data = data.filter((product) => (product.category_ar || product.category) === activeCat);
    }

    if (normalizedSearch) {
      data = data.filter((product) => {
        const productName = localized(product, lang, 'name_ar', 'name_en').toLowerCase();
        const productCategory = categoryName(product.category_ar || product.category, products, lang).toLowerCase();
        return productName.includes(normalizedSearch) || productCategory.includes(normalizedSearch);
      });
    }

    if (sort === 'price-asc') data.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') data.sort((a, b) => b.price - a.price);
    if (sort === 'name-asc') data.sort((a, b) => localized(a, lang, 'name_ar', 'name_en').localeCompare(localized(b, lang, 'name_ar', 'name_en'), lang === 'ar' ? 'ar' : 'en'));

    return data;
  }, [products, activeCat, searchTerm, sort, lang]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));
  const visibleProducts = filteredProducts.slice((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE);
  const title = activeCat === 'all' ? t.all : categoryName(activeCat, products, lang);

  function goToPage(nextPage) {
    const value = Math.max(1, Math.min(totalPages, nextPage));
    setPage(value);
    setTimeout(() => {
      const element = document.getElementById('productSectionView');
      if (element) window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' });
    }, 0);
  }

  return (
    <section id="productSectionView" style={{ display: 'block' }}>
      <div className="toolbar reveal vis">
        <div className="toolbar-l">
          <button className="back-btn" id="backBtn" type="button" onClick={onBack}>
            <i className="fas fa-arrow-right" /><span id="backLbl">{t.back}</span>
          </button>
          <span className="toolbar-title" id="prodViewTitle">{title}</span>
        </div>
        <div className="sort-wrap">
          <label className="sort-label" htmlFor="sortSel" id="sortLbl">{t.sort}</label>
          <select className="sort-select" id="sortSel" value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="default">{t.sortDef}</option>
            <option value="price-asc">{t.sortPA}</option>
            <option value="price-desc">{t.sortPD}</option>
            <option value="name-asc">{t.sortNA}</option>
          </select>
        </div>
      </div>

      <div className="prod-grid" id="prodGrid">
        {visibleProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            products={products}
            lang={lang}
            t={t}
            onAddCart={onAddCart}
            onOpenModal={onOpenModal}
            onWhatsApp={onWhatsApp}
          />
        ))}
      </div>

      {!visibleProducts.length ? (
        <div id="noProductsMsg" style={{ display: 'block' }}><i className="fas fa-search no-icon" /><span id="noProdTxt">{t.noProd}</span></div>
      ) : null}

      <div id="paginCtrl">
        {totalPages > 1 ? (
          <>
            <button className="pg-btn" type="button" disabled={page === 1} onClick={() => goToPage(page - 1)}>
              <i className={`fas fa-chevron-${lang === 'ar' ? 'right' : 'left'}`} /> {t.prev}
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
              <button className={`pg-btn${pageNumber === page ? ' on' : ''}`} type="button" key={pageNumber} onClick={() => goToPage(pageNumber)}>{pageNumber}</button>
            ))}
            <button className="pg-btn" type="button" disabled={page === totalPages} onClick={() => goToPage(page + 1)}>
              {t.next} <i className={`fas fa-chevron-${lang === 'ar' ? 'left' : 'right'}`} />
            </button>
          </>
        ) : null}
      </div>
    </section>
  );
}
