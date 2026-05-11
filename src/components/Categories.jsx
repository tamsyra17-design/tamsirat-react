import { categoryName, getImages, productCategories } from '../utils/productUtils';
import { whatsappUrl } from '../utils/whatsapp';

export default function Categories({ products, lang, t, onSelectCategory }) {
  const categories = productCategories(products);

  return (
    <section id="catView">
      <div className="sec-head reveal vis">
        <div>
          <div className="sec-eyebrow" id="catEye">{t.catEye}</div>
          <h2 className="sec-h" id="catH">{t.catH}</h2>
        </div>
      </div>

      <div className="cat-grid" id="catGrid">
        {categories.map((category) => {
          const cover = products.find((product) => (product.category_ar || product.category) === category);
          const count = products.filter((product) => (product.category_ar || product.category) === category).length;
          const name = categoryName(category, products, lang);
          const image = getImages(cover)[0];

          return (
            <button className="cat-card reveal vis" data-cat={category} aria-label={name} type="button" onClick={() => onSelectCategory(category)} key={category}>
              <img src={image} alt={name} loading="lazy" />
              <div className="cat-cover">
                <div className="cat-name">{name}</div>
                <span className="cat-pill">{count} {t.products}</span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="cta-strip reveal vis">
        <div className="cta-strip-txt">
          <h3 id="ctaH">{t.ctaH}</h3>
          <p id="ctaP">{t.ctaP}</p>
        </div>
        <a href={whatsappUrl('السلام عليكم ، أرغب في الاستفسار')} target="_blank" rel="noopener noreferrer" className="cta-strip-btn">
          <i className="fab fa-whatsapp" style={{ fontSize: '1.3rem' }} />
          <span id="ctaBtn">{t.ctaBtn}</span>
        </a>
      </div>
    </section>
  );
}
