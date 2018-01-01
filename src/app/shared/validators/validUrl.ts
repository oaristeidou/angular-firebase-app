import {FormControl} from "@angular/forms";
export function validUrl(crtl: FormControl) {

  const urlValue = crtl.value;

  const valid = /^(ftp|http|https):\/\/[^ "]+$/.test(urlValue);

  return valid ? null : {
    validUrl: {
      valid: false
    }
  }

}
