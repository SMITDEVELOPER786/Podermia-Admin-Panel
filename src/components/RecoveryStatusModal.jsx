export default function RecoveryStatusModal({ loan, onClose }) {
  return (
    <div className="modalOverlay">
      <div className="modalBox">
        <h3>Assign Recovery Status</h3>

        <select>
          <option>Notice of Loan Default</option>
          <option>Collateral Set-off</option>
          <option>Recovery Agents Assigned</option>
          <option>Legal Action</option>
          <option>Credit Bureau Watchlist</option>
        </select>

        <div className="modalActions">
          <button onClick={onClose}>Cancel</button>
          <button className="primary">Assign Status</button>
        </div>
      </div>
    </div>
  );
}
