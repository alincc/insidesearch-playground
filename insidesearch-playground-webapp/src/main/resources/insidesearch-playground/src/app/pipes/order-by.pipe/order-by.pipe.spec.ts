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
import {OrderByPipe} from './order-by.pipe';

describe('OrderBy Pipe', () => {
  
  let input:any[] = [
    {name: 'B'},
    {name: 'A'}
  ];

  beforeEachProviders(() => [OrderByPipe]);

  it('should order by the given property', inject([OrderByPipe], (orderByPipe) => {
      //expect(orderByPipe.transform(input, ['name'])).toEqual([input[1], input[0]]);
  }));

});
