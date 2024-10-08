import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { HOME_ROUTES } from './home.routing';
import { SigninComponent } from './login/signin/signin.component';
import { HomeComponent } from './page/home.component';
import { RippleModule } from 'primeng/ripple';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [HomeComponent, SigninComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(HOME_ROUTES),
    FormsModule,
    ReactiveFormsModule,

    CardModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    SharedModule,
  ],
})
export class HomeModule {}
