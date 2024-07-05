import { Component, OnInit } from '@angular/core';
import { TopCard, topcards } from './top-cards-data';

@Component({
  selector: 'app-top-cards',
  templateUrl: './top-cards.component.html',
  styleUrls: ['./top-cards.component.css']
})
export class TopCardsComponent implements OnInit {

  totalTransactions: TopCard = { bgcolor: 'success',  title: '', subtitle: 'Total Transactions' };
  totalAnomalies: TopCard = { bgcolor: 'primary', title: '', subtitle: 'Total Anomalies' };
  otherServices: TopCard[] = [];

  fromTimestamp: string = '';
  toTimestamp: string = '';

  constructor() { }

  ngOnInit(): void {
    // Initial fetch can be done here if needed
    // this.fetchAndProcessData();
  }

  fetchAndProcessData() {
    // Simulate fetching data from an endpoint based on timestamps
    const response = {
      "results": [{
        "no_of_transactions": 5000,
        "liquidity_payment_integration": {
          "no_of_failures": 50,
          "average_failure": 0.01,
          "anomalies": {
            "count": 5,
            "accounts": ["acc1", "acc2"]
          }
        },
        "liq_check": {
          "no_of_failures": 30,
          "average_failure": 0.006,
          "anomalies": {
            "count": 2,
            "accounts": ["acc3"]
          }
        },
        "balance_core": {
          "no_of_failures": 40,
          "average_failure": 0.008,
          "anomalies": {
            "count": 3,
            "accounts": ["acc4"]
          }
        },
        "limit_svc": {
          "no_of_failures": 20,
          "average_failure": 0.004,
          "anomalies": {
            "count": 1,
            "accounts": ["acc5"]
          }
        },
        "total_no_of_anomalies": -11
      }]
    };

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
  }
}
