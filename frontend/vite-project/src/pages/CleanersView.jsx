import "./AdminTable.css";

export default function CleanersView({ cleaners, loading, error }) {
  return (
    <section className="admin-section">
      <h1 className="admin-title">Registered Cleaners (Admin)</h1>
      <p className="admin-subtitle">
        Only admins can see and manage this list of approved / applied cleaners.
      </p>

      {loading && <p className="admin-loading">Loading cleaners…</p>}
      {error && <p className="admin-error">{error}</p>}

      {!loading && !error && cleaners.length === 0 && (
        <p className="admin-empty">No cleaners registered yet.</p>
      )}

      {!loading && !error && cleaners.length > 0 && (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th className="admin-th">#</th>
                <th className="admin-th">Name</th>
                <th className="admin-th">Phone</th>
                <th className="admin-th">Area</th>
                <th className="admin-th">Experience</th>
                <th className="admin-th">Services Offered</th>
                <th className="admin-th">Notes</th>
                <th className="admin-th">Active?</th>
                <th className="admin-th">Created At</th>
              </tr>
            </thead>
            <tbody>
              {cleaners.map((c, index) => (
                <tr key={c._id || index}>
                  <td className="admin-td">{index + 1}</td>
                  <td className="admin-td">{c.name}</td>
                  <td className="admin-td">{c.phone}</td>
                  <td className="admin-td">{c.area}</td>
                  <td className="admin-td">
                    {c.experienceYears ? `${c.experienceYears} yrs` : "—"}
                  </td>
                  <td className="admin-td">{c.servicesOffered || "—"}</td>
                  <td className="admin-td">{c.notes || "—"}</td>
                  <td className="admin-td">{c.isActive ? "Yes" : "No"}</td>
                  <td className="admin-td">
                    {c.createdAt ? new Date(c.createdAt).toLocaleString() : "—"}
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
