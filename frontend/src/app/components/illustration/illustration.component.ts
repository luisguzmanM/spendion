import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-illustration',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './illustration.component.html',
  styleUrls: ['./illustration.component.css']
})
export class IllustrationComponent {

  @Input() image   : string;
  @Input() title   : string;
  @Input() message : string;

}
