import {describe, it, expect, beforeEachProviders, inject} from 'angular2/testing';
import {InsidesearchPlaygroundApp} from '../app/insidesearch-playground';

beforeEachProviders(() => [InsidesearchPlaygroundApp]);

describe('App: InsidesearchPlayground', () => {
  it('should have the `defaultMeaning` as 42', inject([InsidesearchPlaygroundApp], (app) => {
    expect(app.defaultMeaning).toBe(42);
  }));

  describe('#meaningOfLife', () => {
    it('should get the meaning of life', inject([InsidesearchPlaygroundApp], (app) => {
      expect(app.meaningOfLife()).toBe('The meaning of life is 42');
      expect(app.meaningOfLife(22)).toBe('The meaning of life is 22');
    }));
  });
});

