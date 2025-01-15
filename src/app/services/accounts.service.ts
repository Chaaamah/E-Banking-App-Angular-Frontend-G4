import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Account, AccountDetails } from "../model/account.model";
import { AbstractControl, ValidationErrors } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  host: string = 'http://localhost:8081';
  private balance: any;

  constructor(private http: HttpClient) { }

  public getAccounts(): Observable<Array<AccountDetails>> {
    return this.http.get<Array<AccountDetails>>(this.host + "/accounts");
  }

  public getAccountByID(accountId: string): Observable<Account> {
    return this.http.get<Account>(this.host + "/accounts/" + accountId);
  }

  public getAccount(accountId: string, page: number, size: number): Observable<AccountDetails> {
    return this.http.get<AccountDetails>(this.host + "/accounts/" + accountId + "/pageOperations?page=" + page + "&size=" + size);
  }

  public debit(accountId: string, amount: number, description: string): Observable<any> {
    const params = new HttpParams()
      .set('amount', amount.toString())
      .set('desc', description);
    return this.http.post(`${this.host}/accounts/debit/${accountId}`, null, { params });
  }

  public credit(accountId: string, amount: number, description: string): Observable<any> {
    const params = new HttpParams()
      .set('amount', amount.toString())
      .set('desc', description);
    return this.http.post(`${this.host}/accounts/credit/${accountId}`, null, { params });
  }

  public transfer(accountSource: string, accountDestination: string, amount: number): Observable<any> {
    const data = { accountSource, accountDestination, amount };
    return this.http.post(`${this.host}/accounts/transfer`, data);
  }

  public newCurrentAccount(balance: number, overDraft: number, customerId: string): Observable<any> {
    const data = { initialBalance: balance, overDraft }; // Correspond à CurrentAccountRequest
    return this.http.post(`${this.host}/customers/${customerId}/current-accounts`, data);
  }

  public newSavingAccount(balance: number, interestRate: number, customerId: string): Observable<any> {
    const data = { initialBalance: balance, interestRate };
    return this.http.post(`${this.host}/customers/${customerId}/saving-accounts`, data);
  }

  getAccountsByCustomerId(customerId: number): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.host}/customers/${customerId}/accounts`);
  }
}
