import { Injectable } from '@angular/core';
import { Note } from './models/note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  notes: Note[] = [];
  constructor() { 
      let notes=localStorage.getItem('notes');
      
      if(notes){
          this.notes=JSON.parse(notes);
      } 
      this.notes=this.notes.map(val=>{
        let val2=val;
        val2.editable=false;
        return val2;
      });
     
      console.log(this.notes)
  }

  addNote(note: Note) :Note[] {
      this.notes=[note].concat(this.notes);
      this.saveNotes();
      return this.notes;
  }
  saveNotes():void{
      localStorage.setItem('notes',JSON.stringify(this.notes));
  }
  getNotes():Note[]{
      return this.notes;
  }
  update(index:number,note:Note){
    this.notes[index]=note;
    this.notes[index].updated=new Date();
   
    this.notes.splice(index, 1); // 2nd parameter means remove one item only
    note.updated=new Date();
    this.notes=[note].concat(this.notes);

    console.log(this.notes);
    this.saveNotes();
  }
}
