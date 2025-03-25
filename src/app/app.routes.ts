import type { Routes } from "@angular/router"
import { DashboardComponent } from "./component/dashboard/dashboard.component"
import { LoginComponent } from "./auth/login/login.component"
import { RegisterComponent } from "./auth/register/register.component"
import { HomeComponent } from "./component/home/home.component"
import { PostListComponent } from "./component/dashboard/post/post-list/post-list.component"
import { PostFormComponent } from "./component/dashboard/post/post-form/post-form.component"

import { CategoryListComponent } from "./component/dashboard/category/category-list/category-list.component"
import { CategoryFormComponent } from "./component/dashboard/category/category-form/category-form.component"
import { ProfileLayoutComponent } from "./component/profile/profile-layout/profile-layout.component"
import { ProfileViewComponent } from "./component/profile/profile-view/profile-view.component"
import { ProfileEditComponent } from "./component/profile/profile-edit/profile-edit.component"
import { ProfileSecurityComponent } from "./component/profile/profil-security/profil-security.component"
import { PostsComponent } from "./component/posts/posts.component"
import { ExchangeComponent } from "./component/exchange/exchange.component"
import { ExchangesListComponent } from "./component/exchange/exchanges-list/exchanges-list.component"
import {authGuard} from "./guard/auth.guard";
import {adminGuard} from "./guard/admin.guard";
import {traderGuard} from "./guard/trader.guard";
import {StatsComponent} from "./component/dashboard/stats/stats.component";
import {ConversationsListComponent} from "./component/dashboard/conversations-list/conversations-list.component";
import {UsersListComponent} from "./component/dashboard/users-list/users-list.component";
import {EmptyComponent} from "./guard/dashboard-redirect-guard.guard";
import {PostDetailComponent} from "./component/dashboard/post/post-detail/post-detail.component";
import {PostSingleComponent} from "./component/post-detail/post-detail.component";
import {logoutGuard} from "./guard/logout.guard";

export const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      { path: "stats", component: StatsComponent, canActivate: [adminGuard] },
      { path: "conversations", component: ConversationsListComponent },
      { path: "users", component: UsersListComponent,canActivate: [adminGuard]  },
      { path: "posts", component: PostListComponent },
      { path: "posts/new", component: PostFormComponent ,canActivate: [traderGuard] },
      { path: "posts/edit/:id", component: PostFormComponent,canActivate: [traderGuard]  },
      { path: "posts/:id", component: PostDetailComponent },
      { path: "categories", component: CategoryListComponent, canActivate: [adminGuard] },
      { path: "categories/new", component: CategoryFormComponent, canActivate: [adminGuard] },
      { path: "categories/edit/:id", component: CategoryFormComponent, canActivate: [adminGuard] },

      { path: "", pathMatch: "full",component: EmptyComponent },
    ],
  },
  { path: "details/:id", component: PostDetailComponent },
  { path: "posts", component: PostsComponent },
  { path: "posts/:id", component: PostSingleComponent },
  { path: "exchanges", component: ExchangesListComponent },
  { path: "exchanges/:id", component: ExchangeComponent },
  { path: "exchanges/conversation/:id", component: ExchangeComponent },
  { path: "exchanges/post/:id", component: ExchangeComponent },
  { path: "exchanges/user/:receiverId", component: ExchangeComponent },
  { path: 'login', component: LoginComponent ,canActivate:[logoutGuard] },
  { path: "register", component: RegisterComponent , canActivate:[logoutGuard] },
  { path: "home", component: HomeComponent },
  { path: "", component: HomeComponent },

  {
    path: "profile",
    component: ProfileLayoutComponent,
    children: [
      { path: "", component: ProfileViewComponent },
      { path: "edit", component: ProfileEditComponent },
      { path: "security", component: ProfileSecurityComponent },
    ],
  },
]

