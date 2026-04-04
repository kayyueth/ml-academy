// ── Category & dimension meta ────────────────────────────────
const CATS = {
  pretraining: { color: '#7F77DD', label: 'Self-supervised Pretraining' },
  alignment:   { color: '#534AB7', label: 'Alignment Training' },
  peft:        { color: '#1D9E75', label: 'PEFT' },
  federated:   { color: '#D4537E', label: 'Federated & Privacy' },
  continual:   { color: '#BA7517', label: 'Continual Learning' },
  compression: { color: '#6B7C8A', label: 'Compression & Transfer' },
};

const TIER_COLORS  = { frontier:'#ef7d57', large:'#ba7517', efficient:'#1D9E75', edge:'#888780' };
const TOPO_LABELS  = { 'single':'Single-node','data-parallel':'Data-parallel','model-parallel':'Model-parallel','pipeline':'Pipeline-parallel','federated':'Federated','p2p':'P2P / Decentralized','hybrid':'Hybrid' };

// ── Node data ────────────────────────────────────────────────
// x: 0-900 (left = centralized, right = federated)
// y: 0-540 (top = high compute, bottom = low compute / control)
const NODES = [
  // ── Compute Layer  (y 20–165) ──
  { id:'diffusion', label:'Diffusion',  full:'Diffusion Pretraining',            cat:'pretraining', x:62,  y:65,  tier:'frontier',  topo:'model-parallel', scores:{compute:5,data:4,privacy:1,deployFlex:3,scalability:4,stability:3} },
  { id:'clm',       label:'CLM',        full:'Causal LM',                         cat:'pretraining', x:145, y:52,  tier:'frontier',  topo:'model-parallel', scores:{compute:5,data:5,privacy:1,deployFlex:4,scalability:5,stability:4} },
  { id:'mlm',       label:'MLM',        full:'Masked LM',                         cat:'pretraining', x:232, y:78,  tier:'large',     topo:'data-parallel',  scores:{compute:4,data:4,privacy:1,deployFlex:3,scalability:4,stability:5} },
  { id:'contrast',  label:'Contrast',   full:'Contrastive Learning',              cat:'pretraining', x:292, y:105, tier:'large',     topo:'data-parallel',  scores:{compute:4,data:4,privacy:2,deployFlex:4,scalability:4,stability:3} },
  { id:'fullft',    label:'Full FT',    full:'Full Fine-Tuning',                  cat:'peft',        x:168, y:145, tier:'large',     topo:'data-parallel',  scores:{compute:4,data:3,privacy:2,deployFlex:4,scalability:4,stability:4} },
  { id:'nas',       label:'NAS',        full:'Neural Architecture Search',        cat:'compression', x:258, y:148, tier:'large',     topo:'data-parallel',  scores:{compute:5,data:3,privacy:2,deployFlex:4,scalability:4,stability:4} },

  // ── Coordination Layer  (y 195–345) ──
  { id:'rlhf',      label:'RLHF',       full:'RL from Human Feedback',            cat:'alignment',   x:82,  y:218, tier:'large',     topo:'data-parallel',  scores:{compute:4,data:3,privacy:2,deployFlex:4,scalability:3,stability:2} },
  { id:'rlaif',     label:'RLAIF',      full:'RLAIF / Constitutional AI',         cat:'alignment',   x:175, y:235, tier:'large',     topo:'data-parallel',  scores:{compute:4,data:2,privacy:2,deployFlex:4,scalability:4,stability:3} },
  { id:'grpo',      label:'GRPO',       full:'Group Relative Policy Opt.',        cat:'alignment',   x:262, y:218, tier:'efficient', topo:'data-parallel',  scores:{compute:3,data:2,privacy:2,deployFlex:4,scalability:3,stability:3} },
  { id:'sft',       label:'SFT',        full:'Supervised Fine-Tuning',            cat:'alignment',   x:102, y:308, tier:'efficient', topo:'data-parallel',  scores:{compute:3,data:3,privacy:2,deployFlex:4,scalability:3,stability:5} },
  { id:'dpo',       label:'DPO',        full:'Direct Preference Optimization',    cat:'alignment',   x:198, y:305, tier:'efficient', topo:'single',         scores:{compute:2,data:3,privacy:2,deployFlex:4,scalability:3,stability:4} },
  { id:'kd',        label:'Distill',    full:'Knowledge Distillation',            cat:'compression', x:270, y:330, tier:'efficient', topo:'single',         scores:{compute:3,data:3,privacy:2,deployFlex:5,scalability:3,stability:4} },
  // hybrid column
  { id:'ragft',     label:'RAG FT',     full:'RAG Fine-Tuning',                   cat:'continual',   x:435, y:262, tier:'efficient', topo:'hybrid',         scores:{compute:2,data:1,privacy:3,deployFlex:5,scalability:4,stability:4} },
  { id:'ewc',       label:'EWC',        full:'Elastic Weight Consolidation',      cat:'continual',   x:368, y:320, tier:'efficient', topo:'single',         scores:{compute:2,data:2,privacy:2,deployFlex:3,scalability:3,stability:4} },
  { id:'prognn',    label:'Prog-NN',    full:'Progressive Neural Net',            cat:'continual',   x:490, y:298, tier:'efficient', topo:'single',         scores:{compute:2,data:2,privacy:2,deployFlex:2,scalability:2,stability:5} },
  // federated column
  { id:'hfl',       label:'Horiz FL',   full:'Horizontal Federated Learning',     cat:'federated',   x:672, y:228, tier:'efficient', topo:'federated',      scores:{compute:3,data:1,privacy:4,deployFlex:3,scalability:5,stability:2} },
  { id:'vfl',       label:'Vert FL',    full:'Vertical Federated Learning',       cat:'federated',   x:800, y:252, tier:'efficient', topo:'federated',      scores:{compute:3,data:1,privacy:5,deployFlex:2,scalability:3,stability:2} },
  { id:'dpsgd',     label:'DP-SGD',     full:'Differentially Private SGD',        cat:'federated',   x:658, y:318, tier:'efficient', topo:'federated',      scores:{compute:3,data:2,privacy:5,deployFlex:3,scalability:4,stability:3} },
  { id:'secagg',    label:'SecAgg',     full:'Secure Aggregation',                cat:'federated',   x:808, y:312, tier:'edge',      topo:'p2p',            scores:{compute:2,data:1,privacy:5,deployFlex:3,scalability:4,stability:3} },

  // ── Control Layer  (y 375–515) ──
  { id:'lora',      label:'LoRA',       full:'Low-Rank Adaptation',               cat:'peft',        x:80,  y:400, tier:'efficient', topo:'single',         scores:{compute:2,data:2,privacy:2,deployFlex:5,scalability:3,stability:5} },
  { id:'prefix',    label:'Prefix',     full:'Prompt / Prefix Tuning',            cat:'peft',        x:172, y:450, tier:'edge',      topo:'single',         scores:{compute:1,data:2,privacy:3,deployFlex:5,scalability:2,stability:4} },
  { id:'adapter',   label:'Adapter',    full:'Adapter Layers',                    cat:'peft',        x:262, y:425, tier:'edge',      topo:'single',         scores:{compute:1,data:2,privacy:3,deployFlex:5,scalability:2,stability:5} },
  { id:'qat',       label:'QAT',        full:'Quantization-Aware Training',       cat:'compression', x:122, y:492, tier:'efficient', topo:'single',         scores:{compute:3,data:3,privacy:2,deployFlex:5,scalability:3,stability:4} },
  { id:'pruning',   label:'Pruning',    full:'Structured Pruning',                cat:'compression', x:228, y:490, tier:'efficient', topo:'single',         scores:{compute:2,data:3,privacy:2,deployFlex:5,scalability:3,stability:3} },
  { id:'replay',    label:'Replay',     full:'Experience Replay',                 cat:'continual',   x:382, y:415, tier:'efficient', topo:'single',         scores:{compute:2,data:2,privacy:2,deployFlex:3,scalability:3,stability:4} },
];

