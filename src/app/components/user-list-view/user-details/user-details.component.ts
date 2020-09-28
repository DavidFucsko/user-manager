import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.sass']
})
export class UserDetailsComponent implements OnInit {

  @Input()
  userData: { name: string, id: number };

  constructor() { }

  ngOnInit(): void {
  }

}
