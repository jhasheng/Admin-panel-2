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
    trigger('myAwesomeAnimation', [
        state('inactive', style({
            // transform: 'scale(1)',
        })),
        state('active', style({
            // transform: 'scale(1.2)',
            position: 'absolute',
            width: '800px',
            height: '800px',
            // top: '0px',
            // left: '0px'
        })),
        transition('inactive => active', animate('150ms ease-in')),
        transition('active => inactive', animate('150ms ease-in')),
    ]),

    trigger('topAnimation', [
        state('inactive', style({
          // transform: 'scale(1)',
        })),
        state('active', style({
          // transform: 'scale(1.2)',
          // width: '100%',
          // height: '100px'
          position: 'absolute',
          left: '200px',
          top: '300px'
        })),
        transition('inactive => active', animate('150ms ease-in')),
        transition('active => inactive', animate('150ms ease-in')),
    ]),

    trigger('midAnimation', [
        state('inactive', style({
            // transform: 'scale(1)',

        })),
        state('active', style({
            // transform: 'scale(1.2)',
            display: 'none'

        })),
        transition('inactive => active', animate('150ms ease-in')),
        transition('active => inactive', animate('150ms ease-in')),
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

  // animations part
  state: string = 'small';
  state2: string = 'small';
  state3: string = 'small';
  state4: string = 'small';
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
      this.state = (this.state === 'inactive' ? 'active' : 'inactive');
      this.state2 = (this.state2 === 'inactive' ? 'active' : 'inactive');
      this.state3 = (this.state3 === 'inactive' ? 'active' : 'inactive');
      this.state4 = (this.state4 === 'inactive' ? 'active' : 'inactive');
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
