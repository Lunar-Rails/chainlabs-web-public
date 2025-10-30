import { useEffect, useRef } from 'react';

interface Node {
  name: string;
  theta: number;
  phi: number;
  baseRadius: number;
  depthBias: number;
  el: HTMLDivElement;
  x: number;
  y: number;
  z: number;
  v0: [number, number, number];
}

interface RotationGroup {
  axis: [number, number, number];
  speed: number;
}

export default function NetworkVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const CATEGORY_MAP: Record<string, string> = {
      "Binance":"CEX","Kraken":"CEX","Huobi":"CEX","KuCoin":"CEX","OKX":"CEX","Bybit":"CEX",
      "Uniswap":"DEX/DeFi","Curve":"DEX/DeFi","PancakeSwap":"DEX/DeFi","SushiSwap":"DEX/DeFi","Derivative Exchange":"DEX/DeFi",
      "DeFi Protocol":"DEX/DeFi","Yield Farm":"DEX/DeFi","NFT Marketplace":"DEX/DeFi","Aggregator":"DEX/DeFi","Router":"DEX/DeFi","MEV Bot":"DEX/DeFi",
      "Tornado Cash":"Privacy/Mixers","Mixer":"Privacy/Mixers",
      "Darknet Market":"Risk/Illicit","Scam":"Risk/Illicit","Ransomware":"Risk/Illicit","Phishing":"Risk/Illicit","Malware":"Risk/Illicit",
      "OTC Desk":"OTC/P2P","P2P Exchange":"OTC/P2P","Telegram Exchange":"OTC/P2P",
      "Bridge":"Infra/Bridge","Custodian":"Infra/Bridge","Stablecoin Issuer":"Infra/Bridge"
    };

    const LABELS = Object.keys(CATEGORY_MAP);

    const canvas = canvasRef.current;
    const labelsLayer = labelsRef.current;
    if (!canvas || !labelsLayer) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W: number, H: number, CX: number, CY: number, R: number;

    function resize() {
      if (!canvas) return;
      const rect = canvas.parentElement!.getBoundingClientRect();
      W = canvas.width = rect.width * window.devicePixelRatio;
      H = canvas.height = rect.height * window.devicePixelRatio;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      CX = W / 2;
      CY = H / 2;
      R = Math.min(W, H) / 2.2;
    }

    window.addEventListener('resize', resize);
    resize();

    const nodes: Node[] = [];
    const rand = () => Math.random();

    for (let i = 0; i < LABELS.length; i++) {
      const name = LABELS[i];
      const u = rand(), v = rand();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const depthBias = (rand() * 2 - 1);
      const radiusVar = 1 + depthBias * 0.35;
      const clamped = Math.max(0.45, Math.min(1.35, radiusVar));

      const el = document.createElement('div');
      el.className = 'absolute px-3 py-1.5 pl-[22px] text-[13px] leading-none rounded-full bg-white border border-[#E3E8EF] text-[#0A1630] whitespace-nowrap transition-all';
      el.style.boxShadow = '0 2px 5px rgba(30,58,138,0.12)';
      el.setAttribute('data-cat', CATEGORY_MAP[name] || '');
      el.innerHTML = '<span class="absolute left-[8px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full shadow-sm"></span>' + name;

      const dot = el.querySelector('span') as HTMLSpanElement;
      const cat = CATEGORY_MAP[name];
      if (cat === 'CEX') dot.style.background = '#9CA3AF';
      else if (cat === 'DEX/DeFi') dot.style.background = '#A8B0A3';
      else if (cat === 'Privacy/Mixers') dot.style.background = '#AAA6B9';
      else if (cat === 'Risk/Illicit') dot.style.background = '#B7A5A5';
      else if (cat === 'OTC/P2P') dot.style.background = '#BBAF9E';
      else if (cat === 'Infra/Bridge') dot.style.background = '#A3A8B3';

      labelsLayer.appendChild(el);

      nodes.push({
        name, theta, phi,
        baseRadius: clamped,
        depthBias,
        el,
        x: 0, y: 0, z: 0,
        v0: [0, 0, 0]
      });
    }

    const groups: Record<string, RotationGroup> = {
      "CEX": { axis: [0, 1, 0], speed: 0.35 * 0.7 },
      "DEX/DeFi": { axis: [0, 0.8, 0.2], speed: -0.30 * 0.7 },
      "Privacy/Mixers": { axis: [0.3, 0.9, 0], speed: 0.28 * 0.7 },
      "Risk/Illicit": { axis: [0, 0.7, -0.3], speed: -0.26 * 0.7 },
      "OTC/P2P": { axis: [0.2, 1, 0.2], speed: 0.22 * 0.7 },
      "Infra/Bridge": { axis: [0.4, 0.8, -0.2], speed: -0.20 * 0.7 }
    };

    Object.values(groups).forEach(g => {
      const [x, y, z] = g.axis;
      const len = Math.hypot(x, y, z) || 1;
      g.axis = [x / len, y / len, z / len];
    });

    nodes.forEach(n => {
      const x = Math.sin(n.phi) * Math.cos(n.theta) * n.baseRadius;
      const y = Math.sin(n.phi) * Math.sin(n.theta) * n.baseRadius;
      const z = Math.cos(n.phi) * (n.baseRadius + n.depthBias * 0.25);
      n.v0 = [x, y, z];
    });

    const edges: [number, number][] = [];

    function connect() {
      const dist = 0.9, maxConn = 6;
      for (let i = 0; i < nodes.length; i++) {
        let c = 0;
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const ad = Math.acos(Math.sin(a.phi) * Math.sin(b.phi) * Math.cos(a.theta - b.theta) + Math.cos(a.phi) * Math.cos(b.phi));
          if (ad < dist && c < maxConn) { edges.push([i, j]); c++; }
        }
      }
    }
    connect();

    let active = -1;
    let dragging = false, lastX = 0, globalDrift = 0;

    function onDown(e: MouseEvent | TouchEvent) {
      dragging = true;
      lastX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    }

    function onMove(e: MouseEvent | TouchEvent) {
      if (!dragging) return;
      const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const dx = x - lastX;
      lastX = x;
      globalDrift += dx * 0.0025 * 0.7;
    }

    function onUp() {
      dragging = false;
    }

    window.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchstart', onDown as any);
    window.addEventListener('touchmove', onMove as any);
    window.addEventListener('touchend', onUp);

    function rotVec(v: [number, number, number], axis: [number, number, number], angle: number): [number, number, number] {
      const [ux, uy, uz] = axis;
      const [x, y, z] = v;
      const c = Math.cos(angle), s = Math.sin(angle);
      const cross: [number, number, number] = [uy * z - uz * y, uz * x - ux * z, ux * y - uy * x];
      const dot = ux * x + uy * y + uz * z;
      return [
        x * c + cross[0] * s + ux * dot * (1 - c),
        y * c + cross[1] * s + uy * dot * (1 - c),
        z * c + cross[2] * s + uz * dot * (1 - c)
      ];
    }

    function project(nx: number, ny: number, nz: number) {
      const scale = R * (0.6 + 0.4 * (nz + 1) / 2);
      const x = CX + nx * scale;
      const y = CY + ny * scale * 0.7;
      return { x, y, scale };
    }

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    let animationId: number;

    function animate(t?: number) {
      animationId = requestAnimationFrame(animate);
      if (!ctx) return;

      const time = (t || 0) / 1000;

      for (let n of nodes) {
        const cat = CATEGORY_MAP[n.name] || "CEX";
        const g = groups[cat];
        const angle = g.speed * time + globalDrift * 0.75 * (g.speed > 0 ? 1 : -1);
        const v = rotVec(n.v0, g.axis, angle);
        const breath = 1 + Math.sin(time * 0.8 + n.v0[1] * 3) * 0.12;
        n.x = v[0] * breath;
        n.y = v[1] * breath;
        n.z = v[2] * (1.05 + Math.sin(time * 0.5 + v[0] * 2) * 0.12);
      }

      ctx.clearRect(0, 0, W, H);

      edges.sort((a, b) => (nodes[a[0]].z + nodes[a[1]].z) - (nodes[b[0]].z + nodes[b[1]].z));
      for (const [i, j] of edges) {
        const A = nodes[i], B = nodes[j];
        const pa = project(A.x, A.y, A.z), pb = project(B.x, B.y, B.z);
        const alpha = 0.16 + 0.32 * Math.min(pa.scale, pb.scale) / R;
        ctx.globalAlpha = alpha;
        ctx.lineWidth = Math.max(1, 1.4 * Math.min(pa.scale, pb.scale) / R);
        ctx.strokeStyle = (i === active || j === active) ? '#1E3A8A' : '#D4DAE2';
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      const order = nodes.map((n, i) => ({ i, z: n.z })).sort((a, b) => a.z - b.z).map(o => o.i);
      for (const i of order) {
        const n = nodes[i];
        const p = project(n.x, n.y, n.z);

        ctx.beginPath();
        ctx.fillStyle = '#FF8C32';
        const r = 2.0 + 3.2 * p.scale / R;
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();

        const scaleZ = lerp(0.60, 1.25, (n.z + 1) / 2);
        const alphaZ = lerp(0.35, 1.00, (n.z + 1) / 2);
        const offset = (i === active) ? 28 : 19;

        const el = n.el;
        el.style.left = (p.x / window.devicePixelRatio + n.x * offset) + "px";
        el.style.top = (p.y / window.devicePixelRatio + n.y * offset) + "px";
        el.style.transform = "translate(-50%,-50%) scale(" + scaleZ.toFixed(3) + ")";
        el.style.opacity = alphaZ.toFixed(3);
        el.style.zIndex = (1000 + Math.floor((n.z + 1) * 1000)).toString();

        if (i === active) {
          el.style.background = '#F8FAFC';
          el.style.borderColor = '#1E3A8A';
        } else {
          el.style.background = '#FFFFFF';
          el.style.borderColor = '#E3E8EF';
        }
      }
    }
    animate();

    function pick(e: MouseEvent | TouchEvent) {
      if (!labelsLayer) return;
      const rect = labelsLayer.getBoundingClientRect();
      const x = ('touches' in e ? e.touches[0].clientX : e.clientX) - rect.left;
      const y = ('touches' in e ? e.touches[0].clientY : e.clientY) - rect.top;
      let best = -1, bestD = 1e9;
      nodes.forEach((n, i) => {
        const bx = parseFloat(n.el.style.left) || 0;
        const by = parseFloat(n.el.style.top) || 0;
        const dx = bx - x, dy = by - y;
        const d = dx * dx + dy * dy;
        if (d < bestD) { bestD = d; best = i; }
      });
      active = best;
    }

    labelsLayer.addEventListener('mousemove', pick as any);
    labelsLayer.addEventListener('touchstart', pick as any);
    labelsLayer.addEventListener('click', () => { active = -1; });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchstart', onDown as any);
      window.removeEventListener('touchmove', onMove as any);
      window.removeEventListener('touchend', onUp);
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div ref={labelsRef} className="absolute inset-0 pointer-events-none" />
    </div>
  );
}
