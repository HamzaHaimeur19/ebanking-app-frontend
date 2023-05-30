import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../model/customer.model';
import { CustomerService } from '../services/customer.service';
import { AccountsService } from '../services/accounts.service';
import { Observable } from 'rxjs';
import { AccountDetails } from "../model/acount.model";
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  styleUrls: ['./customer-accounts.component.css']
})
export class CustomerAccountsComponent implements OnInit {
  customerId!: string;
  customer: Customer;
  bankAccounts!: AccountDetails[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountsService,
  ) {
    this.customer = this.router.getCurrentNavigation()?.extras.state as Customer;
  }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];
    this.accountService.listeComptes(this.customerId).subscribe(
      (bankAccounts: AccountDetails[]) => {
        this.bankAccounts = bankAccounts;
        console.log(this.bankAccounts);
      },
      error => {
        console.log(error);
      }
    );
  }
}
