import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ColumnInterface} from '../types/column.interface';
import {MatSort, MatSortModule, Sort} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {Router, RouterLink} from '@angular/router';
import {CustomDatePipe} from '../shared/pipes/date.pipe';
import {TimeZoneService} from '../shared/services/time-zone.service';
import {MatExpansionModule} from '@angular/material/expansion';
import {InfiniteScrollDirective} from "ngx-infinite-scroll";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [InfiniteScrollDirective, MatTableModule, MatSortModule, RouterLink, MatExpansionModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {


  private _tableColumns: any

  @Input()
  set tableData(value: any[]) {
    this._tableColumns = value
    this.setTableData();
  }

  get tableData() {
    return this._tableColumns;
  }
  @Input()
  tableColumns: Array<ColumnInterface> = [];

  @Output() scrolled = new EventEmitter<void>();

  @Input() isLoading: boolean = false;

  @Output() checkboxChange = new EventEmitter<{
    element: any;
    columnDef: string;
    checked: boolean;
  }>();

  @ViewChild(MatSort) tableSort: MatSort | null = null;

  displayedColumns: Array<string> = [];
  expansionColumns: Array<string> = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  datePipe!: CustomDatePipe;

  constructor(private _liveAnnouncer: LiveAnnouncer,
              private router: Router,
              private timeZoneService: TimeZoneService,
  ) {
  }

  ngOnInit() {
  }

  setTableData() {
    this.displayedColumns = this.tableColumns.map((c) => c.columnDef);
    let expansionColumns: Array<ColumnInterface> = this.tableColumns
      .map(c => c.expansionColumns)
      .filter((columns): columns is ColumnInterface[] => !!columns)
      .flat();
    this.expansionColumns = expansionColumns.map(c => c.columnDef);
    this.dataSource = new MatTableDataSource(this.tableData);
    this.datePipe = new CustomDatePipe('en', this.timeZoneService);
  }

  ngOnChanges(): void {
    if (this.tableData) {
      this.dataSource.data = this.tableData; // Ensure data refresh on input changes
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.tableSort;
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  isImageArray(cellData: any): boolean {
    return Array.isArray(cellData) && cellData.every(item => item.src);
  }

  onIconClick(path: string): void {
    this.router.navigate([path])
  }

  onScrollDown(): void {
    if (!this.isLoading) {
      console.log('scrolled');
      this.scrolled.emit();
    }
  }

  onCheckboxChanged({ target }: Event, element: any, columnDef: string): void {
    this.checkboxChange.emit({
      element,
      columnDef,
      checked: (target as HTMLInputElement).checked
    });
  }

  isChecked(columnDef: string, element: { name: string; checked: boolean }[]): boolean {
    return element?.some(e => e.name === columnDef && e.checked) ?? false;
  }

  isValidJson(cellData:any): boolean {
    return cellData !== null && typeof cellData === 'object' && !Array.isArray(cellData);
  }

  formatDateWithTimezone(value: string): string | null {
    value = value.substring(0, value.indexOf('T'));
    return this.datePipe.transform(value, 'dd-MMM-yyy');
  }
}
