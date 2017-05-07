import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';


@Component({
  selector: 'app-navigation-menu-left',
  templateUrl: './navigation-menu-left.component.html',
  styleUrls: ['./navigation-menu-left.component.css']
})
export class NavigationMenuLeftComponent implements OnInit {

  menulists: any = [
    {
      name: 'Dashboard',
      link : '/dashboard',
      icon : 'dvr'
    },
    {
      name: 'Προσφορές',
      link : '/prosfores',
      icon : 'card_membership'
    },
    {
      name: 'Υπηρεσίες',
      link : '/ypiresies',
      icon : 'supervisor_account'
    },
    {
      name: 'Προιόντα',
      link : '/admin-products',
      icon : 'shoping_basket'
    },
    {
      name: 'Επικοινωνία',
      link : '/admin-contact-form',
      icon : 'map'
    },
    {
      name: 'Ρυθμίσης',
      link : '/settings',
      icon : 'settings'
    },
  ];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  selectedMenuItem(a) {
    this.router.navigateByUrl(a.link);
  }

}
