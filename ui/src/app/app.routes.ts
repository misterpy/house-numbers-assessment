import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'snippets',
      },
      {
        path: 'snippets',
        loadComponent: () =>
          import('./components/snippets/snippets').then((m) => m.Snippets),
      },
    ],
  },
];
