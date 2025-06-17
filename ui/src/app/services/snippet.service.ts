import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

export interface Snippet {
  id: string;
  text: string;
  summary: string;
}

@Injectable({
  providedIn: 'root',
})
export class SnippetService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getSnippets() {
    return lastValueFrom(this.http.get<Snippet[]>(`${this.baseUrl}/snippets`));
  }

  getSnippetById(snippetId: string) {
    return lastValueFrom(
      this.http.get<Snippet>(`${this.baseUrl}/snippets/${snippetId}`)
    );
  }

  createSnippet(text: string) {
    return lastValueFrom(
      this.http.post<any>(`${this.baseUrl}/snippets`, { text })
    );
  }
}
