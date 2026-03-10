import { useState, useEffect } from "react";
import { GeoMap } from "./map.jsx";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&display=swap');

  :root {
    --bg: #04080f;
    --surface: rgba(6,14,28,.97);
    --border: rgba(0,210,150,.16);
    --border-hi: rgba(0,210,150,.4);
    --accent: #00d296;
    --accent2: #00aaff;
    --red: #ff3c6e;
    --text: #b8e8d0;
    --dim: rgba(180,240,210,.4);
    --muted: rgba(180,240,210,.18);
    --mono: 'Share Tech Mono', monospace;
    --display: 'Orbitron', monospace;
    --glow: 0 0 18px rgba(0,210,150,.3);
  }

  .wrap {
    width: 100%;
    font-family: var(--mono);
    color: var(--text);
  }

  /* ── top bar ── */
  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    position: relative;
    overflow: hidden;
    animation: slideUp .5s cubic-bezier(.22,1,.36,1) both;
  }

  @keyframes slideUp {
    from { opacity:0; transform: translateY(16px); }
    to   { opacity:1; transform: translateY(0); }
  }

  /* corner accents */
  .card::before, .card::after {
    content: '';
    position: absolute;
    width: 16px; height: 16px;
    border-color: var(--accent);
    border-style: solid;
    z-index: 10;
  }
  .card::before { top: -1px; left: -1px; border-width: 2px 0 0 2px; }
  .card::after  { bottom: -1px; right: -1px; border-width: 0 2px 2px 0; }

  /* ── header ── */
  .hdr {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.25rem 1.75rem;
    border-bottom: 1px solid var(--border);
    background: rgba(0,210,150,.03);
    position: relative;
  }

  .hdr::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--accent), transparent);
    opacity: .4;
  }

  .flag { font-size: 2rem; line-height: 1; filter: drop-shadow(0 0 8px rgba(0,210,150,.3)); }

  .htxt h1 {
    font-family: var(--display);
    font-size: 1.1rem;
    font-weight: 700;
    letter-spacing: .05em;
    color: #fff;
    text-align: left;
  }

  .htxt p {
    font-size: .65rem;
    color: var(--dim);
    margin-top: .25rem;
    letter-spacing: .1em;
    text-align: left;
  }

  .badge {
    margin-left: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: .3rem;
  }

  .ip {
    font-family: var(--mono);
    font-size: 1rem;
    color: var(--accent);
    font-weight: 600;
    text-shadow: 0 0 12px rgba(0,210,150,.5);
    letter-spacing: .06em;
  }

  .iptyp {
    font-size: .6rem;
    letter-spacing: .15em;
    text-transform: uppercase;
    color: var(--dim);
    border: 1px solid var(--border-hi);
    padding: .1rem .5rem;
    font-family: var(--mono);
  }

  /* ── stat bar ── */
  .statbar {
    display: flex;
    align-items: stretch;
    border-bottom: 1px solid var(--border);
    background: rgba(0,0,0,.2);
  }

  .stat {
    flex: 1;
    padding: .9rem 1.25rem;
    display: flex;
    flex-direction: column;
    gap: .25rem;
    border-right: 1px solid var(--border);
  }
  .stat:last-child { border-right: none; }

  /* ── map ── */
  .mapWrap {
    border-bottom: 1px solid var(--border);
    position: relative;
  }

  .mapWrap::before {
    content: 'GEOLOCATION_LOCK';
    position: absolute;
    top: .6rem; left: .9rem;
    font-size: .6rem;
    letter-spacing: .14em;
    color: var(--accent);
    opacity: .55;
    z-index: 5;
    font-family: var(--mono);
  }

  /* ── grid cells ── */
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .cell {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--border);
    border-right: 1px solid var(--border);
    transition: background .15s;
  }

  .cell:nth-child(even) { border-right: none; }
  .cell:nth-last-child(-n+2) { border-bottom: none; }
  .cell:hover { background: rgba(0,210,150,.03); }

  /* ── languages ── */
  .langs {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: .6rem;
    padding: 1rem 1.5rem;
    border-top: 1px solid var(--border);
  }

  .chip {
    display: inline-flex;
    align-items: center;
    gap: .35rem;
    font-size: .68rem;
    color: var(--dim);
    border: 1px solid var(--border);
    padding: .2rem .6rem;
    letter-spacing: .06em;
    transition: border-color .15s, color .15s;
  }
  .chip:hover { border-color: var(--border-hi); color: var(--accent); }
  .lc { color: var(--accent); background: rgba(0,210,150,.08); padding: 0 .3rem; font-family: var(--mono); }

  /* ── footer ── */
  .foot {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: .7rem 1.5rem;
    background: rgba(0,0,0,.25);
    border-top: 1px solid var(--border);
    flex-wrap: wrap;
    gap: .5rem;
  }

  .fpill {
    font-size: .6rem;
    letter-spacing: .12em;
    text-transform: uppercase;
    color: var(--muted);
    display: flex;
    align-items: center;
    gap: .35rem;
    font-family: var(--mono);
  }

  /* ── common text styles ── */
  .lbl {
    font-size: .6rem;
    text-transform: uppercase;
    letter-spacing: .14em;
    color: var(--dim);
    margin-bottom: .3rem;
    font-family: var(--mono);
  }

  .val {
    font-size: .88rem;
    font-weight: 600;
    color: var(--text);
    font-family: var(--mono);
    letter-spacing: .04em;
  }

  .mono {
    color: var(--accent2);
    font-size: .82rem;
  }

  /* ── pulse dot ── */
  .dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 8px rgba(0,210,150,.8);
    animation: pulse 2s ease-in-out infinite;
    margin-left: auto;
    align-self: center;
    flex-shrink: 0;
  }

  .green {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 6px rgba(0,210,150,.7);
  }

  @keyframes pulse {
    0%,100%{opacity:1;transform:scale(1)}
    50%{opacity:.3;transform:scale(.6)}
  }
