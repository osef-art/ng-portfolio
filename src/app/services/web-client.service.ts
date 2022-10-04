import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kind } from 'src/models/models';
import { Client } from '@notionhq/client';
import { env } from 'process';

@Injectable({ providedIn: 'root'})
export class WebClientService {
  private notionCli = new Client({ auth: env.NOTION_API_KEY });
  private databaseIds : { [key in Kind]: string } = {
    [Kind.NONE] : "todo-e940e8bfbfc64091b60f3401d7dd39c4",
    [Kind.ART] : "5602cc8eacb94834b1066a353a591b55",
    [Kind.GAMES] : "",
    [Kind.ANIMS] : "",
    [Kind.MUSIC] : "",
  }

  constructor (private client: HttpClient) { }

  getGithubReadMeFrom(repo : string) {
    return this.client.get(
      'https://raw.githubusercontent.com/osef-art/' + repo + '/main/README.md',
      {responseType: 'text'}
    );
  }

  async getNotionDatabase(kind: Kind) {
    let response = await this.notionCli.databases.retrieve({ "database_id" : this.databaseIds[kind]});
    console.log(response);

    // return this.client.get(
    //   'https://api.notion.com/v1/databases/' + this.databaseIds[kind] ,
    //   {responseType: 'text'}
    // );
  }
}
