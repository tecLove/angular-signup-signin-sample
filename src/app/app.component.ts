import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

import { svgIcons } from './app-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    this.addIconsToRegistry();
  }
  /**
   * add icons to registry
   */
  addIconsToRegistry() {
    for (const icon of svgIcons) {
      this.iconRegistry.addSvgIcon(icon.name, this.sanitizer.bypassSecurityTrustResourceUrl('../../../../assets/images/' + icon.icon));
    }
  }
}
