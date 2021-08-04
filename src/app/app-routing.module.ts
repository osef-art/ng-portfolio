import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArtPageComponent } from './pages/art-page/art-page.component';
import { AboutMeComponent } from './pages/about-me/about-me.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { GamePageComponent } from './pages/games-page/game-page/game-page.component';
import { AnimsPageComponent } from './pages/anims-page/anims-page.component';
import { GamesPageComponent } from './pages/games-page/games-page.component';
import { MusicPageComponent } from './pages/music-page/music-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

const routes: Routes = [
  { path: "", component: HomePageComponent },
  { path: "hi", component: AboutMeComponent },
  { path: "art", component: ArtPageComponent },
  { path: "home", component: HomePageComponent },
  { path: "anims", component: AnimsPageComponent },
  { path: "music", component: MusicPageComponent },
  { path: "games", component: GamesPageComponent },
  {
    path: "games/:id",
    component: GamePageComponent
  },
  { path: "**", component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
