import { Component, HostListener } from '@angular/core';

@Component({
    selector: 'top-nav',
    templateUrl: 'top-nav.component.html',
    styleUrls: [ './top-nav.component.scss' ]
})
export class TopNavComponent {

    private isActive: boolean;
    private willExpand: boolean = false;
    private config: any;

    constructor() {
    }

    @HostListener('mouseenter') onMouseEnter() {
        this.willExpand = true;
        this.isActive = true;
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.willExpand = false;
        this.isActive = false;
    }

    // private isUnchanged: boolean = true;  // future use
    // private isSpecial: boolean = true;  // future use

     private setClasses() {
        if (this.isActive) {
            let classes =  {
                rootExpanded___ji085: this.willExpand, // true
                rootExpanded___6du12: this.willExpand, // true
                rootExpanded___2QHd4: this.willExpand, // true
            };
            return classes;
        }
    }
}
