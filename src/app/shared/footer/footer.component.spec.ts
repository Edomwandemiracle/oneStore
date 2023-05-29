import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the payment image', () => {
    const paymentImage = fixture.debugElement.query(By.css('.payment-img'));
    expect(paymentImage).toBeTruthy();
    expect(paymentImage.nativeElement.getAttribute('src')).toBe('assets/payments/payments.png');
  });

  it('should render the footer menu', () => {
    const footerMenu = fixture.debugElement.query(By.css('.footer_menu'));
    expect(footerMenu).toBeTruthy();

    const footerMenuItems = footerMenu.nativeElement.querySelectorAll('p');
    expect(footerMenuItems.length).toBe(9);
    expect(footerMenuItems[0].textContent).toBe('Tr1pp');
    expect(footerMenuItems[1].textContent).toBe('Case Studies');
    expect(footerMenuItems[2].textContent).toBe('FAQ');
    expect(footerMenuItems[3].textContent).toBe('Shoppers');
    expect(footerMenuItems[4].textContent).toBe('One Stores');
    expect(footerMenuItems[5].textContent).toBe('Shopping App');
    expect(footerMenuItems[6].textContent).toBe('Business');
    expect(footerMenuItems[7].textContent).toBe('Become a Partner');
    expect(footerMenuItems[8].textContent).toBe('Developers');
  });

  it('should render the footer logo', () => {
    const footerLogo = fixture.debugElement.query(By.css('.demo_footer-logo'));
    expect(footerLogo).toBeTruthy();
    expect(footerLogo.nativeElement.getAttribute('src')).toBe('assets/DEMOSTORE/DEMOSTORE.png');
  });
});
