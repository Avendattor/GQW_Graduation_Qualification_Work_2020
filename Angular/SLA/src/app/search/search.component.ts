import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  inputToSearchByIP: string = null;
  inputToSearchByMAC: string;

  IPMACFilterSearch: object = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
  ];

  receivedIPSearchJSON;

  // is Authorization complete
  @Input() isAuth: boolean;

  // data for HTTP GET
  @Input() currentToken;
  @Input() proxyURL;
  @Input() currentSLAURL;
  searchByIPURL = "ips/";

  constructor(private http: HttpClient) { }

  ngOnInit(): void { }

  searchByIPInput(event: any) {
    const value = event.target.value
    this.inputToSearchByIP = value
    //console.log(this.inputToSearchByIP)
  }

  searchByMACInput(event: any) {
    const value = event.target.value
    this.inputToSearchByMAC = value
    //console.log(this.inputToSearchByMAC)
  }

  // searchFilterInput(event: any) {
  //   const drop = event.target.value[0]
  //   this.IPMACFilterSearch[0] = drop
  // }

  SearchFilterDROP(event: any) {
    this.IPMACFilterSearch[0] = event.target.value
  }

  SearchFilterCRC(event: any) {
    this.IPMACFilterSearch[1] = event.target.value
  }

  SearchFilterFragments(event: any) {
    this.IPMACFilterSearch[2] = event.target.value
  }

  SearchFilterLinkDown(event: any) {
    this.IPMACFilterSearch[3] = event.target.value
  }

  SearchFilter64bytes(event: any) {
    this.IPMACFilterSearch[4] = event.target.value
  }

  SearchFilterDeviceModel(event: any) {
    this.IPMACFilterSearch[5] = event.target.value
  }

  SearchFilterDeviceSoftware(event: any) {
    this.IPMACFilterSearch[6] = event.target.value
  }

  SearchFilterSerialNumber(event: any) {
    this.IPMACFilterSearch[7] = event.target.value
  }

  SearchFilterLFTD(event: any) {
    this.IPMACFilterSearch[8] = event.target.value
  }

  SearchFilterMFTD(event: any) {
    this.IPMACFilterSearch[9] = event.target.value
  }

  formJSONforIPMACSearch() {
    return {
      "drop": this.IPMACFilterSearch[0],
      "crc": this.IPMACFilterSearch[1],
      "fragments": this.IPMACFilterSearch[2],
      "linkDown": this.IPMACFilterSearch[3],
      "64bytes": this.IPMACFilterSearch[4],
      "ltDate": this.IPMACFilterSearch[5],
      "gtDate": this.IPMACFilterSearch[6],
      "deviceModel": this.IPMACFilterSearch[7],
      "deviceSoftware": this.IPMACFilterSearch[8],
      "serialNumber": this.IPMACFilterSearch[9]
    }
  }

  searchByIP() {
    // console.log(`Token: `+this.currentToken)
    if (this.isAuth == true) {

      // search for all results if field is empty
      if (this.inputToSearchByIP == null || this.inputToSearchByIP == "") {
        var toSearchByIP = "all";
      }
      else {
        toSearchByIP = this.inputToSearchByIP;
      }

      this.http.post(this.proxyURL + this.currentSLAURL + this.searchByIPURL + toSearchByIP, this.formJSONforIPMACSearch(), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'token': this.currentToken
        })
      }).toPromise().then((data: any) => {
        this.receivedIPSearchJSON = data;
        //console.log(this.receivedIPSearchJSON);
        // this.stringifiedJSON = JSON.stringify(data.receivedJSON);
        // this.inputToSearchByIP = null
      });
    }
  }

  clearAllFields(){
    //console.log("clearAllFields()");
    this.inputToSearchByIP = undefined;
    //console.log(this.inputToSearchByIP);
    this.inputToSearchByMAC = undefined;
  }

  deviceSearch(){

  }

  showDevicesList(){}
  
}
