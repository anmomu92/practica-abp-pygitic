import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-access-log',
  templateUrl: './access-log.component.html',
  styleUrls: ['./access-log.component.css']
})
export class AccessLogComponent implements OnInit {

  @Input() accessLogs;

  constructor() {}

  ngOnInit() {
  }

}
