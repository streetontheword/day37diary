import { Injectable } from "@angular/core";
import Dexie from "dexie";
import { Resp } from "./models";
import { Observable, Subject } from "rxjs";

@Injectable()
export class ResponseStorage extends Dexie {


    response!: Dexie.Table<Resp, number>



    //is this to make it an observable?
    onEntries = new Subject<Resp[]>

    //how did it from a promise become an observable?

    onFilter = new Subject<string[]>

    constructor() {

        super('responseDB')
        const COL_ENTRIES = "response"
        this.version(2).stores({
            [COL_ENTRIES]: ' date, type,id'
        })
        this.response = this.table(COL_ENTRIES)

        this.getResponse().then(  //dont really understand this!!  why here and not at the activity list component? //is it cus he is querying once and push out the response, instead of doing it 3 different times at the different component 
            (result) => this.onEntries.next(result)



        )
    }


    async addResponse(resp: Resp): Promise<any> {
        this.response.add(resp)
        const allEntries = await this.response.toArray();
        this.onEntries.next(allEntries)
        this.onFilter.next(allEntries.map(v=> v.type))

    }

    async getCat()  {
        //this.response.add(resp)
        const allEntries = await this.response.toArray();
        console.info('>>> all entries ', allEntries)
        this.onFilter.next(allEntries.map(v => v.type))
    }


    getResponse(): Promise<Resp[]> {
        return this.response.orderBy('date').reverse().toArray()
        //    return this.response.toArray()

    }


    async getEntryByType(type: string) {
        const collection = await this.response
            .where('type').equals(type)
            .toArray();

        console.log(collection); // Now logging the actual entries

        this.onEntries.next(collection); // Emit the filtered entries array
        
    }
}