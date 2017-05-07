// @ts-check

import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as firebase from 'firebase';

import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

declare const $: any;


@Component({
  selector: 'app-prosfora-details',
  templateUrl: './prosfora-details.component.html',
  styleUrls: ['./prosfora-details.component.css'],

  animations: [
    trigger('animateCard', [
        state('inactive', style({
          position : 'relative',
          // transform: 'scale(1)',
          'margin': '0px auto',
          'width' : '350px',
          'height' : '500px'
        })),
        state('active', style({
          'height': 'calc(100vh - 112px)',
          'width': '100%',
          'position': 'fixed',
          'background': 'rgba(55, 55, 55, 0.85)',
          'z-index': 2
          })),
          transition('inactive => active', animate('250ms ease-in')),
          transition('active => inactive', animate('250ms ease-out')),
    ]),

    trigger('animateImage', [
        state('inactive', style({
          width : '100%',
          'margin-left': '0px',
          'margin-top': '0px',
        })),
        state('active', style({
          width: '350px',
          'margin-top': '2%',
          'margin-left': '18%',
          'box-shadow': '0px 5px 15px #3b3b3b',
        })),
        transition('inactive => active', animate('300ms ease-in')),
        transition('active => inactive', animate('300ms ease-out')),
    ]),

    trigger('animatePrice', [
        state('inactive', style({
            // transform: 'scale(1)',
            width: '100%',
            'margin-top': '0px',
            'margin': '0px auto',
        })),
        state('active', style({
            background: 'white',
            width: '80%',
            margin: '0px auto',
            'margin-top': '-220px',
            'height': 'calc(100vh - 310px)',
            'box-shadow': '0px 10px 20px #3b3b3b',

        })),
        transition('inactive => active', animate('300ms ease-in')),
        transition('active => inactive', animate('300ms ease-out')),
    ]),

    trigger('animateDescription', [
        state('inactive', style({
            // transform: 'scale(1)',
            width: '100%',
            'text-align': '-webkit-center',
        })),
        state('active', style({
            // transform: 'scale(1.2)',
            'text-align': '-webkit-center',
            width: '80%'

        })),
        transition('inactive => active', animate('150ms ease-in')),
        transition('active => inactive', animate('150ms ease-in')),
    ]),

    trigger('animatePrice', [
        state('inactive', style({

        })),
        state('active', style({
          color : 'red'
        })),
        transition('inactive => active', animate('150ms ease-in')),
        transition('active => inactive', animate('150ms ease-in')),
    ]),


  ]

})
export class ProsforaDetailsComponent implements OnInit {

  isDarkTheme = false;

  // animations States
  card_state: string = 'inactive';
  image_state: string = 'inactive';
  title_state: string = 'inactive';
  description_state: string = 'inactive';
  price_state: string = 'inactive';



  loadComplete: boolean = false;

  id: any;
  prosfora: any;
  imageUrl: any;
  imageFile: any;

  title: any;
  price: any;
  smallDescription: any;
  bigDescription: any;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute
  ) { }


  animateMe() {
      this.card_state = (this.card_state === 'active' ? 'inactive' : 'active');
      this.image_state = (this.image_state === 'active' ? 'inactive' : 'active');
      this.title_state = (this.title_state === 'active' ? 'inactive' : 'active');
      this.description_state = (this.description_state === 'active' ? 'inactive' : 'active');
      this.price_state = (this.price_state === 'active' ? 'inactive' : 'active');
  }

  ngOnInit() {

    $('.dropify').dropify();

    // Get ID
    this.id = this.route.snapshot.params['id'];
    this.firebaseService.getProsforaDetails(this.id).subscribe(prosfora => {
      this.prosfora = prosfora;

      console.log(prosfora);

      // stop the preloader when data
      this.loadComplete = true;

      const storageRef = firebase.storage().ref();
      const spaceRef = storageRef.child(prosfora.path);

      // get the image from the database
      storageRef.child(prosfora.path).getDownloadURL().then((url) => {
        this.imageUrl = url;

        $( '.preloader-wrapper' ).hide();

        $( document ).ready(function() {
            $('.dropify').dropify();
        });


      }).catch((error) => {
        console.log(error);
      });
    });

  }

  getEditProsforaForm(v){
    console.log(v);
  }

  deleteProsfora() {
    this.firebaseService.deleteProsfora(this.id);
    this.router.navigate(['./prosfores']);
  }










}
