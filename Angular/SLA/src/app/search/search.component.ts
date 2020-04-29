import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  inputToSearchByIP: string;
  inputToSearchByMAC: string;

  // is Authorization complete
  @Input() isAuth: boolean;

  // data for HTTP GET
  @Input() currentToken;
  @Input() proxyURL;
  @Input() currentSLAURL;
  searchByIPURL = "api/ips/";

  constructor(private http: HttpClient) { }

  ngOnInit(): void { }

  searchByIPInput(event: any) {
    const value = event.target.value
    this.inputToSearchByIP = value
    //console.log(this.searchByIPInput)
  }

  searchByMACInput(event: any) {
    const value = event.target.value
    this.inputToSearchByMAC = value
    //console.log(this.searchByIPInput)
  }

  searchByIP() {
    if (this.isAuth == true) {
      this.http.get(this.proxyURL + this.currentSLAURL + this.searchByIPURL, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'token': this.currentToken
        })
      }).toPromise().then((data: any) => {
        const receivedIPSearchJSON = data;
        // this.stringifiedJSON = JSON.stringify(data.receivedJSON);

      });
    }
  }

  clearAllFields(){
    console.log("clearAllFields()")
    this.inputToSearchByIP = '1';
    this.inputToSearchByMAC = "1";
  }

  deviceSearch(){

  }

  showDevicesList(){}
  
}
