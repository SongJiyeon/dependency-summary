import electron from 'electron';
import * as d3 from 'd3';
import _ from 'lodash';

const { screen } = electron.remote;
const DURATION = 2000;

export function drawForce(data: { nodes: object[], links: object[] }, graphType): void {
  const { width ,height } = screen.getPrimaryDisplay().workAreaSize;
  const size = data.nodes.length;
  const weights = data.nodes.reduce((weights, node) => {
    return _.includes(weights, node.weight) ? weights : [ ...weights, node.weight ];
  }, []);

  d3.select('svg').remove();

  const svg = d3.select('.force-container').append('svg')
  .attr('width', width)
  .attr('height', height);

  const g = svg.append('g').attr('class', 'everything');

  const nodes = data.nodes;
  const links = data.links;

  const color = d3.scaleOrdinal()
  .domain(weights)
  .range(d3.quantize(t => 
    d3.interpolateSpectral(t * 0.8 + 0.1), weights.length).reverse());

  const force = d3.forceSimulation();
  const link = g.selectAll('.link').data(links);
  const node = g.selectAll('.node').data(nodes);

  const zoom = d3
    .zoom()
    .scaleExtent([1, 8])
    .on('zoom', _ => g.attr('transform', d3.event.transform))

  const zoom_handler = d3.zoom().on('zoom', zoom_actions);

  const drag_handler = d3.drag()
    .on('start', drag_start)
    .on('drag', drag_drag)
    .on('end', drag_end);

  const maxWeight = _.max(_.map(nodes, 'weight'));

  const neighbors = [];

  links.forEach(function(d) {
    neighbors[d.source + '-' + d.target] = graphType === 'depth';
    neighbors[d.target + '-' + d.source] = graphType === 'weight';
  });
  
  if (graphType === 'weight') {
    svg.call(zoom)
    .call(zoom.transform,
      d3.zoomIdentity
      .translate(width / 3 + 100, height / 3)
      .scale(0.28 - 0.00018 * size)
    )
    .append('svg:g')
    .attr('transform','translate(100,50) scale(.5,.5)');

    force.nodes(nodes)
    .force('link', d3.forceLink(links).id(d => d.id).distance(100).strength(0.01))
    .force('charge', d3.forceCollide().radius(5))
    .force('collide', d3.forceCollide().radius(2).strength(5))
    .force('r', d3.forceRadial(d => (maxWeight - d.weight) * 200))
    .force('x', d3.forceX(200).strength(0.01))
    .force('y', d3.forceY(200).strength(0.01));
  } else {
    svg.call(zoom)
    .call(zoom.transform,
      d3.zoomIdentity
      .translate(width / 3 - 150, height / 3 - 150)
      .scale(0.388 - 0.00022 * size)
    )
    .append('svg:g')
    .attr('transform','translate(100,50) scale(.5,.5)');

    force.nodes(nodes)
    .force('link', d3.forceLink(links).id(d => d.id).distance(100).strength(0.03))
    .force('charge', d3.forceCollide().radius(5))
    .force('collide', d3.forceCollide().radius(d => d.weight * 8 || 8).iterations(2))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('x', d3.forceX(d => d.depth * size / 300 * width / 7 || 0).strength(0.95))
    .force('y', d3.forceY(height).strength(0.00001));
  }
  const link_enter = link.enter().append('line').attr('class', 'link');
  const node_enter = node.enter().append('g').attr('class', 'node');

  link_enter
  .attr('stroke-width', 1)
  .attr('stroke', '#D9D6D2')
  .attr('marker-end', (d, i) => marker(i, '#D9D6D2'));

  node_enter
  .append('circle')
  .attr('r', d => d.weight * 8 || 50)
  .attr('fill', d => d.weight ? color(d.weight) : 'tomato')
  .attr('stroke', 'white')
  .attr('stroke-width', d => d.weight * 1.5 || 1.5)

  const label = g.selectAll('text')
  .data(nodes)
  .enter()
  .append('text')
  .text(d => d.id)
  .attr('pointer-events', 'none')
  .attr('display', 'none');

  node_enter.on('click', d => d3.event.stopImmediatePropagation());	

  node_enter.on('mouseover', focus).on('mouseout', unfocus);

  drag_handler(node_enter);

  function marker(i, color) {
    const markId = '#marker'+i;
    svg.append('svg:marker')
        .attr('id', markId.replace('#', ''))
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 10)
        .attr('refY', 0)
        .attr('markerWidth', 15)
        .attr('markerHeight', 15)
        .attr('orient', 'auto')
        .attr('markerUnits', 'userSpaceOnUse')
        .append('svg:path')
        .attr('d', 'M0,-5L10,0L0,5')
        .style('fill', color);

    return 'url(' + markId + ')';
  };

  function focus(d) {
    const id = d3.select(d3.event.target).datum().id;

    node_enter
    .style('opacity', o => isNeighbor(id, o.id) ? 1 : 0.1);

    label.style('display', o => isNeighbor(id, o.id) ? 'block': 'none')
    .attr('x', d => d.x)
    .attr('y', d => d.y)
    .style('font-size', d => d.weight * 10 || 10)
    .style('fill', '#595857');

    link_enter
    .style('opacity', o => {
      const neigh = graphType === 'weight' ? o.target.id : o.source.id;
      return neigh === id ? 1 : 0.1;
    })
    .style('stroke', '#595857')
    .style('marker-end', (d, i) => marker(i, '#595857'));
  }

  function unfocus() {
    label.style('display', 'none');
    node_enter.style('opacity', 1);
    link_enter.style('opacity', 1)
    .style('stroke', '#D9D6D2')
    .style('marker-end', (d, i) => marker(i, '#D9D6D2'));
  }

  function isNeighbor(a, b): boolean {
    return a === b || neighbors[a + '-' + b];
  }

  function zoom_actions() {
    g.attr('transform', d3.event.transform);
  }

  function drag_start(d) {
    if (!d3.event.active) force.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  
  function drag_drag(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }
  
  function drag_end(d) {
    !d3.event.active && force.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  zoom_handler(svg); 

  function tick(): void {
    svg.selectAll('.node')
    .attr('transform', d => `translate(${d.x}, ${d.y})`);

    svg.selectAll('.link')
    .attr('x1', d => d.source.x)
    .attr('x2', d => d.target.x)
    .attr('y1', d => d.source.y)
    .attr('y2', d => d.target.y);

    svg.exit().remove();
  };

  force.on('tick', tick);
}

export function drawPie(data: object[]): void {
  const width = screen.getPrimaryDisplay().workAreaSize.width * (2 / 5);
  const height = screen.getPrimaryDisplay().workAreaSize.height / 2;
  const margin = width / 30;

  const radius = Math.min(width, height) / 2 - margin;
  const total = data.reduce((sum, d: { value: number }) => sum + d.value, 0);
  const colorLength = _.uniqBy(data.map(d => d.value), d => d.value).length;
  const length = data.length;

  const svg = d3.select('.pie-container')
  .append('svg')
    .attr('width', width)
    .attr('height', height)
  .append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`)
  ;

  const pie = d3.pie()
  .padAngle(0.005)
  .sort(null)
  .value(d => d.value);

  const arc = d3.arc()
  .innerRadius(radius * 0.67)
  .outerRadius(radius - 1);

  const color = d3.scaleOrdinal()
  .domain(data.map(d => d.name))
  .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), length).reverse());

  const arcs = pie(data);

  const g = svg.selectAll('.arc')
      .data(pie(data))
    .enter().append('g')
      .attr('class', 'arc');
  
  g.append('path')
    .attr('fill', d => color(d.data.name))
    .attr('stroke', 'white')
    .attr('stroke-width', '2px')
    .transition()
    .delay((d,i) => i * (DURATION / length))
    .duration(DURATION / length)
    .attrTween('d', d => {
      const i = d3.interpolate(d.startAngle+0.1, d.endAngle);
      return t => {
        d.endAngle = i(t); 
        return arc(d)
      }
    })

  svg.append('g')
      .attr('font-family', 'sans-serif')
      .attr('text-anchor', 'middle')
    .selectAll('text')
    .data(arcs)
    .join('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .call(text => text.append('tspan')
        .attr('y', '-0.4em')
        .attr('font-weight', 'bold')
        .attr('font-size', d => (d.endAngle - d.startAngle) > 0.25 ? 20 : 10)
        .transition()
        .delay(DURATION)
        .text(d => d.data.name))
      .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append('tspan')
        .attr('x', 0)
        .attr('y', '0.7em')
        .attr('fill-opacity', 0.7)
        .attr('font-size', 15)
        .transition()
        .delay(DURATION)
        .text(d => (d.data.value / total * 100).toFixed(1) + '%'));
}

export function drawBar(data: object[]): void {
  const topUsedModules = _.sortBy(data, d => d.value).reverse().splice(0, 5).reverse();

  const size = topUsedModules.length;

  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const width = screen.getPrimaryDisplay().workAreaSize.width / 3 - margin.left - margin.right;
  const height = screen.getPrimaryDisplay().workAreaSize.height / 4 - margin.top - margin.bottom;

  const x = d3.scaleLinear()
  .range([0, width]);
  const y = d3.scaleBand()
  .range([height, 0])
  .padding(0.1)
  .paddingInner(0.3);

  const color = d3.scaleOrdinal()
  .domain(topUsedModules.map(d => d.name))
  .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), topUsedModules.length).reverse());

  const svg = d3.select('.bar-container')
  .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
  .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  x.domain([0, d3.max(topUsedModules, d => d.value)]);
  y.domain(topUsedModules.map(d => d.name));

  svg.selectAll('.bar')
    .data(topUsedModules)
  .enter()
    .append('rect')
    .attr('fill', d => color(d.name))
    .attr('class', 'bar')
    .attr('y', d => y(d.name))
    .attr('height', y.bandwidth());

  svg.append('g')
    .attr('font-family', 'sans-serif')
  .selectAll('text')
  .data(topUsedModules)
  .join('text')
    .call(text => text.append('tspan')
      .attr('x', 5)
      .attr('y', d => y(d.name))
      .attr('font-size', '12')
      .attr('fill', 'black')
      .transition()
      .delay(DURATION)
      .text(d => d.name))
    .call(text => text).append('tspan')
      .attr('x', d => x(d.value) - (12 * `${d.value}`.length))
      .attr('y', d => y(d.name) + y.bandwidth() - 5)
      .attr('font-size', '15')
      .attr('font-weight', 'bold')
      .attr('fill', 'white')
      .transition()
      .delay(DURATION)
      .text(d => d.value);
  
  svg.selectAll('rect')
  .transition()
  .duration(DURATION / size)
  .attr('x', x(0))
  .attr('width', d => x(d.value))
  .delay((d, i) => i * (DURATION / size));

  svg.append('g')
  .attr('transform', `translate(0, ${height})`)
  .transition()
  .delay(DURATION)
  .call(d3.axisBottom(x));

  svg.append('g')
  
  .transition()
  .delay(DURATION)
  .call(d3.axisLeft(y))
  .call(g => g.selectAll('.tick').remove());
}
