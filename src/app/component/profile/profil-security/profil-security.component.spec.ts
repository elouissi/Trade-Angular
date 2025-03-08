import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilSecurityComponent } from './profil-security.component';

describe('ProfilSecurityComponent', () => {
  let component: ProfilSecurityComponent;
  let fixture: ComponentFixture<ProfilSecurityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilSecurityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfilSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
