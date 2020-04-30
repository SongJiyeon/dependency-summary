import React, { useEffect } from 'react';
import electron from 'electron';
import * as d3 from 'd3';
import _ from 'lodash';

import useTargetPath from '../../hooks/useTargetPath';
import { getForceData } from '../../utils/index';

const { screen } = electron.remote;

export default function DependencyTree() {
  const { targetPath } = useTargetPath();
  
  useEffect(() => {
    const data = getForceData(targetPath);
    const { height } = screen.getPrimaryDisplay().workAreaSize;
    const width = screen.getPrimaryDisplay().workAreaSize.width;

    const svg = d3.select('.graph-container').append('svg')
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
    // .on('mouseover', d => {
    //   node_enter.attr('fill', '#000');
    //   d.attr('fill', 'tomato');

    //   link
    //     .attr('stroke', link =>  link.source.id === d.id || link.target.id === d.id ? '#69b3b2' : '#b8b8b8')
    //     .attr('stroke-width', link => link.source.id === d.id || link.target.id === d.id ? 4 : 1)
    // })
    // .on('mouseout', d => {
    //   node_enter.attr('fill', "tomato");
    //   link
    //     .attr('stroke', 'black')
    //     .attr('stroke-width', '1');
    // });

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
    
    //make sure you can't drag the circle outside the box
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
    };

    force.on('tick', tick);
  }, []);
  
  return (
    <div className="graph-container"></div>
    
  ); 
}
