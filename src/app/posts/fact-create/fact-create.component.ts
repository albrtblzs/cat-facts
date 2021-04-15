import {Component, EventEmitter, Output} from '@angular/core';
import {Fact} from '../fact.model';
import { FactService } from '../fact.service';

@Component({
  selector:'app-fact-create',
  templateUrl: './fact-create.component.html',
  styleUrls:['./fact-create.component.css']
})
export class FactCreateComponent {

  constructor(public factService: FactService){}
  onGetFact(){
    this.factService.getFact();
  }
  onSaveFact(){
     this.factService.addPost(this.factService.fact.type, this.factService.fact.text)
  }
}
