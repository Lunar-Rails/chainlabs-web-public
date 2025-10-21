import { Suspense, lazy, useState, useEffect, useRef } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

export default function SplineHeroAnimation() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [splineApp, setSplineApp] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (splineApp) {
      const rotationX = mousePosition.y * 0.1;
      const rotationY = mousePosition.x * 0.1;

      try {
        splineApp.setVariable('rotationX', rotationX);
        splineApp.setVariable('rotationY', rotationY);
      } catch (error) {
        console.warn('Spline interaction not available:', error);
      }
    }
  }, [mousePosition, splineApp]);

  const handleLoad = (spline: any) => {
    setSplineApp(spline);
    setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  if (hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-full h-full opacity-20">
            <svg viewBox="0 0 800 600" className="w-full h-full">
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#001641', stopOpacity: 0.1 }} />
                  <stop offset="100%" style={{ stopColor: '#FF8A00', stopOpacity: 0.1 }} />
                </linearGradient>
              </defs>
              {[...Array(15)].map((_, i) => (
                <g key={i}>
                  <circle
                    cx={Math.random() * 800}
                    cy={Math.random() * 600}
                    r="4"
                    fill="#001641"
                    opacity="0.3"
                  />
                  {i < 14 && (
                    <line
                      x1={Math.random() * 800}
                      y1={Math.random() * 600}
                      x2={Math.random() * 800}
                      y2={Math.random() * 600}
                      stroke="url(#grad1)"
                      strokeWidth="1"
                      opacity="0.2"
                    />
                  )}
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full h-full relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white">
          <div className="animate-pulse">
            <div className="w-16 h-16 border-4 border-[#FF8A00] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      )}

      {isVisible && (
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="animate-pulse">
              <div className="w-16 h-16 border-4 border-[#FF8A00] border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        }>
          <Spline
            scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
            onLoad={handleLoad}
            onError={handleError}
            style={{ width: '100%', height: '100%' }}
          />
        </Suspense>
      )}
    </div>
  );
}
