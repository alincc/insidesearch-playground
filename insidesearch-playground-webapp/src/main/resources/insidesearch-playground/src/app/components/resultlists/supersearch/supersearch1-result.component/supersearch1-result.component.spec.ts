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
import {Supersearch1ResultComponent} from './supersearch1-result.component';


describe('Supersearch1ResultComponent Component', () => {

    beforeEachProviders(() => []);


    it('should ...', injectAsync([TestComponentBuilder], (tcb:TestComponentBuilder) => {
        return tcb.createAsync(Supersearch1ResultComponent).then((fixture) => {
            fixture.detectChanges();
        });
    }));

});
