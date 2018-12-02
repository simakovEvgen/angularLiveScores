import { Component, OnInit } from '@angular/core';
import { LiveScopesService } from '../live-scopes.service';

export interface Countries {
  country_id: string;
  country_name: string;
}

export interface Leagues {
  country_id: string;
  country_name: string;
  league_id: string;
  league_name: string;
}

@Component({
  selector: 'app-live-scopes',
  templateUrl: './live-scopes.component.html',
  styleUrls: ['./live-scopes.component.scss']
})
export class LiveScopesComponent implements OnInit {

  displayedColumns: string[] = [
    'country_name',
    'league_name',
    'match_date',
    'match_status',
    'match_time',
    'match_hometeam_name',
    'match_hometeam_score',
    'match_awayteam_name'
  ];

  endDateObj;
  startDateObj;
  message: string;
  league: string;
  country: string;
  start_date: string;
  end_date: string;
  messagePopup = false;
  loader = false;
  results = [];
  countries: Countries[];
  leagues: Leagues[];
  selectedTab = 0;

  constructor(private API: LiveScopesService) { }

  ngOnInit() {
    // loader on
    this.loader = true;
    // Countries request
    this.API.getCounties().then(
      (results) => {
        console.log('Results (GET Countries): ', results);
        this.countries = results;
        this.loader = false;
      },
      (error) => {
        console.log('Error (GET Countries): ', error);
        this.message = 'Server Error (Countries)';
        this.messagePopup = true;
        return;
      }
    );
    // Leagues request
    this.API.getLeagues().then(
      (results) => {
        console.log('Results (GET Leagues): ', results);
        this.leagues = results;
        this.loader = false;
      },
      (error) => {
        console.log('Error (GET Leagues): ', error);
        this.message = 'Server Error (Countries)';
        this.messagePopup = true;
        return;
      }
    );
  }

  closeMessagePopup = () => {
    // close message Popup
    this.messagePopup = false;
  }

  addDate = (type: string, event) => {
    // create valid dateString
    const fullYear = event.value.getFullYear();
    const month = event.value.getMonth();
    const day = event.value.getDate();
    const string = fullYear + '-' + month + '-' + day;
    // check who use
    if (type === 'start') {
      // set startDateObj for check before request
      this.startDateObj = event.value;
      // set start_date for request
      this.start_date = string;
    } else {
      // set end_date for request
      this.end_date = string;
      // set startDateObj for check before request
      this.endDateObj = event.value;
    }
  }

  search = () => {
    // check date formats
    if (this.startDateObj > this.endDateObj) {
      // date error view
      this.message = 'End Date should be lower than Start Date for search. Please enter write Date.';
      this.messagePopup = true;
      return;
    }
    // loader on
    this.loader = true;
    this.API.search(this.start_date, this.end_date, this.league, this.country).then(
      (results) => {
        if (results.error) {
          // loader off
          this.loader = false;
          // error set
          this.message = 'Not Found';
          // error view
          this.messagePopup = true;
        } else {
          // switch to new results tab
          this.selectedTab = this.results.length;
          // loader off
          this.loader = false;
          // add results to tabs
          this.results.push({
            date: new Date(),
            data: results
          });
        }
        console.log(this.results);
      },
      (error) => {
        // loader off
        this.loader = false;
        // error view
        this.message = 'Server Error: 500';
        this.messagePopup = true;
        console.log('Error', error);
      }
    );
  }
}
