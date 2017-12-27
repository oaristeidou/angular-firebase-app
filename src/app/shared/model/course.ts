import {Lesson} from "./lesson";
import {Observable} from "rxjs/Rx";
import {snapshotChanges} from "angularfire2/database";


export class Course {

  constructor(public key: string,
              public url: string,
              public description: string,
              public iconUrl: string,
              public courseListIcon: string,
              public longDescription: string) {

  }

  static fromJson(json): Course {
    const courseValue = json.payload.val();
    return new Course(
      json.payload.key,
      courseValue.url,
      courseValue.description,
      courseValue.iconUrl,
      courseValue.courseListIcon,
      courseValue.longDescription
    );
  }

  static fromJsonArray(json: any[]): Course[] {
    return json.map(Course.fromJson);
  }


}


