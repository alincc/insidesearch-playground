import {
  it,
  iit,
  describe,
  ddescribe,
  expect,
  inject,
  injectAsync,
  TestComponentBuilder,
  beforeEachProviders
} from 'angular2/testing';
import {provide} from 'angular2/core';
import {SearchBoxComponent} from './search-box.component';

describe('SearchBox Component', () => {

  beforeEachProviders(() => []);

  it('should ...', injectAsync([TestComponentBuilder], (tcb:TestComponentBuilder) => {
    return tcb.createAsync(SearchBoxComponent).then((fixture) => {
      fixture.detectChanges();
    });
  }));

});
