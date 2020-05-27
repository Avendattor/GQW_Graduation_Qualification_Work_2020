import { SharedService } from "../search/shared/shared.service";

import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { group } from '@angular/animations';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';


export interface tableIPMACSearch {
  Model: string;
  IPs: number;
  List: string;
}

const TEST_TABLE_DATA: tableIPMACSearch[] = [
  { Model: 'DIR-8', IPs: 10, List: "param1" },
  { Model: 'DIR-77', IPs: 20, List: "param2" },
  { Model: 'DIR-666', IPs: 5, List: "param3" },
];

var TABLE_DATA: tableIPMACSearch[] = [];


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  inputToSearchByIP: string = null;
  inputToSearchByMAC: string;

  currentSearchType: string;
  areResultsFound: boolean = false;

  models;

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

  receivedIPMACSearchJSON;
  parsedIPMACSearchJSON: object;
  // data for table with results
  tableDataToShow;
  displayedColumns: string[] = [
    'Model',
    'IPs',
    // 'List'
  ];
  // is Authorization complete
  @Input() isAuth: boolean;

  // data for HTTP GET
  @Input() currentToken;
  @Input() proxyURL;
  @Input() currentSLAURL;
  searchByIPURL = "ips/";
  searchByMACURL = "macs/";

  // search type: IP or MAC, needed for results table
  currentResultsType: string = '';

  // indicates search process (for spinner)
  searchProgress: boolean = false;

  // shared data for serach results dialog
  searchResultsForDialogMAC;
  searchResultsForDialogIP;

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private sharedService: SharedService,
  ) { }

  ngOnInit(): void {
    this.sharedService.sharedMessage.subscribe(message => this.searchResultsForDialogMAC = message);

  }

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
    this.IPMACFilterSearch[7] = event.target.value
  }

  SearchFilterDeviceSoftware(event: any) {
    this.IPMACFilterSearch[8] = event.target.value
  }

  SearchFilterSerialNumber(event: any) {
    this.IPMACFilterSearch[9] = event.target.value
  }

  SearchFilterLFTD(event: any) {
    this.IPMACFilterSearch[5] = event.target.value
  }

  SearchFilterMFTD(event: any) {
    this.IPMACFilterSearch[6] = event.target.value
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
      this.currentSearchType = 'IP';
      this.searchProgress = true;

      // search for all results if field is empty
      if (this.inputToSearchByIP == null || this.inputToSearchByIP == "") {
        this.searchByMAC()
      }
      else {
        var toSearchByIP = this.inputToSearchByIP;
        this.http.post(this.proxyURL + this.currentSLAURL + this.searchByIPURL + toSearchByIP, this.formJSONforIPMACSearch(), {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'token': this.currentToken
          })
        }).toPromise().then((data: any) => {
          var receivedIPSearchJSON = data;
          if (receivedIPSearchJSON.length == 0) {
            alert("Nothing found by IP");
            this.searchProgress = false;
          }
          else if (receivedIPSearchJSON.length >= 0) {
            this.showSearchResults(receivedIPSearchJSON);
            this.areResultsAreFound(true, 0);
            // alert(receivedIPSearchJSON.length + " Results found");
          }
        });
      }
    }
  }

  searchByMAC() {
    if (this.isAuth == true) {
      this.searchProgress = true;
      this.currentSearchType = 'MAC';
      // search for all results if field is empty
      if (this.inputToSearchByMAC == null || this.inputToSearchByMAC == "") {
        var toSearchByMAC = "all";
      }
      else {
        toSearchByMAC = this.inputToSearchByMAC;
      }

      this.http.post(this.proxyURL + this.currentSLAURL + this.searchByMACURL + toSearchByMAC, this.formJSONforIPMACSearch(), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'token': this.currentToken
        })
      }).toPromise().then((data: any) => {
        var receivedMACSearchJSON = data;
        if (receivedMACSearchJSON.length == 0) {
          alert("Nothing found by MAC");
          this.searchProgress = false;
          this.areResultsAreFound(false, 100);
        }
        else if (receivedMACSearchJSON.length >= 0) {
          this.showSearchResults(receivedMACSearchJSON);
          this.areResultsAreFound(true, 1);
        }
      });
    }
  }

  areResultsAreFound(areFound: boolean, type: number) {
    if (areFound == true) {
      switch (type) {

        // IP search
        case 0:
          this.currentResultsType = 'IP';
          break;

        // MAC search
        case 1:
          this.currentResultsType = 'MAC';
          break;

        default:
          break;
      }
      this.areResultsFound = true;
      this.searchProgress = false;

    } else if (areFound == false) {
      this.areResultsFound = false;
    }
  }

  showSearchResults(receivedIPMACSearchJSON) {
    this.parsedIPMACSearchJSON = this.parseReceivedData(receivedIPMACSearchJSON);
    this.receivedIPMACSearchJSON = receivedIPMACSearchJSON;
    // console.log(this.parsedIPSearchJSON);

    this.models = receivedIPMACSearchJSON.reduce((models, parsedArrayItem, index, array) => {
      if (!models.find(model => parsedArrayItem.model.toString() === model)) {
        models.push(parsedArrayItem.model.toString())
      }
      return models;
    }, [])

    // console.log(models);
    // console.log("Models total: " + models.length);

    this.prepareTableDataToShow(receivedIPMACSearchJSON, this.models);
  }

  prepareTableDataToShow(receivedData: any, models: any) {

    // // for test
    // this.tableDataToShow = TEST_TABLE_DATA;

    // for prod
    for (var i = 0, lenModels = models.length; i < lenModels; i++) {

      var numberOfIPs: number = 0;

      // counting devices (IPs) quantity
      for (var j = 0, len = receivedData.length; j < len; j++) {
        if (receivedData[i].model == models[i]) {
          numberOfIPs++;
        }
      }

      // filling one table row
      TABLE_DATA[i] = {
        Model: models[i],
        IPs: numberOfIPs,
        List: models[i]
      }

      numberOfIPs = 0;
    }
    this.tableDataToShow = TABLE_DATA;

    // necessary for table update on each search
    TABLE_DATA = []
  }

  parseReceivedData(dataToParse: any) {
    var dataStringified = JSON.stringify(dataToParse);
    var parsedData = JSON.parse(dataStringified);
    return parsedData;
  }

  clearAllFields() {
    //console.log("clearAllFields()");
    this.inputToSearchByIP = undefined;
    //console.log(this.inputToSearchByIP);
    this.inputToSearchByMAC = undefined;
  }

  deviceSearch() {

  }

  showDevicesList(modelsGroupToShow: Number) {
    // console.log(modelsGroupToShow);
    this.openResultDialog(modelsGroupToShow);
  }

  openResultDialog(dataToShow) {
    const dialogRef = this.dialog.open(SearchResultDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });

    this.newMessage(dataToShow);
    this.searchResultsForDialogMAC = dataToShow;
  }

  newMessage(dataToShow) {
    this.sharedService.nextMessage(dataToShow)
  }

  generateEndingOfTheWord(dataToProccess) {
    if (dataToProccess.length == 1 || dataToProccess.length == -1) {
      return '';
    }

    else {
      return 's';
    }
  }
}

@Component({
  selector: 'search-result-dialog.component',
  templateUrl: 'search-result-dialog.component.html',
})
export class SearchResultDialogComponent {

  // shared data for serach results dialog
  searchResultsForDialogMAC;
  searchResultsForDialogIP;

  constructor(
    private sharedService: SharedService,
  ) { }

  ngOnInit() {
    this.sharedService.sharedMessage.subscribe(message => this.searchResultsForDialogMAC = message);
  }

  newMessage() {
    this.sharedService.nextMessage("message from dialog");
  }

}
