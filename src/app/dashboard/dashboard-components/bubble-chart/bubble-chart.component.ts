import { Component, OnInit, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { GetAnomalyDataService } from 'src/app/getAnomalyData/get-anomaly-data.service';
import { AnomalyData } from 'src/app/anomalyData/anomaly-data';

@Component({
  selector: 'app-bubble-chart',
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.css']
})
export class BubbleChartComponent implements OnInit {
  private data: AnomalyData[] = [];
  private svg: any;
  private margin = { top: 30, right: 30, bottom: 50, left: 50 };
  private width = 400 - this.margin.left - this.margin.right;
  private height = 300 - this.margin.top - this.margin.bottom;

  constructor(private elRef: ElementRef, private anomalyDataService: GetAnomalyDataService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  private fetchData(): void {
    this.anomalyDataService.getAnomalyData().subscribe((response: AnomalyData[]) => {
      console.log("Response: ", response);
      this.data = response;
      this.createSvg();
      this.drawBubbles();
    });
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

    const yScale = d3.scaleTime()
      .domain([
        d3.min(this.data, (d: AnomalyData) => new Date(d.date)) as Date,
        d3.max(this.data, (d: AnomalyData) => new Date(d.date)) as Date
      ])
      .range([this.height, 0]);

    const maxValue = d3.max(this.data, d => d.anomalyCount);

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
    .call(d3.axisLeft(yScale).ticks(d3.timeDay.every(1)).tickFormat(d => {
      if (d instanceof Date) {
        return d3.timeFormat('%Y-%m-%d')(d);
      }
      return ''; // Handle non-Date values
    }))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -40)
      .attr('x', -this.height / 2)
      .attr('dy', '1em')
      .attr('fill', '#000')
      .attr('text-anchor', 'middle')
      .text('Date');

   // Tooltip
const tooltip = d3.select(this.elRef.nativeElement)
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
.attr('cx', (d: AnomalyData) => xScale(d.hour))
.attr('cy', (d: AnomalyData) => yScale(new Date(d.date)))
.attr('r', (d: AnomalyData) => rScale(d.anomalyCount))
.attr('fill', '#69b3a2')
.attr('opacity', '0.7')
.on('mouseover', function (event: MouseEvent, d: AnomalyData) {
  tooltip.transition()
    .duration(200)
    .style('opacity', .9);

  // Prepare anomalies data for table display
  const anomaliesData = d.anomalies ? d.anomalies : [];

  // Generate table HTML for tooltip
  let tableHtml = `<strong>Date:</strong> ${d.date}<br/><strong>Hour:</strong> ${d.hour}<br/><strong>Anomaly Count:</strong> ${d.anomalyCount}<br/><br/>`;
  if (anomaliesData.length > 0) {
    tableHtml += '<table>';
    tableHtml += '<tr><th>Account ID</th><th>Type</th></tr>';
    anomaliesData.forEach(anomaly => {
      tableHtml += `<tr><td>${anomaly.accountId}</td><td>${anomaly.type}</td></tr>`;
    });
    tableHtml += '</table>';
  }

  tooltip.html(tableHtml);

  tooltip.style('left', (event.pageX + 10) + 'px')
    .style('top', (event.pageY - 28) + 'px');
})
.on('mouseout', function (event: MouseEvent, d: AnomalyData) {
  tooltip.transition()
    .duration(500)
    .style('opacity', 0);
});
  }
}
