import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DirectivesModule } from 'src/app/directives/directives.module';

import { TabsComponent } from './tabs.component';

@Component({
  selector: 'app-test-cmp',
  template: `<app-tabs>
      <div *appTabMarker="'Test1'"></div>
      <div *appTabMarker="'Test2'"></div>
</app-tabs>`,
})
class TestWrapperComponent { }

describe('TabViewComponent', () => {
  let component: TabsComponent;
  let fixture: ComponentFixture<TestWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirectivesModule],
      declarations: [TabsComponent, TestWrapperComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestWrapperComponent);
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.templates.length).toEqual(2);
  });

  it('should select the first tab by default', () => {
    const nativeElement = fixture.nativeElement;
    const tabLabel = nativeElement.querySelector('.tab-label--active');
    expect(tabLabel.textContent.trim()).toEqual('Test1');
  });
});
