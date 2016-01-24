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
import {NbService} from './nb.service';


describe('NB Service', () => {

  beforeEachProviders(() => [NbService]);


  it('should ...', inject([NbService], (service:NbService) => {

  }));

});
