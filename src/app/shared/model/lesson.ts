/**
 * Created by odyssefs on 21.12.17.
 */
export class Lesson {
  constructor (
    public key:string,
    public description: string,
    public duration:string,
    public url: string,
    public tags: string,
    public pro: boolean,
    public longDescription: string,
    public courseId: string
  ){}


  get isBegginer(){
      return this.tags && this.tags.includes('BEGINNER');
  }

  static fromJsonToList(array): Lesson[]{
    return array.map(Lesson.fromJson);
  }

  static fromJson(json): Lesson {
    return new Lesson(

      json.key,
      json.description,
      json.duration,
      json.url,
      json.tags,
      json.pro,
      json.longDescription,
      json.courseId);
  }
}
