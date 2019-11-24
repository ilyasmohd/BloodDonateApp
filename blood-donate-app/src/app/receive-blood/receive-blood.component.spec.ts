import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivebloodComponent } from './receive-blood.component';

describe('ReceivebloodComponent', () => {
  let component: ReceivebloodComponent;
  let fixture: ComponentFixture<ReceivebloodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceivebloodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivebloodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
