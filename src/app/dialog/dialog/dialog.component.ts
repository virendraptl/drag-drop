import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  public fName: string;
  public fIndex: any;

  constructor(private modalRef: MatDialogRef<DialogComponent>) {}

  ngOnInit() {}

  confirm() {
    // this.modalRef.close(this.fIndex);
  }
  cancel() {
    // this.modalRef.close();
  }
}
