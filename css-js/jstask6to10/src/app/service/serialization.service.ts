import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SerializationService {
// 序列化参数
  constructor() { }
  paramFormat(data: any) {
    // tslint:disable-next-line: one-variable-per-declaration
    let paramStr = '',
      name,
      value,
      subName,
      innerObj;
    let that = this;
    // tslint:disable-next-line: forin
    for (name in data) {
      value = data[name];
      if (value instanceof Array) {
        for (let i of value) {
          subName = name;
          innerObj = {};
          innerObj[subName] = i;
          paramStr += this.paramFormat(innerObj) + '&';
        }
      } else if (value instanceof Object) {
        // tslint:disable-next-line: only-arrow-functions
        Object.keys(value).forEach(function (key) {
          subName = name + '[' + key + ']';
          innerObj = {};
          innerObj[subName] = value[key];
          paramStr += that.paramFormat(innerObj) + '&';
        });
      } else if (value !== undefined && value !== null) {
        paramStr +=
          encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
      }
    }
    return paramStr.length ? paramStr.substr(0, paramStr.length - 1) : paramStr;
  }
}
