import { useEffect, useRef } from 'react';

export default function CoverageMap() {
  const chartRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<any>(null);

  useEffect(() => {
    // Load amCharts scripts dynamically
    const loadScript = (src: string) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const initMap = async () => {
      // Check if amCharts is already loaded
      if (!(window as any).am5) {
        await loadScript('https://cdn.amcharts.com/lib/5/index.js');
        await loadScript('https://cdn.amcharts.com/lib/5/map.js');
        await loadScript('https://cdn.amcharts.com/lib/5/geodata/worldLow.js');
        await loadScript('https://cdn.amcharts.com/lib/5/themes/Animated.js');
      }

      if (!chartRef.current) return;

      const am5 = (window as any).am5;
      const am5map = (window as any).am5map;
      const am5themes_Animated = (window as any).am5themes_Animated;
      const am5geodata_worldLow = (window as any).am5geodata_worldLow;

      // Config
      const COVER_COLOR = am5.color(0xFFB800);
      const BASE_FILL = am5.color(0xD0D0D0);
      const HOVER_FILL = am5.color(0xFFD36A);
      const STORAGE_KEY = "coverage_iso2_codes_v1";

      // Initial covered countries - you can edit these
      const initialCovered = [
        "US", "CA", "GB", "FR", "DE", "IT", "ES", "NL", "SE", "NO", "DK", "CH", "BE", "AT", "IE", "FI", "PT",
        "AE", "SA", "IL", "IN", "SG", "JP", "KR", "HK", "AU", "NZ", "ZA", "BR", "MX", "AR", "CL"
      ];

      // Storage utilities
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

      // Set up amCharts map
      const root = am5.Root.new(chartRef.current);
      rootRef.current = root;
      root.setThemes([am5themes_Animated.new(root)]);

      const chart = root.container.children.push(
        am5map.MapChart.new(root, {
          panX: "translateX",
          panY: "translateY",
          wheelY: "zoom",
          projection: am5map.geoMercator()
        })
      );

      const polygonSeries = chart.series.push(
        am5map.MapPolygonSeries.new(root, {
          geoJSON: am5geodata_worldLow,
          exclude: ["AQ"],
          valueField: "value"
        })
      );

      // Tooltip
      polygonSeries.set(
        "tooltip",
        am5.Tooltip.new(root, {
          labelText: "{name}"
        })
      );

      // Styling
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

      const coveredState = polygonSeries.mapPolygons.template.states.create("covered", {
        fill: COVER_COLOR
      });

      // Track coverage
      let covered = loadCovered().map(c => c.toUpperCase());
      let editMode = false;

      const applyCoverage = () => {
        polygonSeries.mapPolygons.each((polygon: any) => {
          const id = polygon.dataItem.get("id");
          if (covered.includes(id)) {
            polygon.states.applyAnimate("covered");
          } else {
            polygon.states.applyAnimate("default");
          }
        });
      };

      // Toggle on click (only in Edit Mode)
      polygonSeries.mapPolygons.template.events.on("click", (ev: any) => {
        if (!editMode) return;
        const id = ev.target.dataItem.get("id");
        const idx = covered.indexOf(id);
        if (idx === -1) covered.push(id);
        else covered.splice(idx, 1);
        covered.sort();
        saveCovered(covered);
        applyCoverage();
      });

      // Initial apply
      polygonSeries.events.on("datavalidated", applyCoverage);

      // UI controls
      const toggleBtn = document.getElementById("toggle-edit");
      const copyBtn = document.getElementById("copy-codes");

      if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
          editMode = !editMode;
          toggleBtn.textContent = editMode ? "Disable Edit Mode" : "Enable Edit Mode";
          toggleBtn.style.background = editMode ? "#fff7e0" : "#fff";
          if (editMode) {
            polygonSeries.mapPolygons.template.set("cursorOverStyle", "pointer");
          } else {
            polygonSeries.mapPolygons.template.set("cursorOverStyle", "default");
          }
        });
      }

      if (copyBtn) {
        copyBtn.addEventListener("click", () => {
          navigator.clipboard.writeText(JSON.stringify(covered));
          const hint = document.getElementById("saved-hint");
          if (hint) {
            hint.textContent = "Copied to clipboard!";
            setTimeout(() => {
              hint.textContent = "Selections auto-save.";
            }, 2000);
          }
        });
      }
    };

    initMap();

    // Cleanup
    return () => {
      if (rootRef.current) {
        rootRef.current.dispose();
      }
    };
  }, []);

  return (
    <div className="w-full">
      <div
        ref={chartRef}
        id="coverage-map"
        className="w-full max-w-[1100px] h-[500px] lg:h-[600px] mx-auto relative"
      />
      <div className="max-w-[1100px] mx-auto mt-2 flex gap-2 items-center justify-start text-sm">
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
    </div>
  );
}
