import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Note } from '../models/note';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-notes-page',
  templateUrl: './notes-page.component.html',
  styleUrls: ['./notes-page.component.scss']
})
export class NotesPageComponent implements OnInit {

  @Input()notes:Note[];
  @Output() editNote = new EventEmitter<Number>();
  constructor(public notesService:NotesService) { 
  }

  ngOnInit(): void {
    
  }
  getNoteDate(note:Note){
    return new Date(note.updated).toLocaleDateString(undefined, {  month: "long", day: "numeric" ,hour12: true,hour: "numeric",minute:"numeric"});
  }
  updateNote(note:Note,index:Number){
    console.log(note);
    this.editNote.emit(index);
  }
}
