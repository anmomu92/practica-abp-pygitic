import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { CommunicationService } from '../../../services/communication.service';

@Component({
  selector: 'app-upload-user-image',
  templateUrl: './upload-user-image.component.html',
  styleUrls: ['./upload-user-image.component.css']
})
export class UploadUserImageComponent implements OnInit {

  uploadForm: FormGroup;
  picLoaded = false;
  filePicName = 'Elige archivo';

  newImageBody = {
    image: '',
    userId: ''
  };

  constructor(private formBuilder: FormBuilder,
              private comm: CommunicationService) { }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      pictureFile: undefined
    });
  }

  onSubmitPicture() {
    this.comm.postAWS('picture', this.newImageBody).subscribe((res) => {
      console.log(res);
    });
  }

  onPictureSelect(event) {
    if (event.target.files.length > 0) {
        const fileReader = new FileReader();
        this.filePicName = event.target.files[0].name;
        fileReader.readAsDataURL(event.target.files[0]);
        fileReader.onload = () => {
            this.uploadForm.get('pictureFile').setValue(fileReader.result);
            this.newImageBody['image'] = this.uploadForm.get('pictureFile').value;
            this.picLoaded = true;
        };
        fileReader.onerror = (error) => {
            console.log(error);
            this.picLoaded = false;
        };
    }
  }

  onNameChange(event) {
    this.newImageBody.userId = event.target.value;
  }
}
