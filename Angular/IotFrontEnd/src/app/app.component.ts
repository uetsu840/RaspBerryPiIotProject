import { Component } from "@angular/core";
import { Http, Response } from "@angular/http";

@Component({
  selector: "my-app",
  template: `
    <h1>Angular 2 �T���v��1</h1>
    <button (click)="onClickGet()">HTTP GET���s</button>
    <div style="margin-top:10px">{{resString}}</div>
  `,
})
  
export class AppComponent {
  private resString: string;
  title = 'Tiny Iot Application';

  // �R���X�g���N�^�[ ...�i1�j
  constructor(private http:Http) {
  }

  // �{�^���������̏���
  private onClickGet() {
    // http.get���\�b�h��HTTP�ʐM��\��Observable��Ԃ� ...�i2�j
    var httpGetObservable = this.http.get("app/testdata.json");
    // subscribe���\�b�h�ŒʐM�������̏������L�q ...�i3�j
    httpGetObservable.subscribe(
      // ��1�����͐������̏������L�q�����A���[�֐� ...�i4�j
      res => {
        this.resString = res.text();
      },
      // ��2�����̓G���[���̏������L�q�����A���[�֐� ...�i5�j
      error => {
        console.error(error.status + ":" + error.statusText);
      }
    );
  }
}


