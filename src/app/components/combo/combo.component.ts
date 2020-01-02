import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material';

@Component({
  selector: 'app-combo',
  templateUrl: './combo.component.html',
  styleUrls: ['./combo.component.css']
})
export class ComboComponent implements OnInit {
  @Input() selectPro: string;

  @Output() selectedProducChange = new EventEmitter<string>();

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  seleccionProducto(event: MatAutocompleteSelectedEvent) {
    const producto = event.option.value as string;
    this.selectedProduct(producto);
    //event.option.deselect();
    event.option.focus();
  }
  selectedProduct(producto: string) {
    this.selectPro = producto;
    console.log(producto);
    this.selectedProducChange.emit(producto);
  }
  productoSelect(producto: string) {
    this.selectPro = producto;
    console.log("hola");
    this.selectedProducChange.emit('hola');
  }
}
