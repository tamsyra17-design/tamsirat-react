import { categoryName, productCategories } from '../utils/productUtils';

export default function NavDrawer({ open, products, activeCat, lang, t, onClose, onSelectCategory, onHome }) {
  const categories = productCategories(products);

  function selectCategory(category) {
    if (category === 'all') onHome();
    else onSelectCategory(category);
    onClose();
  }

  return (
    <>
      <div id="navOvr" className={`overlay${open ? ' on' : ''}`} onClick={onClose} />
      <aside id="navDrw" className={`drawer nav-drawer${open ? ' on' : ''}`} aria-label="القائمة">
        <div className="drw-hd">
          <span className="drw-title" id="navTitle">{t.menu}</span>
          <button className="drw-close" id="closeNavBtn" type="button" onClick={onClose}>✕</button>
        </div>
        <nav className="nav-body" id="navLinks">
          <button className={`nav-lnk${activeCat === 'all' ? ' on' : ''}`} type="button" onClick={() => selectCategory('all')}>
            <i className="fas fa-store" />
            {t.all}
          </button>
          {categories.map((category) => (
            <button
              className={`nav-lnk${activeCat === category ? ' on' : ''}`}
              key={category}
              type="button"
              onClick={() => selectCategory(category)}
            >
              <i className={`fas fa-angle-${lang === 'ar' ? 'left' : 'right'}`} />
              {categoryName(category, products, lang)}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}
