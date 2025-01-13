import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TableComponent} from './table/table.component';
import {ColumnInterface} from './types/column.interface';
import {TableDataInterface} from './types/table-data.iterface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'reusable-table-component';
  tableColumns: Array<ColumnInterface> = [];
  tableData: Array<TableDataInterface> = [];


  columns: { attribute: string; displayLabel: string }[] = [
    { attribute: 'position', displayLabel: 'position' },
    { attribute: 'name', displayLabel: 'name' },
    { attribute: 'weight', displayLabel: 'weight' },
    { attribute: 'symbol', displayLabel: 'symbol' },
  ];
  isLoading: boolean = false;

  ngOnInit() {
    this.columns.forEach((column) => {
      let columnDef: ColumnInterface = {
        columnDef: column.attribute,
        header: column.displayLabel,
        isLink: false,
        cell: (element: Record<string, any>) => {
          return `${element[column.attribute]}`;
        },
        isSortable: false,
        isCheckbox: false,
        isExpansion: false,
        isDate: false
      }
      this.tableColumns.push(columnDef);
    });
    this.tableData =  [
      {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
      {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
      {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
      {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
      {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
      {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
      {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
      {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
      {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
      {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
      {position: 11, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
      {position: 12, name: 'Helium', weight: 4.0026, symbol: 'He'},
      {position: 13, name: 'Lithium', weight: 6.941, symbol: 'Li'},
      {position: 14, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
      {position: 15, name: 'Boron', weight: 10.811, symbol: 'B'},
      {position: 16, name: 'Carbon', weight: 12.0107, symbol: 'C'},
      {position: 17, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
      {position: 18, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
      {position: 19, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
      {position: 20, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
    ];
  }

  onscroll() {
    this.isLoading = true;
  }
}
