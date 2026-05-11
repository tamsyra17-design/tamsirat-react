import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { badgeLabel, categoryName, getImages, localized, normalizedStatus, statusLabel } from '../utils/productUtils';

export default function ProductCard({ product, products, lang, t, onAddCart, onOpenModal, onWhatsApp }) {
  const name = localized(product, lang, 'name_ar', 'name_en');
  const category = categoryName(product.category_ar || product.category, products, lang);
  const images = getImages(product);
  const status = normalizedStatus(product.status);
  const isOut = status === 'out';
  const isLimited = status === 'lim';
  const badge = badgeLabel(product.badge, t);
  const badgeClass = badge === t.badgeNew ? 'new' : badge === t.badgeBest ? 'best' : 'lim';
  const statusClass = isOut ? 'out' : isLimited ? 'lim' : 'in';
  const safeId = String(product.id).replace(/[^a-zA-Z0-9_-]/g, '');

  return (
    <article className="prod-card" data-pid={product.id}>
      <div className="prod-img" data-modal={product.id} id={`cw-${safeId}`} onClick={() => onOpenModal(product.id)}>
        {badge ? <span className={`prod-badge ${badgeClass}`}>{badge}</span> : null}
        {isOut ? <span className="prod-badge-out">{t.outStock}</span> : null}

        <Swiper
          className="card-sw"
          modules={[Autoplay, Navigation, Pagination]}
          slidesPerView={1}
          loop={images.length > 1}
          speed={420}
          autoplay={images.length > 1 ? { delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true } : false}
          pagination={images.length > 1 ? { clickable: true } : false}
          navigation={images.length > 1 ? { nextEl: `.card-next-${safeId}`, prevEl: `.card-prev-${safeId}` } : false}
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
        >
          {images.map((image) => (
            <SwiperSlide key={image}>
              <img src={image} alt={name} loading="lazy" />
            </SwiperSlide>
          ))}
        </Swiper>

        {images.length > 1 ? (
          <>
            <button className={`card-arrow card-arrow-prev card-prev-${safeId}`} aria-label={t.prev} type="button" onClick={(event) => event.stopPropagation()}>
              <i className="fas fa-chevron-left" />
            </button>
            <button className={`card-arrow card-arrow-next card-next-${safeId}`} aria-label={t.next} type="button" onClick={(event) => event.stopPropagation()}>
              <i className="fas fa-chevron-right" />
            </button>
          </>
        ) : null}

        <div className="prod-img-overlay">
          <button className="quick-view-btn" type="button" onClick={(event) => { event.stopPropagation(); onOpenModal(product.id); }}>
            {t.quickView}
          </button>
        </div>
      </div>

      <div className="prod-body">
        <div className="prod-cat-tag">{category}</div>
        <div className="prod-name">{name}</div>
        <div className="prod-foot">
          <span className="prod-price"><span className="prod-price-currency">OMR</span>{Number(product.price || 0).toFixed(3)}</span>
          <span className={`prod-status-tag ${statusClass}`}>{statusLabel(product.status, t)}</span>
        </div>
        <div className="prod-actions">
          <button className="btn-add" type="button" disabled={isOut} onClick={() => onAddCart(product.id)}>
            <i className="fas fa-cart-plus" />{t.addCart}
          </button>
          <button className="btn-wa" type="button" disabled={isOut} onClick={() => onWhatsApp(product)}>
            <i className="fab fa-whatsapp" />{isOut ? t.outStock : t.orderWa}
          </button>
        </div>
      </div>
    </article>
  );
}
