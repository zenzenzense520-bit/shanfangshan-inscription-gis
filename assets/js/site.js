// 修改说明：加载分级坐标记录，并以无地图密钥的 SVG 散点图展示。
(() => {
  'use strict';

  const svg = document.querySelector('#mapPlot');
  const detail = document.querySelector('#pointDetail');
  const buttons = [...document.querySelectorAll('[data-filter]')];
  if (!svg || !detail) return;

  const colors = { survey: '#d7b164', inferred: '#7db6a5', reference: '#c66b5c' };
  const sourceNames = { survey: '项目所述实测', inferred: '仿射推算', reference: '参考锚点' };
  const ns = 'http://www.w3.org/2000/svg';
  let features = [];

  function node(name, attrs = {}) {
    const element = document.createElementNS(ns, name);
    Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, String(value)));
    return element;
  }

  function renderDetail(feature) {
    const p = feature.properties;
    const [lng, lat] = feature.geometry.coordinates;
    detail.innerHTML = `
      <p class="detail-kicker">${sourceNames[p.source_type] || p.source_type}</p>
      <h3>${p.name}</h3>
      <dl>
        <dt>经度</dt><dd>${lng.toFixed(6)}° E</dd>
        <dt>纬度</dt><dd>${lat.toFixed(6)}° N</dd>
        <dt>状态</dt><dd>${p.validation_status}</dd>
        <dt>用途</dt><dd>${p.display_note}</dd>
      </dl>`;
  }

  function drawPlot() {
    if (!features.length) return;
    svg.replaceChildren();
    const width = 760, height = 500, pad = 58;
    const coords = features.map(item => item.geometry.coordinates);
    const lngs = coords.map(item => item[0]);
    const lats = coords.map(item => item[1]);
    const bounds = {
      minLng: Math.min(...lngs) - .0015, maxLng: Math.max(...lngs) + .0015,
      minLat: Math.min(...lats) - .0015, maxLat: Math.max(...lats) + .0015
    };
    const project = ([lng, lat]) => [
      pad + (lng - bounds.minLng) / (bounds.maxLng - bounds.minLng) * (width - pad * 2),
      height - pad - (lat - bounds.minLat) / (bounds.maxLat - bounds.minLat) * (height - pad * 2)
    ];

    for (let i = 0; i <= 4; i += 1) {
      const x = pad + i * (width - pad * 2) / 4;
      const y = pad + i * (height - pad * 2) / 4;
      svg.append(node('line', { x1: x, y1: pad, x2: x, y2: height - pad, class: 'grid' }));
      svg.append(node('line', { x1: pad, y1: y, x2: width - pad, y2: y, class: 'grid' }));
      const lngLabel = node('text', { x, y: height - 25, 'text-anchor': 'middle', class: 'axis-label' });
      lngLabel.textContent = (bounds.minLng + i * (bounds.maxLng - bounds.minLng) / 4).toFixed(3) + '°E';
      svg.append(lngLabel);
      const latLabel = node('text', { x: 12, y: height - pad - i * (height - pad * 2) / 4 + 4, class: 'axis-label' });
      latLabel.textContent = (bounds.minLat + i * (bounds.maxLat - bounds.minLat) / 4).toFixed(3) + '°N';
      svg.append(latLabel);
    }

    features.forEach((feature, index) => {
      const [x, y] = project(feature.geometry.coordinates);
      const type = feature.properties.source_type;
      const circle = node('circle', { cx: x, cy: y, r: 7, fill: colors[type], class: 'point', tabindex: 0, 'data-type': type, 'data-index': index });
      const label = node('text', { x: x + 12, y: y - 10, class: 'point-label' });
      label.textContent = feature.properties.name;
      const select = () => {
        svg.querySelectorAll('.point').forEach(item => item.classList.remove('selected'));
        circle.classList.add('selected');
        renderDetail(feature);
      };
      circle.addEventListener('click', select);
      circle.addEventListener('focus', select);
      svg.append(circle, label);
      if (index === 0) select();
    });
  }

  buttons.forEach(button => button.addEventListener('click', () => {
    buttons.forEach(item => item.classList.toggle('active', item === button));
    const filter = button.dataset.filter;
    svg.querySelectorAll('.point').forEach(point => point.classList.toggle('hidden', filter !== 'all' && point.dataset.type !== filter));
    const nextIndex = features.findIndex(feature => filter === 'all' || feature.properties.source_type === filter);
    const nextPoint = svg.querySelector(`.point[data-index="${nextIndex}"]`);
    if (nextPoint && nextIndex >= 0) {
      svg.querySelectorAll('.point').forEach(item => item.classList.remove('selected'));
      nextPoint.classList.add('selected');
      renderDetail(features[nextIndex]);
    }
  }));

  fetch('data/project_coordinate_records.geojson')
    .then(response => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then(data => { features = data.features.filter(item => item.geometry?.type === 'Point'); drawPlot(); })
    .catch(error => {
      detail.innerHTML = `<p class="detail-kicker">数据加载失败</p><h3>请通过网页服务器访问</h3><p>${error.message}</p>`;
    });
})();
