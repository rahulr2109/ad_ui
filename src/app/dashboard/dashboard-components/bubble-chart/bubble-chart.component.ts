/*import { Component, OnInit, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bubble-chart',
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.css']
})
export class BubbleChartComponent implements OnInit {
  private data = [
    { day: 'Monday', hour: 0, value: 10 },
    { day: 'Monday', hour: 13, value: 10 },
    { day: 'Monday', hour: 14, value: 10 },
    { day: 'Tuesday', hour: 0, value: 10 },
    { day: 'Wednesday', hour: 0, value: 10 },
    { day: 'Thursday', hour: 0, value: 10 },
    { day: 'Friday', hour: 0, value: 10 },
    { day: 'Friday', hour: 15, value: 1000 },
  ];

  private svg:any;
  private margin = 50;
  private width = 800 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  constructor(private elRef: ElementRef) { }

  ngOnInit(): void {
    this.createSvg();
    this.drawBubbles();
  }

  private createSvg(): void {
    this.svg = d3.select(this.elRef.nativeElement.querySelector('#bubble-chart'))
      .append('svg')
      .attr('width', this.width + (this.margin * 2))
      .attr('height', this.height + (this.margin * 2))
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
  }

  private drawBubbles(): void {
    const xScale = d3.scaleLinear()
      .domain([0, 23])
      .range([0, this.width]);

    const yScale = d3.scaleBand()
      .domain(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']) // Option 1: Ensure complete domain
      .range([0, this.height])
      .padding(0.1);

    // Filter out undefined values for d.value and then calculate max
  const maxValue = d3.max(this.data.filter(d => d.value !== undefined), d => d.value as number);

  const rScale = d3.scaleSqrt()
    .domain([0, maxValue || 0]) // Provide a default value in case maxValue is undefined
    .range([0, 40]);

    // Add X axis
    this.svg.append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(xScale).ticks(24));

    // Add Y axis
    this.svg.append('g')
      .call(d3.axisLeft(yScale));

    // Add bubbles
    this.svg.selectAll('.bubble')
      .data(this.data)
      .enter()
      .append('circle')
      .attr('class', 'bubble')
      .attr('cx', (d: { hour: number; }) => xScale(d.hour as number)) // Type assertion for d.hour as number
      .attr('cy', (d: { day: string; }) => {
        const yPos = yScale(d.day);
        return yPos !== undefined ? yPos + yScale.bandwidth() / 2 : 0; // Handle undefined case
      })
      .attr('r', (d: { value: number; }) => rScale(d.value as number)) // Type assertion for d.value as number
      .attr('fill', 'steelblue')
      .attr('opacity', 0.7);

      
  }
}
*/

import { Component, OnInit, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bubble-chart',
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.css']
})
export class BubbleChartComponent implements OnInit {
  private data = [
    { day: 'Monday', hour: 0, value: 10 },
    { day: 'Monday', hour: 13, value: 10 },
    { day: 'Monday', hour: 14, value: 10 },
    { day: 'Tuesday', hour: 0, value: 10 },
    { day: 'Wednesday', hour: 0, value: 10 },
    { day: 'Thursday', hour: 0, value: 10 },
    { day: 'Friday', hour: 0, value: 10 },
    { day: 'Friday', hour: 15, value: 1000 },
    { day: 'Saturday', hour: 20, value: 10 },
    { day: 'Sunday', hour: 17, value: 10 },
  ];

  private svg:any;
  private margin = { top: 30, right: 30, bottom: 50, left: 50 };
  private width = 400 - this.margin.left - this.margin.right;
  private height = 300 - this.margin.top - this.margin.bottom;

  constructor(private elRef: ElementRef) { }

  ngOnInit(): void {
    this.createSvg();
    this.drawBubbles();
  }

  private createSvg(): void {
    this.svg = d3.select(this.elRef.nativeElement.querySelector('#bubble-chart'))
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  private drawBubbles(): void {
    const xScale = d3.scaleLinear()
      .domain([0, 23])
      .range([0, this.width]);

    const yScale = d3.scaleBand()
      .domain(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday','Sunday'])
      .range([0, this.height])
      .padding(0.1);

    const maxValue = d3.max(this.data.filter(d => d.value !== undefined), d => d.value as number);

    const rScale = d3.scaleSqrt()
      .domain([0, maxValue || 0])
      .range([2, 20]);

    // Add X axis
    this.svg.append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(xScale).ticks(24))
      .append('text')
      .attr('x', this.width / 2)
      .attr('y', 35)
      .attr('fill', '#000')
      .attr('text-anchor', 'middle')
      .text('Hour of the Day');

    // Add Y axis
    this.svg.append('g')
      .call(d3.axisLeft(yScale))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -40)
      .attr('x', -this.height / 2)
      .attr('dy', '1em')
      .attr('fill', '#000')
      .attr('text-anchor', 'middle')
      .text('Day of the Week');

    // Tooltip
    const tooltip = d3.select(this.elRef.nativeElement.querySelector('#bubble-chart'))
      .append('div')
      .style('position', 'absolute')
      .style('background', '#f9f9f9')
      .style('border', '1px solid #d3d3d3')
      .style('padding', '5px')
      .style('border-radius', '5px')
      .style('pointer-events', 'none')
      .style('opacity', 0);

    // Add bubbles
    this.svg.selectAll('.bubble')
      .data(this.data)
      .enter()
      .append('circle')
      .attr('class', 'bubble')
      .attr('cx', (d: { hour: number; }) => xScale(d.hour as number))
      .attr('cy', (d: { day: string; }) => {
        const yPos = yScale(d.day);
        return yPos !== undefined ? yPos + yScale.bandwidth() / 2 : 0; // Handle undefined case
      })
      .attr('r', (d: { value: number; }) => rScale(d.value as number))
      .attr('fill', 'steelblue')
      .attr('opacity', 0.7)
      .on('mouseover', (event: any, d: { hour: number; day: string; value: number; }) => {
        tooltip
          .style('opacity', 1)
          .html(`Day: ${d.day}<br>Hour: ${d.hour}<br>Value: ${d.value}`)
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY - 20}px`);
      })
      .on('mousemove', (event: any) => {
        tooltip
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY - 20}px`);
      })
      .on('mouseout', () => {
        tooltip
          .style('opacity', 0);
      });

    // Add title
    this.svg.append('text')
      .attr('x', this.width / 2)
      .attr('y', -this.margin.top / 2)
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .text('Transaction Volume by Day and Hour');
  }
}
