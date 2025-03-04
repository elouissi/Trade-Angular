import { Routes } from '@angular/router';
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {StatsComponent} from "./component/dashboard/stats/stats.component";
import {HomeComponent} from "./component/home/home.component";
import {PostListComponent} from "./component/dashboard/post/post-list/post-list.component";
import {PostFormComponent} from "./component/dashboard/post/post-form/post-form.component";
import {PostDetailComponent} from "./component/dashboard/post/post-detail/post-detail.component";

export const routes: Routes = [
  {
    path: 'dashboard',
    // canActivate :[adminGuard, authGuard],
    component: DashboardComponent,
    children: [
      { path: 'stats', component: StatsComponent },
      { path: 'posts', component: PostListComponent },
      { path: 'posts/new', component: PostFormComponent },
      { path: 'posts/edit/:id', component: PostFormComponent },
      { path: "posts/:id", component: PostDetailComponent },
      { path: '', redirectTo: 'stats', pathMatch: 'full' }
    ],
  },
  {path: 'details', component: PostDetailComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "home", component: HomeComponent},

];