// Training pipeline connections
const CONNECTIONS = [
  { from:'clm',     to:'sft',     type:'pipeline' },
  { from:'mlm',     to:'sft',     type:'pipeline' },
  { from:'sft',     to:'rlhf',    type:'pipeline' },
  { from:'sft',     to:'dpo',     type:'pipeline' },
  { from:'sft',     to:'grpo',    type:'pipeline' },
  { from:'sft',     to:'lora',    type:'pipeline' },
  { from:'rlhf',    to:'dpo',     type:'alternative' },
  { from:'rlhf',    to:'rlaif',   type:'alternative' },
  { from:'fullft',  to:'kd',      type:'secondary' },
  { from:'sft',     to:'kd',      type:'secondary' },
  { from:'lora',    to:'qat',     type:'secondary' },
  { from:'lora',    to:'pruning', type:'secondary' },
];

// ── State ────────────────────────────────────────────────────
const W = 900, H = 540, R = 22;
const activeFilters = new Set(Object.keys(CATS));
let showConnections = false;
let dimView = 'category';
let selectedId = null;
let hoveredId = null;

const nodeMap = {};
NODES.forEach(n => { nodeMap[n.id] = n; });

// ── Color resolver ───────────────────────────────────────────
function nodeColor(node) {
  if (dimView === 'tier')    return TIER_COLORS[node.tier] || '#888';
  if (dimView === 'privacy') {
    const scale = ['#ef7d57','#ba7517','#534AB7','#D4537E','#1D9E75'];
    return scale[node.scores.privacy - 1];
  }
  return CATS[node.cat]?.color || '#888';
}

