import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-header',
  templateUrl: './custom-header.component.html',
  styleUrls: ['./custom-header.component.scss'],
})
export class CustomHeaderComponent {

  @Input() backAction: () => void;
  @Input() backButton = false;
  @Input() defaultBackHref = '/home';
  @Input() title: string;
  @Input() subtitle: string;

  constructor() { }

}
