export interface AnomalyData {
    anomalies: {
    accountId:string;
    type:string;
  }[];
    date: string;
    hour: number;
    anomalyCount: number;
    
  }
  