import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActivityformComponent } from './components/activityform.component';
import { ActivitylistComponent } from './components/activitylist.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ResponseStorage } from './components/resp.storage.service';
import { FilterComponent } from './components/filter.component';

@NgModule({
  declarations: [
    AppComponent,
    ActivityformComponent,
    ActivitylistComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [ResponseStorage],
  bootstrap: [AppComponent]
})
export class AppModule { }
