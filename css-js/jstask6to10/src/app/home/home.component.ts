import { Component, OnInit } from '@angular/core';
import { RequiredParametersService } from '../service/required-parameters.service'; // 服务引入接口返回字段类型
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private requiredparameters: RequiredParametersService,
    private router: Router
  ) {}
  listModul = this.requiredparameters.listModul;
  navChild = [
    ['公司信息', '职位信息'],
    ['article管理'],
    [
      { name: '账号管理', url: 'https://www.baidu.com' },
      { name: '角色管理', url: 'https://www.baidu.com' },
      { name: '修改密码', url: 'https://www.baidu.com' },
      { name: '模块管理', url: 'https://www.baidu.com' },
    ],
  ];
  navChildOf = [];
  ngOnInit(): void {
    console.log('获取window。location', window.location);
    this.ifNav();
  }
  golist() {
    this.router.navigateByUrl('home/list');
  }
  // 该值用来判断是否点击过侧边栏按钮。
  article;
  // 查询当前路由，是否处于当前article路由，若是高亮该按钮。
  ifNav() {
    // 初始执行判断，若是URL参数nav是有值的则返回
    console.log('查询当前路由地址', window.location.pathname);
    if (
      window.location.pathname === '/home/list' ||
      window.location.pathname === '/home/newly'
    ) {
      // 从url读取值
      this.article = true;
    }
  }
  list(){
    this.router.navigateByUrl('home/list?page=1&size=10');
  }
  // 记录参数到url
}
