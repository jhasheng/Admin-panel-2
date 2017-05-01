import { Component, OnInit } from '@angular/core';
import { MdIconRegistry, MdDialog, MdDialogRef } from '@angular/material';

import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';

// dialogs
import { DialogAddProsforaComponent } from '../../admin/dialog-add-prosfora/dialog-add-prosfora.component';
import { DialogeDeleteProsforaComponent } from '../../admin/dialoge-delete-prosfora/dialoge-delete-prosfora.component';

declare const $: any;

@Component({
  selector: 'app-prosfores-table',
  templateUrl: './prosfores-table.component.html',
  styleUrls: ['./prosfores-table.component.css']
})
export class ProsforesTableComponent implements OnInit {

  // dialogAddProsfora: MdDialogRef<any>;
  dialogDeleteProsfora: MdDialogRef<any>;

  loadComplete: boolean = false;


  prosfores: any;
  title: any;
  description: any;
  price: any;
  image_prosfora: any;
  // $key: any;

  rootCheckBox: any;
  prosforesSelected = [];
  prosforesSelectedCounter = 0;


  constructor(
    private dialog: MdDialog,
    private dialogAddProsfora: MdDialog,
    private firebaseService: FirebaseService,
    private router: Router
  ) { }

  ngOnInit() {

    this.firebaseService.getProsfores().subscribe(prosfores => {
      this.prosfores = prosfores;

      this.loadComplete = true;
    });

  }



  openDialogAddProsfora() {

    this.dialogAddProsfora.open(DialogAddProsforaComponent).afterClosed()
      .filter(result => !!result)
      .subscribe(prosfora => {
        this.prosfores.push(prosfora);
        // this.selectedUser = user;
        console.log(prosfora);
      });

  }

  openDialogDeleteProsfora() {
    this.dialogDeleteProsfora = this.dialog.open(DialogeDeleteProsforaComponent, {
      // height: '400px',
      // width: '600px',
    });
    
    this.dialogDeleteProsfora.componentInstance.selectedProsfores = this.prosforesSelectedCounter;
    this.dialogDeleteProsfora.componentInstance.someMessage = 'SOSKE';
  }


  statusCheckBox() {
    this.rootCheckBox = this.rootCheckBox ? true : false;

    // if (this.rootCheckBox === true) {
    //    this.tableData.forEach(element => {
    //     element.state =  true;
    //   });
    // } else {
    //    this.tableData.forEach(element => {
    //     element.state =  false;
    //   });
    // }


    // this.tableData[0].state = true;
    console.log(this.rootCheckBox);
    // console.log(this.prosfores);


    let searchIDs = $('input:checked').map(function(){

      // return $(this).val('id');
      return this.id;

    });
    console.log(searchIDs.get());

    this.prosforesSelected = searchIDs.get();
    this.prosforesSelectedCounter = this.prosforesSelected.length;
    console.log(this.prosforesSelectedCounter);

  }

  /**
   * returns an object the full time 27/4/2017 and the tme 10:27:06
   */
  getCurentTime() {
    let d = new Date();
    let h = d.getHours();
    let m = d.getMinutes();
    let s = d.getSeconds();

    let gy = d.getFullYear();
    let gm = d.getMonth();
    let gd = d.getDate();

    let curentTime;

    const t = {
      date : `${gd}/${gm}/${gy}`,
      time : `${h}:${m}:${s}`
    };

    return t;
  }

  /**
   * Takes the number of colum you want to short
   * @param n
   */
  sortTable(n: number) {
    let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById('prosfores-table');
    switching = true;
    // Set the sorting direction to ascending:
    dir = 'asc'; 
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
      // start by saying: no switching is done:
      switching = false;
      rows = table.getElementsByTagName('TR');
      /*Loop through all table rows (except the
      first, which contains table headers):*/
      for (i = 1; i < (rows.length - 1); i++) {
        // start by saying there should be no switching:
        shouldSwitch = false;
        /*Get the two elements you want to compare,
        one from current row and one from the next:*/
        x = rows[i].getElementsByTagName('TD')[n];
        y = rows[i + 1].getElementsByTagName('TD')[n];
        /*check if the two rows should switch place,
        based on the direction, asc or desc:*/
        if (dir === 'asc') {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir === 'desc') {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            // if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /*If a switch has been marked, make the switch
        and mark that a switch has been done:*/
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount ++;
      } else {
        /*If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again.*/
        if (switchcount === 0 && dir == 'asc') {
          dir = 'desc';
          switching = true;
        }
      }
    }
  }


  onAddProsforaSubmit() {

    let prosfora = {
      title : this.title,
      description: this.description,
      price: this.price,
      time_created : this.getCurentTime(),
      time_updated: this.getCurentTime()
    };

    console.log(prosfora);

    this.firebaseService.addProsfora(prosfora);
    this.router.navigate(['/prosfores']);
  }

}


interface Prosfora {
  $key?:           string;
  title:           string;
  price?:          string;
  image_prosfora?: string;
  description?:    string;
  active?:         string;
}
