import { Component, OnInit } from '@angular/core';
import getISOWeek from 'date-fns/getISOWeek';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import setHours from 'date-fns/setHours';
import { en_US, NzI18nService, zh_CN, id_ID } from 'ng-zorro-antd/i18n';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequiredParametersService } from '../../service/required-parameters.service'; // 服务引入接口返回字段类型
import { SerializationService } from '../../service/serialization.service'; // 服务引入接口返回字段类型
import { Router, ActivatedRoute } from '@angular/router';
import { element } from 'protractor';
import { stat } from 'fs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  }),
};

@Component({
  selector: 'app-article-list', // 选择器
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent implements OnInit {
  constructor(
    public http: HttpClient,
    private i18n: NzI18nService,
    private requiredparameters: RequiredParametersService,
    private serialization: SerializationService,
    private router: Router,
    private routerr: ActivatedRoute
  ) {} // 在构造函数声明

  data: any = [];
  dataObj: any = [];
  dataText: any = [];
  dataObjText: any = [];
  pagesize = 10;
  PageIndex = 1;
  listModul = this.requiredparameters.listModul;
  paramFormat = this.serialization.paramFormat;
  allList = this.requiredparameters.allList;
  startTime = '';
  endTime = '';
  // selectStatus = '';
  isVisible = false;
  // 下拉框方法返回值，解耦
  selectFn(a) {
    let b = a;
    return parseInt(b);
  }
  // 该方法是变更时间戳。返回变更过的数据。
  changeData(a) {
    let b = a;
    if (b) {
      return b.getTime();
      console.log('打印gettime', b.gerTime());
    }
  }

  //  请求参数方法,该listmodul是形参，使用时传入请求参数
  getList(list) {
    const api = 'a/article/search';
    return this.http.get<any>(
      `/ajax/${api}`, // 模板语法字符串
      { params: list }
    );
  }
  // 判断该url参数
  URLparams() {
    if (this.listModul.status || this.listModul.type || this.startTime) {
      this.router.navigate(['home/list'], {
        queryParams: {
          page: this.listModul.page,
          size: this.listModul.size,
          status: this.listModul.status,
          type: this.listModul.type,
          startAt: this.listModul.startAt,
          endAt: this.listModul.endAt,
        },
      });
    } else {
      this.router.navigate(['home/list'], {
        queryParams: { page: this.listModul.page, size: this.listModul.size },
      });
    }
    console.log(
      '日期请求数据查看',
      this.getQueryVariable('startAt'),
      this.listModul.startAt
    );
  }

  // 初始化执行函数
  ngOnInit(): void {
    console.log(this.listModul);
    this.ifpage();
  }
  // 回调函数关联分页，点击页码跳转，内部函数写请求函数
  searchData(): void {
    this.URLparams();
    this.getList(this.listModul).subscribe((response) => {
      this.data = response.data;
      this.dataObj = response.data.articleList;
    });
    console.log(this.router, '页码', this.listModul, this.data);
  }
  // 弹出和关闭日历的回调函数，固定写法
  onChange(result: Date): void {
    // 若候选日期大于前选日期，提示弹框
    if (this.endTime) {
      if (this.startTime > this.endTime) {
        this.showModal();
      }
    }
    console.log('onChange', result);
    console.log('搜索数据变更', this.listModul);
  }
  ifpage() {
    // 因为初始化未执行请求，所以获取的url参数是空值。需要赋值
    // 假设url是否为默认，若不是，则给请求参数 = url参数
    // 还需记录一个url变量关于侧边栏到URL上
    if (
      this.getQueryVariable('page') !== '1' ||
      this.getQueryVariable('status') ||
      this.getQueryVariable('type') ||
      this.getQueryVariable('startAt') ||
      this.getQueryVariable('size') !== '10'
    ) {
      this.getQueryVariable('size')
        ? (this.listModul.size = this.selectFn(this.getQueryVariable('size')))
        : (this.listModul.size = 10);
      this.getQueryVariable('page')
        ? (this.listModul.page = this.selectFn(this.getQueryVariable('page')))
        : (this.listModul.page = 1);
      this.getQueryVariable('status')
        ? (this.listModul.status = this.getQueryVariable('status'))
        : (this.listModul.status = '');
      this.getQueryVariable('type')
        ? (this.listModul.type = this.getQueryVariable('type'))
        : (this.listModul.type = '');
      this.getQueryVariable('startAt')
        ? (this.listModul.startAt = this.selectFn(
            this.getQueryVariable('startAt')
          ))
        : (this.listModul.startAt = '');
      this.getQueryVariable('endAt')
        ? (this.listModul.endAt = this.selectFn(this.getQueryVariable('endAt')))
        : (this.listModul.endAt = '');
      // this.startTime = this.getQueryVariable('startAt');
      // this.endTime = this.getQueryVariable('endAt');
      console.log(
        '请求url参数',
        this.listModul,
        'status:',
        this.getQueryVariable('status'),
        'page:',
        this.getQueryVariable('page'),
        'type:',
        this.getQueryVariable('type'),
        '开始时间:',
        this.getQueryVariable('startAt'),
        '结束时间:'
        // this.changeData(this.getQueryVariable('endAt'))
      );
      // 若是默认则执行默认
    } else {
      console.log('执行默认');
      this.clear();
    }
    console.log('请求数据参数', this.listModul);
    this.getList(this.listModul).subscribe((response) => {
      this.data = response.data;
      this.dataObj = response.data.articleList;
    });
    this.URLparams();
  }
  // 搜索按钮
  clickSearch() {
    // 需要重置一下page页，且size，按理说是需要先清空一次数据再进行请求。
    this.listModul.page = 1;
    if (this.startTime !== '' && this.endTime !== '') {
      this.listModul.startAt = this.changeData(this.startTime);
      this.listModul.endAt = this.changeData(this.endTime);
      console.log('开始时间', this.startTime);
    }
    console.log('下拉选择框', this.data, this.listModul);
    this.URLparams();
    this.getList(this.listModul).subscribe((response) => {
      this.data = response.data;
      this.dataObj = response.data.articleList;
    });
  }
  // 获取全部数据
  AllList() {
    this.getList(this.allList).subscribe((response) => {
      this.dataText = response.data;
      this.dataObjText = response.data.articleList;
    });
    console.log(
      '获取全部数据',
      this.dataObjText,
      this.dataText
      // this.reducedValB
    );
  }
  clear() {
    // 所有数据还原，且搜索框清空。
    this.startTime = '';
    this.endTime = '';
    // this.selectStatus = '';
    this.listModul.type = '';
    this.listModul.status = '';
    this.listModul.startAt = '';
    this.listModul.endAt = '';
    this.listModul.size = 10;
    this.listModul.page = 1;

    // this.search();
    console.log('清除数据恢复默认', this.listModul);
    // 当点击清除按钮时应该获取一次原始数据且清空url为重置。
    this.listModul.page = 1;
    this.router.navigate(['home/list'], {
      queryParams: { page: this.listModul.page },
    });
    this.getList(this.listModul).subscribe((response) => {
      this.data = response.data;
      this.dataObj = response.data.articleList;
    });
  }
  // 日期错误弹框
  showModal(): void {
    this.isVisible = true;
  }
  // 删除弹框
  delect = false;
  delectID;
  DelectShowModal(id): void {
    this.delect = true;
    this.delectID = id;
  }
  // 删除确定
  delectOK(): void {
    console.log('确认删除！');
    this.delect = false;
    // 执行删除函数
    this.deleteBtn(this.delectID);
    // this.router.navigateByUrl('home/wellcome');
    this.ifpage();
  }
  // 删除取消
  delectCancel(): void {
    console.log('取消删除！');
    this.delect = false;
  }
  // 日期错误弹框的ok
  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
    this.startTime = null;
    this.endTime = null;
    this.listModul.startAt = '';
    this.listModul.endAt = '';
  }
  // 日期错误弹框的取消
  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
    this.startTime = null;
    this.endTime = null;
    this.listModul.startAt = '';
    this.listModul.endAt = '';
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
  // 上线弹框提示，获取两个参数
  online = false;
  onlineID;
  onlineStatus;
  ClickOnline(id, status) {
    this.online = true;
    this.onlineID = id;
    this.onlineStatus = status;
  }
  // 上/下线确定
  OnlineOK(): void {
    if ((this.onlineStatus = 2)) {
      console.log('确认上线');
    } else {
      console.log('确认下线');
    }
    this.statusChange(this.onlineID, this.onlineStatus);
    this.online = false;
    // this.clickSearch();
  }
  // 上下线取消
  OnlineCancel(): void {
    console.log('取消该上线编辑!');
    this.online = false;
  }
  // 修改上下架
  statusChange(id, status) {
    this.statusValue.id = id;
    this.statusValue.status = status;
    console.log(this.statusValue, '上传参数查看');
    // this.paramFormat
    let url = '/ajax/a/u/article/status';
    this.http
      .put(url, this.paramFormat(this.statusValue), httpOptions)
      .subscribe((event: any) => {
        console.log(event);
        //  console.log()
        if (event.code === 0) {
          this.ifpage();
        }
      });
  }
  // 删除按钮
  deleteBtn(id) {
    let url = '/ajax/a/u/article/' + id;
    this.http.delete(url).subscribe((event: any) => {
      console.log(event);
      //  console.log()
    });
  }
  // 编辑
  redact(id) {
    let url = '/ajax/a/article/' + id;
    this.http.get<any>(url).subscribe((event: any) => {
      console.log(event);
      //  console.log()
      // 往url记录一个ID参数
      this.router.navigate(['home/newly'], {
        queryParams: { ID: event.data.article.id },
      });
    });
    // this.router.navigateByUrl('home/newly');
  }
}
