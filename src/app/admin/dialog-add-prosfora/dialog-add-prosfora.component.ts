import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from '@angular/material';

declare const $: any;

@Component({
  selector: 'app-dialog-add-prosfora',
  templateUrl: './dialog-add-prosfora.component.html',
  styleUrls: ['./dialog-add-prosfora.component.css']
})
export class DialogAddProsforaComponent implements OnInit {

  avatars = new Array(16).fill(0).map((_, i) => `svg-${i + 1 }`);
  selectedAvatar = this.avatars[0];

  constructor(public dialogRef: MdDialogRef<any>) { }

  ngOnInit() {
    // $('.dropify').dropify();

    $( document ).ready(function() {
        $('.dropify').dropify();
    });

  }

}
