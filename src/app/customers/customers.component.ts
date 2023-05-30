import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CustomerService} from "../services/customer.service";
import {catchError, Observable, throwError} from "rxjs";
import {Customer} from "../model/customer.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers!: Observable<Array<Customer>>;
  errorMessage!: string;
  searchformGroup !: FormGroup;

  constructor(private customerService: CustomerService, private fb: FormBuilder, private router : Router) { // injecter dependance du CustomerService
  }

  ngOnInit() { // methode s'execute au départ
    this.searchformGroup = this.fb.group({
      keyword: this.fb.control("")
    });

    this.customers = this.customerService.getCustomers().pipe(catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
    // faire subscribe vers la methode getCustomers si un changement est fait l'appliquer, sinin retourner erreur
  }

  handleSearchCustomers() {
    let kw = this.searchformGroup?.value.keyword;
    this.customers = this.customerService.searchCustomers(kw).pipe(catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    )
  }

  handleDeleteCustomers(c: Customer) {
    this.customerService.deleteCustomer(c.id).subscribe({
      next: (data => {
        this.handleSearchCustomers()
      }),
      error: err => {
        console.log(err);
      }
    })
  }

  handleCustomerAccounts(c: Customer) {
    this.router.navigateByUrl("/customer-accounts/" + c.id, {state : c})

  }
}

