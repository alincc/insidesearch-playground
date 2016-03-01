import {Component, OnInit} from 'angular2/core';
import {
    RouterOutlet,
    APP_BASE_HREF,
    ROUTER_DIRECTIVES,
    ROUTER_PROVIDERS,
    ROUTER_PRIMARY_COMPONENT,
    HashLocationStrategy,
    LocationStrategy,
    Router,
    RouterLink,
    RouteConfig,
} from 'angular2/router';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';
import {SearchComponent} from './components/search.component/search.component';
import {SearchResultComponent} from './components/search-result.component/search-result.component';
import {SettingsComponent} from './components/settings.component/settings.component';
import {MyFavoritesComponent} from './components/my-favorites.component/my-favorites.component';
import {SuperSearch1Component} from './components/resultlists/supersearch/supersearch1.component/supersearch1.component';
import {LocalStorageService, Favorite} from './services/local-storage.service/local-storage.service';
import {OrderByPipe} from './pipes/order-by.pipe/order-by.pipe';
import {ResultlistsComponent} from "./components/resultlists/supersearch/resultlists.component";
declare var componentHandler;

@Component({
    selector: 'insidesearch-playground-app',
    providers: [],
    templateUrl: 'app/insidesearch-playground.html',
    styleUrls: ['app/styles.css'],
    directives: [RouterOutlet, SearchComponent, MATERIAL_DIRECTIVES, ROUTER_DIRECTIVES, RouterLink],
    pipes: [OrderByPipe]
})
@RouteConfig([
    {path: '/', name: 'root', redirectTo: ['Search']},
    {path: '/search', name: 'Search', component: SearchComponent},
    {path: '/favorites', name: 'MyFavorites', component: MyFavoritesComponent},
    {path: '/settings', name: 'Settings', component: SettingsComponent},
    {path: '/resultLists', name: 'Resultlists', component: ResultlistsComponent},
    {path: '/resultLists/superSearch1', name: 'Supersearch1', component: SuperSearch1Component}
])
export class InsidesearchPlaygroundApp implements OnInit {
    myFavorites:Favorite[] = [];

    constructor(public router:Router,
                public localStorageService:LocalStorageService) {

        localStorageService.favoritesEvent.subscribe((data) => {
            this.loadFavorites();
        });
    }

    loadFavorites():void {
        this.myFavorites = this.localStorageService.getAllFavorites();
    }

    onSelectFavorite(favorite:Favorite) {
        this.router.navigate(['Search', {myFavorite: favorite.id}]);
    }

    ngOnInit():void {
        this.loadFavorites();
        componentHandler.upgradeAllRegistered();
    }

    public isRouteActive(route) {
        return this.router.isRouteActive(this.router.generate(route))
    }
}
