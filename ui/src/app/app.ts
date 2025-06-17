import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { SnippetForm } from './components/snippet-form/snippet-form';

@Component({
  imports: [RouterModule, MatToolbar, MatButton],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  #dialog = inject(MatDialog);

  showAddSnippetDialog() {
    this.#dialog.open(SnippetForm);
  }
}
