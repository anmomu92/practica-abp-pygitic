import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../../../services/communication.service';

@Component({
  selector: 'app-access-log',
  templateUrl: './access-log.component.html',
  styleUrls: ['./access-log.component.css']
})
export class AccessLogComponent implements OnInit {

  accessLogs = [];

  constructor( private comm: CommunicationService ) {
    this.comm.postAWS('accessLogs').subscribe((res: any) => {
      this.accessLogs = res;
      console.log(res);
    });
  }

  ngOnInit() {
  }

}
