import { AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

/**
 * Base class for Ui Component class
 */
export class BaseComponent implements OnDestroy, OnInit, AfterViewInit {

  protected subscriptions: Subscription [] = [];

  /**
   * init method
   */
  init() {
    // function can be overridden
  }

  /**
   * after view init method
   */
  viewInit() {
    // function can be overridden
  }

  /**
   * on destroy
   */
  ngOnDestroy() {
    this.subscriptions.forEach(this.callBackFunction);
  }

  /**
   * call back function to be called during component destruction
   * @param sub
   * @returns {string}
   */
  callBackFunction(sub: any) {
    return sub ? sub.unsubscribe() : '';
  }
  /**
   * on Init implementation
   */
  ngOnInit() {
    this.init();
  }

  /**
   * after view implementation
   */
  ngAfterViewInit() {
    this.viewInit();
  }

}
