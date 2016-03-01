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
import {ResultlistsComponent} from './resultlists.component';


describe('Supersearch1ResultComponent Component', () => {

    beforeEachProviders(() => []);


    it('should ...', injectAsync([TestComponentBuilder], (tcb:TestComponentBuilder) => {
        return tcb.createAsync(ResultlistsComponent).then((fixture) => {
            fixture.detectChanges();
        });
    }));

});
