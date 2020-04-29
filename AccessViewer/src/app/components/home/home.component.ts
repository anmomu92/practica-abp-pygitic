import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { CommunicationService } from '../../services/communication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  uploadForm: FormGroup;
  picLoaded = false;
  filePicName = 'Elige archivo';
  accessAllowed = false;

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

    // this.comm.cloudFunctions('pushPolygon', JSON.parse(this.uploadForm.get('polygonsFile').value)).subscribe(
    //   (res) => {},
    //   (err) => console.log(err)
    // );
    console.log(this.uploadForm.get('pictureFile').value);
    this.comm.checkAccessAllowed();


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