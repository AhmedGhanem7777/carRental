import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loggedInGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router)

  if (localStorage.getItem('adminMail') == null) {
    _Router.navigate(['/admin'])
    return false
  } else {
    return true
  }
};
