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
import {ResultListComponent} from './resultList.component';


describe('ResultListComponent Component', () => {

    beforeEachProviders(() => []);


    it('should ...', injectAsync([TestComponentBuilder], (tcb:TestComponentBuilder) => {
        return tcb.createAsync(ResultListComponent).then((fixture) => {
            fixture.detectChanges();
        });
    }));

});
