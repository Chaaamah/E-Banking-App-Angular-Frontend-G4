import {Customer} from "./customer.model";

export interface AccountDetails {
  customerDTO: Customer;
  accountId: string
  accountType: string
  balance: number
  currentPage: number
  totalPages: number
  pageSize: number
  accountOperations: AccountOperation[]
}

export interface AccountOperation {
  id: number
  operationDate: string
  amount: number
  operationType: string
  description: string
}

export interface Account {
  type: string;
  id: string;
  balance: number;
  creationDate: Date; // Utilisez `createdDate` au lieu de `creationDate`
  status: string;
  customerDTO: Customer;
  overDraft?: number; // Utilisez `overDraft` au lieu de `overdraft`
  interestRate?: number; // Utilisez `interestRate` au lieu de `rate`
}

