import { useEffect, useRef, useState } from 'react';

export default function CoverageMap() {
  const chartRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const existing = document.querySelector(`script[src="${src}"]`);
        if (existing) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load ${src}`));
        document.head.appendChild(script);
      });
    };

    const initMap = async () => {
      try {
        if (!chartRef.current || !isMounted) return;

        if (!(window as any).am5) {
          await loadScript('https://cdn.amcharts.com/lib/5/index.js');
        }
        if (!(window as any).am5map) {
          await loadScript('https://cdn.amcharts.com/lib/5/map.js');
        }
        if (!(window as any).am5geodata_worldLow) {
          await loadScript('https://cdn.amcharts.com/lib/5/geodata/worldLow.js');
        }
        if (!(window as any).am5themes_Animated) {
          await loadScript('https://cdn.amcharts.com/lib/5/themes/Animated.js');
        }

        await new Promise(resolve => setTimeout(resolve, 100));

        if (!isMounted || !chartRef.current) return;

        const am5 = (window as any).am5;
        const am5map = (window as any).am5map;
        const am5themes_Animated = (window as any).am5themes_Animated;
        const am5geodata_worldLow = (window as any).am5geodata_worldLow;

        if (!am5 || !am5map || !am5themes_Animated || !am5geodata_worldLow) {
          throw new Error('amCharts libraries not loaded');
        }

        const COVER_COLOR = am5.color(0xFFB800);
        const BASE_FILL = am5.color(0xD0D0D0);
        const HOVER_FILL = am5.color(0xFFD36A);
        const STORAGE_KEY = "coverage_iso2_codes_v1";

        const initialCovered = [
          "US", "CA", "GB", "FR", "DE", "IT", "ES", "NL", "SE", "NO", "DK", "CH", "BE", "AT", "IE", "FI", "PT",
          "AE", "SA", "IL", "IN", "SG", "JP", "KR", "HK", "AU", "NZ", "ZA", "BR", "MX", "AR", "CL"
        ];

        const loadCovered = () => {
          try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return initialCovered;
            const arr = JSON.parse(raw);
            return Array.isArray(arr) ? arr : initialCovered;
          } catch {
            return initialCovered;
          }
        };

        const saveCovered = (arr: string[]) => {
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
          } catch {}
        };

        const root = am5.Root.new(chartRef.current);
        rootRef.current = root;

        root.setThemes([am5themes_Animated.new(root)]);

        const chart = root.container.children.push(
          am5map.MapChart.new(root, {
            panX: "translateX",
            panY: "translateY",
            projection: am5map.geoMercator(),
            wheelY: "none"
          })
        );

        const polygonSeries = chart.series.push(
          am5map.MapPolygonSeries.new(root, {
            geoJSON: am5geodata_worldLow,
            exclude: ["AQ"]
          })
        );

        polygonSeries.mapPolygons.template.setAll({
          tooltipText: "{name}",
          interactive: true,
          fill: BASE_FILL,
          stroke: am5.color(0xffffff),
          strokeWidth: 0.5
        });

        polygonSeries.mapPolygons.template.states.create("hover", {
          fill: HOVER_FILL
        });

        polygonSeries.mapPolygons.template.states.create("covered", {
          fill: COVER_COLOR
        });

        let covered = loadCovered().map(c => c.toUpperCase());
        let editMode = false;

        const applyCoverage = () => {
          polygonSeries.mapPolygons.each((polygon: any) => {
            const id = polygon.dataItem?.get("id");
            if (id && covered.includes(id)) {
              polygon.states.applyAnimate("covered");
            } else {
              polygon.states.applyAnimate("default");
            }
          });
        };

        polygonSeries.mapPolygons.template.events.on("click", (ev: any) => {
          if (!editMode) return;
          const id = ev.target.dataItem?.get("id");
          if (!id) return;

          const idx = covered.indexOf(id);
          if (idx === -1) {
            covered.push(id);
          } else {
            covered.splice(idx, 1);
          }
          covered.sort();
          saveCovered(covered);
          applyCoverage();
        });

        polygonSeries.events.on("datavalidated", applyCoverage);

        const toggleBtn = document.getElementById("toggle-edit");
        const copyBtn = document.getElementById("copy-codes");

        const handleToggle = () => {
          editMode = !editMode;
          if (toggleBtn) {
            toggleBtn.textContent = editMode ? "Disable Edit Mode" : "Enable Edit Mode";
            toggleBtn.style.background = editMode ? "#fff7e0" : "#fff";
          }
        };

        const handleCopy = () => {
          navigator.clipboard.writeText(JSON.stringify(covered));
          const hint = document.getElementById("saved-hint");
          if (hint) {
            hint.textContent = "Copied to clipboard!";
            setTimeout(() => {
              hint.textContent = "Selections auto-save.";
            }, 2000);
          }
        };

        toggleBtn?.addEventListener("click", handleToggle);
        copyBtn?.addEventListener("click", handleCopy);

        if (isMounted) {
          setIsLoading(false);
        }

      } catch (err) {
        console.error('Error initializing map:', err);
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load map');
          setIsLoading(false);
        }
      }
    };

    initMap();

    return () => {
      isMounted = false;
      if (rootRef.current) {
        rootRef.current.dispose();
        rootRef.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full">
      {isLoading && (
        <div className="w-full max-w-[1100px] h-[500px] lg:h-[600px] mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-gray-500">Loading map...</div>
        </div>
      )}
      {error && (
        <div className="w-full max-w-[1100px] h-[500px] lg:h-[600px] mx-auto bg-red-50 rounded-lg flex items-center justify-center">
          <div className="text-red-600">Error: {error}</div>
        </div>
      )}
      <div
        ref={chartRef}
        id="coverage-map"
        className="w-full max-w-[1100px] h-[500px] lg:h-[600px] mx-auto relative bg-white rounded-lg"
        style={{ display: isLoading || error ? 'none' : 'block' }}
      />
      {!isLoading && !error && (
        <div className="max-w-[1100px] mx-auto mt-4 flex gap-2 items-center justify-start text-sm flex-wrap">
          <button
            id="toggle-edit"
            className="px-3 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors text-sm"
          >
            Enable Edit Mode
          </button>
          <button
            id="copy-codes"
            className="px-3 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors text-sm"
          >
            Copy Covered Country Codes
          </button>
          <span id="saved-hint" className="text-xs text-gray-500 ml-2">
            Selections auto-save.
          </span>
        </div>
      )}
    </div>
  );
}
