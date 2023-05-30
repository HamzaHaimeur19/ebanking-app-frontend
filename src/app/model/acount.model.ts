export interface AccountDetails {
  id: string;
  balance: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;

  accountOperationDTOS : AccountOperation[]; // liste des account operations dans accountDetails
}

export interface AccountOperation {
  id: number;
  operationDate: Date;
  amount: number;
  type: string;
}
