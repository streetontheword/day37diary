import { Component, OnInit, inject } from '@angular/core';
import { ResponseStorage } from './resp.storage.service';
import { Resp } from './models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-activitylist',
  templateUrl: './activitylist.component.html',
  styleUrl: './activitylist.component.css'
})
export class ActivitylistComponent implements OnInit{





private respStorage = inject(ResponseStorage)
// response$!: Promise<Resp[]>


response$!: Observable<Resp[]>

cat$!: Observable<Resp[]>

ngOnInit(): void {
  //querying it 
    // this.response$ = this.respStorage.getResponse()

    //this is changing the promise to an observable 
    this.response$ = this.respStorage.onEntries.asObservable()
    
   
}

}
