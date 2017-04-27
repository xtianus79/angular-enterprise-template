import { Component } from '@angular/core';
import { Router, NavigationStart, Event as NavigationEvent } from '@angular/router';

@Component({
    selector: 'my-app',
    templateUrl: 'app.component.html',
    styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
    currentUrl: any;

    constructor(
        router: Router,
    ) {
        router.events.forEach((event: NavigationEvent) => {
            // console.log('Event.url = ', event); // was event.url // remove
            this.currentUrl = event;
            if (event instanceof NavigationStart) {
               // this.store.dispatch(changeLoader(true));
            }
        });
    }
}
