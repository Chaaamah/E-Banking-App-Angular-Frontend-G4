import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Customer } from "../model/customer.model";
import { throwError } from "rxjs";
import { AccountsService } from "../services/accounts.service";
import Swal from "sweetalert2";
import { CustomerService } from "../services/customer.service";
import { NgForOf, NgIf } from "@angular/common";

@Component({
  selector: 'app-new-account',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent implements OnInit {
  errorMessage!: string;
  newAccountFormGroup!: FormGroup;
  customers: Customer[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountsService,
    private customerService: CustomerService,
    private routerNav: Router
  ) {}

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe(customers => {
      this.customers = customers;

      this.newAccountFormGroup = this.fb.group({
        type: [null, Validators.required],
        balance: [0, [Validators.required, Validators.min(100)]],
        overDraft: [0, [Validators.required, Validators.min(0)]],
        interestRate: [0, [Validators.required, Validators.min(0.01)]],
        customer: [null, Validators.required]
      });
    });
  }

  handleSaveNewAccount() {
    let curAccount: any = this.newAccountFormGroup.value;
    const customerId = curAccount.customer;

    if (curAccount.type == 'CurrentAccount') {
      this.accountService.newCurrentAccount(
        curAccount.balance, // balance
        curAccount.overDraft, // overDraft
        customerId // customerId
      ).subscribe({
        next: data => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `A new current bank account has been added to customer ID: ${customerId}`,
            showConfirmButton: false,
            timer: 1500
          });
          this.newAccountFormGroup.reset();
          this.routerNav.navigate(['/admin/accountsList']);
        },
        error: err => {
          this.errorMessage = err.message;
          return throwError(err);
        }
      });
    } else if (curAccount.type == 'SavingAccount') {
      this.accountService.newSavingAccount(
        curAccount.balance,
        curAccount.interestRate,
        customerId
      ).subscribe({
        next: data => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `A new saving bank account has been added to customer ID: ${customerId}`,
            showConfirmButton: false,
            timer: 1500
          });
          this.newAccountFormGroup.reset();
          this.routerNav.navigate(['/admin/accountsList']);
        },
        error: err => {
          this.errorMessage = err.message;
          return throwError(err);
        }
      });
    }
  }

  goBack() {
    this.routerNav.navigate(['/admin/accountsList']);
  }
}
