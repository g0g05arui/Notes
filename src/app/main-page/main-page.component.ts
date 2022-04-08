import { NotesService } from './../notes.service';
import { Component, OnInit } from '@angular/core';
import { Note } from '../models/note';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NoteEditComponent } from '../note-edit/note-edit.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(public notesService:NotesService,public dialog:MatDialog) { }
  notes:Note[]=[];
  searchText:string="";
  ngOnInit(): void {
    this.notes=this.notesService.getNotes();
  
  }
  save(event){
    this.searchText=event;
    this.notes=this.notesService.getNotes().filter(note=>{
      console.log(note);
      return note.title.toLowerCase().includes(this.searchText.toLowerCase()) || note.content.toLowerCase().includes(this.searchText.toLowerCase());
    })
  }

  addNote(note: Note) :Note[] {
    this.notes=this.notesService.addNote(note);
    return this.notes;
  }
  addEditableNote():void{
    let dialogRef = this.dialog.open(NoteEditComponent, {
      height: '400px',
      width: '600px',
      data:{
        "note":{
          "title":"",
          "content":"",
          "created":new Date(),
          "updated":new Date(),
        }
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if(res.data.title){
        this.notes=this.addNote(res.data);
      }
    })
  }
  editNote(index):void{
    console.log(index);
    let dialogRef = this.dialog.open(NoteEditComponent, {
      height: '400px',
      width: '600px',
      data:{
        "note":this.notes[index]
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if(res.data.title){
        this.notesService.update(index,res.data);
        this.notes=this.notesService.getNotes();
      }
    })
  }
}
