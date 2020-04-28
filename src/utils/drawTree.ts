export function drawChart(svg): void {
  const dataset: number[] = [5, 10, 15, 20, 25];

  const chartWidth: number = 500;
  const chartHeight: number = 500;
  const padding: number = 10;

  const heightScalingFactor: number = chartHeight / Math.max.apply(null, dataset);

  svg.selectAll('rect')
    .data(dataset)
    .join(
      enter => enter
      .append('rect')
      .attr('x', (value, index: number) =>  (index * (chartWidth / dataset.length)) + padding)
      .attr('y', (value: number, index) => chartHeight - (value * heightScalingFactor))
      .attr('width', (chartWidth / dataset.length) - padding)
      .attr('height', (value: number, index) => value * heightScalingFactor)
      .attr('fill', 'pink'),
      update => update.attr('class', 'updated'),
      exit => exit.remove()
    )
    .enter()
    
}
