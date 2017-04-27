import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { NgSemanticModule } from 'ng-semantic';
import { HttpModule } from '@angular/http';
import { createInputTransfer, createNewHosts, removeNgStyles } from '@angularclass/hmr';
import { MaterialModule } from '@angular/material';

import { MultipleDatePickerModule } from 'multiple-date-picker-a2';

import { NgxPaginationModule } from 'ngx-pagination';
// Imports for directives in the +directives folder
// import { } from './@directives';

// components
import { AppComponent } from './app.component';

// **** import new way of doing components
import { UiComponents } from './components/ui';
import { ExampleComponent } from './components/example.component'

// Helpers for application
import { AppHelpers } from './helpers';

// Imports for services and api's
import { AppServices } from './services';
import { DatepickerModule } from 'angular2-material-datepicker';

import './rxjs-extensions';

import { routing } from './app.routing';
import { CalendarModule } from 'angular-calendar';


@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        MaterialModule,
        CalendarModule.forRoot(),
        routing,
        ReactiveFormsModule,
        MultipleDatePickerModule,
        NgxPaginationModule,
        DatepickerModule
    ],
    declarations: [
        UiComponents,
        ExampleComponent,
        AppComponent,
    ],
    providers: [
        AppServices,
        AppHelpers,
    ],
    entryComponents: [],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {
    }

    hmrOnInit(store: any) {
        if (!store || !store.state) {
            return;
        }
        // inject AppStore here and update it
        // this.AppStore.update(store.state)
        if ('restoreInputValues' in store) {
            store.restoreInputValues();
        }
        // change detection
        delete store.state;
        delete store.restoreInputValues;
        console.clear();
    }

    hmrOnDestroy(store: any) {
        // const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        // recreate elements
        // store.disposeOldHosts = createNewHosts(cmpLocation);
        // inject your AppStore and grab state then set it on store
        // var appState = this.AppStore.get()
        // store.state = {data: 'yolo'};
        // store.state = Object.assign({}, appState)
        // save input values
        store.restoreInputValues = createInputTransfer();
        // remove styles
        removeNgStyles();
    }

    hmrAfterDestroy(store: any) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
        // anything you need done the component is removed
    }

}

