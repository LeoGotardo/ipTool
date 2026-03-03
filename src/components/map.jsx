import { useEffect, useRef } from "react";

let leafletLoaded = false;

function loadLeaflet() {
  return new Promise((resolve) => {
    if (window.L) { resolve(); return; }
    if (leafletLoaded) {
      const check = setInterval(() => { if (window.L) { clearInterval(check); resolve(); } }, 50);
      return;
    }
    leafletLoaded = true;
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(css);
    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.onload = resolve;
    document.head.appendChild(script);
  });
}

export function GeoMap({ lat = -15.78, lng = -47.93, zoom = 13, width = "100%", height = "400px" }) {
  const mapRef = useRef(null);
  const instanceRef = useRef(null);

  useEffect(() => {
    loadLeaflet().then(() => {
      if (instanceRef.current) return;
      const L = window.L;

      const map = L.map(mapRef.current, { zoomControl: true }).setView([lat, lng], zoom);

      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        attribution: "© OpenStreetMap © CARTO",
        subdomains: "abcd",
        maxZoom: 19,
      }).addTo(map);

      L.marker([lat, lng], {
        icon: L.divIcon({
          className: "",
          html: `<div style="width:14px;height:14px;background:#4fffb0;border-radius:50%;border:2px solid #fff;box-shadow:0 0 12px #4fffb0;"></div>`,
          iconSize: [14, 14],
          iconAnchor: [7, 7],
        }),
      }).addTo(map);

      instanceRef.current = map;
    });

    return () => {
      if (instanceRef.current) {
        instanceRef.current.remove();
        instanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!instanceRef.current) return;
    instanceRef.current.setView([lat, lng], zoom);
  }, [lat, lng, zoom]);

  return <div ref={mapRef} style={{ width, height, borderRadius: 8, overflow: "hidden" }} />;
}