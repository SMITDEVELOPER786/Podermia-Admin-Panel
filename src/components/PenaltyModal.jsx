export default function PenaltyModal({ loan, onClose }) {
  return (
    <div className="modalOverlay">
      <div className="modalBox">
        <h3>Penalty Action</h3>

        <select>
          <option>Suspend further penalties</option>
          <option>Waive penalties</option>
        </select>

        <div className="modalActions">
          <button onClick={onClose}>Cancel</button>
          <button className="primary">Apply</button>
        </div>
      </div>
    </div>
  );
}
