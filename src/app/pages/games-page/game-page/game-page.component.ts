import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit {
  name !: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('id');
    if (name) this.name = name;
  }
}