// ── SVG helpers ──────────────────────────────────────────────
function svgEl(tag, attrs = {}) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  return el;
}

function svgText(text, attrs = {}) {
  const el = svgEl('text', attrs);
  el.textContent = text;
  return el;
}

// ── Init background ──────────────────────────────────────────
function initBackground() {
  const svg = document.getElementById('mapSvg');
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);

  // Arrowhead marker
  const defs = svgEl('defs');
  defs.innerHTML = `
    <marker id="mArrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
      <path d="M1 1.5L7 4L1 6.5" fill="none" stroke="rgba(20,33,61,0.4)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
    <marker id="mArrowOrange" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
      <path d="M1 1.5L7 4L1 6.5" fill="none" stroke="rgba(239,125,87,0.8)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
  `;
  svg.appendChild(defs);

  const bg = svgEl('g', { id: 'mapBg' });

  // Layer bands
  const layers = [
    { y:0,   h:180, fill:'rgba(127,119,221,0.055)', label:'Compute Layer',      sub:'Pretraining from scratch, architecture search' },
    { y:180, h:180, fill:'rgba(83,74,183,0.04)',    label:'Coordination Layer', sub:'Alignment, orchestration, federated training' },
    { y:360, h:180, fill:'rgba(29,158,117,0.05)',   label:'Control Layer',      sub:'Efficient adaptation, pruning, edge deployment' },
  ];
  layers.forEach(l => {
    bg.appendChild(svgEl('rect', { x:0, y:l.y, width:W, height:l.h, fill:l.fill }));
    bg.appendChild(svgText(l.label, { x:12, y:l.y+18, class:'map-layer-lbl' }));
    bg.appendChild(svgText(l.sub,   { x:12, y:l.y+34, class:'map-layer-sub' }));
  });

  // Horizontal separators
  [180, 360].forEach(y => {
    bg.appendChild(svgEl('line', { x1:0, y1:y, x2:W, y2:y, class:'map-hsep' }));
  });

  // Vertical topology dividers
  [300, 600].forEach(x => {
    bg.appendChild(svgEl('line', { x1:x, y1:0, x2:x, y2:H, class:'map-vsep' }));
  });

  // Column header labels (bottom)
  [
    { cx:150, label:'Centralized',            sub:'Single cluster, owned data' },
    { cx:450, label:'Hybrid',                 sub:'External stores, task boundaries' },
    { cx:750, label:'Federated / Distributed',sub:'Multi-party, privacy-preserving' },
  ].forEach(c => {
    bg.appendChild(svgText(c.label, { x:c.cx, y:H-18, 'text-anchor':'middle', class:'map-col-lbl' }));
    bg.appendChild(svgText(c.sub,   { x:c.cx, y:H-6,  'text-anchor':'middle', class:'map-layer-sub' }));
  });

  svg.appendChild(bg);

  // Connection group (below nodes)
  svg.appendChild(svgEl('g', { id:'mapConns' }));
  // Node group (on top)
  svg.appendChild(svgEl('g', { id:'mapNodes' }));
}

// ── Render connections ───────────────────────────────────────
function renderConnections() {
  const g = document.getElementById('mapConns');
  g.innerHTML = '';
  if (!showConnections) return;

  CONNECTIONS.forEach(c => {
    const from = nodeMap[c.from], to = nodeMap[c.to];
    if (!from || !to) return;
    if (!activeFilters.has(from.cat) || !activeFilters.has(to.cat)) return;

    const dx = to.x - from.x, dy = to.y - from.y;
    const dist = Math.sqrt(dx*dx + dy*dy) || 1;
    const ux = dx/dist, uy = dy/dist;
    // offset from node edges
    const fx = from.x + ux*R, fy = from.y + uy*R;
    const tx = to.x   - ux*R, ty = to.y   - uy*R;
    // control point for gentle curve
    const cx = (fx+tx)/2 - dy*0.15, cy = (fy+ty)/2 + dx*0.08;

    const isPipeline = c.type === 'pipeline';
    const path = svgEl('path', {
      d:`M${fx},${fy} Q${cx},${cy} ${tx},${ty}`,
      fill:'none',
      stroke: isPipeline ? 'rgba(239,125,87,0.6)' : 'rgba(20,33,61,0.22)',
      'stroke-width': isPipeline ? '2' : '1.2',
      'stroke-dasharray': isPipeline ? '6 3' : '4 4',
      'marker-end': isPipeline ? 'url(#mArrowOrange)' : 'url(#mArrow)',
    });
    if (isPipeline) path.setAttribute('class','map-conn-animate');
    g.appendChild(path);
  });
}

