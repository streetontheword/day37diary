import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Resp } from './models';
import { ResponseStorage } from './resp.storage.service';

@Component({
  selector: 'app-activityform',
  templateUrl: './activityform.component.html',
  styleUrl: './activityform.component.css'
})
export class ActivityformComponent implements OnInit{



  private fb = inject(FormBuilder)
  form!: FormGroup

  private respStorage = inject(ResponseStorage)

  ngOnInit(): void {
    this.form = this.createForm()
   }


  createForm(){
    return this.fb.group({
      date: this.fb.control<string>('', [Validators.required]),
      text: this.fb.control<string>('', [Validators.required]),
      type: this.fb.control<string>('',[Validators.required])
      
    })
  }


  process(){
    const value : Resp = this.form.value
    console.info("this button is being pressed>>", value)
    this.respStorage.addResponse(value)
    .then((resp)=> {
      console.info("THIS IS THE RESPONSE>>", resp)
    })
    .catch((err)=>{
      console.info("DID NOT SAVE!!!", err)
    })
    
  }
  



}
