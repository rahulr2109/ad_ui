import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexYAxis,
  ApexLegend,
  ApexXAxis,
  ApexTooltip,
  ApexTheme,
  ApexGrid
} from 'ng-apexcharts';
import { WeeklyDataEntry } from 'src/app/WeeklyDataEntry/weekly-data-entry';
import { Get7DaysDataServiceService } from 'src/app/get7DaysDataService/get7-days-data-service.service';
export type salesChartOptions = {
  series: ApexAxisChartSeries | any;/**Specifies the data series to be plotted on the chart. ApexAxisChartSeries defines an array of data series, each containing data points and configurations. */
  chart: ApexChart | any;/**Defines the chart configuration, such as type (line, bar, area, etc.), height, width, font family, and other chart-specific settings. */
  xaxis: ApexXAxis | any;/**Configures the x-axis of the chart. This includes categories (labels), axis labels, tick placement, and other axis-related settings.  */
  yaxis: ApexYAxis | any;
  stroke: any;/**Defines the stroke properties of the chart, such as the width and curve type of the lines in the chart. */
  theme: ApexTheme | any;/**Specifies the theme settings for the chart, such as colors and styles.  */
  tooltip: ApexTooltip | any;/**Configures the tooltip that appears when hovering over data points in the chart. This includes styling, formatting, and other tooltip-related settings.  */
  dataLabels: ApexDataLabels | any;/**Controls the data labels that appear on the chart. This includes enabling or disabling data labels, styling, and formatting. */
  legend: ApexLegend | any;/**Configures the legend of the chart, which provides information about the data series. This includes position, styling, and other legend-related settings. */
  colors: string[] | any;/**Specifies the colors to be used for the different data series in the chart. */
  markers: any;/**Defines the marker properties for the data points, such as size, shape, and color. */
  grid: ApexGrid | any;/** Configures the grid lines and settings for the chart, including visibility, color, and stroke dash array.  */
};

@Component({
  selector: 'app-sales-summary',
  templateUrl: './sales-summary.component.html'
})
export class SalesSummaryComponent implements OnInit {

  /**
   * Partial<salesChartOptions> is a TypeScript utility type that takes an existing type (in this case, salesChartOptions) and makes all its properties optional. 
   * This means that when you define an object of type Partial<salesChartOptions>, you do not have to provide values for all the properties defined in salesChartOptions.
   */
  @ViewChild("chart") chart: ChartComponent = Object.create(null);
  public salesChartOptions: Partial<salesChartOptions>;
  constructor(private service:Get7DaysDataServiceService) {
    this.salesChartOptions = {
      series: [],
      chart: {
        fontFamily: 'Nunito Sans,sans-serif',
        height: 250,//Specifies the height of the chart in pixels.
        type: 'area',/*This property sets the type of chart to be displayed. In this case, the type is 'area'. Area Chart: An area chart is similar to a line chart, but the area below the line is filled with color or shading. This type of chart is useful for showing trends over time or categories, and the filled area emphasizes the magnitude of the data.*/
        toolbar: {
          show: false/**The toolbar in ApexCharts provides additional interactive options for the chart. It typically includes features such as:
          Export: Allows users to export the chart as an image or other formats.
          Zoom: Provides zooming functionality to focus on specific areas of the chart.
          Pan: Enables panning to move around the chart.
          Reset: Resets the zoom level to the default view. */
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: '1',
      },
      grid: {
        strokeDashArray: 3,
      },
      xaxis: {
        categories: [],
      },
      tooltip: {
        theme: 'dark'
      }
    };
  }

  ngOnInit(): void {
    this.service.getData().subscribe((data: WeeklyDataEntry[]) => {
      this.updateChartData(data);
    });
  }

  updateChartData(data: WeeklyDataEntry[]): void {
    console.log("WeeklyData: ",data);
    const categories = data.map((item: any) => item.date);
    console.log("Categories: ",categories);
    const limitSvcData = data.map((item: any) => item.limitSvc);
    const balanceCoreData = data.map((item: any) => item.balanceCore);
    const liquidityPaymentIntegrationData = data.map((item: any) => item.liquidityPaymentIntegration);
    const liquidityCheckData = data.map((item: any) => item.liquidityCheck);

    this.salesChartOptions = {
      ...this.salesChartOptions,
      series: [
        { name: "Limit Svc", data: limitSvcData },
        { name: "Balance Core", data: balanceCoreData },
        { name: "Liquidity Payment Integration", data: liquidityPaymentIntegrationData },
        { name: "Liquidity Check", data: liquidityCheckData }
      ],
      xaxis: {
        categories: categories,
      }
    };
  }
}