// ── Render nodes ─────────────────────────────────────────────
function renderNodes() {
  const g = document.getElementById('mapNodes');
  g.innerHTML = '';

  NODES.forEach(node => {
    const visible   = activeFilters.has(node.cat);
    const isSelected = selectedId === node.id;
    const color = nodeColor(node);

    const group = svgEl('g', { class:'map-node', 'data-id':node.id });
    group.style.opacity = visible ? '1' : '0.1';
    group.style.pointerEvents = visible ? 'all' : 'none';
    group.style.transition = 'opacity 0.25s';

    // Selection ring
    if (isSelected) {
      group.appendChild(svgEl('circle', { cx:node.x, cy:node.y, r:R+7, fill:'none', stroke:color, 'stroke-width':'2', opacity:'0.45' }));
      group.appendChild(svgEl('circle', { cx:node.x, cy:node.y, r:R+4, fill:color, 'fill-opacity':'0.12', stroke:'none' }));
    }

    // Main circle
    group.appendChild(svgEl('circle', {
      cx:node.x, cy:node.y, r: isSelected ? R+1 : R,
      fill:color, 'fill-opacity': isSelected ? '0.95' : '0.84',
      stroke:'#fff', 'stroke-width': isSelected ? '2.5' : '1.8',
    }));

    // Label
    const lbl = svgText(node.label, {
      x:node.x, y:node.y, 'text-anchor':'middle', 'dominant-baseline':'central',
      class:'map-node-lbl', fill:'#fff',
    });
    group.appendChild(lbl);

    // Interaction
    group.addEventListener('mouseenter', e => { hoveredId = node.id; showTooltip(node, e); });
    group.addEventListener('mouseleave', () => { hoveredId = null; hideTooltip(); });
    group.addEventListener('click', () => { selectedId = selectedId === node.id ? null : node.id; renderNodes(); if (selectedId) renderDetail(node); else clearDetail(); });

    g.appendChild(group);
  });
}

// ── Tooltip ──────────────────────────────────────────────────
function showTooltip(node, e) {
  const tt = document.getElementById('mapTip');
  tt.innerHTML = `<strong>${node.full}</strong><span>${CATS[node.cat]?.label}</span><span class="map-tip-tier">${node.tier} · ${TOPO_LABELS[node.topo]||node.topo}</span>`;
  tt.classList.add('visible');
  moveTip(e);
}
function hideTooltip() { document.getElementById('mapTip').classList.remove('visible'); }
function moveTip(e) {
  const tt = document.getElementById('mapTip');
  const box = document.getElementById('mapContainer').getBoundingClientRect();
  let x = e.clientX - box.left + 14, y = e.clientY - box.top - 10;
  if (x + 200 > box.width) x = e.clientX - box.left - 210;
  tt.style.left = x + 'px'; tt.style.top = y + 'px';
}
document.addEventListener('mousemove', e => { if (hoveredId) moveTip(e); });

// ── Radar chart ──────────────────────────────────────────────
const RDIMS = [
  { key:'compute',     label:'Compute\nCost' },
  { key:'data',        label:'Data\nVolume' },
  { key:'scalability', label:'Scalability' },
  { key:'deployFlex',  label:'Deploy\nFlex' },
  { key:'stability',   label:'Stability' },
  { key:'privacy',     label:'Privacy' },
];

