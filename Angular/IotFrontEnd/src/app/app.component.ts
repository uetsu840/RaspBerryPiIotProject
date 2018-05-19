import { Component } from "@angular/core";
import { Http, Response } from "@angular/http";

@Component({
  selector: "my-app",
  template: `
    <h1>Angular 2 サンプル1</h1>
    <button (click)="onClickGet()">HTTP GET実行</button>
    <div style="margin-top:10px">{{resString}}</div>
  `,
})
  
export class AppComponent {
  private resString: string;
  title = 'Tiny Iot Application';

  // コンストラクター ...（1）
  constructor(private http:Http) {
  }

  // ボタン押下時の処理
  private onClickGet() {
    // http.getメソッドはHTTP通信を表すObservableを返す ...（2）
    var httpGetObservable = this.http.get("app/testdata.json");
    // subscribeメソッドで通信完了時の処理を記述 ...（3）
    httpGetObservable.subscribe(
      // 第1引数は成功時の処理を記述したアロー関数 ...（4）
      res => {
        this.resString = res.text();
      },
      // 第2引数はエラー時の処理を記述したアロー関数 ...（5）
      error => {
        console.error(error.status + ":" + error.statusText);
      }
    );
  }
}


