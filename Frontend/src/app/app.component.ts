import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container text-center">
      <h3>4Developers Wrocław 2024</h3>
      <app-people></app-people>
    </div>
  `,
  styles: []
})
export class AppComponent {
  title = '4developers-presentation-frontend';
}
