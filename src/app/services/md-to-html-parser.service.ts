import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MdToHtmlParserService {
  parsingRules : {[key:string]: RegExp} = {};

  addRules(rules: {[key:string]: RegExp}) {
    Object.keys(rules).forEach(key => {
      this.parsingRules[key] = rules[key]
    });
  }

  parsedWithRules(txt: string, rules: {[key:string]: RegExp}) : string {
    var parsedTxt: string = txt;

    Object.keys(rules).forEach(newStr => {
      var regex = rules[newStr];

      while (regex.test(parsedTxt)) {
        parsedTxt = parsedTxt.replace(regex, newStr);
      }
    });
    return parsedTxt;
  }

  parsed(txt : string) : string {
    return this.parsedWithRules(txt, this.parsingRules);
  }
}
