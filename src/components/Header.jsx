export default function Header({ t, cartCount, lang, searchTerm, onMenu, onCart, onLanguage, onSearch, onClearSearch, scrolled }) {
  return (
    <header className={`hdr${scrolled ? ' scrolled' : ''}`} id="mainHdr">
      <a className="hdr-brand" href="#" onClick={(event) => event.preventDefault()}>
        <button className="hbtn" id="menuBtn" aria-label="فتح القائمة" type="button" onClick={onMenu}>
          <i className="fas fa-bars" />
        </button>
        <img src="https://aleizom.com/logo.png" alt="تمصيرة العز" className="hdr-logo" decoding="async" />
        <div className="hdr-name">تمصيرة <b>العز</b></div>
      </a>

      <div className="hdr-search">
        <div className="search-shell">
          <i className="fas fa-search" aria-hidden="true" />
          <label className="sr-only" htmlFor="searchInput">البحث</label>
          <input
            type="search"
            id="searchInput"
            placeholder={t.searchPH}
            autoComplete="off"
            value={searchTerm}
            onChange={(event) => onSearch(event.target.value)}
          />
          <button
            id="searchClearBtn"
            aria-label="مسح"
            type="button"
            style={{ display: searchTerm ? 'block' : 'none' }}
            onClick={onClearSearch}
          >
            ✕
          </button>
        </div>
      </div>

      <div className="hdr-actions">
        <button className="hbtn" id="langBtn" title="EN / عربي" type="button" onClick={onLanguage} aria-label={lang === 'ar' ? 'English' : 'Arabic'}>
          <i className="fas fa-globe" />
        </button>
        <button className="hbtn hbtn-cart" id="cartBtn" aria-label="سلة التسوق" type="button" onClick={onCart}>
          <i className="fas fa-shopping-bag" />
          <span className="cart-dot" id="cartDot">{cartCount}</span>
        </button>
      </div>
    </header>
  );
}
