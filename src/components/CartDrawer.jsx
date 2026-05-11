import { FREE_SHIP_THRESHOLD } from '../utils/config';

export default function CartDrawer({ open, cart, total, t, onClose, onQty, onRemove, onCheckout }) {
  const percentage = Math.min((total / FREE_SHIP_THRESHOLD) * 100, 100);
  const remaining = Math.max(FREE_SHIP_THRESHOLD - total, 0).toFixed(3);
  const shippingText = total >= FREE_SHIP_THRESHOLD ? t.shipFree : t.shipMsg.replace('{n}', remaining);

  return (
    <>
      <div id="cartOvr" className={`overlay${open ? ' on' : ''}`} onClick={onClose} />
      <aside id="cartDrw" className={`drawer cart-drawer${open ? ' on' : ''}`} aria-label="سلة التسوق">
        <div className="drw-hd">
          <span className="drw-title" id="cartTitle">{t.cartTitle}</span>
          <button className="drw-close" id="closeCartBtn" type="button" onClick={onClose}>✕</button>
        </div>

        <div className="ship-bar" id="shipBar">
          <div className="ship-bar-top">
            <span id="shipMsg">{shippingText}</span>
            <span id="shipPct">{Math.round(percentage)}%</span>
          </div>
          <div className="ship-bar-track"><div className="ship-bar-fill" id="shipFill" style={{ width: `${percentage}%` }} /></div>
        </div>

        <div className="cart-body" id="cartBody">
          {!cart.length ? (
            <div className="cart-empty">
              <i className="fas fa-shopping-bag cart-empty-icon" />
              <p>{t.emptyCart}</p>
            </div>
          ) : cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img className="cart-item-img" src={item.img} alt={item.name} loading="lazy" />
              <div className="cart-item-info">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-price">OMR {Number(item.price || 0).toFixed(3)}</div>
                <div className="cart-item-ctrl">
                  <button className="qty-btn" type="button" onClick={() => onQty(item.id, -1)}>−</button>
                  <span className="qty-num">{item.qty}</span>
                  <button className="qty-btn" type="button" onClick={() => onQty(item.id, 1)}>+</button>
                  <button className="rm-btn" type="button" title={t.remove} onClick={() => onRemove(item.id)}>
                    <i className="fas fa-trash-alt" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-foot">
          <div className="cart-total-row">
            <span className="cart-total-lbl" id="totalLbl">{t.total}</span>
            <span className="cart-total-val" id="cartTotalVal">OMR {Number(total || 0).toFixed(3)}</span>
          </div>
          <button className="checkout-btn" id="checkoutBtn" type="button" onClick={onCheckout}>
            <i className="fab fa-whatsapp" style={{ fontSize: '1.1rem' }} />
            <span id="checkoutLbl">{t.checkout}</span>
          </button>
        </div>
      </aside>
    </>
  );
}
