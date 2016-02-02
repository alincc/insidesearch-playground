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
import {SessionStorageService} from './session-storage.service';


describe('SessionStorageService Service', () => {

  beforeEachProviders(() => [SessionStorageService]);


  it('should ...', inject([SessionStorageService], (service:SessionStorageService) => {

  }));

});
