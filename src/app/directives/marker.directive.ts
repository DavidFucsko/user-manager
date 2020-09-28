import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appMarker]'
})
export class MarkerDirective {

  @Input('appMarker') markerName: string;
  constructor(public templateRef: TemplateRef<any>) { }

}
