import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FeedComponent} from "./feeds/feed/feed.component";
import {ItemComponent} from "./feeds/item/item.component";
import {HackerNewsAPIService} from "./shared/services/hackernews-api.service";
import {SettingsService} from "./shared/services/settings.service";
import {CoreModule} from "./core/core.module";
import {SharedComponentsModule} from "./shared/components/shared-components.module";
import {PipesModule} from "./shared/pipes/pipes.module";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {InfiniteComponent} from './feeds/infinite/infinite.component';
import {PaginationDummyService} from "./shared/services/pagination-dummy.service";

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    ItemComponent,
    InfiniteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedComponentsModule,
    PipesModule,
    InfiniteScrollModule
  ],
  providers: [HackerNewsAPIService, SettingsService, PaginationDummyService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
