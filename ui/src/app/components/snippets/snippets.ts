import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { SnippetService } from '../../services/snippet.service';
import { MatCardModule } from '@angular/material/card';
import { MatList, MatListItem } from '@angular/material/list';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-snippets',
  imports: [
    CommonModule,
    MatCardModule,
    MatList,
    MatListItem,
    MatButton,
    RouterLink,
  ],
  templateUrl: './snippets.html',
  styleUrl: './snippets.scss',
  standalone: true,
})
export class Snippets {
  #snippetService = inject(SnippetService);
  query = injectQuery(() => ({
    queryKey: ['snippets'],
    queryFn: () => this.#snippetService.getSnippets(),
  }));
}
