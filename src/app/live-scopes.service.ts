import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LiveScopesService {

  private API_KEY = '783ec1142cd13fa7a8944dfb7b2b9284f7a691d0752a6360d16fe39865d375b7';

  constructor(private http: HttpClient) { }

  getCounties(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get('https://apifootball.com/api/?action=get_countries&APIkey=' + this.API_KEY)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }

  getLeagues(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get('https://apifootball.com/api/?action=get_leagues&APIkey=' + this.API_KEY)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }

  search(start_date, end_date, league, country): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(
        'https://apifootball.com/api/?action=get_events&from='
        + start_date
        + '&to='
        + end_date
        + '&country_id='
        + country
        + '&league_id='
        + league
        + '&match_live=0&APIkey=' + this.API_KEY)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }
}

// Get countries
// 'https://apifootball.com/api/?action=get_countries&APIkey=783ec1142cd13fa7a8944dfb7b2b9284f7a691d0752a6360d16fe39865d375b7'

// Get league for country (country_id=169_
// 'https://apifootball.com/api/?action=get_leagues&country_id=169&APIkey=783ec1142cd13fa7a8944dfb7b2b9284f7a691d0752a6360d16fe39865d375b7'

// Get standings of league (league_id=63)
// 'https://apifootball.com/api/?action=get_standings&league_id=63&APIkey=783ec1142cd13fa7a8944dfb7b2b9284f7a691d0752a6360d16fe39865d375b7'

// Get Events (league_id=63, from=2016-10-30, to=2016-11-01, match_id, country_id)
// 'https://apifootball.com/api/?action=get_events&from=2016-10-30&to=2016-11-01&league_id=63&APIkey=783ec1142cd13fa7a8944dfb7b2b9284f7a691d0752a6360d16fe39865d375b7'

// Get Odds (from=2016-10-30, to=2016-11-01)
// 'https://apifootball.com/api/?action=get_odds&from=2017-02-13&to=2017-02-13&APIkey=783ec1142cd13fa7a8944dfb7b2b9284f7a691d0752a6360d16fe39865d375b7'

// Get H2H (firstTeam=Chelsea secondTeam=Arsenal)
// 'https://apifootball.com/api/?action=get_H2H&firstTeam=Chelsea&secondTeam=Arsenal&APIkey=783ec1142cd13fa7a8944dfb7b2b9284f7a691d0752a6360d16fe39865d375b7'
