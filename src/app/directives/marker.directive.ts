import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appTabMarker]'
})
export class MarkerDirective {

  @Input('appTabMarker') markerName: string;
  constructor(public templateRef: TemplateRef<any>) { }

}
