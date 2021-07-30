import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common'
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PanelComponent } from './page-assets/panel/panel.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ArticleComponent } from './page-assets/article/article.component';
import { ArtPageComponent } from './pages/art-page/art-page.component';
import { AboutMeComponent } from './pages/about-me/about-me.component';
import { BitmosefComponent } from './bitmosef/bitmosef.component';
import { CarouselComponent } from './page-assets/carousel/carousel.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { GamesPageComponent } from './pages/games-page/games-page.component';
import { AnimsPageComponent } from './pages/anims-page/anims-page.component';
import { MusicPageComponent } from './pages/music-page/music-page.component';
import { TextButtonComponent } from './page-assets/text-button/text-button.component';
import { QuickTipTabComponent } from './page-assets/quick-tips/quick-tip-tab/quick-tip-tab.component';
import { QuickTipLangComponent } from './page-assets/quick-tips/quick-tip-lang/quick-tip-lang.component';
import { FeaturedArticleComponent } from './page-assets/featured-article/featured-article.component';

import { FocusRemoverDirective } from './directives/focus-remover.directive';

@NgModule({
  declarations: [
    AppComponent,
    PanelComponent,
    HeaderComponent,
    FooterComponent,
    ArtPageComponent,
    AboutMeComponent,
    ArticleComponent,
    HomePageComponent,
    BitmosefComponent,
    CarouselComponent,
    GamesPageComponent,
    AnimsPageComponent,
    MusicPageComponent,
    TextButtonComponent,
    QuickTipTabComponent,
    QuickTipLangComponent,
    FocusRemoverDirective,
    FeaturedArticleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
