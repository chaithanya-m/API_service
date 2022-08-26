import { Component } from '@angular/core';
import { flush } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

import { PostService} from'src/app/services/post.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'new_example';
  posts :any[]=[]
  reactiveForm: any;
  constructor(private fb: FormBuilder, private postService: PostService) { }  
  data = this.fb.group({
    name:[null,[Validators.required]]
  })
   ngOnInit(): void {
    this.getAllUsers();
  }
  getAllUsers(){
    this.postService.list().subscribe(
      (post: any) => {
        
        this.posts = post;

      },
      (error: any) => {
        console.log(error);
      });
  }
   post(){
    if(this.data.getRawValue().name==null){
      alert("write somthing to post")
      
    }
    else{
    
    const d = new Date().toLocaleTimeString([], {year:'2-digit',month:'2-digit',day:"2-digit", hour: '2-digit', minute:'2-digit',second:'2-digit'});
    const a=Math.floor(Math.random() * 10) + 1 ;
    const data = {
      name:this.data.getRawValue().name, 
      date: d ,
      likes:a,
      like_status:false
    };
   
    this.postService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.getAllUsers()
          
        },
        error => {
          console.log(error);
        });
    
    this.data.reset('');

  }
   }
   remove(n :string){
    this.postService.delete(n)
      .subscribe(
        response => {
          this.getAllUsers()
        },
        error => {
          console.log(error);
        });
   }
   like(id:any,like:number){
    
    for(let i=0;i<=this.posts.length;i++){
      let b=this.posts[i];
      if(b._id==id){
        debugger
        if(b.like_status==false){
          b.likes=like+1
          b.like_status=true
          this.update(b,id)
        }
        else{
          b.likes=like-1
          b.like_status=false
          this.update(b,id)
        }
      }
    }   
  }
  update(b:any , a:any){
    this.postService.liked(b,a) 
    .subscribe(
      response => {
        this.getAllUsers()
      },
      (error: any) => {
        console.log(error);
      });

  }
  
}

