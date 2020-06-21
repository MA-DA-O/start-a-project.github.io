import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RequiredParametersService {
  constructor() {}
  listModul = <any>{
    title: '',
    author: '',
    startAt: '',
    endAt: '',
    type: '',
    status: '',
    img: '',
    size: 10,
    page: 1,
  };
  allList = <any>{
    title: '',
    author: '',
    startAt: '',
    endAt: '',
    type: '',
    status: '',
    img: '',
    size: 100000,
    page: 1,
  };
}
