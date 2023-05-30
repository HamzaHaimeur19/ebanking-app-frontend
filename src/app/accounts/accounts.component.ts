import {Component, OnInit} from '@angular/core';
import {Form, FormBuilder, FormGroup} from "@angular/forms";
import {AccountsService} from "../services/accounts.service";
import {Observable} from "rxjs";
import {AccountDetails} from "../model/acount.model";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  accountFormGroup !: FormGroup;
  currentPage: number = 0; // initalize la premiere page avec 0
  pageSize: number = 5; // taille de page est 5

  accounts!: Observable<AccountDetails>
  operationFormGroup !: FormGroup


  constructor(private fb: FormBuilder, private accountservice: AccountsService) {
  }

  ngOnInit(): void {
    this.accountFormGroup = this.fb.group({
      accountId: this.fb.control('')
    });
    this.operationFormGroup = this.fb.group({
      operationType: this.fb.control(null),
      amount: this.fb.control(null),
      description: this.fb.control(''),
      accountDestination: this.fb.control(null)
    })
  }


  handleSearchAccount() {
    let accountId: string = this.accountFormGroup.value.accountId;
    this.accounts = this.accountservice.searchAccount(accountId, this.currentPage, this.pageSize);
    console.log(this.currentPage);
    this.accounts.subscribe(data => {
      console.log(JSON.stringify(data));
    });
    console.log("next page");
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.handleSearchAccount();
    console.log("page changed !");
  }

  handleAccountOperation() {
    let accountId: string = this.accountFormGroup.value.accountId;
    let operationType = this.operationFormGroup.value.operationType;
    let amount = this.operationFormGroup.value.amount;
    let description = this.operationFormGroup.value.description;
    let accountDestination = this.operationFormGroup.value.accountDestination;

    if (operationType == 'DEBIT') {
      this.accountservice.debit(accountId, amount, description).subscribe({
        next: (data => {
          alert("debit effectué avec succés!")
          this.operationFormGroup.reset();
          this.handleSearchAccount()
        }),
        error : (err => {
          alert("solde insuffisant!")
        })
      })

    } else if (operationType == 'CREDIT') {
      this.accountservice.credit(accountId, amount, description).subscribe({
        next: (data => {
          alert("credit effectué avec succés!")
          this.operationFormGroup.reset();
          this.handleSearchAccount()
        }),
        error : (err => {
          console.log(err)
        })
      })

    } else if (operationType == 'TRANSFER') {
      this.accountservice.transferer(accountDestination, accountId, amount).subscribe({
        next: (data => {
          alert("transfer vers" + accountDestination + " effectué avec succés!")
          this.operationFormGroup.reset();
          this.handleSearchAccount()
        }),
        error : (err => {
          alert("solde insuffisant!")
        })
      })
    }
  }

  //méthode pour choisir la valeur de radio 'TRANSFER' et afficher le champ de input
  operationTypeFunction() {
    return this.operationFormGroup.value.operationType == 'TRANSFER';
  }
}