function buildRadar(scores, color) {
  const cx=105, cy=108, maxR=74, n=RDIMS.length;
  const angle = i => -Math.PI/2 + (i * 2*Math.PI/n);
  const pt    = (i, r) => ({ x: cx + r*Math.cos(angle(i)), y: cy + r*Math.sin(angle(i)) });

  let out = `<svg viewBox="0 0 210 210" width="200" height="200" style="display:block">`;

  // grid rings
  for (let ring=1; ring<=5; ring++) {
    const pts = RDIMS.map((_,i) => { const p=pt(i,(ring/5)*maxR); return `${p.x},${p.y}`; }).join(' ');
    out += `<polygon points="${pts}" fill="none" stroke="rgba(20,33,61,0.09)" stroke-width="${ring===5?'1.2':'0.7'}"/>`;
  }
  // spokes
  RDIMS.forEach((_,i) => {
    const p=pt(i,maxR);
    out += `<line x1="${cx}" y1="${cy}" x2="${p.x}" y2="${p.y}" stroke="rgba(20,33,61,0.1)" stroke-width="0.7"/>`;
  });
  // filled area
  const pts = RDIMS.map((d,i) => { const p=pt(i,(scores[d.key]/5)*maxR); return `${p.x},${p.y}`; }).join(' ');
  out += `<polygon points="${pts}" fill="${color}28" stroke="${color}" stroke-width="1.8" stroke-linejoin="round"/>`;
  // dots
  RDIMS.forEach((d,i) => {
    const p=pt(i,(scores[d.key]/5)*maxR);
    out += `<circle cx="${p.x}" cy="${p.y}" r="3.2" fill="${color}" stroke="#fff" stroke-width="1.2"/>`;
  });
  // axis labels (split on \n)
  RDIMS.forEach((d,i) => {
    const p  = pt(i, maxR+17);
    const anchor = Math.cos(angle(i)) > 0.15 ? 'start' : Math.cos(angle(i)) < -0.15 ? 'end' : 'middle';
    const lines  = d.label.split('\n');
    const dy0    = lines.length > 1 ? -5 : 0;
    lines.forEach((line, li) => {
      out += `<text x="${p.x}" y="${p.y + dy0 + li*11}" text-anchor="${anchor}" dominant-baseline="central" font-size="8.5" font-family="IBM Plex Sans,sans-serif" fill="var(--muted,#5b6474)">${line}</text>`;
    });
  });

  out += `</svg>`;
  return out;
}

// ── Detail panel ─────────────────────────────────────────────
function renderDetail(node) {
  const color = CATS[node.cat]?.color || '#888';
  const s = node.scores;
  const layerName = node.y < 180 ? 'Compute' : node.y < 360 ? 'Coordination' : 'Control';
  const topoCol   = node.x < 300 ? 'Centralized' : node.x < 600 ? 'Hybrid' : 'Federated';

  document.getElementById('mapDetail').innerHTML = `
    <div class="map-det-cat" style="color:${color}">
      <span class="map-det-dot" style="background:${color}"></span>
      ${CATS[node.cat]?.label}
    </div>
    <h3 class="map-det-title">${node.full}</h3>
    <div class="map-det-badges">
      <span class="map-badge" style="background:${TIER_COLORS[node.tier]}1a;color:${TIER_COLORS[node.tier]};border-color:${TIER_COLORS[node.tier]}44">${node.tier}</span>
      <span class="map-badge">${TOPO_LABELS[node.topo]||node.topo}</span>
      <span class="map-badge">${layerName} layer</span>
      <span class="map-badge">${topoCol}</span>
    </div>

    <div class="map-det-body">
      <div class="map-radar">${buildRadar(s, color)}</div>
      <div class="map-score-list">
        ${RDIMS.map(d => `
          <div class="map-score-row">
            <span class="map-score-lbl">${d.label.replace('\n',' ')}</span>
            <div class="map-score-track"><div class="map-score-fill" style="width:${s[d.key]/5*100}%;background:${color}"></div></div>
            <span class="map-score-num">${s[d.key]}</span>
          </div>`).join('')}
      </div>
    </div>

    <div class="map-det-nav">
      <a class="map-det-link" href="paradigm.html">Full atlas →</a>
    </div>
  `;
}

function clearDetail() {
  document.getElementById('mapDetail').innerHTML = `
    <p class="eyebrow" style="margin-bottom:8px">Select a node</p>
    <p class="muted" style="margin:0;line-height:1.65">Click any paradigm node on the map to see its dimensional scores, topology, and compute tier.</p>
  `;
}

// ── Controls ─────────────────────────────────────────────────
function toggleCat(cat) {
  if (activeFilters.has(cat)) activeFilters.delete(cat);
  else activeFilters.add(cat);
  document.querySelectorAll('[data-cat]').forEach(b => b.classList.toggle('active', activeFilters.has(b.dataset.cat)));
  renderNodes(); renderConnections();
}

function setDimView(view) {
  dimView = view;
  document.querySelectorAll('[data-view]').forEach(b => b.classList.toggle('active', b.dataset.view === view));
  renderNodes();
}

function toggleConns() {
  showConnections = !showConnections;
  document.getElementById('connBtn').classList.toggle('active', showConnections);
  renderConnections();
}

// ── Boot ─────────────────────────────────────────────────────
initBackground();
renderNodes();
clearDetail();
