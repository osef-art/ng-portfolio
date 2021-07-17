import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ArticleComponent } from './article/article.component';
import { ArtPageComponent } from './art-page/art-page.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { BitmosefComponent } from './bitmosef/bitmosef.component';
import { QuickTipComponent } from './quick-tip/quick-tip.component';
import { HomePageComponent } from './home-page/home-page.component';
import { GamesPageComponent } from './games-page/games-page.component';
import { AnimsPageComponent } from './anims-page/anims-page.component';
import { MusicPageComponent } from './music-page/music-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ArtPageComponent,
    AboutMeComponent,
    ArticleComponent,
    BitmosefComponent,
    QuickTipComponent,
    HomePageComponent,
    GamesPageComponent,
    AnimsPageComponent,
    MusicPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
