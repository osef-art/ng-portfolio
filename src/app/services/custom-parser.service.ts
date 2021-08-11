import { Injectable } from '@angular/core';
import { TranslatableText } from 'src/models/models';

@Injectable({
  providedIn: 'root',
})
export class CustomParserService {
  private parsingRules : {[key:string]: RegExp} = {};

  setRules(rules: {[key:string]: RegExp}) {
    Object.keys(rules).forEach(key =>
      this.parsingRules[key] = rules[key]
    );
  }

  parsed(txt: string | TranslatableText) : string;
  parsed(txt: string | TranslatableText, rules : {[key:string]: RegExp}) : string;
  parsed(txt: string | TranslatableText, rules ?: {[key:string]: RegExp}) : string {
    var parsedTxt: string = (typeof txt === 'string') ? txt : txt.translated();
    var parsingRules : {[key:string]: RegExp} = rules ? rules : this.parsingRules;

    Object.keys(parsingRules).forEach(newStr => {
      var regex = parsingRules[newStr];

      while (regex.test(parsedTxt)) {
        parsedTxt = parsedTxt.replace(regex, newStr);
      }
    });
    return parsedTxt;
  }
}
