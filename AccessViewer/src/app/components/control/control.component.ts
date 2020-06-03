import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { CommunicationService } from '../../services/communication.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {

  uploadForm: FormGroup;
  picLoaded = false;
  filePicName = 'Elige archivo';
  accessAllowed = -1;
  currentAccess = {
    usuario: '',
    confidence: 0,
    userLogs: []
  };

  // For testing purposes
  requestsNum = 0;
  totalMs = 0;

  constructor(private formBuilder: FormBuilder,
              private comm: CommunicationService) { }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      pictureFile: undefined
    });

    this.comm.getAccessAllowed().subscribe((value) => {
      this.accessAllowed = value;
    });
  }

  onSubmitPicture() {
    const data = {image: this.uploadForm.get('pictureFile').value};
    let t_i = new Date();
    this.comm.postAWS('rekog', data).subscribe((res: any) => {
      this.requestsNum += 1;
      let t_j = new Date();
      this.totalMs += t_j.getTime() - t_i.getTime();

      console.log(`Tiempo medio: ${this.totalMs / this.requestsNum} ms en ${this.requestsNum} peticiones`);

      this.currentAccess = res;
      // console.log(res);
      this.comm.checkAccessAllowed(res.confidence);
    });
  }

  onPictureSelect(event) {
    if (event.target.files.length > 0) {
        const fileReader = new FileReader();
        this.filePicName = event.target.files[0].name;
        fileReader.readAsDataURL(event.target.files[0]);
        fileReader.onload = () => {
            this.uploadForm.get('pictureFile').setValue(fileReader.result);
            this.picLoaded = true;
        };
        fileReader.onerror = (error) => {
            console.log(error);
            this.picLoaded = false;
        };
    }
  }
}