import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
//importar
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
//locale lenguaje date
import {registerLocaleData} from '@angular/common';
import localeES from '@angular/common/locales/es';

import {AppComponent} from './app.component';
import {EntidadComponent} from './components/entidad/entidad.component';
import {FormentidadComponent} from './components/entidad/formentidad.component';
import {PaginatorComponent} from './components/paginator/paginator.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './components/usuarios/login.component';
import {TokenInterceptor} from '../app/components/usuarios/interceptors/token.interceptor';
import {AuthInterceptor} from '../app/components/usuarios/interceptors/auth.interceptor';
import {FacturasComponent} from './components/facturas/facturas.component';
import {DetallefacturaComponent} from './components/facturas/detallefactura.component';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import { ComboComponent } from './components/combo/combo.component';
//regiter locale
registerLocaleData(localeES, 'es');

@NgModule({
  declarations: [
    AppComponent,
    EntidadComponent,
    FormentidadComponent,
    PaginatorComponent,
    LoginComponent,
    FacturasComponent,
    DetallefacturaComponent,
    ComboComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatMomentDateModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  , {provide: LOCALE_ID, useValue: 'es'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
