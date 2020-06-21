import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http'; // 导入客户端模块
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { HomeComponent } from './home/home.component';
import { ArticleListComponent } from './home/article-list/article-list.component';
import { ArticleNewlyIncreasedComponent } from './home/article-newly-increased/article-newly-increased.component';
import { WellcomeComponent } from './home/wellcome/wellcome.component';
import { StatusPipe } from './pipes/status.pipe';
import { TypeclassPipe } from './pipes/typeclass.pipe';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { EditorComponent } from './editor';
// @ts-ignore
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
// @ts-ignore
import setHours from 'date-fns/set_hours';
import { NameEditorComponent } from './name-editor/name-editor.component';
registerLocaleData(zh);

@NgModule({
  declarations: [
    EditorComponent,
    AppComponent,
    LoginComponent,
    HomeComponent,
    ArticleListComponent,
    ArticleNewlyIncreasedComponent,
    WellcomeComponent,
    StatusPipe,
    TypeclassPipe,
    NameEditorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    HttpClientJsonpModule,
    RouterModule,
    HttpModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent],
})
export class AppModule {

 
}
