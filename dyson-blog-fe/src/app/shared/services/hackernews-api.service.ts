import {Injectable} from '@angular/core';
import fetch from 'unfetch';
import {map} from 'rxjs/operators';

import {Story} from '../models/story';
import {User} from '../models/user';
import {PollResult} from '../models/poll-result';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

// wrap fetch in observable so we can keep it chill
@Injectable()
export class HackerNewsAPIService {
  baseUrl: string = environment.API_HOST;

  constructor() {
  }

  fetchFeed(feedType: string, page: number): Observable<Story[]> {
    return lazyFetch(`${this.baseUrl}/${feedType}?page=${page}`);
  }

  fetchItemContent(id: number): Observable<Story> {
    return lazyFetch<Story>(`${this.baseUrl}/item/${id}`).pipe(map((story: Story) => {
      if (story.type === 'poll') {
        let numberOfPollOptions = story.poll.length;
        story.poll_votes_count = 0;
        for (let i = 1; i <= numberOfPollOptions; i++) {
          this.fetchPollContent(story.id + i).subscribe(pollResults => {
            story.poll[i - 1] = pollResults;
            story.poll_votes_count += pollResults.points;
          });
        }
      }
      return story;
    }));
  }

  fetchPollContent(id: number): Observable<PollResult> {
    return lazyFetch(`${this.baseUrl}/item/${id}`);
  }

  fetchUser(id: string): Observable<User> {
    return lazyFetch(`${this.baseUrl}/user/${id}`);
  }
}

function lazyFetch<T>(url: string, options?: {
  method?: string,
  headers?: Record<string, string>,
  credentials?: 'include' | 'omit',
  body?: Parameters<XMLHttpRequest["send"]>[0]
}): Observable<T> {
  return new Observable<T>(fetchObserver => {
    let cancelToken = false;

    fetch(url, options)
      .then(res => {
        if (!cancelToken) {
          return res.json()
            .then(data => {
              fetchObserver.next(data);
              fetchObserver.complete();
            });
        }
        // TODO: fixme
        return fetchObserver.complete()
      })
      .catch(err => fetchObserver.error(err));
    return () => {
      cancelToken = true;
    };

  });
}

