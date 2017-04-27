import { Injectable }     from '@angular/core';

import { ApiService } from './index';

import { Observable } from 'rxjs/Observable';

import { ExampleDetails } from '../models/index';

@Injectable()
export class ExampleService {

    path: string;
    errorMsg: string;

    constructor(
        private apiService: ApiService,
    ) { }

    // getGifts(): Observable<Gift[]> {
    //     let path = '/gifts?';
    //     let errorMsg = 'error lasdfsdfd';
    //     return this.apiService.getObs(path, errorMsg);
    // }
    // saveGifts(gifts: Gift[]): Observable<Gift[]> {
    //     let path = '/gifts?';
    //     let body = JSON.stringify(gifts);
    //     let errorMsg = 'error lajsdf;lkjasd';
    //     return this.apiService.postObs(path, errorMsg, body);
    // }

    // saveGift(gift: Gift): Observable<Gift[]> {
    //     let path = '/gift?';
    //     let body = JSON.stringify(gift);
    //     let errorMsg = 'error lajsdf;lkjasd';
    //     return this.apiService.postObs(path, errorMsg, body);
    // }

    // getActivatorGifts(): Promise<Gift[]> {
    //     let path = '/gifts';
    //     let errorMsg = 'another error message 989';
    //     return this.apiService.getPrm(path, errorMsg);
    //  }

}
