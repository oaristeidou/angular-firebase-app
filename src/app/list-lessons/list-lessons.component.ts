import {Component, Input, OnInit} from '@angular/core';
import {Lesson} from "../shared/model/lesson";

@Component({
  selector: 'list-lessons',
  templateUrl: './list-lessons.component.html',
  styleUrls: ['./list-lessons.component.css']
})
export class ListLessonsComponent implements OnInit {

  @Input()
  lessons: Lesson[];

  constructor() { }

  ngOnInit() {
  }

}
