import {
  Component,
  ElementRef,
  Renderer2,
  Output,
  EventEmitter,
} from '@angular/core';
import * as wangEditor from '../../../node_modules/wangeditor/release/wangEditor.js';

@Component({
  selector: 'editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent {
  private editor: any;
  @Output() onPostData = new EventEmitter();

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    let editordom = this.el.nativeElement.querySelector(
      '#editorMenu'
    );
    this.editor = new wangEditor(editordom);
    this.editor.customConfig.uploadImgShowBase64 = true;
    this.editor.create();
  }

  clickHandle(): any {
    let data = this.editor.txt.text();
    return data;
  }
}
