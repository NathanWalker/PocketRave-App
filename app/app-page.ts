import "reflect-metadata";
import {bootstrap} from "nativescript-angular/application";
import {Component, bind} from "angular2/core";
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, LocationStrategy} from "angular2/router";
import {EventData} from "data/observable";
import {topmost} from "ui/frame";
import {NSLocationStrategy} from "./ns-location-strategy";

import {HomePage} from "./views/home/home";
import {Config} from "./shared/config";

declare var UIBarStyle: any;

@Component({
    selector: "main",
    directives: [ROUTER_DIRECTIVES],
    template: "<StackLayout><router-outlet></router-outlet></StackLayout>"
})
@RouteConfig([
    { path: "/", component: HomePage, as: "Home" }
])
class AppComponent {}

export function loaded(args: EventData) {
    let page = <any>args.object;
    Config.page = page;

    if (page.ios) {
        let navigationBar = topmost().ios.controller.navigationBar;
        navigationBar.barStyle = UIBarStyle.UIBarStyleBlack;
    }
    
    bootstrap(AppComponent, [
        ROUTER_PROVIDERS, bind(LocationStrategy).toClass(NSLocationStrategy)
    ])
}
