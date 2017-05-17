import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';


@Injectable()
export class FirebaseService {

  listings: FirebaseListObservable<any[]>;
  prosfores: FirebaseListObservable<any[]>;

  listing: FirebaseObjectObservable<any>;
  prosfora: FirebaseObjectObservable<any>;

  prosforaUploadImg: any;

  folder: any;
  folderProsfores: any;

  constructor(private db: AngularFireDatabase) {
    this.folder = 'listingimages';
    this.folderProsfores = 'prosfores-images';

    this.listings = this.db.list('/listings') as FirebaseListObservable<Listing[]>;
    this.prosfores = this.db.list('/prosfores') as FirebaseListObservable<Prosfora[]>;
  }



  // Gets listtings
  getListings() {
    return this.listings;
  }

  // Gets Prosfores
  getProsfores() {
    return this.prosfores;
  }



  // Gets the listing Details
  getListingDetails(id) {
    this.listing = this.db.object('/listings/' + id) as FirebaseObjectObservable<Listing>;
    return this.listing;
  }

  getProsforaDetails(id) {
    this.prosfora = this.db.object('/prosfores/' + id) as FirebaseObjectObservable<Prosfora>;
    return this.prosfora;
  }

  // Add a new listing
  addListing(listing) {

    // create root ref
    const storageRef = firebase.storage().ref();

    for (let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]){
      const path = `/${this.folder}/${selectedFile.name}`;
      const iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapshot) => {
        listing.image = selectedFile.name;
        listing.path = path;
        // firebase.database().ref('/listings').push(listing);
        return this.listings.push(listing);
      });
    }

  }


  // Add a new listing
  addProsfora(prosfora) {

    // create root ref
    const storageRef = firebase.storage().ref();

    // for (let selectedFile of [(<HTMLInputElement>document.getElementById('imgForNewProsfora')).files[0]]){
    //   let path = `/${this.folderProsfores}/${selectedFile.name}`;
    //   let iRef = storageRef.child(path);
    //   iRef.put(selectedFile).then((snapshot) => {

    //     console.log(selectedFile);
    //     prosfora.image = selectedFile.name;
    //     prosfora.path = path;
    //     return this.prosfores.push(prosfora);
    //   });
    // }


    let selectedFile = this.prosforaUploadImg;
    // let selectedFile = prosfora.image;
    const path = `/${this.folderProsfores}/${selectedFile.name}`;
    const iRef = storageRef.child(path);
    iRef.put(selectedFile).then((snapshot) => {

      // console.log(selectedFile);
      prosfora.image = selectedFile.name;
      prosfora.path = path;
      return this.prosfores.push(prosfora);
    });

  }



  // Update a listing
  updateListing(id, listing) {
    return this.listings.update(id, listing);
  }

  // Update a prosfora
  updateProsfora(id, prosfora) {
    return this.prosfores.update(id, prosfora);
  }

  // Delete a listing
  deleteListing(id) {
    return this.listings.remove(id);
  }

  // Delete a prosfora
  deleteProsfora(id) {
    return this.prosfores.remove(id);
  }




}

interface Listing {
  $key?:     string;
  title:     string;
  type?:     string;
  image?:    string;
  city?:     string;
  owner?:    string;
  bedrooms?: string;
}

interface Prosfora {
  $key?:     string;
  title:     string;
  price?:     string;
  image_prosfora?:    string;
  description?: string;
  active?:    string;
}

