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

        const coveredCountries = [
          "US", "CA", "MX", "GT", "HN", "SV", "CR", "PA", "CO", "VE", "EC", "PE", "BR", "BO", "PY", "UY", "AR", "CL",
          "IS", "IE", "GB", "PT", "ES", "FR", "BE", "NL", "DE", "DK", "NO", "SE", "FI", "EE", "LV", "LT", "PL", "CZ", "SK", "AT", "CH", "IT", "SI", "HR", "BA", "RS", "ME", "AL", "MK", "GR", "BG", "RO", "MD", "UA", "BY",
          "RU", "GE", "AM", "AZ", "TR", "CY", "IL", "JO", "SA", "AE", "OM", "KW", "BH", "QA",
          "KZ", "UZ", "TM", "KG", "TJ", "PK", "IN", "NP", "BD", "MM", "TH", "LA", "VN", "KH", "MY", "SG", "ID", "PH", "CN", "MN", "KP", "KR", "JP", "TW",
          "NG", "GH", "ZA", "KE", "ET",
          "AU", "NZ"
        ];

        const root = am5.Root.new(chartRef.current);
        rootRef.current = root;

        root.setThemes([am5themes_Animated.new(root)]);

        const chart = root.container.children.push(
          am5map.MapChart.new(root, {
            panX: "none",
            panY: "none",
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
          interactive: false,
          fill: BASE_FILL,
          stroke: am5.color(0xffffff),
          strokeWidth: 0.5
        });

        const applyCoverage = () => {
          polygonSeries.mapPolygons.each((polygon: any) => {
            const id = polygon.dataItem?.get("id");
            if (id && coveredCountries.includes(id)) {
              polygon.set("fill", COVER_COLOR);
            }
          });
        };

        polygonSeries.events.on("datavalidated", applyCoverage);

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
        <div className="w-full h-[350px] lg:h-[400px] mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-gray-500">Loading map...</div>
        </div>
      )}
      {error && (
        <div className="w-full h-[350px] lg:h-[400px] mx-auto bg-red-50 rounded-lg flex items-center justify-center">
          <div className="text-red-600">Error: {error}</div>
        </div>
      )}
      <div
        ref={chartRef}
        id="coverage-map"
        className="w-full h-[350px] lg:h-[400px] mx-auto relative bg-white rounded-lg"
        style={{ display: isLoading || error ? 'none' : 'block' }}
      />
    </div>
  );
}
