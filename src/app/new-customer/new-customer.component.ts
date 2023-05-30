import {Component, OnInit} from '@angular/core';
import {Form, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../services/customer.service";

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {
  newCustomerFormGroup !: FormGroup;

  constructor(private fb: FormBuilder, private customerService : CustomerService) {
  }

  ngOnInit(): void {
    this.newCustomerFormGroup = this.fb.group({
      nom: this.fb.control(null, [Validators.required, Validators.minLength(4)]),
      email: this.fb.control(null, [Validators.email, Validators.required])
    })

  }

  handleSaveCustomer() {
    let customer = this.newCustomerFormGroup.value;
    this.customerService.saveCustomers(customer).subscribe( {
      next : data => {
        alert("client enregistrée avec succés!")

    },
      error : err => {
        console.log(err);
      }
    });
  }
}
