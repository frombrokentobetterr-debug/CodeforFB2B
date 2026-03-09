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

  /* ── Match Creator ── */
  .match-section {
    margin-top: 48px;
  }
  .match-section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px;
    font-weight: 300;
    color: #2a1e18;
    margin-bottom: 4px;
  }
  .match-section-sub {
    font-size: 11px;
    color: #8a7d74;
    letter-spacing: 0.05em;
    margin-bottom: 24px;
  }
  .match-card {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 24px rgba(42,30,24,0.09);
    padding: 32px;
    max-width: 680px;
  }
  .match-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 20px;
  }
  .match-field label {
    display: block;
    font-size: 9px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: #8a7d74;
    margin-bottom: 6px;
  }
  .match-field select,
  .match-field textarea {
    width: 100%;
    background: #fdf9f4;
    border: 1px solid #e0d4c4;
    border-radius: 4px;
    padding: 10px 12px;
    font-family: 'Jost', sans-serif;
    font-size: 12px;
    font-weight: 300;
    color: #2a1e18;
    outline: none;
    transition: border-color 0.2s;
    box-sizing: border-box;
    appearance: none;
  }
  .match-field select:focus,
  .match-field textarea:focus { border-color: #c4623a; }
  .match-field textarea { resize: vertical; min-height: 80px; line-height: 1.6; }
  .match-field-full { margin-bottom: 20px; }

  .match-btn {
    background: #2a1e18;
    color: #f4ede3;
    border: none;
    border-radius: 40px;
    padding: 12px 32px;
    font-family: 'Jost', sans-serif;
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s;
  }
  .match-btn:hover { background: #c4623a; }
  .match-btn:disabled { background: #c9b99a; cursor: not-allowed; }

  .match-error { font-size: 12px; color: #c0392b; margin-top: 12px; }

  .match-toast {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 16px;
    background: #eaf5ee;
    border: 1px solid #7acd9a;
    border-radius: 6px;
    padding: 12px 16px;
    font-size: 12px;
    color: #2a6a48;
    animation: fadeIn 0.3s ease;
  }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } }

  @media (max-width: 600px) { .match-row { grid-template-columns: 1fr; } }
`;

export default function AdminPage() {
  const navigate = useNavigate();
  const [rows, setRows]         = useState([]);
  const [guides, setGuides]     = useState([]);
  const [loading, setLoading]   = useState(true);
  const [updating, setUpdating] = useState(null);

  // Match form state
  const [matchForm, setMatchForm]       = useState({ seeker_id: "", guide_id: "", notes: "" });
  const [matchLoading, setMatchLoading] = useState(false);
  const [matchError, setMatchError]     = useState("");
  const [matchDone, setMatchDone]       = useState(false);

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/"); return; }

      const { data: profile } = await supabase
        .from("users")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (profile?.role !== "admin") { navigate("/"); return; }

      const [{ data: seekers }, { data: guideData }] = await Promise.all([
        supabase
          .from("seeker_profiles")
          .select("*, users(full_name, email)")
          .order("created_at", { ascending: false }),
        supabase
          .from("peer_guide_profiles")
          .select("id, bio, separation_type_experienced, users(full_name)")
          .eq("is_available", true)
          .eq("is_approved_by_admin", true),
      ]);

      setRows(seekers ?? []);
      setGuides(guideData ?? []);
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

  const createMatch = async e => {
    e.preventDefault();
    setMatchError("");
    if (!matchForm.seeker_id || !matchForm.guide_id) {
      setMatchError("Please select both a seeker and a guide.");
      return;
    }
    setMatchLoading(true);

    const { error: matchErr } = await supabase.from("matches").insert({
      seeker_profile_id: matchForm.seeker_id,
      guide_profile_id:  matchForm.guide_id,
      notes:             matchForm.notes || null,
      status:            "pending",
      created_at:        new Date().toISOString(),
    });

    if (matchErr) {
      setMatchError("Failed to create match. " + matchErr.message);
      setMatchLoading(false);
      return;
    }

    await supabase
      .from("seeker_profiles")
      .update({ matching_status: "matched" })
      .eq("id", matchForm.seeker_id);

    setRows(prev =>
      prev.map(r => r.id === matchForm.seeker_id ? { ...r, matching_status: "matched" } : r)
    );
    setMatchForm({ seeker_id: "", guide_id: "", notes: "" });
    setMatchLoading(false);
    setMatchDone(true);
    setTimeout(() => setMatchDone(false), 5000);
  };

  const fmt = iso => new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });

  const cap = s => s ? s.charAt(0).toUpperCase() + s.slice(1) : "";

  const pendingSeekers = rows.filter(r => (r.matching_status ?? "pending") === "pending");

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

          {/* ── Seeker Table ── */}
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

          {/* ── Match Creator ── */}
          <div className="match-section">
            <div className="match-section-title">Create a Match</div>
            <div className="match-section-sub">
              Pair a pending seeker with an available guide
            </div>

            <div className="match-card">
              <form onSubmit={createMatch}>
                <div className="match-row">
                  <div className="match-field">
                    <label>Seeker <span style={{ color: "#c9b99a" }}>({pendingSeekers.length} pending)</span></label>
                    <select
                      value={matchForm.seeker_id}
                      onChange={e => setMatchForm(prev => ({ ...prev, seeker_id: e.target.value }))}
                    >
                      <option value="">Select seeker…</option>
                      {pendingSeekers.map(s => (
                        <option key={s.id} value={s.id}>
                          {s.users?.full_name ?? s.users?.email ?? s.id.slice(0, 8)}
                          {s.separation_type ? ` · ${s.separation_type.replace(/_/g, " ")}` : ""}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="match-field">
                    <label>Guide <span style={{ color: "#c9b99a" }}>({guides.length} available)</span></label>
                    <select
                      value={matchForm.guide_id}
                      onChange={e => setMatchForm(prev => ({ ...prev, guide_id: e.target.value }))}
                    >
                      <option value="">Select guide…</option>
                      {guides.map(g => (
                        <option key={g.id} value={g.id}>
                          {g.users?.full_name ?? g.id.slice(0, 8)}
                          {g.separation_type_experienced ? ` · ${g.separation_type_experienced.replace(/_/g, " ")}` : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="match-field match-field-full">
                  <label>Match Notes <span style={{ color: "#c9b99a", textTransform: "none", fontSize: 9 }}>(optional)</span></label>
                  <textarea
                    value={matchForm.notes}
                    onChange={e => setMatchForm(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Why this pairing? Any context for the guide…"
                  />
                </div>

                {matchError && <p className="match-error">{matchError}</p>}

                <button className="match-btn" disabled={matchLoading}>
                  {matchLoading ? "Creating match…" : "Create Match →"}
                </button>

                {matchDone && (
                  <div className="match-toast">
                    <span>✓</span>
                    Match created — seeker status updated to Matched.
                  </div>
                )}
              </form>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
