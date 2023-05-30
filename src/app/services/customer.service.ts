import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../model/customer.model";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  BackendHost : string = "http://localhost:8085";
  constructor(private http: HttpClient) {
  }

  public getCustomers(): Observable<Array<Customer>> { // methode pour recuperer tous les clients de type Observable
    return this.http.get<Array<Customer>>(this.BackendHost + "/customers")
  }

  public searchCustomers(keyword: string): Observable<Array<Customer>> { // chercher un client
    return this.http.get<Array<Customer>>(this.BackendHost + "/customers/search?keyword=" + keyword);

  }

  public saveCustomers(customer : Customer) : Observable<Customer>{ // enregistrer un nouveau client
    return this.http.post<Customer>(this.BackendHost + "/customers", customer);
  }

  public deleteCustomer(id : number){
    return this.http.delete(this.BackendHost + "/customers/" + id);
  }

}
