const messages = [
  'شحن مجاني للطلبات فوق 20 ريال عماني',
  'منتجات عمانية أصيلة منذ 1986',
  'تواصل معنا عبر واتساب على مدار الساعة',
  'جودة مضمونة أو استرداد المبلغ',
];

export default function PromoBar() {
  const items = [...messages, ...messages];
  return (
    <div id="promoBar" aria-label="إشعارات المتجر">
      <div className="marquee-track" aria-hidden="true">
        {items.map((message, index) => (
          <span className="marquee-item" key={`${message}-${index}`}>
            <span className="marquee-dot" />
            {message}
          </span>
        ))}
      </div>
    </div>
  );
}
