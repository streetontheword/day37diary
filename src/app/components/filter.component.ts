import { Component, inject } from '@angular/core';
import { ResponseStorage } from './resp.storage.service';
import { Resp } from './models';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {



  private respStorage = inject(ResponseStorage)
  response$!: Promise<Resp[]>
  
  responseo$!: Observable<Resp[]>
  cat$!: Observable<string[]>

  //how come when this becomes an observable, the drop downlist becomes non dynamic?

  ngOnInit(): void {
      // this.response$ = this.respStorage.getResponse()
      //this.responseo$ = this.respStorage.onEntries.asObservable()
      this.cat$ = this.respStorage.onFilter.asObservable()
      this.cat$ = this.cat$.pipe(map(catArray => Array.from(new Set(catArray))))
      this.respStorage.getCat()
      
      
  }

  // typeSelected(elem: any){
  //   console.info('hello, i am activated', elem.target.value)
  // }


  filter(elem: any) {
    console.info('hello i am activated ', elem.target.value)
    const category: string = elem.target.value;
    // this.responseo$ = this.respStorage.onEntries.asObservable()
    console.info(">>SHOULD BE FULL LIST ",this.responseo$)
    this.respStorage.getEntryByType(category);
  }


}
