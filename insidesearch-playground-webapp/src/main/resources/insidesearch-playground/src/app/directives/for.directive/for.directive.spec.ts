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
import {provide, Component} from 'angular2/core';
import {ForDirective} from './for.directive';


@Component({
  selector: 'test-component',
  template: `<div for.directive</div>`
})
class TestComponent {}

describe('ForDirective Directive', () => {

  beforeEachProviders(() => []);


  it('should ...', injectAsync([TestComponentBuilder], (tcb:TestComponentBuilder) => {
    return tcb.createAsync(TestComponent).then((fixture) => {
      fixture.detectChanges();
    });
  }));

});
