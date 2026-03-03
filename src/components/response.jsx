import { useState, useEffect } from "react";

import { GeoMap } from "./map.jsx";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne+Mono&family=Syne:wght@400;600;800&display=swap');
  .wrap{min-height:100vh;background:#0a0a0f;display:flex;align-items:center;justify-content:center;padding:2rem;font-family:'Syne',sans-serif;color:#e8e6f0;position:relative}
  .wrap::before{content:'';position:fixed;inset:0;background:radial-gradient(ellipse 60% 40% at 20% 20%,rgba(100,60,200,.12) 0%,transparent 60%),radial-gradient(ellipse 40% 60% at 80% 80%,rgba(0,180,120,.08) 0%,transparent 60%);pointer-events:none}
  .card{position:relative;z-index:1;width:100%;max-width:640px;background:rgba(18,16,28,.9);border:1px solid rgba(120,100,220,.18);border-radius:2px;overflow:hidden;animation:up .6s ease both}
  @keyframes up{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
  .hdr{display:flex;align-items:center;gap:1rem;padding:1.5rem 2rem;border-bottom:1px solid rgba(120,100,220,.12);background:rgba(100,60,200,.06)}
  .flag{font-size:2.4rem;line-height:1;filter:drop-shadow(0 0 8px rgba(100,60,200,.4))}
  .htxt h1{font-size:1.5rem;font-weight:800;letter-spacing:-.02em;color:#fff;line-height:1}
  .htxt p{font-family:'Syne Mono',monospace;font-size:.75rem;color:rgba(200,190,255,.45);margin-top:.3rem;letter-spacing:.08em}
  .badge{margin-left:auto;display:flex;flex-direction:column;align-items:flex-end;gap:.25rem}
  .ip{font-family:'Syne Mono',monospace;font-size:1rem;color:#a78bfa;font-weight:600}
  .iptyp{font-size:.65rem;font-family:'Syne Mono',monospace;letter-spacing:.12em;text-transform:uppercase;color:rgba(167,139,250,.45);border:1px solid rgba(167,139,250,.2);padding:.1rem .5rem;border-radius:2px}
  .coords{display:flex;align-items:center;gap:.75rem;padding:1.1rem 2rem;border-bottom:1px solid rgba(120,100,220,.08);background:rgba(100,60,200,.04)}
  .ci{display:flex;flex-direction:column;gap:.2rem}
  .sep{width:1px;height:32px;background:rgba(120,100,220,.15)}
  .dot{width:6px;height:6px;border-radius:50%;background:#a78bfa;margin-left:auto;box-shadow:0 0 8px rgba(167,139,250,.6);animation:p 2s ease-in-out infinite}
  @keyframes p{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.7)}}
  .grid{display:grid;grid-template-columns:1fr 1fr}
  .cell{padding:1.25rem 2rem;border-bottom:1px solid rgba(120,100,220,.08);border-right:1px solid rgba(120,100,220,.08)}
  .cell:nth-child(even){border-right:none}
  .cell:nth-last-child(-n+2){border-bottom:none}
  .lbl{font-size:.62rem;text-transform:uppercase;letter-spacing:.14em;color:rgba(200,190,255,.35);margin-bottom:.4rem;font-weight:600}
  .val{font-size:.95rem;font-weight:600;color:#e8e6f0}
  .mono{font-family:'Syne Mono',monospace;font-size:.82rem;color:#a78bfa;font-weight:400}
  .langs{display:flex;align-items:center;gap:1rem;padding:1.1rem 2rem;border-top:1px solid rgba(120,100,220,.08)}
  .chip{display:inline-flex;align-items:center;gap:.4rem;font-size:.72rem;font-family:'Syne Mono',monospace;color:rgba(167,139,250,.7);border:1px solid rgba(167,139,250,.18);padding:.25rem .65rem;border-radius:2px}
  .lc{background:rgba(167,139,250,.12);padding:0 .3rem;border-radius:2px;color:#a78bfa}
  .foot{display:flex;align-items:center;justify-content:space-between;padding:.85rem 2rem;background:rgba(100,60,200,.05);border-top:1px solid rgba(120,100,220,.1)}
  .fpill{display:flex;align-items:center;gap:.4rem;font-size:.65rem;font-family:'Syne Mono',monospace;text-transform:uppercase;letter-spacing:.12em;color:rgba(200,190,255,.35)}
  .green{width:5px;height:5px;border-radius:50%;background:#4ade80;box-shadow:0 0 6px rgba(74,222,128,.6)}
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

  if (d == null) {
    return <div className="wrap"></div>;
  }

  const cells = [
    { label: "Country", value: d.country_name },
    { label: "Capital", value: d.location.capital },
    { label: "Region", value: d.region_name },
    { label: "ZIP Code", value: d.zip, mono: true },
    { label: "Routing Type", value: d.ip_routing_type },
    { label: "Connection", value: d.connection_type.toUpperCase(), mono: true },
    { label: "MSA", value: d.msa, mono: true },
    { label: "DMA", value: d.dma, mono: true },
  ];

  return (
    <>
      <style>{css}</style>
      <div className="wrap">
        <div
          className="card"
          style={{ opacity: visible ? 1 : 0, transition: "opacity .4s" }}
        >
          <div className="hdr">
            <div className="flag">{d.location.country_flag_emoji}</div>
            <div className="htxt">
              <h1>
                {d.city}, {d.region_code}
              </h1>
              <p>
                {d.continent_name} · {d.country_name} · +
                {d.location.calling_code}
              </p>
            </div>
            <div className="badge">
              <span className="ip">{d.ip}</span>
              <span className="iptyp">{d.type}</span>
            </div>
          </div>

          <div className="coords">
            <div className="ci">
              <span className="lbl">Latitude</span>
              <span className="val mono">{d.latitude.toFixed(6)}</span>
            </div>
            <div className="sep" />
            <div className="ci">
              <span className="lbl">Longitude</span>
              <span className="val mono">{d.longitude.toFixed(6)}</span>
            </div>
            <div className="sep" />
            <div className="ci">
              <span className="lbl">Radius</span>
              <span className="val mono">
                {parseFloat(d.radius).toFixed(1)} km
              </span>
            </div>
            <div className="dot" />
          </div>

          <div className="Map">
            <GeoMap lat={d.latitude} lon={d.longitude} />{" "}
          </div>

          <div className="grid">
            {cells.map(({ label, value, mono }, i) => (
              <div
                key={label}
                className="cell"
                style={{ animationDelay: `${0.05 * i + 0.2}s` }}
              >
                <div className="lbl">{label}</div>
                <div className={mono ? "val mono" : "val"}>{value}</div>
              </div>
            ))}
          </div>

          <div className="langs">
            <span className="lbl" style={{ marginBottom: 0 }}>
              Languages
            </span>
            {d.location.languages.map((lang) => (
              <span key={lang.code} className="chip">
                <span className="lc">{lang.code.toUpperCase()}</span>
                {lang.native}
              </span>
            ))}
          </div>

          <div className="foot">
            <span className="fpill">
              <span className="green" />
              Active
            </span>
            <span className="fpill">EU: {d.location.is_eu ? "Yes" : "No"}</span>
            <span className="fpill">Geoname #{d.location.geoname_id}</span>
            <span className="fpill">
              {d.location.country_flag_emoji_unicode}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
