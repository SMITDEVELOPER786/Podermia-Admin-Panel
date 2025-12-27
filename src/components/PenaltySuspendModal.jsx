export default function PenaltySuspendModal({ loan, onClose }) {
  return (
    <div className="modalOverlay">
      <div className="modalBox">
        <h3>Suspend / Waive Penalties</h3>
        <p>
          Choose how penalties should be handled for this loan account.
        </p>

        <select>
          <option>Suspend further penalties</option>
          <option>Waive all accumulated penalties</option>
        </select>

        <div className="modalActions">
          <button onClick={onClose}>Cancel</button>
          <button className="primary">Apply Action</button>
        </div>
      </div>
    </div>
  );
}
