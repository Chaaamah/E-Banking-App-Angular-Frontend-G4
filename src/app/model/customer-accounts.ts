import {Customer} from "./customer.model";

export interface Account {
  type:          string;
  id:            string;
  balance:       number;
  creationDate:   Date;
  status:        string;
  customerDTO:   Customer;
  overDraft?:    number;
  interestRate?: number;
}
