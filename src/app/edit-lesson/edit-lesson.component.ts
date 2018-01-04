import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Lesson} from "../shared/model/lesson";
import {LessonsService} from "../shared/model/lessons.service";

@Component({
  selector: 'app-edit-lesson',
  templateUrl: './edit-lesson.component.html',
  styleUrls: ['./edit-lesson.component.css']
})
export class EditLessonComponent implements OnInit {

  lesson: Lesson;

  constructor(private route: ActivatedRoute, private lessonService: LessonsService) {
    route.data
      .do(console.log)
      .subscribe(
        data => this.lesson = data['lesson']
      )
  }

  ngOnInit() {
  }

  saveLesson(lesson: Lesson){
    this.lessonService.saveLesson(this.lesson.key, lesson)
      .subscribe(
        ()=>{
          alert('Lesson successfully saved!');
        },
        err=> alert(`Error saving lesson ${err}`)
      )
  }

}
