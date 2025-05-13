import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-back-to-top',
  standalone: false,
  templateUrl: './back-to-top.component.html',
  styleUrl: './back-to-top.component.scss'
})
export class BackToTopComponent {
  showScrollTop: boolean = false;
  @HostListener('window:scroll')
  onWindowScroll() {
    // Show button when page is scrolled 500px down
    this.showScrollTop = window.scrollY > 300;
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
