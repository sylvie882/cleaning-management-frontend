// src/components/Accountant/PaymentModal.jsx
import { useState } from "react";

const PaymentModal = ({ payment, onVerify, onClose }) => {
  const [status, setStatus] = useState(payment.status);
  const [notes, setNotes] = useState("");

  const handleVerify = () => {
    const verificationData = {
      status: status,
      notes: notes,
    };

    onVerify(payment._id, verificationData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content payment-modal">
        <div className="modal-header">
          <h2>Payment Details</h2>
          <button onClick={onClose} className="close-btn">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="payment-details">
          <div className="detail-section">
            <h3>Transaction Information</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="label">Transaction ID:</span>
                <span className="value">{payment.transactionId}</span>
              </div>
              <div className="detail-item">
                <span className="label">Payment Method:</span>
                <span className="value">{payment.paymentMethod}</span>
              </div>
              <div className="detail-item">
                <span className="label">Amount:</span>
                <span className="value">${payment.amount.toFixed(2)}</span>
              </div>
              <div className="detail-item">
                <span className="label">Date:</span>
                <span className="value">
                  {new Date(payment.createdAt).toLocaleString()}
                </span>
              </div>
              <div className="detail-item">
                <span className="label">Status:</span>
                <span className={`value status ${payment.status}`}>
                  {payment.status}
                </span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3>Booking Information</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="label">Booking Reference:</span>
                <span className="value">
                  #{payment.booking._id.slice(-6).toUpperCase()}
                </span>
              </div>
              <div className="detail-item">
                <span className="label">Service Type:</span>
                <span className="value">{payment.booking.serviceType}</span>
              </div>
              <div className="detail-item">
                <span className="label">Location:</span>
                <span className="value">{`${payment.booking.location.address}, ${payment.booking.location.city}`}</span>
              </div>
              <div className="detail-item">
                <span className="label">Date:</span>
                <span className="value">
                  {new Date(
                    payment.booking.preferredDateTime
                  ).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3>Client Information</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="label">Name:</span>
                <span className="value">{payment.client.name}</span>
              </div>
              <div className="detail-item">
                <span className="label">Email:</span>
                <span className="value">{payment.client.email}</span>
              </div>
              <div className="detail-item">
                <span className="label">Phone:</span>
                <span className="value">{payment.client.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {payment.status === "pending" && (
          <div className="verification-section">
            <h3>Verify Payment</h3>
            <div className="form-group">
              <label htmlFor="paymentStatus">Payment Status</label>
              <select
                id="paymentStatus"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="notes">Verification Notes</label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes about the verification process..."
                rows={3}
              ></textarea>
            </div>

            <div className="form-actions">
              <button onClick={handleVerify} className="btn-primary">
                Update Payment Status
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
