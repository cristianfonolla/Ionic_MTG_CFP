import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CategoryService } from './category.service'
import * as int from './interceptors/';
import * as svcs from './services/';

import {SectorFilterPipe} from './pipes/sector-filter.pipe';



import { DropdownDirective } from './directives/dropdown.directive';
import { MatchHeightDirective } from './directives/match-height.directive';

import { AppComponent } from './app.component';
import { ActionLineItemComponent } from './action-line-item/action-line-item.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SolutionsModeComponent } from './solutions-mode/solutions-mode.component';
import { RequestInnovationComponent } from './request-innovation/request-innovation.component';
import { IncompleteSearchCriteriaComponent } from './incomplete-search-criteria/incomplete-search-criteria.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { MessagingComponent } from './shared/messaging/messaging.component';
import { TechnologySearchComponent } from './technology-search/technology-search.component';
import { SectorSearchComponent } from './sector-search/sector-search.component';
import {FilterPipe} from './search-result/filter.pipe';
import {FooterComponent} from './footer/footer.component';
import {OrderByPipe} from './search-result/order-by.pipe';
import {SearchResultService} from './services/searchResult/search-result.service';
import {SearchResultComponent} from './search-result/search-result.component';
import { TechnologySearchService } from './technology-search.service';
import { IndustrialSectorSearchService } from './industrial-sector-search.service';
import { SearchResultDetailComponent } from './search-result/search-result-detail/search-result-detail.component';
import { DialogSearchResultComponent} from './dialog-search-result/dialog-search-result.component';
import { NewSolutionComponent } from './new-solution/new-solution.component';

@NgModule({
  declarations: [
    AppComponent,
    ActionLineItemComponent,
    CategoriesComponent,
    CategoryDetailComponent,
    HeaderComponent,
    LoginComponent,
    SolutionsModeComponent,
    RequestInnovationComponent,
    IncompleteSearchCriteriaComponent,
    BreadcrumbComponent,
    MessagingComponent,
    TechnologySearchComponent,
    SectorSearchComponent,
        SearchResultComponent,
        FooterComponent,
    DropdownDirective,
    MatchHeightDirective,
        SectorFilterPipe,
        OrderByPipe,
        FilterPipe,
        SearchResultDetailComponent,
        DialogSearchResultComponent,
        NewSolutionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: int.RequestInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: int.ResponseInterceptor,
      multi: true
    },
    svcs.AuthService,
    CategoryService,
    svcs.BreadcrumbService,
        svcs.MessagingService,
        SearchResultService,
    svcs.MessagingService,
    TechnologySearchService,
    IndustrialSectorSearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
