import electron from 'electron';
import * as d3 from 'd3';
import _ from 'lodash';

const { screen } = electron.remote;

export function drawForce(data: { nodes: object[], links: object[] }): void {
  const { width ,height } = screen.getPrimaryDisplay().workAreaSize;

  const svg = d3.select('.force-container').append('svg')
  .attr('width', width)
  .attr('height', height);

  const g = svg.append('g').attr('class', 'everything');

  const zoom = d3
    .zoom()
    .scaleExtent([1, 8])
    .on('zoom', _ => g.attr('transform', d3.event.transform))

  svg.call(zoom);

  const nodes = data.nodes;
  const links = data.links;

  const maxWeight = _.max(_.map(nodes, 'weight'));
  
  const force = d3
  .forceSimulation()
  .nodes(nodes)
  .force('link', d3.forceLink(links).id(d => d.id).distance(100).strength(0.01))
  .force('charge', d3.forceCollide().radius(5))
  .force('collide', d3.forceCollide().radius(2).strength(5))
  .force('r', d3.forceRadial(d => (maxWeight - d.weight) * 200))
  .force('x', d3.forceX(200).strength(0.01))
  .force('y', d3.forceY(200).strength(0.01));

  const link = g.selectAll('.link').data(links);

  function marker(i, color) {
    const markId = "#marker"+i;
    svg.append("svg:marker")
        .attr("id", markId.replace("#", ""))
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 10)
        .attr("refY", 0)
        .attr("markerWidth", 15)
        .attr("markerHeight", 15)
        .attr("orient", "auto")
        .attr("markerUnits", "userSpaceOnUse")
        .append("svg:path")
        .attr("d", "M0,-5L10,0L0,5")
        .style("fill", color);

    return "url(" + markId + ")";
  }; 

  link.enter().append('line')
  .attr('class', 'link')
  .attr('stroke-width', 1)
  .attr('stroke', '#F2C53D')
  .attr("marker-end", (d, i) => marker(i, '#F2C53D')); 

  const node = g.selectAll('.node').data(nodes);
  const node_enter = node.enter().append('g').attr('class', 'node');

  node_enter.append('circle')
  .attr('r', d => d.weight * 8)
  .attr('fill', '#14A647')
  .attr('stroke', 'white')
  .attr('stroke-width', d => d.weight * 1.5)

  node_enter.append('text')
    .style('font-size', d => d.weight * 10 + 'px')
    .attr('x', 8)
    .attr('y', '0.31em')
    .text(d => d.id)
    .clone(true).lower()
    .attr('fill', 'none')
    .attr('stroke', 'white')
    .attr('stroke-width', 3);

  node_enter.on('click', function (d) {
    d3.event.stopImmediatePropagation();
  });

  const drag_handler = d3.drag()
        .on('start', drag_start)
        .on('drag', drag_drag)
        .on('end', drag_end);	

  drag_handler(node_enter);

  function zoom_actions(){
    g.attr('transform', d3.event.transform)
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
      if (!d3.event.active) force.alphaTarget(0);
      d.fx = null;
      d.fy = null;
  }

  const zoom_handler = d3.zoom()
          .on('zoom', zoom_actions);

      zoom_handler(svg); 

  function tick(): void {
    svg.selectAll('.node')
    .attr('transform', d => 'translate(' + d.x + ', '+ d.y + ')');

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
  const [width, height, margin] = [450, 450, 40];

  const radius = Math.min(width, height) / 2 - margin;

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
  .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse());

  const arcs = pie(data);

  const g = svg.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");
  
  g.append('path')
    .attr('fill', d => color(d.data.name))
    .attr('stroke', 'white')
    .attr('stroke-width', '2px')
    .transition()
    .delay((d,i) => i * 300)
    .duration(300)
    .attrTween('d', d => {
      const i = d3.interpolate(d.startAngle+0.1, d.endAngle);
      return t => {
        d.endAngle = i(t); 
        return arc(d)
      }
    })

  svg.append('g')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 12)
      .attr('text-anchor', 'middle')
    .selectAll('text')
    .data(arcs)
    .join('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .call(text => text.append('tspan')
        .attr('y', '-0.4em')
        .attr('font-weight', 'bold')
        .transition()
        .delay(3000)
        .text(d => d.data.name))
      .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append('tspan')
        .attr('x', 0)
        .attr('y', '0.7em')
        .attr('fill-opacity', 0.7)
        .transition()
        .delay(3000)
        .text(d => d.data.value.toLocaleString()));
}
