export default function Loader({ hidden }) {
  return (
    <div id="loader" className={hidden ? 'out' : ''}>
      <div className="loader-logo">تمصيرة العز</div>
      <div className="loader-ring" />
    </div>
  );
}
