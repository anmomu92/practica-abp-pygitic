import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../../../services/communication.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  userId = '';
  deleteAction = false;
  deletedUser = '';

  constructor( private comm: CommunicationService ) { }

  ngOnInit() {
  }

  changeId(value) {
    this.deleteAction = false;
    this.userId = value;
  }

  deleteUser() {
    this.deletedUser = '';
    this.comm.postAWS('rmv', {name: this.userId}).subscribe((res: any) => {
      this.deleteAction = true;
      this.deletedUser = res ? res.name : '';
    });
  }

}
