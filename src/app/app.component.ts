import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'drag-drop';
  public uploadFileName: string;
  public uploadFileType: string;
  public files: any[] = [];

  public uploadFileContent: string;
  public newFile;
  url: string | ArrayBuffer = '';
  // public fileContent: string;

  constructor(public dialog: MatDialog) {}

  public async onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.newFile = file;
      this.uploadFileName = file.name;
      this.uploadFileType = file.type;
      this.uploadFileContent = await file.text();
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        this.url = event.target.result;
      };
    }

    // this.fileContent = JSON.stringify(`{${this.uploadFileContent}}`);
    //get object from json file
    //let obj = JSON.parse(this.uploadFileContent);
  }

  async fromDropper(data: File[]) {
    // const file = Object.keys(data).map((key) => data[key]);
    this.files = Object.keys(data).map((key) => data[key]);
    this.newFile = this.files[0];
    this.uploadFileName = this.files[0].name;
    this.uploadFileType = this.files[0].type;
    if (this.uploadFileType == 'text/plain') {
      this.uploadFileContent = await this.files[0].text();
    }

    let reader = new FileReader();

    reader.readAsDataURL(this.files[0]);
    reader.onload = (event) => {
      this.url = event.target.result;
    };

    console.log(this.files);
    // const file: File = data;
    // if (file) {
    //   this.newFile = file;
    //   this.uploadFileName = file.name;
    //   this.uploadFileType = file.type;
    //   this.uploadFileContent = await file.text();
    //   let reader = new FileReader();
    //   reader.readAsDataURL(file);
    //   reader.onload = (event) => {
    //     this.url = event.target.result;
    //   };
    // }
  }

  public saveFileName = 'test';
  public saveFileContent = '{ "name": "test"}';
  public saveFileExtension = '';

  public onSaveFile(): void {
    let fileName = this.saveFileName + '.' + this.saveFileExtension;
    let fileContent = JSON.stringify({ name: 'test name' });

    const file = new Blob([fileContent], { type: 'text/plain' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(file);
    link.download = fileName;
    link.click();
    link.remove();
  }

  openConfirmDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      panelClass: 'modal-xs',
    });
    // dialogRef.componentInstance.fName = this.files[pIndex].name;
    // dialogRef.componentInstance.fIndex = pIndex;

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        // this.deleteFromArray(result);
      }
    });
  }
}

//https://github.com/valor-software/ng2-dragula#readme

// https://blog.angular-university.io/angular-file-upload/
// https://github.com/georgipeltekov/ngx-file-drop#readme
