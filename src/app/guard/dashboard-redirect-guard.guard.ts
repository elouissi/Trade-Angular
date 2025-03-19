import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-empty',
  template: '',
  standalone: true
})
export class EmptyComponent {
  constructor(private authService: AuthService, private router: Router) {
    const role = this.authService.getRole();
    if (role === 'ADMIN') {
      this.router.navigate(['/dashboard/stats']);
    } else if (role === 'TRADER') {
      this.router.navigate(['/dashboard/posts']);
    } else {
      this.router.navigate(['/home']);
    }
  }
}
