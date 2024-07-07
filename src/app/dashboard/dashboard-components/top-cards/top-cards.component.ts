import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TopCard, topcards } from './top-cards-data';

@Component({
  selector: 'app-top-cards',
  templateUrl: './top-cards.component.html',
  styleUrls: ['./top-cards.component.css']
})
export class TopCardsComponent implements OnInit {

  totalTransactions: TopCard = { bgcolor: 'success', title: '', subtitle: 'Total Transactions' };
  totalAnomalies: TopCard = { bgcolor: 'primary', title: '', subtitle: 'Total Anomalies' };
  otherServices: TopCard[] = [];

  fromTimestamp: string = '';
  toTimestamp: string = '';
  isLoading: boolean = false;  // Add a loading state

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Initial fetch can be done here if needed
    // this.fetchAndProcessData();
  }

  fetchAndProcessData() {
    this.isLoading = true; // Set loading state to true

    const apiUrl = 'YOUR_API_ENDPOINT'; // Replace with your actual API endpoint
    const params = {
      from: this.fromTimestamp,
      to: this.toTimestamp
    };

    this.http.get(apiUrl, { params }).subscribe((response: any) => {
      const result = response.results[0];

      // Total Transactions
      this.totalTransactions.title = result.no_of_transactions.toString();

      // Total Anomalies
      this.totalAnomalies.title = Math.abs(result.total_no_of_anomalies).toString();

      // Other Services
      this.otherServices = [
        {
          bgcolor: 'danger',
          title: result.liquidity_payment_integration.no_of_failures.toString(),
          subtitle: 'Liquidity Payment Failures',
          additionalInfo: `Avg Failure: ${result.liquidity_payment_integration.average_failure}, Anomalies: ${result.liquidity_payment_integration.anomalies.count}`,
          accounts: result.liquidity_payment_integration.anomalies.accounts
        },
        {
          bgcolor: 'warning',
          title: result.liq_check.no_of_failures.toString(),
          subtitle: 'Liq Check Failures',
          additionalInfo: `Avg Failure: ${result.liq_check.average_failure}, Anomalies: ${result.liq_check.anomalies.count}`,
          accounts: result.liq_check.anomalies.accounts
        },
        {
          bgcolor: 'info',
          title: result.balance_core.no_of_failures.toString(),
          subtitle: 'Balance Core Failures',
          additionalInfo: `Avg Failure: ${result.balance_core.average_failure}, Anomalies: ${result.balance_core.anomalies.count}`,
          accounts: result.balance_core.anomalies.accounts
        },
        {
          bgcolor: 'secondary',
          title: result.limit_svc.no_of_failures.toString(),
          subtitle: 'Limit Svc Failures',
          additionalInfo: `Avg Failure: ${result.limit_svc.average_failure}, Anomalies: ${result.limit_svc.anomalies.count}`,
          accounts: result.limit_svc.anomalies.accounts
        }
      ];

      this.isLoading = false; // Set loading state to false
    }, error => {
      console.error('Error fetching data:', error);
      this.isLoading = false; // Set loading state to false even if there's an error
    });
  }
}
