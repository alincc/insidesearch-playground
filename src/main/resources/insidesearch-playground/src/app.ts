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
import {NbService, nbServiceInjectables} from './app/services/nb.service/nb.service';
import 'rxjs/add/operator/map';

bootstrap(InsidesearchPlaygroundApp, [
    nbServiceInjectables,
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    ROUTER_BINDINGS,
    provide(ROUTER_PRIMARY_COMPONENT, {useValue: InsidesearchPlaygroundApp}),
    provide(APP_BASE_HREF,            {useValue: '/'}),
    provide(LocationStrategy,         {useClass: HashLocationStrategy})
  ]);