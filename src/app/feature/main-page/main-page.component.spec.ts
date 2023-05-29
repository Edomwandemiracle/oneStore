import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageComponent } from './main-page.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainPageComponent ],
      imports: [RouterTestingModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the app-nav-bar component', () => {
    const navBarComponent = fixture.debugElement.query(By.css('app-nav-bar'));
    expect(navBarComponent).toBeTruthy();
  });

  it('should render the router-outlet component', () => {
    const routerOutletComponent = fixture.debugElement.query(By.css('router-outlet'));
    expect(routerOutletComponent).toBeTruthy();
  });

  it('should render the app-footer component', () => {
    const footerComponent = fixture.debugElement.query(By.css('app-footer'));
    expect(footerComponent).toBeTruthy();
  });
});
