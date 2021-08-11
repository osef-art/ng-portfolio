import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Kind, TranslatableText } from 'src/models/models';

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
  @Input() link !: string;
  @Input() minWidth : number = 50;

  transTitle !: TranslatableText;

  constructor(private elRef: ElementRef) {}

  ngOnInit() {
    this.elRef.nativeElement.style.width = this.minWidth + "%";
    this.elRef.nativeElement.style.minWidth = this.minWidth + "%";

    this.transTitle = new TranslatableText(...this.title.split('|'));
  }

  get titleTxt() : string {
    return this.transTitle.translated();
  }
}
