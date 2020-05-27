import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { ControlComponent } from './components/control/control.component';
import { AboutComponent } from './components/about/about.component';
import { MapviewerComponent } from './components/mapviewer/mapviewer.component';
import { UploadUserImageComponent } from './components/control/upload-user-image/upload-user-image.component';

// locales Spanish
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { AccessLogComponent } from './components/control/access-log/access-log.component';
import { ManagementComponent } from './components/management/management.component';
registerLocaleData(localeEs, 'es-ES');

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ControlComponent,
    AboutComponent,
    MapviewerComponent,
    UploadUserImageComponent,
    AccessLogComponent,
    ManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
