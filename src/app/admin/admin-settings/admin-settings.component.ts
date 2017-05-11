import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.css']
})
export class AdminSettingsComponent implements OnInit {

  isDarkTheme: Boolean = false;

  userForm: FormGroup;
  userData: any;

  firstName: string;
  lastName: string;
  email: string;
  address: any;
  addressNumber: any;
  tk: string;
  stathero: number;
  kinito: number;

  constructor(private formB: FormBuilder) { 

    this.userForm = formB.group({
      'firstName': [null, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(50)])],
      'lastName': [null, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(50)])],
      'email': [null, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(50)])],
      'address': [null, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(50)])],
      'addressNumber': [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(10)])],
      'tk': [null, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(15)])],
      'stathero': [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(15)])],
      'kinito': [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(15)])],
    });
  }

  addUserData(data) {
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.address = data.address;
    this.addressNumber = data.addressNumber;
    this.tk = data.tk;
    this.stathero = data.stathero;
    this.kinito = data.kinito;

    console.log(data);
  }

  ngOnInit() {
  }

}
