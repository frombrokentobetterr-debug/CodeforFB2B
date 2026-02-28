import { useState } from "react";
import { THEME } from '../styles/theme';

export default function BookingModal({ event, onClose, mockDB }) {
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const formatCard = v => v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const formatExpiry = v => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length > 2 ? d.slice(0, 2) + "/" + d.slice(2) : d;
  };

  const handlePay = async () => {
    if (!card || !expiry || !cvc || !name) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    setLoading(false);
    setSuccess(true);
    if (mockDB) {
      mockDB.sessions[event.id] = { eventId: event.id, bookedAt: new Date().toISOString() };
    }
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-card">
        {success ? (
          <div className="success-box">
            <div className="success-icon">🌿</div>
            <div className="success-title">You're confirmed!</div>
            <p className="success-desc">
              Your spot in <strong>{event.title}</strong> is reserved. A confirmation has been sent to your email. We're so glad you're here.
            </p>
            <button className="form-btn" onClick={onClose} style={{ marginTop: 28 }}>Back to Dashboard</button>
          </div>
        ) : (
          <>
            <div className="modal-title">Complete Booking</div>
            <p className="modal-sub">{event.title} · {event.price}</p>

            <div className="stripe-field">
              <label>Name on card</label>
              <input placeholder="Jane Smith" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="stripe-field">
              <label>Card number</label>
              <input placeholder="4242 4242 4242 4242" value={card} onChange={e => setCard(formatCard(e.target.value))} />
            </div>
            <div className="stripe-row">
              <div className="stripe-field">
                <label>Expiry</label>
                <input placeholder="MM/YY" value={expiry} onChange={e => setExpiry(formatExpiry(e.target.value))} />
              </div>
              <div className="stripe-field">
                <label>CVC</label>
                <input placeholder="•••" maxLength={4} value={cvc} onChange={e => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))} />
              </div>
            </div>

            <div className="stripe-secure">
              <span style={{ fontSize: 16 }}>🔒</span>
              <span>Secured by</span>
              <span className="stripe-badge">Razorpay</span>
              <span style={{ marginLeft: "auto", color: THEME.sage, fontWeight: 500 }}>256-bit SSL</span>
            </div>

            <div className="modal-btns">
              <button className="modal-cancel" onClick={onClose}>Cancel</button>
              <button
                className="modal-pay"
                onClick={handlePay}
                disabled={loading || !card || !expiry || !cvc || !name}
              >
                {loading ? "Processing..." : `Pay ${event.price}`}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
