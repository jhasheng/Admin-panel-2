import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from '@angular/material';


@Component({
  selector: 'app-dialoge-delete-prosfora',
  templateUrl: './dialoge-delete-prosfora.component.html',
  styleUrls: ['./dialoge-delete-prosfora.component.css']
})
export class DialogeDeleteProsforaComponent implements OnInit {

  someValue: any;
  someMessage: any;
  selectedProsfores: any;

  constructor(public dialogRef: MdDialogRef<any>) { }

  ngOnInit() {
  }

}
