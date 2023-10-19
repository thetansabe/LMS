import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavComponent } from './shared/components/navbar/nav.component';
import { HomepageComponent } from './modules/home/homepage.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompletedVideoIconPipe } from './shared/pipe/completed-video-icon.pipe';
import { CourseMainViewComponent } from '@modules/courses/main-view/course-main-view.component';

@NgModule({
  declarations: [
    AppComponent,
    CompletedVideoIconPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HomepageComponent,
    IonicModule.forRoot(),
    StoreModule.forRoot({}, {}),
    FooterComponent,
    NavComponent,
    CourseMainViewComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