`;

export function Response() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  const [d, setD] = useState(null);

  useEffect(() => {
    const handler = () => setD(window.ipData);
    window.addEventListener("ipDataReady", handler);
    return () => window.removeEventListener("ipDataReady", handler);
  }, []);

  if (d == null) return <div className="wrap" />;

  const cells = [
    { label: "Country",      value: d.country_name },
    { label: "Capital",      value: d.location.capital },
    { label: "Region",       value: d.region_name },
    { label: "ZIP Code",     value: d.zip,               mono: true },
    { label: "Routing",      value: d.ip_routing_type },
    { label: "Connection",   value: d.connection_type?.toUpperCase(), mono: true },
    { label: "MSA",          value: d.msa,               mono: true },
    { label: "DMA",          value: d.dma,               mono: true },
  ];

  return (
    <>
      <style>{css}</style>
      <div className="wrap">
        <div className="card result-wrapper" style={{ opacity: visible ? 1 : 0, transition: "opacity .4s" }}>

          {/* Map */}
          <div className="mapWrap">
            <GeoMap lat={d.latitude} lng={d.longitude} height="260px" />
          </div>

          <div className="info-wrapper">
            {/* Header */}
            <div className="hdr">
              <div className="flag">{d.location.country_flag_emoji}</div>
              <div className="htxt">
                <h1>{d.city}, {d.region_code}</h1>
                <p>{d.continent_name} · {d.country_name} · +{d.location.calling_code}</p>
              </div>
              <div className="badge">
                <span className="ip">{d.ip}</span>
                <span className="iptyp">{d.type}</span>
              </div>
            </div>

            {/* Coordinates bar */}
            <div className="statbar">
              {[
                { label: "LATITUDE",  value: d.latitude.toFixed(6),             mono: true },
                { label: "LONGITUDE", value: d.longitude.toFixed(6),            mono: true },
                { label: "RADIUS",    value: `${parseFloat(d.radius).toFixed(1)} km`, mono: true },
              ].map(({ label, value, mono }) => (
                <div key={label} className="stat">
                  <span className="lbl">{label}</span>
                  <span className={`val${mono ? " mono" : ""}`}>{value}</span>
                </div>
              ))}
              <div className="dot" style={{ margin: "auto 1.25rem auto 0" }} />
            </div>

            {/* Grid */}
            <div className="grid">
              {cells.map(({ label, value, mono }, i) => (
                <div key={label} className="cell" style={{ animationDelay: `${.05 * i + .2}s` }}>
                  <div className="lbl">{label}</div>
                  <div className={mono ? "val mono" : "val"}>{value}</div>
                </div>
              ))}
            </div>

            {/* Languages */}
            <div className="langs">
              <span className="lbl" style={{ marginBottom: 0 }}>LANGUAGES</span>
              {d.location.languages.map((lang) => (
                <span key={lang.code} className="chip">
                  <span className="lc">{lang.code.toUpperCase()}</span>
                  {lang.native}
                </span>
              ))}
            </div>

            {/* Footer */}
            <div className="foot">
              <span className="fpill"><span className="green" /> ACTIVE</span>
              <span className="fpill">EU: {d.location.is_eu ? "YES" : "NO"}</span>
              <span className="fpill">GEONAME #{d.location.geoname_id}</span>
              <span className="fpill">{d.location.country_flag_emoji_unicode}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}