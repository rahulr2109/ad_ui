export interface TopCard {
    bgcolor: string;
    title: string;
    subtitle: string;
    additionalInfo?: string;
    accounts?: string[]; // Add accounts property
    selectedAccount?: string; // Add selectedAccount property
  }
  
  export const topcards: TopCard[] = [];
  