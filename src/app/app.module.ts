import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common'
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PanelComponent } from './assets/panel/panel.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ArticleComponent } from './assets/article/article.component';
import { ArtPageComponent } from './pages/art-page/art-page.component';
import { AboutMeComponent } from './pages/about-me/about-me.component';
import { BitmosefComponent } from './bitmosef/bitmosef.component';
import { CarouselComponent } from './assets/carousel/carousel.component';
import { QuickTipComponent } from './assets/quick-tip/quick-tip.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { GamesPageComponent } from './pages/games-page/games-page.component';
import { AnimsPageComponent } from './pages/anims-page/anims-page.component';
import { MusicPageComponent } from './pages/music-page/music-page.component';
import { TextButtonComponent } from './assets/text-button/text-button.component';

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
    QuickTipComponent,
    BitmosefComponent,
    CarouselComponent,
    GamesPageComponent,
    AnimsPageComponent,
    MusicPageComponent,
    TextButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
