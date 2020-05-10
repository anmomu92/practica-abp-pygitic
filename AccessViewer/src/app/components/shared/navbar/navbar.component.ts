import { Component, OnInit, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.changeTooglerNavbar();
    }
  }

  constructor( private eRef: ElementRef) {
  }

  ngOnInit() {
  }

  changeTooglerNavbar() {
    if (document.getElementById('navbarSupportedContent').className.includes('show')) {
      document.getElementById('navbar-toogler').click();
    }
  }

}
