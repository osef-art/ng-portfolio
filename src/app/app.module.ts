import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common'
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PanelComponent } from './page-assets/panel/panel.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ArtPageComponent } from './pages/art-page/art-page.component';
import { AboutMeComponent } from './pages/about-me/about-me.component';
import { ArticleComponent } from './page-assets/article/article.component';
import { BitmosefComponent } from './bitmosef/bitmosef.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CarouselComponent } from './page-assets/carousel/carousel.component';
import { GameCardComponent } from './pages/games-page/game-card/game-card.component';
import { GamesPageComponent } from './pages/games-page/games-page.component';
import { AnimsPageComponent } from './pages/anims-page/anims-page.component';
import { MusicPageComponent } from './pages/music-page/music-page.component';
import { RandomTipComponent } from './page-assets/quick-tips/random-tip/random-tip.component';
import { TextButtonComponent } from './page-assets/text-button/text-button.component';
import { IconButtonComponent } from './page-assets/icon-button/icon-button.component';
import { QuickTipTabComponent } from './page-assets/quick-tips/quick-tip-tab/quick-tip-tab.component';
import { QuickTipLangComponent } from './page-assets/quick-tips/quick-tip-lang/quick-tip-lang.component';
import { FeaturedArticleComponent } from './page-assets/featured-article/featured-article.component';

import { FocusRemoverDirective } from './directives/focus-remover.directive';

@NgModule({
  declarations: [
    FeaturedArticleComponent,
    FocusRemoverDirective,
    QuickTipLangComponent,
    QuickTipTabComponent,
    TextButtonComponent,
    IconButtonComponent,
    MusicPageComponent,
    AnimsPageComponent,
    GamesPageComponent,
    RandomTipComponent,
    CarouselComponent,
    BitmosefComponent,
    GameCardComponent,
    HomePageComponent,
    ArticleComponent,
    AboutMeComponent,
    ArtPageComponent,
    FooterComponent,
    HeaderComponent,
    PanelComponent,
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
