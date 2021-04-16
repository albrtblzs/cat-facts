import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { Fact } from '../fact.model';
import { Subscription } from 'rxjs';
import { FactService } from '../fact.service';

@Component({
  selector:'app-fact-list',
  templateUrl: './fact-list.component.html',
  styleUrls:['./fact-list.component.css']
})
export class FactListComponent implements OnInit, OnDestroy{
  facts : Fact[] = [];
  private FactSub: Subscription | undefined;
  constructor(public factService: FactService){}

  ngOnInit(){
    this.factService.getFact();
    this.factService.getFactFromDatabase();
    this.FactSub = this.factService.getFactUpdateListener()
    .subscribe((facts: Fact[]) => {
      this.facts = facts;
    });
  }
  ngOnDestroy(){
    this.FactSub?.unsubscribe();
  }

}
