import { Routes } from '@angular/router';
// import { MainComponent } from './main/main.component';
import { TotemComponent } from './totem/totem.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { TelaInicialComponent } from './tela-inicial/tela-inicial.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { LoginComponent } from './login/login.component';
import { TelaClienteComponent } from './tela-cliente/tela-cliente.component';
import { TelaAdmComponent } from './tela-adm/tela-adm.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProntosComponent } from './prontos/prontos.component';
import { ProntosClienteComponent } from './prontoscliente/prontoscliente.component';

export const routes: Routes = [
  // {
  //   path: '',
  //   component: MainComponent,
  // },
  {
    path: 'totem',
    component: TotemComponent,
  },
  {
    path: 'totem/carrinho',
    component: CarrinhoComponent,
  },
  {
    path: '',
    component: TelaInicialComponent,
  },
  {
    path: 'pedidos',
    component: PedidosComponent,
  },
  {
    path: 'prontos',
    component: ProntosComponent,
  },
  {
    path: 'prontoscliente',
    component: ProntosClienteComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'telacliente',
    component: TelaClienteComponent
  },
  {
    path: 'telaadm',
    component: TelaAdmComponent
  },
  {
    path: 'telaadm/dashboard',
    component: DashboardComponent
  },
  // { path: '**', component: NotFoundComponent}
];
