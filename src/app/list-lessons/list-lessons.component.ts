import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Lesson} from "../shared/model/lesson";

@Component({
  selector: 'list-lessons',
  templateUrl: './list-lessons.component.html',
  styleUrls: ['./list-lessons.component.css']
})
export class ListLessonsComponent implements OnInit {

  @Input()
  lessons: Lesson[];

  @Output('lesson')
  lessonEmitter = new EventEmitter<Lesson>();

  constructor() { }

  ngOnInit() {
  }

  selectLesson(lesson: Lesson){
    this.lessonEmitter.emit(lesson);
  }

}
