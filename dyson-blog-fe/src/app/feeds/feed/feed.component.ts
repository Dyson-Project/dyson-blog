import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {HackerNewsAPIService} from '../../shared/services/hackernews-api.service';
import {Story} from '../../shared/models/story';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})

export class FeedComponent implements OnInit {
  items: Story[] = [];
  feedType: string = '';
  pageNum: number = 1;
  listStart?: number;
  errorMessage = '';

  constructor(
    private _hackerNewsAPIService: HackerNewsAPIService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route
      .data
      .subscribe(data => {
        this.feedType = (data as any).feedType;
      });

    this.route.params.subscribe(params => {
      this.pageNum = params['page'] ? +params['page'] : 1;
      this._hackerNewsAPIService.fetchFeed(this.feedType, this.pageNum)
        .subscribe(
          items => this.items = items,
          error => this.errorMessage = 'Could not load ' + this.feedType + ' stories.',
          () => {
            this.listStart = ((this.pageNum - 1) * 30) + 1;
            window.scrollTo(0, 0);
          }
        );
    });
  }
}
