import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarProdutosComponent } from './adicionar-produtos.component';

describe('AdicionarProdutosComponent', () => {
  let component: AdicionarProdutosComponent;
  let fixture: ComponentFixture<AdicionarProdutosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdicionarProdutosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdicionarProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
