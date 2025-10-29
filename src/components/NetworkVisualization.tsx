import { useEffect, useRef } from 'react';

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

    const VARIANT = {
      offset: 18,
      activeOffset: 26,
      scaleMin: 0.88,
      scaleMax: 1.10,
      alphaMin: 0.60,
      alphaMax: 1.0
    };

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

    interface Node {
      theta: number;
      phi: number;
      el: HTMLDivElement;
      name: string;
      x: number;
      y: number;
      z: number;
    }

    const nodes: Node[] = [];

    function spherePoint() {
      const u = Math.random(), v = Math.random();
      const theta = 2 * Math.PI * u, phi = Math.acos(2 * v - 1);
      return { theta, phi };
    }

    for (let i = 0; i < LABELS.length; i++) {
      const name = LABELS[i];
      const s = spherePoint();
      const el = document.createElement('div');
      el.className = 'absolute px-3 py-1.5 text-xs rounded-full bg-white border border-gray-200 text-[#001641] shadow-md whitespace-nowrap transition-all';
      el.setAttribute('data-cat', CATEGORY_MAP[name] || '');
      el.innerHTML = '<span class="inline-block w-2 h-2 rounded-full mr-2 -ml-1 shadow-sm"></span>' + name;

      const dot = el.querySelector('span') as HTMLSpanElement;
      const cat = CATEGORY_MAP[name];
      if (cat === 'CEX') dot.style.background = '#9CA3AF';
      else if (cat === 'DEX/DeFi') dot.style.background = '#A8B0A3';
      else if (cat === 'Privacy/Mixers') dot.style.background = '#AAA6B9';
      else if (cat === 'Risk/Illicit') dot.style.background = '#B7A5A5';
      else if (cat === 'OTC/P2P') dot.style.background = '#BBAF9E';
      else if (cat === 'Infra/Bridge') dot.style.background = '#A3A8B3';

      labelsLayer.appendChild(el);
      nodes.push({ theta: s.theta, phi: s.phi, el, name, x: 0, y: 0, z: 0 });
    }

    const edges: [number, number][] = [];

    function connect() {
      edges.length = 0;
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

    function project(nx: number, ny: number, nz: number) {
      const scale = R * (0.6 + 0.4 * (nz + 1) / 2);
      const x = CX + nx * scale;
      const y = CY + ny * scale * 0.7;
      return { x, y, scale };
    }

    let rotY = 0, targetRotY = 0, auto = 0.0035, active = -1;
    let dragging = false, lastX = 0;

    function onDown(e: MouseEvent | TouchEvent) {
      dragging = true;
      lastX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    }

    function onMove(e: MouseEvent | TouchEvent) {
      if (!dragging) return;
      const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const dx = x - lastX;
      lastX = x;
      targetRotY += dx * 0.0025;
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

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    let animationId: number;

    function animate() {
      animationId = requestAnimationFrame(animate);
      if (!ctx) return;

      rotY += (targetRotY - rotY) * 0.08;
      targetRotY += auto;

      for (let n of nodes) {
        let x = Math.sin(n.phi) * Math.cos(n.theta);
        let y = Math.sin(n.phi) * Math.sin(n.theta);
        let z = Math.cos(n.phi);
        const cos = Math.cos(rotY), sin = Math.sin(rotY);
        const rx = x * cos + z * sin, rz = -x * sin + z * cos;
        n.x = rx; n.y = y; n.z = rz;
      }

      ctx.clearRect(0, 0, W, H);

      edges.sort((a, b) => (nodes[a[0]].z + nodes[a[1]].z) - (nodes[b[0]].z + nodes[b[1]].z));
      for (const [i, j] of edges) {
        const A = nodes[i], B = nodes[j];
        const pa = project(A.x, A.y, A.z), pb = project(B.x, B.y, B.z);
        const alpha = 0.18 + 0.28 * Math.min(pa.scale, pb.scale) / R;
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

        const offset = (i === active) ? VARIANT.activeOffset : VARIANT.offset;
        const scaleZ = lerp(VARIANT.scaleMin, VARIANT.scaleMax, (n.z + 1) / 2);
        const opacityZ = lerp(VARIANT.alphaMin, VARIANT.alphaMax, (n.z + 1) / 2);

        const el = n.el;
        el.style.left = (p.x / window.devicePixelRatio + n.x * offset) + "px";
        el.style.top = (p.y / window.devicePixelRatio + n.y * offset) + "px";
        el.style.transform = "translate(-50%,-50%) scale(" + scaleZ.toFixed(3) + ")";
        el.style.opacity = opacityZ.toFixed(3);
        el.style.zIndex = (1000 + Math.floor((n.z + 1) * 1000)).toString();

        if (i === active) {
          el.classList.add('!bg-slate-50', '!border-blue-900');
        } else {
          el.classList.remove('!bg-slate-50', '!border-blue-900');
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
        const bx = parseFloat(n.el.style.left) || 0, by = parseFloat(n.el.style.top) || 0;
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
