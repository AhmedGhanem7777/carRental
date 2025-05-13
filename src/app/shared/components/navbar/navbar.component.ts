import { AfterViewInit, Component, ElementRef, HostListener, signal, ViewChild, computed, Input } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements AfterViewInit {
  @ViewChild('navbar') navbarRef!: ElementRef<HTMLElement>;
  @ViewChild('btnToggler') btnTogglerRef!: ElementRef<HTMLElement>;
  @Input() navbarBg !: boolean

  constructor(public _AuthService: AuthService, private _Title: Title) { }

  ngAfterViewInit(): void {
    this.onScroll();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const navbar = this.navbarRef.nativeElement;
    const btn = this.btnTogglerRef.nativeElement;
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        btn.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
        btn.classList.remove('scrolled');
      }
  }

  logout() {
    this._AuthService.logOut()
  }
}
