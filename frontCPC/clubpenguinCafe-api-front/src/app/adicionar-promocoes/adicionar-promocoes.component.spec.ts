import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarPromocoesComponent } from './adicionar-promocoes.component';

describe('AdicionarPromocoesComponent', () => {
  let component: AdicionarPromocoesComponent;
  let fixture: ComponentFixture<AdicionarPromocoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdicionarPromocoesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdicionarPromocoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
