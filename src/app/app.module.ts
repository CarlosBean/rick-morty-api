import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { SearchBarComponent } from './core/components/search-bar/search-bar.component';

@NgModule({ declarations: [AppComponent, NavbarComponent, SearchBarComponent],
    bootstrap: [AppComponent], imports: [BrowserModule, AppRoutingModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {}
