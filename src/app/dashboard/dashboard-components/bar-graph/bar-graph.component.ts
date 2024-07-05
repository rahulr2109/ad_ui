import { Component, OnInit, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.css']
})
export class BarGraphComponent implements OnInit {
  
  
  
  private data = [
    { service: 'Service1', transactions: 100, success: 80 },
    { service: 'Service2', transactions: 120, success: 110 },
    { service: 'Service3', transactions: 90, success: 85 },
    { service: 'Service4', transactions: 150, success: 140 }
    // Add more data as needed, dynamically fetched or updated
  ];

  private svg: any;
  private margin = { top: 30, right: 30, bottom: 70, left: 50 };
  private width = 600 - this.margin.left - this.margin.right;
  private height = 400 - this.margin.top - this.margin.bottom;

  constructor(private elRef: ElementRef) { }

  ngOnInit(): void {
    this.createSvg();
    this.drawBars();
  }

  private createSvg(): void {
    this.svg = d3.select(this.elRef.nativeElement.querySelector('#combined-bar-graph'))
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  private drawBars(): void {
    const services = this.data.map(d => d.service);
    const maxTransactions = d3.max(this.data.map(d => d.transactions).filter(d => d !== undefined)) || 0;
    const maxSuccesses = d3.max(this.data.map(d => d.success).filter(d => d !== undefined)) || 0;

    const xScale = d3.scaleBand()
      .domain(services)
      .range([0, this.width])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, Math.max(maxTransactions, maxSuccesses)])
      .nice()
      .range([this.height, 0]);

    // Add X axis
    this.svg.append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(xScale).tickSize(0))
      .selectAll('text')
      .attr('transform', 'translate(0,0)')  // Ensure text is horizontal
      .style('text-anchor', 'middle');

    // Add Y axis
    this.svg.append('g')
      .call(d3.axisLeft(yScale));

    // Bars for transactions
    this.svg.selectAll('.bar-transactions')
      .data(this.data)
      .enter().append('rect')
      .attr('class', 'bar-transactions')
      .attr('x', (d: { service: string; }) => xScale(d.service)!)
      .attr('y', (d: { transactions: d3.NumberValue; }) => yScale(d.transactions))
      .attr('width', xScale.bandwidth() / 2)
      .attr('height', (d: { transactions: d3.NumberValue; }) => this.height - yScale(d.transactions))
      .attr('fill', '#8dd3c7'); // Pastel blue

    // Bars for successes
    this.svg.selectAll('.bar-success')
      .data(this.data)
      .enter().append('rect')
      .attr('class', 'bar-success')
      .attr('x', (d: { service: string; }) => xScale(d.service)! + xScale.bandwidth() / 2)
      .attr('y', (d: { success: d3.NumberValue; }) => yScale(d.success))
      .attr('width', xScale.bandwidth() / 2)
      .attr('height', (d: { success: d3.NumberValue; }) => this.height - yScale(d.success))
      .attr('fill', '#fb8072'); // Pastel red

    // Add title
    this.svg.append('text')
      .attr('x', this.width / 2)
      .attr('y', -this.margin.top / 2)
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .text('Number of Transactions and Successes by Service');

    // Add legend below the x-axis
    const legend = this.svg.append('g')
      .attr('transform', 'translate(' + (this.width / 2 - 50) + ',' + (this.height + 40) + ')'); // Adjust legend position

    legend.append('rect')
      .attr('x', -60)
      .attr('width', 10)
      .attr('height', 10)
      .attr('fill', '#8dd3c7'); // Pastel blue

    legend.append('text')
      .attr('x', -40)
      .attr('y', 5)
      .attr('dy', '0.35em')
      .text('Transactions')
      .attr('class', 'legend-label');

    legend.append('rect')
      .attr('x', 60)
      .attr('width', 10)
      .attr('height', 10)
      .attr('fill', '#fb8072'); // Pastel red

    legend.append('text')
      .attr('x', 75)
      .attr('y', 5)
      .attr('dy', '0.35em')
      .text('Successes')
      .attr('class', 'legend-label');
  }
}
