import { Fact } from './fact.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})

export class FactService{
  private facts: Fact[] = [];
  fact: Fact;
  private postUpdated = new Subject<Fact[]>();
  private url: string = 'http://localhost:3000/cat-facts';

  constructor(private http: HttpClient){}
  getFact(){
    this.http.get<{message: string, fact: Fact}>(this.url)
    .subscribe((factData) => {
     this.fact = factData.fact;
    })
  }

  /*
    need to reach out backend
    fetch the posts
    store them in posts
    fire out update listener to inform anyone interested in our app
  */
  // need to send a http request
  getPosts(){
    // specify the type of value which we will get back
    // the body of the response will be the object which has:
    //  - a message property and
    //  - the posts property

    this.http.get<{message: string, facts: Fact[]}>(this.url)
    // subscirbe method: argument(new data, errors, when it completes)
    .subscribe((factData) => {
      this.facts = factData.facts;
      // need to inform our app and other parts of our app about this update
      // pass the copy of the post in the following way
      this.postUpdated.next([...this.facts]);
    });
  }

  addPost(type: string, text: string){
    const fact: Fact = {
      id: null,
      type: type,
      text: text
    }
    for(let i in this.facts)
    {
      if(this.facts[i].text === this.fact.text)
      {
        return console.log('Already exist in favs');
      }
    }
    this.http.post<{message: string}>(this.url, fact)
    .subscribe((responseData) => {
      console.log(responseData.message);
      /* We will do this by adding these two calls in the subscribe method because this will execute asynchronously only one we got a success response.*/
      this.facts.push(fact);
      this.postUpdated.next([...this.facts]);
    });
  }

	getPostUpdateListener(){
		return this.postUpdated.asObservable();
	}
}
