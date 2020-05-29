import { SharedService } from "../shared/shared.service";


import { Component, OnInit } from '@angular/core';
import { Identifiers } from '@angular/compiler';
import { stringify } from 'querystring';

export interface tableDialog {
  type;
  bytes64: string;
  crc: string;
  drop: string;
  fragments: string;
  link_down: string;
  action: {
    resultType;
    device;
    macs;
    logs;
  };
}

var dialogTableData: tableDialog[] = [];

@Component({
  selector: 'app-result-dialog',
  templateUrl: './result-dialog.component.html',
  styleUrls: ['./result-dialog.component.css']
})
export class ResultDialogComponent implements OnInit {

  currentLocale: string = "ru-RU";

  // shared data for serach results dialog
  sharedData;
  sharedDataStringified;
  processedData = {
    id: "",
    bytes64: "",
    crc: "",
    drop: "",
    fragments: "",
    link_down: "",
    groupName: "",
    resultsType: "",
  }

  tableDialogDataToShow;

  displayedColumns: string[] = [
    'type',
    'bytes64',
    'crc',
    'drop',
    'fragments',
    'link_down',
    'action',
  ];

  constructor(
    private sharedService: SharedService,
  ) { }

  ngOnInit() {
    this.sharedService.sharedSearchResultsJSON.subscribe(results => this.sharedData = results);
    this.prepareTable();
  }

  public timestampToDate(unix, locale){
    var date = new Date(unix).toLocaleString(locale);
    return date;
  }

  generateStringValueDate(value, date) {
    var string: string = value + " / " + this.timestampToDate(date, this.currentLocale);
    return string;
  }

  prepareTable() {
    this.sharedDataStringified = JSON.stringify(this.sharedData);

    for (var i = 0, len = this.sharedData.allResults.length; i < len; i++) {
      if (this.sharedData.allResults[i].model[0] == this.sharedData.groupName) {
        
        var processedData = {
          type: this.sharedData.allResults[i]._id ,
          bytes64: this.generateStringValueDate(this.sharedData.allResults[i]["64bytes"].value, this.sharedData.allResults[i]["64bytes"].time), //[0]["64bytes"]
          crc: this.generateStringValueDate(this.sharedData.allResults[i].crc.value, this.sharedData.allResults[i].crc.time),
          drop: this.generateStringValueDate(this.sharedData.allResults[i].drop.value, this.sharedData.allResults[i].drop.time),
          fragments: this.generateStringValueDate(this.sharedData.allResults[i].fragments.value, this.sharedData.allResults[i].fragments.time),
          link_down: this.generateStringValueDate(this.sharedData.allResults[i].link_down.value, this.sharedData.allResults[i].link_down.time),
          action: {
            resultType: this.sharedData.resultsType,
            device: this.sharedData.allResults[i]._id
          }
        }

        dialogTableData[i] = {
          type: processedData.type,
          bytes64: processedData.bytes64,
          crc: processedData.crc,
          drop: processedData.drop,
          fragments: processedData.fragments,
          link_down: processedData.link_down,
          action: {
            resultType: processedData.action.resultType,
            device: processedData.action.device,
            macs: '',
            logs: '',
          }
        }
      }
    }

    this.processedData.groupName = this.sharedData.groupName;

    this.tableDialogDataToShow = dialogTableData;
    dialogTableData = [];

    // this.sharedService.updateJSON({});
  }

  showLogs(deviceToShow) {

  }

}