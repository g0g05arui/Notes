import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NotesService } from './../notes.service';
import { Note } from '../models/note';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.scss']
})
export class NoteEditComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private dialogRef: MatDialogRef<NoteEditComponent>) {
      console.log(data);
      this.title=data.note.title;
      this.message=data.note.content;
   }
  note:Note={title:"",content:"",created:new Date(),updated:new Date(),editable:false};
  ngOnInit(): void {
  }
  confirm() {
    console.log(this.title,this.message);
    this.note.title=this.title;
    this.note.content=this.message;
    this.note.created=this.data.note.created;
    this.note.updated=new Date();
    this.note.editable=false;
    this.dialogRef.close({ data: this.note })
  }
  cancel(){
    this.dialogRef.close({data:{}});
  }
  title:string="";
  message:string="";
  save(event):void{

  }

  delete(){
    this.dialogRef.close({data:{delete:true}});
  }

}
