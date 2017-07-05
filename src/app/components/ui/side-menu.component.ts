import {Component, Renderer} from '@angular/core';

@Component({
    selector: 'side-menu',
    templateUrl: 'side-menu.component.html',
    styleUrls: [ './side-menu.component.scss' ]
})
export class SideMenuComponent {

    show = false;

    private entered: boolean;
    private leave = true;
    private adjacentLink = true;

    private isActive: boolean;
    willExpand = false;
    private willExpandSubmenu = false;
    private config: any;

    private hasSubmenu: boolean;

    private christian35: any;

    private documentListener: any;

    private selfClick: boolean;

    constructor(private renderer: Renderer) {
    }

    /*@HostListener('mouseenter') onMouseEnter() {
        this.willExpand = true;
        this.isActive = true;
        this.willExpandSubmenu = true;
     }*/

    /*@HostListener('mouseleave') onMouseLeave() {
        this.willExpand = false;
        this.willExpandSubmenu = false;
        this.isActive = false;
     }*/

    // private isUnchanged: boolean = true;  // future use
    // private isSpecial: boolean = true;  // future use

     private setClasses() {
         this.show = false;
        if (this.isActive) {
            let classes =  {
                rootExpanded___ji085: this.willExpand, // true
                rootExpanded___6du12: this.willExpand, // true
                rootExpanded___2QHd4: this.willExpand, // true
            };
            return classes;
        }
    }

    clicked() {
        this.show = true;
        this.willExpand = true;
        this.isActive = true;
        this.willExpandSubmenu = true;
        this.selfClick = true;

    }

    clicked2() {
        if (this.show && this.willExpand && this.entered) {
            this.show = false;
            this.entered = false;
        }
        if (!this.show && this.willExpand && !this.entered) {
        }
    }

    upperLink() {
        this.show = false;
    }

    lowerLink() {
        this.show = false;
    }

    mouseEnter() {
        this.willExpand = true;
        this.isActive = true;
        this.entered = true;
        this.selfClick = true;
        if (!this.documentListener) {
            this.documentListener = this.renderer.listenGlobal('body', 'click', () => {
                if (!this.selfClick) {
                    this.show = false;
                    this.entered = false;
                    this.willExpand = false;
                    this.documentListener();
                    this.documentListener = null;
                }
                this.selfClick = false;
            });
        }
    }

    mouseLeave() {
    }

}
