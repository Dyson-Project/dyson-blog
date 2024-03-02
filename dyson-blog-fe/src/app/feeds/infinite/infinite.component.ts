import {Component, OnInit} from '@angular/core';
import {Story} from "../../shared/models/story";
import {HackerNewsAPIService} from "../../shared/services/hackernews-api.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-infinite',
  templateUrl: './infinite.component.html',
  styleUrls: ['./infinite.component.scss']
})
export class InfiniteComponent implements OnInit {
  items: Story[] = [];
  feedType: string = 'news';
  isLoading = false;

  currentPage = 1;
  itemsPerPage = 10;

  errorMessage = '';

  constructor(
    private _hackerNewsAPIService: HackerNewsAPIService,
    private route: ActivatedRoute
  ) {
  }

  toggleLoading = () => this.isLoading = !this.isLoading;

  // it will be called when this component gets initialized.
  loadData = () => {
    this.toggleLoading();
    this._hackerNewsAPIService.fetchFeed('news', this.currentPage).subscribe({
      next: items => this.items = items,
      error: err => {
        this.errorMessage = 'Could not load ' + this.feedType + ' stories.'
        console.log(err);
      },
      complete: () => this.toggleLoading()
    })
  }

  // this method will be called on scrolling the page
  appendData = () => {
    this.toggleLoading();
    this._hackerNewsAPIService.fetchFeed('news', this.currentPage).subscribe({
      next: items => this.items = [...this.items, ...items],
      error: err => {
        this.errorMessage = 'Could not load ' + this.feedType + ' stories.'
        console.log(err);
      },
      complete: () => this.toggleLoading()
    })
  }

  onScroll = () => {
    this.currentPage++;
    this.appendData();
  }


  ngOnInit(): void {
    this.route
      .data
      .subscribe(data => {
        this.feedType = (data as any).feedType;
      });

    this.loadData();
  }
}
