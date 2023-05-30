import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AccountDetails} from "../model/acount.model";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  BackendHost: string = "http://localhost:8085";

  constructor(private http: HttpClient) {

  }

  public searchAccount(accountId: string, page: number, size: number): Observable<AccountDetails> {
    return this.http.get<AccountDetails>(`${this.BackendHost}/account/${accountId}/pageOperations?page=${page}&size=${size}`);
  }

  public debit(accountId: string, amount: number, description: string) {
    let data = {accountId: accountId, amount: amount, description: description}
    return this.http.post(this.BackendHost + "/account/debit", data);
  }

  public credit(accountId: string, amount: number, description: string) {
    let data = {accountId: accountId, amount: amount, description: description}
    return this.http.post(this.BackendHost + "/account/credit", data);
  }

  public transferer(accountSource: string, accountDestination: string, amount: number) {
    let data = {accountSource, accountDestination, amount}
    return this.http.post(this.BackendHost + "/account/transferer", data);
  }

  //retourner liste des comptes dun customer
  public listeComptes(customerId: string): Observable<AccountDetails[]> {
    return this.http.get<AccountDetails[]>(`${this.BackendHost}/account/bankAccounts/${customerId}`);
  }
}
