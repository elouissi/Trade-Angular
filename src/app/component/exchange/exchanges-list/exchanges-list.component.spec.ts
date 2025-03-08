import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangesListComponent } from './exchanges-list.component';

describe('ExchangesListComponent', () => {
  let component: ExchangesListComponent;
  let fixture: ComponentFixture<ExchangesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExchangesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExchangesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
