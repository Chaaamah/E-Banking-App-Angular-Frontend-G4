import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, throwError, tap } from 'rxjs'; // Ajoutez l'import de `tap`
import { Customer } from '../model/customer.model';
import { Account } from '../model/customer-accounts'; // Assurez-vous que cette interface est correcte
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
  customerId!: number;
  accounts$!: Observable<Account[]>; // Observable pour les comptes
  errorMessage!: string; // Message d'erreur

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    // Récupérez l'ID du client depuis les paramètres de route
    this.customerId = +this.route.snapshot.params['id'];

    // Chargez les comptes du client
    this.loadCustomerAccounts(this.customerId);
  }

  // Méthode pour charger les comptes du client
  loadCustomerAccounts(customerId: number): void {
    this.accounts$ = this.customerService.getAccountsByCustomer(customerId).pipe(
      tap(accounts => console.log('Accounts data:', accounts)), // Log des données
      catchError(err => {
        this.errorMessage = err.message; // Affichez l'erreur
        console.error('Failed to load accounts:', err); // Log de l'erreur
        return throwError(() => err); // Renvoyez l'erreur
      })
    );
  }
}
