import { useEffect, useState } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { categoryName, getImages, localized, normalizedStatus, statusLabel } from '../utils/productUtils';

export default function ProductModal({ product, products, lang, t, open, onClose, onAddCart, onWhatsApp }) {
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      setActiveImage(0);
    } else {
      document.body.style.overflow = '';
      setLightboxOpen(false);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open, product?.id]);

  if (!product) return null;

  const images = getImages(product);
  const isOut = normalizedStatus(product.status) === 'out';
  const name = localized(product, lang, 'name_ar', 'name_en');
  const category = categoryName(product.category_ar || product.category, products, lang);
  const material = localized(product, lang, 'material_ar', 'material_en') || '—';
  const description = localized(product, lang, 'description_ar', 'description_en') || '';

  return (
    <>
      <div id="prodModal" className={`modal-bg${open ? ' on' : ''}`} role="dialog" aria-modal="true" aria-labelledby="modalName" onClick={(event) => { if (event.target.id === 'prodModal') onClose(); }}>
        <div className="modal-box">
          <button className="modal-close-btn" id="modalCloseBtn" type="button" onClick={onClose}>✕</button>
          <div className="modal-gal">
            <Swiper
              key={product.id}
              className="swiper"
              id="modalSwiper"
              modules={[Navigation, Pagination]}
              slidesPerView={1}
              loop={images.length > 1}
              speed={380}
              pagination={{ clickable: true }}
              navigation={{ nextEl: '#modalNext', prevEl: '#modalPrev' }}
              dir={lang === 'ar' ? 'rtl' : 'ltr'}
              onSlideChange={(swiper) => setActiveImage(swiper.realIndex)}
            >
              {images.map((image) => (
                <SwiperSlide key={image}>
                  <img src={image} alt={name} loading="lazy" onClick={() => setLightboxOpen(true)} />
                </SwiperSlide>
              ))}
            </Swiper>
            <button className="modal-gal-nav mgn-prev" id="modalPrev" type="button"><i className="fas fa-chevron-left" /></button>
            <button className="modal-gal-nav mgn-next" id="modalNext" type="button"><i className="fas fa-chevron-right" /></button>
          </div>

          <div className="modal-thumbs" id="modalThumbs">
            {images.map((image, index) => (
              <div className={`modal-thumb${index === activeImage ? ' on' : ''}`} key={image}>
                <img src={image} alt="" loading="lazy" />
              </div>
            ))}
          </div>

          <div className="modal-info">
            <div className="modal-cat-tag" id="modalCatTag">{category}</div>
            <h3 className="modal-name" id="modalName">{name}</h3>
            <div className="modal-price-tag" id="modalPrice">OMR {Number(product.price || 0).toFixed(3)}</div>
            <div className="modal-details">
              <div className="modal-det"><div className="modal-det-lbl" id="mCatLbl">{t.catLbl}</div><div className="modal-det-val" id="mCat">{category || '—'}</div></div>
              <div className="modal-det"><div className="modal-det-lbl" id="mStatLbl">{t.statLbl}</div><div className="modal-det-val" id="mStat" style={{ color: isOut ? 'var(--red)' : 'var(--green)' }}>{statusLabel(product.status, t)}</div></div>
              <div className="modal-det"><div className="modal-det-lbl" id="mMatLbl">{t.matLbl}</div><div className="modal-det-val" id="mMat">{material}</div></div>
            </div>
            {description ? <p className="modal-desc" id="mDesc">{description}</p> : null}
            <div className="modal-acts">
              <button className="mbtn-cart" id="mCartBtn" type="button" disabled={isOut} onClick={() => onAddCart(product.id)}><i className="fas fa-cart-plus" /><span id="mCartLbl">{t.addCart}</span></button>
              <button className="mbtn-wa" id="mWaBtn" type="button" disabled={isOut} onClick={() => onWhatsApp(product)}><i className="fab fa-whatsapp" /><span id="mWaLbl">{t.orderWa}</span></button>
            </div>
          </div>
        </div>
      </div>

      <div id="lbox" className={`lbox${lightboxOpen ? ' on' : ''}`} onClick={(event) => { if (event.target.id === 'lbox') setLightboxOpen(false); }}>
        <img id="lboxImg" src={images[activeImage] || images[0]} alt={name} />
        <button id="lboxClose" className="lbox-close" type="button" onClick={() => setLightboxOpen(false)}>✕</button>
      </div>
    </>
  );
}
