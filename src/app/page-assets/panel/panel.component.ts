import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Kind } from 'src/models/models';

@Component({
  selector: 'panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  @Input() kind : Kind = Kind.NONE;
  @Input() title !: string;
  @Input() btnText !: string;
  @Input() content !: string;
  @Input() minWidth : number = 50;

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
    this.elRef.nativeElement.style.width = this.minWidth + "%";
    this.elRef.nativeElement.style.minWidth = this.minWidth + "%";
  }
}
