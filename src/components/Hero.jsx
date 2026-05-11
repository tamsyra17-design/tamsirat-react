import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Hero({ t, lang, onExplore }) {
  return (
    <div className="hero-wrap">
      <section className="hero-shell" aria-label="العروض الرئيسية">
        <Swiper
          key={lang}
          className="hero-swiper"
          modules={[Autoplay, Navigation, Pagination]}
          loop
          speed={1000}
          grabCursor
          autoplay={{ delay: 5500, disableOnInteraction: false }}
          navigation={{ nextEl: '.hero-next', prevEl: '.hero-prev' }}
          pagination={{ el: '.hero-pag', clickable: true, dynamicBullets: true }}
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
        >
          <SwiperSlide>
            <div className="hero-txt">
              <div className="hero-kicker"><span className="hero-kicker-dot" /><span>{t.kick1}</span></div>
              <h1 className="hero-h">{t.h1}</h1>
              <p className="hero-sub">{t.p1}</p>
              <div className="hero-actions">
                <button className="hero-cta js-scroll-cats" type="button" onClick={onExplore}>
                  <span>{t.btn1}</span> <i className="fas fa-arrow-left" />
                </button>
                <button className="hero-cta-ghost js-scroll-cats" type="button" onClick={onExplore}>{t.btnG1}</button>
              </div>
              <div className="hero-badges">
                <div className="hero-badge"><i className="fas fa-shield-check" /><span>{t.hb1}</span></div>
                <div className="hero-badge"><i className="fas fa-truck" /><span>{t.hb2}</span></div>
                <div className="hero-badge"><i className="fab fa-whatsapp" /><span>{t.hb3}</span></div>
              </div>
            </div>
            <div className="hero-media">
              <img src="https://aleizom.com/heroImg1.png" alt="منتجات عمانية" decoding="async" />
              <div className="hero-float-card hero-float-1"><i className="fas fa-star" /><div><div style={{ fontSize: '.85rem', fontWeight: 800, color: 'var(--teal)' }}>{t.fc1n}</div><div style={{ fontSize: '.7rem', color: 'var(--muted)' }}>{t.fc1l}</div></div></div>
              <div className="hero-float-card hero-float-2"><i className="fas fa-check-circle" /><div><div style={{ fontSize: '.85rem', fontWeight: 800, color: 'var(--teal)' }}>{t.fc2n}</div><div style={{ fontSize: '.7rem', color: 'var(--muted)' }}>{t.fc2l}</div></div></div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="hero-media">
              <img src="https://aleizom.com/1.jpeg" alt="جودة عالية" decoding="async" />
            </div>
            <div className="hero-txt">
              <div className="hero-kicker"><span className="hero-kicker-dot" /><span>{t.kick2}</span></div>
              <h2 className="hero-h">{t.h2}</h2>
              <p className="hero-sub">{t.p2}</p>
              <div className="hero-actions">
                <button className="hero-cta js-scroll-cats" type="button" onClick={onExplore}><span>{t.btn2}</span></button>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="hero-txt">
              <div className="hero-kicker"><span className="hero-kicker-dot" /><span>{t.kick3}</span></div>
              <h2 className="hero-h">{t.h3}</h2>
              <p className="hero-sub">{t.p3}</p>
              <div className="hero-actions">
                <button className="hero-cta js-scroll-cats" type="button" onClick={onExplore}><span>{t.btn3}</span></button>
              </div>
            </div>
            <div className="hero-media">
              <img src="https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg?auto=compress&cs=tinysrgb&w=600" alt="توصيل سريع" loading="lazy" decoding="async" />
            </div>
          </SwiperSlide>

          <div className="swiper-button-next hero-next" />
          <div className="swiper-button-prev hero-prev" />
          <div className="swiper-pagination hero-pag" />
        </Swiper>
      </section>
    </div>
  );
}
