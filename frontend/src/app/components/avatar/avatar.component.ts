import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css'],
  standalone: true,
  imports: [
    CommonModule,
  ]
})
export class AvatarComponent {

  @Input() avatar: string;
  default: string = 'https://ionicframework.com/docs/img/demos/avatar.svg';

  constructor(){}

}
