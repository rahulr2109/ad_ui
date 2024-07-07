import { Component, OnInit } from '@angular/core';
import { AnomalyData } from '../anomalyData/anomaly-data';
import { CurrentDayAnomaliesService } from '../currentDayAnomalies/current-day-anomalies.service';
//import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-current-day-anomalies',
  templateUrl: './current-day-anomalies.component.html',
  styleUrls: ['./current-day-anomalies.component.css']
})
export class CurrentDayAnomaliesComponent implements OnInit{
  anomalyData: AnomalyData[] = [];
  currentHour!: number;
  intervalId: any;
  hourColors: string[] = [];
  hoveredIndex: number | null = null;
  showHoverContent = false;

  constructor(private anomalyDataService: CurrentDayAnomaliesService) { }

  ngOnInit(): void {
    this.currentHour = new Date().getHours();
    this.initializeHourColors();
    this.fetchHourlyAnomalyData(this.currentHour); // Initial fetch for current hour
    this.setupPeriodicCheckForHour(); // Setup periodic check for fetching data at x:00:00
  }

  fetchHourlyAnomalyData(hour: number): void {
    const startTime = new Date();
    startTime.setHours(hour, 0, 0, 0); // Set start time to current hour, 00 minutes, 00 seconds
    const endTime = new Date(startTime);
    endTime.setHours(endTime.getHours() + 1); // Set end time to next hour

    this.anomalyDataService.getHourlyAnomalyData(startTime.toISOString(), endTime.toISOString())
      .subscribe(
        (data: any) => { // Adjust type as per your service response
          this.anomalyData = data;
          this.initializeHourColors(); // Update hour colors after fetching data
          this.detectAnomalyAndAlert(); // Check for anomaly and send alert if needed
        },
        (error) => {
          console.error('Error fetching hourly anomaly data:', error);
          // Handle error, e.g., show error message on UI
        }
      );
  }

  setupPeriodicCheckForHour(): void {
    setInterval(() => {
      const now = new Date();
      const currentMinute = now.getMinutes();
      const currentSecond = now.getSeconds();
      console.log("Current Minute: ",currentMinute);
      console.log("Current Second: ",currentSecond)
      // Check if the current time is close to x:00:00
      if (currentMinute === 0 )//&& (currentSecond===1||currentSecond===0)) { // Adjust the threshold as needed
        {console.log("Fetch Hourly Data");
        const newHour = now.getHours();
        console.log("Fetching data for hour: ",newHour);
        this.fetchHourlyAnomalyData(newHour);
      }
    }, 2000); // Check every 2 seconds
  }

  initializeHourColors(): void {
    for (let i = 0; i < 24; i++) {
      
      console.log("Current Hour: ",this.currentHour);
      if (i < this.currentHour) {
        // Past hours
        console.log("Applying colors for: ",i);
        this.hourColors[i] = this.hasAnomaly(i) ? 'red' : 'green';
      } else if (i === this.currentHour) {
        // Current hour
        this.hourColors[i] = 'blue';
      } else {
        // Future hours
        this.hourColors[i] = 'gray';
      }
    }
  }

  hasAnomaly(hour: number): boolean {
    const dataForHour = this.anomalyData.find(data => data.hour === hour);
    return dataForHour ? dataForHour.anomalyCount > 0 : false;
  }

  detectAnomalyAndAlert(): void {
    const previousHour = this.currentHour - 1;
    if (previousHour >= 0 && this.hasAnomaly(previousHour)) {
      console.log(`Alert: Anomaly detected in hour ${previousHour}`);
      // Add logic here to send an email alert

      // Prepare anomaly details
      const anomalies = this.anomalyData.find(data => data.hour === previousHour)?.anomalies;
      let anomalyDetails = '';
      if (anomalies && anomalies.length > 0) {
        anomalyDetails = anomalies.map(anomaly => `Account ID: ${anomaly.accountId}, Type: ${anomaly.type}`).join(', ');
      }

      console.log("Anomaly Details: ",anomalyDetails);

      // Initialize EmailJS with your public key
      /*
      emailjs.init("sLChH_1CqotqgOwA-");

        emailjs.send("service_9305q14","template_gfszfmy",{
          from_name: "Sakshi",
          to_name: "Radhika",
          from_email: "radhika772063@gmail.com",
          subject: "Anomaly Detected",
           message: `Anomaly detected in hour ${previousHour}. Details: ${anomalyDetails}`,
          reply_to: "radhika772063@gmail.com",
          }).then(function(response) {
        console.log('Email sent:', response);
      }, function(error) {
        console.error('Email error:', error);
      });*/
    }
  }

  onMouseEnter(index: number): void {
    this.hoveredIndex = index;
    this.showHoverContent = true;
  }

  onMouseLeave(): void {
    this.hoveredIndex = null;
    this.showHoverContent = false;
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}