import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SnippetService } from '../../services/snippet.service';
import {
  injectMutation,
  QueryClient,
} from '@tanstack/angular-query-experimental';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snippet-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './snippet-form.html',
  styleUrl: './snippet-form.scss',
  standalone: true,
})
export class SnippetForm {
  #snippetService = inject(SnippetService);
  #queryClient = inject(QueryClient);
  #fb = inject(FormBuilder);
  #dialogRef = inject(MatDialogRef<SnippetForm>);
  #snackBar = inject(MatSnackBar);

  form: FormGroup = this.#fb.group({
    text: ['', [Validators.required, Validators.minLength(10)]],
  });

  mutation = injectMutation(() => ({
    mutationFn: (text: string) => this.#snippetService.createSnippet(text),
    onSuccess: () => {
      this.form.reset();
      this.#queryClient.invalidateQueries();
      this.#dialogRef.close();
      this.#snackBar.open('Snippet added', 'Close', {});
    },
  }));

  submit(): void {
    if (this.form.valid) {
      this.mutation.mutate(this.form.value.text);
    }
  }
}
