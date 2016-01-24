import {
  Component,
  provide
} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {
  APP_BASE_HREF,
  ROUTER_DIRECTIVES,
  ROUTER_PROVIDERS,
  ROUTER_PRIMARY_COMPONENT,
  ROUTER_BINDINGS,
  HashLocationStrategy,
  LocationStrategy,
  Router,
  RouteConfig,
} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';

import {InsidesearchPlaygroundApp} from './app/insidesearch-playground';
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from 'ng2-material/all';
import {NbService} from './app/services/nb.service/nb.service';
import {SearchmeService} from './app/services/searchme.service/searchme.service';
import {LocalStorageService} from './app/services/local-storage.service/local-storage.service'

import 'rxjs/add/operator/map';

import { AppViewListener } from 'angular2/src/core/linker/view_listener';
import { DebugElementViewListener } from 'angular2/platform/common_dom';
import { bind } from 'angular2/core';

bootstrap(InsidesearchPlaygroundApp, [
    NbService,
    SearchmeService,
    LocalStorageService,
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    MATERIAL_PROVIDERS,
    ROUTER_BINDINGS,
    bind(AppViewListener).toClass(DebugElementViewListener),
    provide(ROUTER_PRIMARY_COMPONENT, {useValue: InsidesearchPlaygroundApp}),
    provide(APP_BASE_HREF,            {useValue: '/'}),
    provide(LocationStrategy,         {useClass: HashLocationStrategy})
  ]);