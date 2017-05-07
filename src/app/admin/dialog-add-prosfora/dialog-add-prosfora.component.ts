import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { FirebaseService } from '../../services/firebase.service';

declare const $: any;

@Component({
  selector: 'app-dialog-add-prosfora',
  templateUrl: './dialog-add-prosfora.component.html',
  styleUrls: ['./dialog-add-prosfora.component.css']
})
export class DialogAddProsforaComponent implements OnInit {

  image: any;
  modalRef: any;

  avatars = new Array(16).fill(0).map((_, i) => `svg-${i + 1 }`);
  selectedAvatar = this.avatars[0];

  constructor(
    public dialogRef: MdDialogRef<any>,
    private firebaseService: FirebaseService
  ) { }

  ngOnInit() { 
    // $('.dropify').dropify();

    $( document ).ready(function() {
        $('.dropify').dropify();
    });

  }



  fileChange(e) {
    this.image = e.target.value;
    // this.firebaseService.prosforaUploadImg = e.target.value;
    // this.firebaseService.prosforaUploadImg = e.srcElement;
    // console.log(this.image);
    // console.log(e.srcElement);
    // console.log(e.target.name);

    for (let selectedFile of [(<HTMLInputElement>document.getElementById('imgForNewProsfora')).files[0]]){
      let path = `/prosfores-images/${selectedFile.name}`;
      console.log(selectedFile);

      this.firebaseService.prosforaUploadImg = selectedFile;
    }
  }


}
