export default function CloseLoanModal({ loan, onClose }) {
  return (
    <div className="modalOverlay">
      <div className="modalBox">
        <h3>Close Loan</h3>

        <select>
          <option>Recovered</option>
          <option>Settled via Collateral</option>
        </select>

        <div className="modalActions">
          <button onClick={onClose}>Cancel</button>
          <button className="primary">Close Loan</button>
        </div>
      </div>
    </div>
  );
}
