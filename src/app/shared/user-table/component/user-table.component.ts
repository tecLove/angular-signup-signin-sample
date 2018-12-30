import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, MatSort, MatTableDataSource, Sort } from '@angular/material';
import { Observable } from 'rxjs/index';

import { BaseComponent } from '../../../core/utils/base-component';

/**
 * table with sorting/ paginator/ filtering
 */
@Component({
  selector: 'userportal-user-table',
  styleUrls: ['user-table.component.scss'],
  templateUrl: './user-table.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})
export class UserTableComponent extends BaseComponent {
  @Output() linkClicked = new EventEmitter();
  @Input() pageSize: number;
  @Input() pageSizeOptions: number[];
  @Input() data: Observable<any>;
  @Input() metaData: object;
  @Input() sorting: boolean;
  @Input() filtering: boolean;
  @Input() actions: boolean;
  @Input() loading: boolean;
  @Input() isErrorMessage: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[];
  dataSource = new MatTableDataSource<any>();
  metaDataObject: object;
  constructor(private matIntl: MatPaginatorIntl) {
    super();

  }
  init() {
    this.subscriptions.push(this.data.subscribe((data) => {
      this.dataSource.data = data;
      this.loading = false;
    }));
    this.processData(this.metaData);
  }

  /**
   * ngAfterViewInit
   */
  viewInit() {
    this.dataSource.paginator = this.paginator;
  }
  /**
   * Process metadata
   * @param data
   */
  processData(data: any) {
    this.metaDataObject = { ...data };
    const resultArray = [];
    Object.keys(data).forEach((key) => {
      const resultElement = data[key];
      if (data[key].position > 0) {
        resultArray.push({ column: key, ...resultElement });
      }
    });
    this.setPaginationLabels();
    resultArray.sort((a, b) => {
      return a['position'] - b['position'];
    });
    this.displayedColumns = resultArray.map((record) => record.column);
    this.displayedColumns.pop();
    if (this.actions) {
      this.displayedColumns.push('actions');
    }
  }

  /**
   * setting paginator labels
   *
   */
  setPaginationLabels(): void {
    const resultObject = this.metaDataObject;
    this.matIntl.itemsPerPageLabel = resultObject['pagination'].itemsPerPageLabel;
    this.matIntl.firstPageLabel = resultObject['pagination'].firstPageLabel;
    this.matIntl.nextPageLabel = resultObject['pagination'].nextPageLabel;
    this.matIntl.lastPageLabel = resultObject['pagination'].lastPageLabel;
    this.matIntl.previousPageLabel = resultObject['pagination'].previousPageLabel;
  }
  /**
   * Filtered value
   * @param filterValue
   */
  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  /**
   * Sort column data trigger
   * @param sort
   */
  sortData(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = this.sortDataSource(data, sort);
  }

  /**
   * find and sort data
   * @param data
   * @param sort
   * @returns sorted data
   */
  sortDataSource(data: any, sort: any) {
    return data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      let returnValue = 0;
      Object.keys(this.metaDataObject).forEach((key) => {
        if (sort.active !== key) {
        } else {
          returnValue = this.compare(a[key], b[key], isAsc);
          return;
        }
      });
      return returnValue;
    });
  }
  /**
   * to compare the data
   * @param {number | string} a
   * @param {number | string} b
   * @param {boolean} isAsc
   * @returns {number}
   */
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  /**
   * method to delete an item from user table
   * @param {number} i
   * @param {number} row
   */
  deleteItem(id: any) {
    this.linkClicked.emit({ id: id, delete: true, update: false });
  }

  /**
   * to update an item from user list
   */
  updateItem(body: Object) {
    this.linkClicked.emit({ body: body, id: body['id'], delete: false, update: true });
  }
}
