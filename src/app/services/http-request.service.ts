import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GithubRequestService {
  constructor (private http: HttpClient) { }

  getReadMeFrom(repo : string) {
    return this.http.get(
      'https://raw.githubusercontent.com/osef-art/' + repo + '/main/README.md',
      {responseType: 'text'}
    );
  }
}
