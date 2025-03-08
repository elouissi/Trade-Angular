import { Routes } from '@angular/router';
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {StatsComponent} from "./component/dashboard/stats/stats.component";
import {HomeComponent} from "./component/home/home.component";
import {PostListComponent} from "./component/dashboard/post/post-list/post-list.component";
import {PostFormComponent} from "./component/dashboard/post/post-form/post-form.component";
import {PostDetailComponent} from "./component/dashboard/post/post-detail/post-detail.component";
import {CategoryListComponent} from "./component/dashboard/category/category-list/category-list.component";
import {CategoryFormComponent} from "./component/dashboard/category/category-form/category-form.component";
import {ProfileLayoutComponent} from "./component/profile/profile-layout/profile-layout.component";
import {ProfileViewComponent} from "./component/profile/profile-view/profile-view.component";
import {ProfileEditComponent} from "./component/profile/profile-edit/profile-edit.component";
import {ProfileSecurityComponent} from "./component/profile/profil-security/profil-security.component";
import {PostsComponent} from "./component/posts/posts.component";
import {ExchangeComponent} from "./component/exchange/exchange.component";
import {ExchangesListComponent} from "./component/exchange/exchanges-list/exchanges-list.component";


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
      { path: "categories", component: CategoryListComponent },
      { path: "categories/new", component: CategoryFormComponent },
      { path: "categories/edit/:id", component: CategoryFormComponent },
      { path: '', redirectTo: 'stats', pathMatch: 'full' }
    ],
  },
  {path: 'details/:id', component: PostDetailComponent},
  { path: "posts", component: PostsComponent },
  { path: "posts/:id", component: PostDetailComponent },
  { path: "exchanges", component: ExchangesListComponent },
  { path: "exchanges/user/:receiverId", component: ExchangeComponent },
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "home", component: HomeComponent},
  { path: "", component: HomeComponent },

  {
    path: "profile",
    component: ProfileLayoutComponent,
    children: [
      { path: "", component: ProfileViewComponent },
      { path: "edit", component: ProfileEditComponent },
      { path: "security", component: ProfileSecurityComponent },
    ]
  },

];
