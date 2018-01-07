/**
 * Created by odyssefs on 07.01.18.
 */
export class AuthInfo {
  constructor(
    public $uid:string
  ){}

  isLoggedIn(){
      return !!this.$uid;
  }
}
