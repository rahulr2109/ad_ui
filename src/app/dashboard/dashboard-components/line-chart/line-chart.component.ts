import { Component, OnInit, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { NumberValue } from 'd3';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  
  private data = [
    { date: new Date('2024-07-01'), transactions: 100 },
    { date: new Date('2024-07-02'), transactions: 120 },
    { date: new Date('2024-07-03'), transactions: 90 },
    { date: new Date('2024-07-04'), transactions: 150 }
    // Add more data as needed, dynamically fetched or updated
  ];

  private svg: any;
  private margin = { top: 30, right: 30, bottom: 50, left: 50 };
  private width = 600 - this.margin.left - this.margin.right;
  private height = 400 - this.margin.top - this.margin.bottom;

  constructor(private elRef: ElementRef) { }

  ngOnInit(): void {
    this.createSvg();
    this.drawLineChart();
  }

  private createSvg(): void {
    this.svg = d3.select(this.elRef.nativeElement.querySelector('#line-chart'))
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  private drawLineChart(): void {
    // Define scales
    const xScale = d3.scaleTime()
      .domain(d3.extent(this.data, (d: { date: Date; }) => d.date) as [Date, Date])
      .range([0, this.width]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(this.data, (d: { transactions: number; }) => d.transactions) || 0])
      .nice()
      .range([this.height, 0]);

    // Define the line
    const line = d3.line<{ date: Date; transactions: number }>()
      .x(d => xScale(d.date))
      .y(d => yScale(d.transactions))
      .curve(d3.curveMonotoneX); // Smooth the line

    // Add the line to the SVG
    this.svg.append('path')
      .datum(this.data)
      .attr('class', 'line')
      .attr('d', line)
      .attr('fill', 'none') // Ensure no fill
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2);

    // Add the X Axis
    this.svg.append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(xScale).ticks(d3.timeDay.every(1)).tickFormat(d3.timeFormat('%Y-%m-%d') as unknown as (domainValue: NumberValue) => string));

    // Add the Y Axis
    this.svg.append('g')
      .call(d3.axisLeft(yScale));

    // Add circles for data points
    this.svg.selectAll('.highlight-circle')
      .data(this.data)
      .enter().append('circle')
      .attr('class', 'highlight-circle')
      .attr('cx', (d: { date: Date | d3.NumberValue; }) => xScale(d.date))
      .attr('cy', (d: { transactions: d3.NumberValue; }) => yScale(d.transactions))
      .attr('r', 4);

    // Tooltip
    const tooltip = d3.select(this.elRef.nativeElement.querySelector('#line-chart'))
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    // Tooltip events
    this.svg.selectAll('.highlight-circle')
      .on('mouseover', (event: any, d: { date: Date; transactions: number; }) => {
        tooltip.transition()
          .duration(200)
          .style('opacity', .9);
        tooltip.html(`Date: ${d.date.toLocaleDateString()}<br/>Transactions: ${d.transactions}`)
          .style('left', (event.pageX) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', () => {
        tooltip.transition()
          .duration(500)
          .style('opacity', 0);
      });

    // Add title
    this.svg.append('text')
      .attr('x', this.width / 2)
      .attr('y', -this.margin.top / 2)
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .text('Transactions Over Time');

    // Add X axis label
    this.svg.append('text')
      .attr('x', this.width / 2)
      .attr('y', this.height + this.margin.bottom - 10)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .text('Date');

    // Add Y axis label
    this.svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -this.margin.left + 15)
      .attr('x', -this.height / 2)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .text('Number of Transactions');
  }
}
