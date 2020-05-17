import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ControlComponent } from './components/control/control.component';
import { AboutComponent } from './components/about/about.component';
import { UploadUserImageComponent } from './components/control/upload-user-image/upload-user-image.component';
import { AccessLogComponent } from './components/control/access-log/access-log.component';

const routes: Routes = [
  { path: 'control', component: ControlComponent },
  { path: 'accessLogs', component: AccessLogComponent },
  { path: 'control/newImage', component: UploadUserImageComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '/control' }
];

  //{ path: 'path/:routeParam', component: MyComponent },
  //{ path: 'staticPath', component: ... },
  //{ path: '**', component: ... },
  //{ path: 'oldPath', redirectTo: '/staticPath' },
  //{ path: ..., component: ..., data: { message: 'Custom' }

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }