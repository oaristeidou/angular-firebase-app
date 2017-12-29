import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {LessonsService} from "../shared/model/lessons.service";
import {Lesson} from "../shared/model/lesson";

@Component({
  selector: 'app-lesson-details',
  templateUrl: './lesson-details.component.html',
  styleUrls: ['./lesson-details.component.css']
})
export class LessonDetailsComponent implements OnInit {

  lesson: Lesson;


  constructor(private route: ActivatedRoute,
              private lessonService: LessonsService) {
  }


  ngOnInit() {
    const lessonUrl = this.route.snapshot.params['id'];
    const lesson$ = this.lessonService.findLessonByUrl(lessonUrl)
      .subscribe(lesson => this.lesson = lesson);
  }


}
