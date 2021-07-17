import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArtPageComponent } from './art-page/art-page.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AnimsPageComponent } from './anims-page/anims-page.component';
import { GamesPageComponent } from './games-page/games-page.component';
import { MusicPageComponent } from './music-page/music-page.component';

const routes: Routes = [
  { path: "hi", component: AboutMeComponent },
  { path: "art", component: ArtPageComponent },
  { path: "home", component: HomePageComponent },
  { path: "anims", component: AnimsPageComponent },
  { path: "music", component: MusicPageComponent },
  { path: "games", component: GamesPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
