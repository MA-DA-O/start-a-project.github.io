import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleNewlyIncreasedComponent } from './article-newly-increased.component';

describe('ArticleNewlyIncreasedComponent', () => {
  let component: ArticleNewlyIncreasedComponent;
  let fixture: ComponentFixture<ArticleNewlyIncreasedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleNewlyIncreasedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleNewlyIncreasedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
