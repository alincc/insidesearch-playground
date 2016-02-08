import {
  bind,
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
import {SessionStorageService} from './app/services/session-storage.service/session-storage.service';

import 'rxjs/add/operator/map';

bootstrap(InsidesearchPlaygroundApp, [
    NbService,
    SearchmeService,
    LocalStorageService,
    SessionStorageService,
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    MATERIAL_PROVIDERS,
    ROUTER_BINDINGS,
    provide(ROUTER_PRIMARY_COMPONENT, {useValue: InsidesearchPlaygroundApp}),
    provide(APP_BASE_HREF,            {useValue: '/'}),
    provide(LocationStrategy,         {useClass: HashLocationStrategy})
  ]);