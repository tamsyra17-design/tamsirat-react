export default function Toast({ message }) {
  return (
    <div id="toast" className={message ? 'on' : ''} aria-live="polite">
      <i className="fas fa-check-circle toast-icon" />
      <span id="toastTxt">{message}</span>
    </div>
  );
}
