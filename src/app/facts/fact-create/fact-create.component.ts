import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Fact} from '../fact.model';
import { FactService } from '../fact.service';
import { Subscription } from 'rxjs';

@Component({
  selector:'app-fact-create',
  templateUrl: './fact-create.component.html',
  styleUrls:['./fact-create.component.css']
})
export class FactCreateComponent {
  facts : Fact[] = [];
  private FactSub: Subscription | undefined;

  constructor(public factService: FactService){}
  onGetFact(){
    this.factService.getFact();
  }
  onSaveFact(){
     this.factService.addFact(this.factService.fact?.type, this.factService.fact.text);
     this.factService.getFactFromDatabase();
     this.FactSub = this.factService.getFactUpdateListener()
     .subscribe((facts: Fact[]) => {
       this.facts = facts;
     });
  }
}
