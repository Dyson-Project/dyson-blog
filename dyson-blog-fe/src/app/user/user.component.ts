import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {HackerNewsAPIService} from '../shared/services/hackernews-api.service';
import {User} from '../shared/models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user: User | undefined;
  errorMessage = '';

  constructor(
    private _hackerNewsAPIService: HackerNewsAPIService,
    private route: ActivatedRoute,
    private _location: Location
  ) {
  }

  ngOnInit() {
  }

  getUseR(): void {
    this.route.params.subscribe(params => {
      let userID = params['id'];
      this._hackerNewsAPIService.fetchUser(userID)
        .subscribe({
          next: value => {
            this.user = value;
          }, error: error => this.errorMessage = 'Could not load user' + userID
        });
    });
  }

  goBack() {
    this._location.back();
  }
}
