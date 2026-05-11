export default function Footer({ t }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <span className="footer-brand-name">تمصيرة العز</span>
            <p className="footer-tagline" id="footerTag">{t.footerTag}</p>
          </div>
          <div className="footer-links">
            <a href="tel:+96895149291" className="footer-lnk"><i className="fas fa-phone-alt" /><span style={{ direction: 'ltr', unicodeBidi: 'embed' }}>+968 9514 9291</span></a>
            <a href="mailto:admin@aleizom.com" className="footer-lnk"><i className="fas fa-envelope" />admin@aleizom.com</a>
            <a href="https://www.instagram.com/omanitmsyra" target="_blank" rel="noopener noreferrer" className="footer-lnk"><i className="fab fa-instagram" />@omanitmsyra</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy" id="footerCopy">{t.copy}</p>
          <div className="footer-badges">
            <span className="foot-badge"><i className="fas fa-shield-alt" />آمن 100%</span>
            <span className="foot-badge"><i className="fab fa-whatsapp" />واتساب</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
