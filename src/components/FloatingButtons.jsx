import { whatsappUrl } from '../utils/whatsapp';

export default function FloatingButtons({ showScrollTop, onTop }) {
  return (
    <>
      <button className="scroll-up" id="scrollUpBtn" aria-label="أعلى" type="button" style={{ display: showScrollTop ? 'flex' : 'none' }} onClick={onTop}>
        <i className="fas fa-arrow-up" />
      </button>
      <a href={whatsappUrl('السلام عليكم ، أرغب في الاستفسار')} target="_blank" rel="noopener noreferrer" className="float-wa" aria-label="واتساب">
        <i className="fab fa-whatsapp" />
      </a>
    </>
  );
}
