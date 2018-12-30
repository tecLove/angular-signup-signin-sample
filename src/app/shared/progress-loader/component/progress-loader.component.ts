import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener, Input,
  OnInit,
  ViewChild
} from '@angular/core';

/**
 * Progress loader component
 */
@Component({
  selector: 'userportal-progress-loader',
  templateUrl: './progress-loader.component.html',
  styleUrls: ['./progress-loader.component.scss']
})
export class ProgressLoaderComponent implements OnInit, AfterViewInit {
  @Input() showLoader: boolean;
  @ViewChild('ngcontent') ngcontent: ElementRef;
  contentHeight: string;

  constructor( private cdRef: ChangeDetectorRef) {
  }
  /**
   * To adjust loader height when resizing
   */
  @HostListener('window:change') onResize() {
    this.ngAfterViewInit();
  }

  /**
   * OnInit method to initialize the progress
   */
  ngOnInit(): void {
  }

  /**
   * AfterViewInit to get the component height
   */
  ngAfterViewInit() {
    this.contentHeight = this.ngcontent.nativeElement['clientHeight'] + 2 + 'px';
    this.cdRef.detectChanges();
  }

}
