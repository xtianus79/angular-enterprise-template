export { ApiService } from './api';
export { ApiHelper } from './api-helper';
export { ExampleService } from './example.service';

import {
    ApiService,
    ApiHelper,
    ExampleService,
} from './';

export const AppServices: [any] = [
    ApiService,
    ApiHelper,
    ExampleService,
];
