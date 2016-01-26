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
import {MyFavoritesComponent} from './my-favorites.component';


describe('MyFavoritesComponent Component', () => {

  beforeEachProviders(() => []);


  it('should ...', injectAsync([TestComponentBuilder], (tcb:TestComponentBuilder) => {
    return tcb.createAsync(MyFavoritesComponent).then((fixture) => {
      fixture.detectChanges();
    });
  }));

});
