import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common'
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FocusRemoverDirective } from './directives/focus-remover.directive';

import { AppComponent } from './app.component';
import { PanelComponent } from './page-assets/panel/panel.component';
import { HeaderComponent } from './page-assets/header/header.component';
import { FooterComponent } from './page-assets/footer/footer.component';
import { ArtPageComponent } from './pages/art-page/art-page.component';
import { AboutMeComponent } from './pages/about-me/about-me.component';
import { ArticleComponent } from './page-assets/article/article.component';
import { BitmosefComponent } from './page-assets/bitmosef/bitmosef.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { GameCardComponent } from './page-assets/game-card/game-card.component';
import { GamePageComponent } from './pages/games-page/game-page/game-page.component';
import { GamesPageComponent } from './pages/games-page/games-page.component';
import { AnimsPageComponent } from './pages/anims-page/anims-page.component';
import { MusicPageComponent } from './pages/music-page/music-page.component';
import { RandomTipComponent } from './page-assets/quick-tips/random-tip/random-tip.component';
import { TextButtonComponent } from './page-assets/text-button/text-button.component';
import { IconButtonComponent } from './page-assets/icon-button/icon-button.component';
import { ImgCarouselComponent } from './page-assets/img-carousel/img-carousel.component';
import { QuickTipTabComponent } from './page-assets/quick-tips/quick-tip-tab/quick-tip-tab.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { QuickTipLangComponent } from './page-assets/quick-tips/quick-tip-lang/quick-tip-lang.component';
import { FeaturedArticleComponent } from './page-assets/featured-article/featured-article.component';
import { CustomParserService } from './services/custom-parser.service';

@NgModule({
  declarations: [
    FeaturedArticleComponent,
    FocusRemoverDirective,
    QuickTipLangComponent,
    NotFoundPageComponent,
    QuickTipTabComponent,
    ImgCarouselComponent,
    TextButtonComponent,
    IconButtonComponent,
    MusicPageComponent,
    AnimsPageComponent,
    GamesPageComponent,
    RandomTipComponent,
    BitmosefComponent,
    GameCardComponent,
    GamePageComponent,
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
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
