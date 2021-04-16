import { Fact } from './fact.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})

export class FactService{
  private facts: Fact[] = [];
  fact: Fact;
  private factUpdated = new Subject<Fact[]>();
  private url: string = 'http://localhost:3000/cat-facts';
  private url1: string = 'http://localhost:3000/fav-cat-facts';
  message: string;

  constructor(private http: HttpClient){}

  getFact(){
    this.http.get<{message: string, fact: Fact}>(this.url)
    .subscribe((factData) => {
     this.fact = factData.fact;
    })
  }

  addFact(type: string, text: string): any {
    const fact: Fact = {
      id: null,
      type: type,
      text: text
    }
    for(let i in this.facts)
    {
      if(this.facts[i]?.text === this.fact.text)
      {
        return this.message = 'Already exists';
      }
    }
    this.http.post<{message: string}>(this.url, fact)
    .subscribe((responseData) => {
      return this.message = (responseData.message);
    });
  }
  getFactFromDatabase(){
    this.http.get<{message: string, facts: Fact[] }>(this.url1)
    .subscribe((transformedFact) => {
      this.facts = transformedFact.facts;
      this.factUpdated.next([...this.facts]);
    });
  }
	getFactUpdateListener(){
		return this.factUpdated.asObservable();
	}
}
  function factData(factData: any) {
    throw new Error('Function not implemented.');
  }

