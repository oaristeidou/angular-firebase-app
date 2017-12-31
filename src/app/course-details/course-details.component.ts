import {Component, OnInit} from '@angular/core';
import {CoursesService} from "../shared/model/courses.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {Course} from "../shared/model/course";
import {Lesson} from "../shared/model/lesson";

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  course$: Observable<Course>;
  lessonsArray: Lesson[];
  course: Course;

  courseUrl: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
              private coursesService: CoursesService) {
  }

  ngOnInit() {
    this.courseUrl = this.route.snapshot.params['id'];
    this.course$ = this.coursesService.findCourseByUrlNew(this.courseUrl);
    this.course$.subscribe(course => this.course=course);

    const lessons$ = this.coursesService.loadFirstLessonsPage(this.courseUrl, 3);

    lessons$.subscribe(lessons => this.lessonsArray=lessons);
  }

  previous(){
    this.coursesService.loadPreviousPage(
      this.courseUrl,
      this.lessonsArray[0].key,
      3)
      .subscribe(lessons => this.lessonsArray=lessons);
  }

  next(){
    this.coursesService.loadNextPage(
      this.courseUrl,
      this.lessonsArray[this.lessonsArray.length-1].key,
      3)
      .subscribe(lessons => this.lessonsArray=lessons);
  }

  navigateToLesson(lesson: Lesson){
    this.router.navigate(['lessons', lesson.url]);
  }



}
