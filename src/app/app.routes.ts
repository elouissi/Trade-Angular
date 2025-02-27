import { Routes } from '@angular/router';
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {StatsComponent} from "./component/stats/stats.component";
import {HomeComponent} from "./component/home/home.component";

export const routes: Routes = [
  {
    path: '',
    // canActivate :[adminGuard, authGuard],
    component: DashboardComponent,
    children: [
      { path: 'stats', component: StatsComponent },
      { path: '', redirectTo: 'stats', pathMatch: 'full' },
    ],
  },
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "home", component: HomeComponent},

];
