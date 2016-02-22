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
import {SuperSearch1Component} from './supersearch1.component';


describe('SuperSearch1Component Component', () => {

    beforeEachProviders(() => []);


    it('should ...', injectAsync([TestComponentBuilder], (tcb:TestComponentBuilder) => {
        return tcb.createAsync(SuperSearch1Component).then((fixture) => {
            fixture.detectChanges();
        });
    }));

});
