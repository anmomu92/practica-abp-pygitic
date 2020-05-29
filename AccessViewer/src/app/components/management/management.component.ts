import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'src/app/services/communication.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  userLogs = [];
  params = {
    limite: 10
  };

  constructor( private comm: CommunicationService ) {
    this.requestLogs();
  }

  ngOnInit() {
  }

  requestLogs() {
    this.comm.postAWS('logs', this.params).subscribe((res: any) => {
      this.userLogs = res.userLogs;
    });
  }

  changeParam( key, value ) {
    this.params[key] = Number(value);
    this.requestLogs();
  }

}
