// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeTableComponent } from './components/employee-table/employee-table.component';

@NgModule({
  declarations: [
    // Si vous avez des composants non autonomes, ajoutez-les ici
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // Import pour Angular Material animations
    HttpClientModule,
    EmployeeTableComponent,   // Composant autonome inclus ici
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
