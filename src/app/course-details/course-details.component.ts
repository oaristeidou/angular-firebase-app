import { Component, OnInit } from '@angular/core';
import {CoursesService} from "../shared/model/courses.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService) { }

  ngOnInit() {
    const courseUrl=this.route.snapshot.params['id'];
    this.coursesService.findLessonsForCourse(courseUrl);
  }

}
