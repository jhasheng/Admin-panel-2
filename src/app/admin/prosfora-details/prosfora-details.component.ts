import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as firebase from 'firebase';

import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';

declare const $: any;
 

@Component({
  selector: 'app-prosfora-details',
  templateUrl: './prosfora-details.component.html',
  styleUrls: ['./prosfora-details.component.css'],

  animations: [
    trigger('animateFrontLayer', [
        state('inactive', style({
          position : 'relative',
          // transform: 'scale(1)',
          'margin': '0px auto',
          
          width : '33%',
          // height : '500px'
        })),
        state('active', style({
          'position': 'fixed',
          'height': 'calc(100vh - 112px)',
          'width': '100%',
          background: 'purple',
          'z-index': 2
          })),
          transition('inactive => active', animate('10000ms ease-in')),
          transition('active => inactive', animate('10000ms ease-out')),
    ]),

    trigger('animateImage', [
        state('inactive', style({
          width : '100%',
          'margin-left': '0px',
          'margin-top': '0px',
        })),
        state('active', style({
          width: '350px',
          'margin-top': '80px',
          'margin-left': '250px',
          'box-shadow': '0px 5px 15px #3b3b3b',
        })),
        transition('inactive => active', animate('10000ms ease-in')),
        transition('active => inactive', animate('10000ms ease-out')),
    ]),

    trigger('animateFooter', [
        state('inactive', style({
            // transform: 'scale(1)',
            width: '100%',
            'margin-top': '0px',
        })),
        state('active', style({
            background: 'white',
            width: '80%',
            margin: '0px auto',
            'margin-top': '-220px',
            'height': 'calc(100vh - 310px)',
            'box-shadow': '0px 10px 20px #3b3b3b',

        })),
        transition('inactive => active', animate('10000ms ease-in')),
        transition('active => inactive', animate('10000ms ease-out')),
    ]),

    trigger('botAnimation', [
        state('inactive', style({
            // transform: 'scale(1)',

        })),
        state('active', style({
            // transform: 'scale(1.2)',
            background: 'yellow'

        })),
        transition('inactive => active', animate('150ms ease-in')),
        transition('active => inactive', animate('150ms ease-in')),
    ]),
  ]

})
export class ProsforaDetailsComponent implements OnInit {

  isDarkTheme = false;

  // animations part
  state: string = 'inactive';
  state2: string = 'inactive';
  state3: string = 'inactive';
  state4: string = 'inactive';
  state5: string = 'inactive';
  state6: string = 'inactive';
  // animations part



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
      this.state = (this.state === 'active' ? 'inactive' : 'active');
      this.state2 = (this.state2 === 'active' ? 'inactive' : 'active');
      this.state3 = (this.state3 === 'active' ? 'inactive' : 'active');

      
  }


  animateMe2() {
      

      this.state4 = (this.state4 === 'active' ? 'inactive' : 'active');
      this.state5 = (this.state5 === 'active' ? 'inactive' : 'active');
      this.state6 = (this.state6 === 'active' ? 'inactive' : 'active');
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
