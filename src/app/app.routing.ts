import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import components

import { UiComponent } from './components/ui/';
import { ExampleComponent } from './components/example.component';

const appRoutes: Routes = [
    {
        path: '', // setup for potentional use of gaurds or persmission protections... this is the root,
        component: UiComponent,
        children: [
           {
                path: 'example',
                component: ExampleComponent,
                children: [
                    {
                        path: 'sub-example',
                        component: ExampleComponent
                    }
                ]
            },
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
