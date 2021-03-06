import { Component, ContentChildren, TemplateRef, QueryList, AfterContentInit } from '@angular/core';

import { MarkerDirective } from 'src/app/directives/marker.directive';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements AfterContentInit {

  @ContentChildren(MarkerDirective) templates: QueryList<MarkerDirective>;

  selectedTemplate: TemplateRef<any>;

  constructor() { }

  ngAfterContentInit(): void {
    if (!!this.templates.length) {
      this.selectTemplate(this.templates.first.templateRef);
    }
  }

  selectTemplate(templateRef: TemplateRef<any>): void {
    this.selectedTemplate = templateRef;
  }

  isActive(selectedTemplate: TemplateRef<any>): boolean {
    return selectedTemplate === this.selectedTemplate;
  }

}
