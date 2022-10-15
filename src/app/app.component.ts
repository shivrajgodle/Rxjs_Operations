import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, filter, fromEvent, map, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'Blog-UI-App';

  users = [

    {id:1 , name:'jhon', isActive:true},
    {id:2 , name:'jack', isActive:true},
    {id:1 , name:'mike', isActive:true},
  ];

 
  users$ = of(this.users);

  username$ = this.users$.pipe(map((users)=>users.map((user)=>user.name)));

//this data will not be there any of its content is false
  filteredUsers$ = this.users$.pipe(filter(users=> users.every((user)=>user.isActive)),map((users)=>users.map((user)=>user.name)))


  //behaviour subject

user$ = new BehaviorSubject<{id: string ; name: string} | null>(null);


//from 
documentClick$ = fromEvent(document,'click');

//rxjs combine latest
data$ = combineLatest([
  this.users$,
  this.filteredUsers$
]).pipe(
  map(([users,filteredUsers])=>( {
    users,
    filteredUsers
  }))
  );


  ngOnInit(): void {

    // this should not used if you have observable
    // this.user$.subscribe(users=>{
    //   console.log("users",users);      
    // })

    // setTimeout(()=>{
    //   this.user$.next({id:'1',name:'shivraj'})
    // },2000)

    // this.user$.subscribe((data)=>{
    //   console.log("user",data);
      
    // })

    //from 
    // this.documentClick$.subscribe(e=>{
    //   console.log('e',e);
      
    // })
    
  }

  

}
