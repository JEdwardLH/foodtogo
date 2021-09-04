import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { NewtrackorderComponent } from './pages/newtrackorder/newtrackorder.component';
import { LoginComponent } from './pages/login/login.component';
const routes: Routes = [

{   path: '',
    component: CheckoutComponent,
},
{   path: ':id',
    component: CheckoutComponent,
},
{   path: 'login',
    component: RegisterComponent,
},
{   path: 'itrack-natin/:id',
    component: NewtrackorderComponent,
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', relativeLinkResolution: "legacy" })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
