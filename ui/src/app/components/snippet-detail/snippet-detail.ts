import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { SnippetService } from '../../services/snippet.service';
import { ActivatedRoute } from '@angular/router';
import { injectQuery } from '@tanstack/angular-query-experimental';

@Component({
  selector: 'app-snippet-detail',
  imports: [CommonModule, MatCardModule],
  templateUrl: './snippet-detail.html',
  styleUrl: './snippet-detail.scss',
  standalone: true,
})
export class SnippetDetail {
  #route = inject(ActivatedRoute);
  #snippetService = inject(SnippetService);
  snippetId = this.#route.snapshot.paramMap.get('id');
  query = injectQuery(() => ({
    queryKey: ['snippet', this.snippetId],
    queryFn: () => this.#snippetService.getSnippetById(this.snippetId!),
  }));

  get snippet() {
    return this.query.data();
  }
}
