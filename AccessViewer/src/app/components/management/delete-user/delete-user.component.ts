import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  userId = '';

  constructor() { }

  ngOnInit() {
  }

  changeId(value) {
    this.userId = value;
  }

  deleteUser() {
    if (this.userId !== '') {
      
    }
  }

}
