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
import {SearchmeService} from './searchme.service';


describe('SearchmeService Service', () => {

  beforeEachProviders(() => [SearchmeService]);


  it('should ...', inject([SearchmeService], (service:SearchmeService) => {

  }));

});
