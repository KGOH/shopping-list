import { Injectable } from '@angular/core';
import {Drug} from './domain/Drug';
import {AsyncSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {map as _map, sortBy as _sortBy} from 'lodash-es';

declare const shopping_list: any;

@Injectable({
  providedIn: 'root'
})
export class DrugService {

  constructor() { }

  public searchByName(name: string): Observable<Drug[]> {
    const results = new AsyncSubject<any>();
    shopping_list.core.search_resttrade_name(name, (data: any) => { results.next(data); results.complete(); });
    return results.pipe(map(data => _sortBy(_map(data.results, item => new Drug(item.id, item.name, item.name_en)), 'name')));
  }
}
