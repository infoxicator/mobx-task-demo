import { observable, runInAction } from 'mobx';
import { QueryObserver } from '@tanstack/react-query';
import { getQueryClient } from '../query-client';

export class MobxQuery {
  #reactQueryResult = observable({});
  #queryClient = getQueryClient();

  constructor(options = {}) {
    const { _defaulted, ...defaultOptions } =
      this.#queryClient.defaultQueryOptions(options);
    this.defaultOptions = defaultOptions;
  }

  query(options) {
    const opts = Object.assign({}, this.defaultOptions, options);
    if (this.observer) {
      this.observer.setOptions(opts);
    } else {
      const observer = (this.observer = new QueryObserver(
        this.#queryClient,
        opts,
      ));
      runInAction(() => {
        console.log('upate initial', observer.getCurrentResult())
        return Object.assign(this.#reactQueryResult, observer.getCurrentResult())

      });
      this.subscription = observer.subscribe((result) => {
        console.log('observer fired', result)
        return runInAction(() => Object.assign(this.#reactQueryResult, result))
    });
    }
    return this.#reactQueryResult;
  }

  dispose() {
    console.log('dispose called')
    this.subscription?.();
    delete this.observer;
  }
}