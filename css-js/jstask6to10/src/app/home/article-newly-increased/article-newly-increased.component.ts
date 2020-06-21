import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  HttpRequest,
  HttpEventType,
  HttpEvent,
  XhrFactory,
  HttpClient,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';
import { appendFile } from 'fs';
import { SerializationService } from '../../service/serialization.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UploadChangeParam, UploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { filter } from 'rxjs/operators';
import { EditorComponent } from 'src/app/editor';
import { Router, ActivatedRoute } from '@angular/router';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  }),
};
// function getBase64(file: File): Promise<string | ArrayBuffer | null> {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (error) => reject(error);
//   });
// }
@Component({
  selector: 'app-article-newly-increased',
  templateUrl: './article-newly-increased.component.html',
  styleUrls: ['./article-newly-increased.component.scss'],
})
// tslint:disable-next-line: no-unused-expression
export class ArticleNewlyIncreasedComponent implements OnInit {
  constructor(
    private router: Router,
    private routerr: ActivatedRoute,
    private msg: NzMessageService,
    public http: HttpClient,
    private serialization: SerializationService
  ) {}
  name;
  isValid: any;
  value = '';
  a = [1];
  inputFiles;
  data;
  dataObj;
  imgFormData;
  paramFormat = this.serialization.paramFormat;
  postRequst = {
    title: '',
    type: '',
    status,
    img: '',
    content: '',
    jumpLink: '',
    industry: '',
  } as any;
  // 下为表单组，使用的响应式表单。
  profileForms = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(12),
    ]),
    jumpLink: new FormControl('', [Validators.required]),
    type: new FormControl('0'),
    industry: new FormControl(''),
  });
  // 下为设置获取返回表单状态
  get title() {
    return this.profileForms.get('title');
  }
  get jumpLink() {
    return this.profileForms.get('jumpLink');
  }

  // loading = false;
  // avatarUrl?: string;

  source: string = '';
  // 图片上传返回值code
  ImgCode;
  // 百分比变量
  percent;
  imgdom;
  editorText;
  uploadClick = 0;
  upclick() {
    if (this.uploadClick === 1) {
      return false;
    } else {
      return true;
    }
  }
  @ViewChild(EditorComponent) editor: EditorComponent;
  publishTopic() {
    let topicContent = this.editor.clickHandle();

    if (!topicContent) {
      alert('请输入内容！');
      return;
    }
    this.editorText = topicContent;
    // alert(topicContent);
  }

  PostData(event): void {
    console.log(event);
  }
  // 加载时执行函数
  ngOnInit(): void {
    this.getUrlId();
  }
  // 使用文件阅读器从输入中读取文件
  // 当文件被选中时，发出一个事件。这里我们返回文件本身
  @Output() onChange: EventEmitter<File> = new EventEmitter<File>();

  // 上传文件默认列表
  // fileList: UploadFile[] = [];

  // name = this.nameEditor.name;

  change() {
    console.log({
      标题: this.profileForms.value.title,
      类型: parseInt(this.profileForms.value.type),
      上线状态: this.postRequst.status,
      图片名称: this.postRequst.img,
      URL: this.profileForms.value.jumpLink,
      行业: this.postRequst.industry,
      图片地址: this.source,
      说明: this.profileForms.value.content,
      文件: console.log(this.inputFiles),
    });
  }
  isValidForm() {
    return this.isValid;
  }
  forbidden = false;
  // 判断其他需要传入的参数都为true，若是则启用上线或者草稿按钮。
  test() {
    if (
      this.profileForms.value.title &&
      this.profileForms.value.type &&
      this.postRequst.img &&
      this.profileForms.value.jumpLink
    ) {
      this.forbidden = true;
      return this.forbidden;
    } else {
      return this.forbidden;
    }
  }

  // 新增页面也就是立即上线或存为草稿，
  postAdded(a, $event: Event) {
    // 获取富文本编辑器里面的内容
    this.postRequst.status = a;
    this.publishTopic();
    let required = {
      title: this.profileForms.value.title,
      type: this.profileForms.value.type,
      status: this.postRequst.status,
      img: this.postRequst.img,
      content: this.editorText,
      url: this.profileForms.value.jumpLink,
      industry: this.profileForms.value.industry,
    };
    console.log(this.postRequst);
    // const api = '/ajax/a/u/article';
    const req = new HttpRequest(
      'POST',
      '/ajax/a/u/article',
      this.paramFormat(required),
      httpOptions
    );
    this.http.request(req).subscribe((event: any) => {
      console.log(event);
      if (event.status === 200) {
        // this.router.navigateByUrl('home/list?page=1&size=10');
      }
      // this.dataObj = response.data.articleList;
    });
    console.log($event.target);
    // $event.target[0].style = 'display: none;';
  }

  // 删除上传数据按钮
  deleteImageUpload() {
    // 数据初始化归零
    this.postRequst.img = '';
    this.source = '';
    this.percent = '';
    this.ImgCode = '';
    // this.uploading = false;
    this.imgdom = '';
    this.fileList = [];
    this.imgFormData = '';
    this.uploadClick = 0;
  }

  // 上传按钮是否能点击
  disabled() {
    // 判断是否该图片略缩图编码解析以及是否获取该文件
    if (this.source && this.imgFormData) {
      return true;
    } else {
      return false;
    }
  }
  // 上传图片
  postAddedImg() {
    // 上传格式为formdata
    let formData = new FormData();
    // 使用append把上传的接口字段和上传的文件塞进去
    formData.append('file', this.imgFormData);
    const api = '/ajax/a/u/img/task';
    // 订阅进程
    const req = new HttpRequest('POST', '/ajax/a/u/img/task', formData, {
      reportProgress: true,
    });
    console.log(this.ImgCode);
    // 产生一个 event 流
    this.http.request(req).subscribe((event: any) => {
      // 上传步骤
      if (event.type === HttpEventType.UploadProgress) {
        console.log(event);
        if (event.total > 0) {
          // 计算上传的百分比
          this.percent = (event.loaded / event.total) * 100;
          console.log(this.percent);
        }
      }
      if (event.type == HttpEventType.Response) {
        if (event.status == 200) {
          console.log(event, '打印完成后的event');
          this.postRequst.img = event.body.data.url;
          // this.data = Response.data;
          // this.ImgCode = Response.code;
          console.log(this.data, Response);
        }
      }
    });
    this.uploadClick = 1;
  }

  // 如果输入发生了更改(选中的文件)，我们将该文件投影到img预览器中
  get($event: Event) {
    // 获取文件本身大于2mb，则提示文件过大且取消该文件
    if ($event.target['files'][0].size / 1024 / 1024 > 2) {
      this.msg.error('文件过大！请上传小于2MB的文件！');
      $event.target['files'] = '';
      console.log($event.target['files'], '查看是否删除该文件');
    } else {
      this.imgFormData = $event.target['files'][0];
      // 我们使用$event.target['files'][0]访问文件
      this.projectImage($event.target['files'][0]);
      console.log(this.imgFormData, '-----------------------------');
    }
  }
  // 读取文件，转码获取略缩图
  projectImage(file: File) {
    // 建立读取新实例
    let reader = new FileReader();
    // TODO:定义“e”的类型，onload是载入的意思,读取中事件
    reader.onload = (e: any) => {
      // 简单地设置e.target
      this.source = e.target.result;
      this.onChange.emit(file);
      // console.log('读取结束', this.source);
    };
    // 这将处理我们的文件并获得它的属性/数据，下为编码base64
    this.postRequst.img = reader.readAsDataURL(file);
    // 读取结束事件
    reader.onloadend = (e: any) => {
      console.log(reader.onloadend);
    };
    console.log(this.postRequst.img);
  }
  // 转换字节为正常文件，可根据需求转换单位
  getfilesize(size) {
    // 非字节输出字符串
    if (!size) {
      return '';
    }
    const num = 1024.0; // byte
    // if (size < num) {
    //   return size + 'B';
    // }
    // if (size < Math.pow(num, 2)) {
    //   return (size / num).toFixed(2) + 'KB';
    // } // kb
    // if (size < Math.pow(num, 3)) {
    return (size / Math.pow(num, 2)).toFixed(2) + 'MB';
    // } // M
    // if (size < Math.pow(num, 4)) {
    //   return (size / Math.pow(num, 3)).toFixed(2) + 'G';
    // } // G
    // return (size / Math.pow(num, 4)).toFixed(2) + 'T'; // T
  }
  aaa;
  // 为文件上传默认列表
  // uploading = false;
  fileList: UploadFile[] = [];
  // 编辑该页面，获取该id数据。
  redact(id) {
    let url = '/ajax/a/article/' + id;
    this.http.get<any>(url).subscribe((event: any) => {
      let data = event.data.article;
      console.log(data);
      // if (event.code === 0) {
        this.aaa = data.url;
      this.profileForms.patchValue({
        title: data.title,
        type: data.type.toString(),
        jumpLink: data.url,
        status: data.status,
        industry: data.industry.toString(),
      });
      // this.profileForms.value.title = data.title;
      // this.profileForms.value.type = data.type;
      // this.profileForms.value.jumpLink = data.url;
      // this.profileForms.value.status = data.status;
      // this.profileForms.value.industry = data.industry;
      this.postRequst.img = data.img;
      this.source = data.img;
      this.editor.txt.append(data.content)  ;
      // }
      console.log(this.profileForms.value);
    });
  }

  // 初始执行函数
  getUrlId() {
    // 若是URL参数有值，则取该值读取数据,并请求该数据。
    if (this.getQueryVariable('ID')) {
      // 执行获取url参数并且发送请求。

      console.log(this.getQueryVariable('ID'));
      this.redact(this.getQueryVariable('ID'));
    }
  }
  // 获取url值函数
  getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      if (pair[0] == variable) {
        return pair[1];
      }
    }
    return false;
  }
  statusValue = <any>{
    id: '',
    status,
  };
  cancel() {
    this.router.navigateByUrl('home/list?page=1&size=10');
  }

  huoqu() {
    console.log(this.profileForms.value);
    let i = 1;
    i++;
    this.profileForms.value;
  }
}
