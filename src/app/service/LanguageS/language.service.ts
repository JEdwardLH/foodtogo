import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private httpClient: HttpClient) { }
  getLanguage() {
    var lang = "en";
    if(localStorage.language == "th"){
      lang = "th"
    }else{
      lang = "en"
    }
    return this.httpClient.get('https://hungrynow-administrator-14520.firebaseio.com/hungrynow/weblate/hungrynow-fooddelivery/'+lang+'.json',{  })
  }

}
