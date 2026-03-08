import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

const STATUSES = ["pending", "matched", "completed", "cancelled"];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400&display=swap');

  .admin { font-family: 'Jost', sans-serif; font-weight: 300; background: #f4ede3; min-height: 100vh; color: #2a1e18; }

  .admin-header {
    background: #1c1410;
    padding: 24px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .admin-eyebrow {
    font-size: 9px;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: #a05a3a;
    margin-bottom: 4px;
  }
  .admin-header h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    font-weight: 300;
    color: #f4ede3;
    letter-spacing: 0.02em;
    margin: 0;
  }
  .admin-count { font-size: 12px; color: #6a5a50; }

  .admin-body { padding: 40px; }

  .admin-table-wrap {
    overflow-x: auto;
    border-radius: 8px;
    box-shadow: 0 2px 24px rgba(42,30,24,0.09);
  }

  .admin-table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    min-width: 860px;
  }

  .admin-table th {
    background: #2a1e18;
    color: #c8b8ac;
    font-size: 9px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    padding: 14px 18px;
    text-align: left;
    font-weight: 400;
    white-space: nowrap;
  }

  .admin-table td {
    padding: 14px 18px;
    font-size: 13px;
    border-bottom: 1px solid #f0e8de;
    vertical-align: top;
    color: #2a1e18;
  }

  .admin-table tr:last-child td { border-bottom: none; }
  .admin-table tr:hover td { background: #fdf9f4; }

  .admin-name { font-weight: 400; white-space: nowrap; }
  .admin-email { color: #6a5a50; font-size: 12px; }

  .admin-sep-tag {
    display: inline-block;
    font-size: 10px;
    letter-spacing: 0.05em;
    background: #f4ede3;
    color: #6a5a50;
    padding: 3px 9px;
    border-radius: 20px;
    border: 1px solid #e0d4c4;
    white-space: nowrap;
    text-transform: capitalize;
  }

  .admin-story {
    color: #6a5a50;
    font-size: 12px;
    line-height: 1.65;
    max-width: 240px;
  }

  .admin-date { color: #8a7d74; font-size: 11px; white-space: nowrap; }

  .admin-status-select {
    border: 1px solid #e0d4c4;
    border-radius: 4px;
    padding: 6px 10px;
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    font-weight: 300;
    background: white;
    cursor: pointer;
    outline: none;
    transition: border-color 0.2s;
    color: #2a1e18;
  }
  .admin-status-select:focus { border-color: #c4623a; }
  .admin-status-select:disabled { opacity: 0.45; cursor: not-allowed; }

  .admin-status-select[data-status="pending"]   { border-color: #c4a030; color: #8a6010; }
  .admin-status-select[data-status="matched"]   { border-color: #4a9e6a; color: #2a6a48; }
  .admin-status-select[data-status="completed"] { border-color: #4a6aae; color: #2a4a8a; }
  .admin-status-select[data-status="cancelled"] { border-color: #b05050; color: #7a2a2a; }

  .admin-spinner {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 70vh;
    font-size: 12px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #a09080;
  }

  .admin-empty {
    text-align: center;
    padding: 80px 24px;
    color: #8a7d74;
    font-size: 13px;
  }
  .admin-empty p { margin-top: 8px; font-size: 12px; color: #a09080; }

  .admin-null { color: #c9b99a; }
`;

export default function AdminPage() {
  const navigate = useNavigate();
  const [rows, setRows]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null); // id of row being updated

  useEffect(() => {
    (async () => {
      // 1. Must be logged in
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/"); return; }

      // 2. Must be admin in public.users table
      const { data: profile } = await supabase
        .from("users")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (profile?.role !== "admin") { navigate("/"); return; }

      // 3. Fetch seeker_profiles joined with users
      const { data } = await supabase
        .from("seeker_profiles")
        .select("*, users(full_name, email)")
        .order("created_at", { ascending: false });

      setRows(data ?? []);
      setLoading(false);
    })();
  }, [navigate]);

  const updateStatus = async (id, status) => {
    setUpdating(id);
    const { error } = await supabase
      .from("seeker_profiles")
      .update({ matching_status: status })
      .eq("id", id);
    if (!error) {
      setRows(prev => prev.map(r => r.id === id ? { ...r, matching_status: status } : r));
    }
    setUpdating(null);
  };

  const fmt = iso => new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });

  const cap = s => s ? s.charAt(0).toUpperCase() + s.slice(1) : "";

  if (loading) {
    return (
      <>
        <style>{styles}</style>
        <div className="admin-spinner">Verifying access…</div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="admin">

        <div className="admin-header">
          <div>
            <div className="admin-eyebrow">Admin Dashboard</div>
            <h1>Seeker Profiles</h1>
          </div>
          <div className="admin-count">{rows.length} submission{rows.length !== 1 ? "s" : ""}</div>
        </div>

        <div className="admin-body">
          {rows.length === 0 ? (
            <div className="admin-empty">
              <div style={{ fontSize: 36 }}>🌿</div>
              <p>No submissions yet.</p>
            </div>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Separation</th>
                    <th>Status</th>
                    <th>Story</th>
                    <th>Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(r => {
                    const status = r.matching_status ?? "pending";
                    return (
                      <tr key={r.id}>
                        <td className="admin-name">
                          {r.users?.full_name ?? <span className="admin-null">—</span>}
                        </td>
                        <td className="admin-email">
                          {r.users?.email ?? <span className="admin-null">—</span>}
                        </td>
                        <td>
                          {r.separation_type
                            ? <span className="admin-sep-tag">{r.separation_type.replace(/_/g, " ")}</span>
                            : <span className="admin-null">—</span>}
                        </td>
                        <td>
                          <select
                            className="admin-status-select"
                            data-status={status}
                            value={status}
                            disabled={updating === r.id}
                            onChange={e => updateStatus(r.id, e.target.value)}
                          >
                            {STATUSES.map(s => (
                              <option key={s} value={s}>{cap(s)}</option>
                            ))}
                          </select>
                        </td>
                        <td className="admin-story">
                          {r.what_hurts
                            ? r.what_hurts.slice(0, 100) + (r.what_hurts.length > 100 ? "…" : "")
                            : <span className="admin-null">—</span>}
                        </td>
                        <td className="admin-date">
                          {r.created_at ? fmt(r.created_at) : <span className="admin-null">—</span>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </>
  );
}
