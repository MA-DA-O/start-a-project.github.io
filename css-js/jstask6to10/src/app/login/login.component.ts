import { Component, OnInit } from '@angular/core';
import { RouterLink, Router,NavigationExtras } from '@angular/router'; // 导入router服务
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { from } from 'rxjs';
import { style } from '@angular/animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SerializationService } from '../service/serialization.service'; // 服务引入接口返回字段类型
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  }),
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isVisible = false;
  public user = '';
  public password = '';
  validateForm!: FormGroup;
  public hint: string;
  submitForm(): void {
    // tslint:disable-next-line: forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public http: HttpClient,
    private serialization: SerializationService
  ) {} // 在构造函数声明router,声明各个实例articleList

  paramFormat = this.serialization.paramFormat;
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });
  }
  showModal(): void {
    console.log(this.user, this.password);
    const api = '/ajax/';
    this.http
      .post<any>(
        `${api}a/login`, // 模板语法字符串
        this.paramFormat({ name: this.user, pwd: this.password }), // 使用序列化函数方法序列化代码
        httpOptions // 请求头
      )
      .subscribe((response) => {
        console.log(response);
        console.log(response.code);
        this.hint = response.message;
        if (response.code === 0) {
          this.router.navigateByUrl('home/wellcome');
        } else {
          this.isVisible = true;
        }
      });

    // if (this.user == 'user' && this.password == 'password') {
    //   this.router.navigateByUrl('home/wellcome');
    // } else {
    //   this.isVisible = true;
    // }
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  // 序列化参数
  // paramFormat(data: any) {
  //   // tslint:disable-next-line: one-variable-per-declaration
  //   let paramStr = '',
  //     name,
  //     value,
  //     subName,
  //     innerObj;
  //   const that = this;
  //   // tslint:disable-next-line: forin
  //   for (name in data) {
  //     value = data[name];
  //     if (value instanceof Array) {
  //       for (let i of value) {
  //         subName = name;
  //         innerObj = {};
  //         innerObj[subName] = i;
  //         paramStr += this.paramFormat(innerObj) + '&';
  //       }
  //     } else if (value instanceof Object) {
  //       // tslint:disable-next-line: only-arrow-functions
  //       Object.keys(value).forEach(function(key) {
  //         subName = name + '[' + key + ']';
  //         innerObj = {};
  //         innerObj[subName] = value[key];
  //         paramStr += that.paramFormat(innerObj) + '&';
  //       });
  //     } else if (value !== undefined && value !== null) {
  //       paramStr +=
  //         encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
  //     }
  //   }
  //   return paramStr.length ? paramStr.substr(0, paramStr.length - 1) : paramStr;
  // }
}
