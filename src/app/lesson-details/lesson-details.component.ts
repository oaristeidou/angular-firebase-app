import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LessonsService} from "../shared/model/lessons.service";
import {Lesson} from "../shared/model/lesson";
import * as _ from 'lodash';

@Component({
  selector: 'app-lesson-details',
  templateUrl: './lesson-details.component.html',
  styleUrls: ['./lesson-details.component.css']
})
export class LessonDetailsComponent implements OnInit {

  lesson: Lesson;


  constructor(private router: Router,
              private route: ActivatedRoute,
              private lessonService: LessonsService) {
  }


  ngOnInit() {
    this.route.params.switchMap(params => {
      const lessonUrl = params['id'];
      return this.lessonService.findLessonByUrl(lessonUrl);
    })
    .subscribe(lesson => this.lesson = lesson);
  }

  nextLesson() {
    this.lessonService.loadNextLesson(this.lesson.courseId, this.lesson.key)
      .subscribe(
        this.navigateToLesson.bind(this)
      );

  }

  previousLesson() {
    this.lessonService.loadPreviousLesson(this.lesson.courseId, this.lesson.key)
      .subscribe(
        this.navigateToLesson.bind(this)
      );

  }

  private navigateToLesson(lesson: Lesson) {
    this.router.navigate(['lessons', lesson.url]);
  }


}
