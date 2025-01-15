import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccountsComponent} from "./accounts/accounts.component";
import {CustomersComponent} from "./customers/customers.component";
import {NewCustomerComponent} from "./new-customer/new-customer.component";
import {EditCustomerComponent} from "./edit-customer/edit-customer.component";
import {LoginComponent} from "./login/login.component";
import {AuthenticationGuard} from "./guards/authentication.guard";
import {AuthorizationGuard} from './guards/authorization.guard';
import {HomeComponent} from "./home/home.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProfilComponent} from "./profil/profil.component";
import {NotAuthorizedComponent} from "./not-authorized/not-authorized.component";
import {TemplateComponent} from "./template/template.component";
import {CustomerAccountsComponent} from "./customer-accounts/customer-accounts.component";
import {ChatbotComponent} from "./chatbot/chatbot.component";
import {NewAccountComponent} from "./new-account/new-account.component";
import {AccountListComponent} from "./account-list/account-list.component";

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {
    path: "admin",
    component: TemplateComponent,
    canActivate: [AuthenticationGuard, AuthorizationGuard],
    children: [
      {path: "accounts", component: AccountsComponent},
      {path: "account/:id", component: AccountsComponent},
      {path: "accountsList", component: CustomerAccountsComponent},
      {path: "profile", component: ProfilComponent},
      {path: "dashboard", component: DashboardComponent},
      {path: "customers", component: CustomersComponent},
      {path: "new-customer", component: NewCustomerComponent},
      {path: "edit-customer/:id", component: EditCustomerComponent},
      {path: "chatbot", component: ChatbotComponent},
      {path: "new-account", component: NewAccountComponent},
      {path: "customer-accounts/:id", component: AccountListComponent},
      {path: "home", component: HomeComponent},
    ]
  },
  {
    path: "user",
    component: TemplateComponent,
    children: [
      {path: "home", component: HomeComponent},
      {path: "profile", component: ProfilComponent},
      {path: 'not-authorized', component: NotAuthorizedComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
