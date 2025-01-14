import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Customer } from "../model/customer.model";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { AccountsService } from "../services/accounts.service";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import { Account, AccountDetails } from "../model/account.model";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  standalone: true,
  imports: [
    MatTable,
    MatCellDef,
    MatHeaderCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatPaginator,
    MatRowDef,
    MatRow,
    MatHeaderRowDef,
    NgClass
  ],
  styleUrls: ['./customer-accounts.component.css']
})
export class CustomerAccountsComponent implements OnInit {
  customerId!: string;
  customer!: Customer;
  accounts: any;
  displayedColumns: string[] = ['id', 'customer', 'type', 'creationDate', 'status', 'balance'];
  dataSource!: MatTableDataSource<Account>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private route: ActivatedRoute, private router: Router, private accountsService: AccountsService) {
  }

  ngOnInit(): void {
    this.accountsService.getAccounts().subscribe({
      next: data => {
        this.accounts = data;
        this.dataSource = new MatTableDataSource<Account>(this.accounts);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      },
      error: error => {
        console.log(error);
      }
    });
  }

  // Méthode pour obtenir la classe CSS en fonction du type de compte
  getTypeClass(type: string): string {
    if (type === 'CurrentAccount') {
      return 'type-current';
    } else if (type === 'SavingAccount') {
      return 'type-saving';
    }
    return '';
  }

  // Méthode pour obtenir la classe CSS en fonction du statut
  getStatusClass(status: string): string {
    if (status === 'created') {
      return 'status-created';
    }
    return '';
  }
}
