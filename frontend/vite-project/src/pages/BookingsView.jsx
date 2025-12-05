import "./AdminTable.css";

export default function BookingsView({ bookings, loading, error }) {
  return (
    <section className="admin-section">
      <h1 className="admin-title">Booking Requests (Admin View)</h1>

      {loading && <p className="admin-loading">Loading bookings…</p>}

      {error && <p className="admin-error">{error}</p>}

      {!loading && !error && bookings.length === 0 && (
        <p className="admin-empty">No bookings yet.</p>
      )}

      {!loading && !error && bookings.length > 0 && (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th className="admin-th">#</th>
                <th className="admin-th">Name</th>
                <th className="admin-th">Phone</th>
                <th className="admin-th">Area</th>
                <th className="admin-th">Service</th>
                <th className="admin-th">Hours</th>
                <th className="admin-th">Estimated Price</th>
                <th className="admin-th">Date</th>
                <th className="admin-th">Time Slot</th>
                <th className="admin-th">Status</th>
                <th className="admin-th">Assigned To</th>
                <th className="admin-th">Created At</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b, index) => (
                <tr key={b._id || index}>
                  <td className="admin-td">{index + 1}</td>
                  <td className="admin-td">{b.name}</td>
                  <td className="admin-td">{b.phone}</td>
                  <td className="admin-td">{b.area}</td>
                  <td className="admin-td">{b.service}</td>
                  <td className="admin-td">{b.hours ?? "-"}</td>
                  <td className="admin-td">
                    {typeof b.estimatedPrice === "number"
                      ? `₹${b.estimatedPrice}`
                      : b.estimatedPrice
                      ? `₹${b.estimatedPrice}`
                      : "-"}
                  </td>
                  <td className="admin-td">{b.date}</td>
                  <td className="admin-td">{b.timeSlot || "-"}</td>
                  <td className="admin-td admin-status-cell">
                    {b.status || "New"}
                  </td>
                  <td className="admin-td">
                    {b.assignedCleaner && b.assignedCleaner.trim()
                      ? b.assignedCleaner
                      : "-"}
                  </td>
                  <td className="admin-td">
                    {b.createdAt ? new Date(b.createdAt).toLocaleString() : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
