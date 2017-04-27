import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';
const baseURL = process.env.BASEURL;

import { ApiHelper } from './api-helper';


@Injectable()
export class ApiService {

    headers: Headers = new Headers({
        'x-auth-token': localStorage.getItem('token'),
        'Content-Type': 'application/json'
    });

    base_url: string = baseURL;

    api_url: string = this.base_url + '/api';

    constructor(
        private http: Http,
        public apiHelper: ApiHelper,
    ) { }

    login(path: string, body?: any, headers?: any): Observable<any> {
        return this.http.post(`${this.api_url}${path}`, body, headers)
            .map(this.apiHelper.checkForError)
            .map(res => {
                let token = res.headers.get('x-auth-token');
                if (token) {
                    localStorage.setItem('token', token);
                    this.headers.set('x-auth-token', token);
                    return true;
                }
                return false;
            }).catch(err => Observable.throw(err));
    }

    getObs(path: string, errorMsg: string, addParams?: any): Observable<any> {
        let headers = {search: this.apiHelper.paramsHelper(addParams), headers: this.headers};
        const call = this.http.get(`${this.api_url}${path}`, headers)
        return call
            .map(this.apiHelper.checkForError)
            .map((res: Response) => {
                let token: string = res.headers.get('x-auth-token');
                localStorage.setItem('token', token);
                return res;
            })
            .map(this.apiHelper.extractData)
            .catch(err => this.apiHelper.handleErrorObs(err, errorMsg));
    }
    getObsMoreParams(path: string, errorMsg: string, moreParams: string, addParams?: any): Observable<any> {
        let headers = {search: this.apiHelper.paramsHelper(addParams), headers: this.headers, extra: moreParams};
        const call = this.http.get(`${this.api_url}${path}`, headers)
        return call
            .map(this.apiHelper.checkForError)
            .map(this.apiHelper.extractData)
            .catch(err => this.apiHelper.handleErrorObs(err, errorMsg));
    }
    postObs(path: string, errorMsg: string, body?: any, addParams?: any): Observable<any> {
        let headers = {search: this.apiHelper.paramsHelper(addParams), headers: this.headers};

        return this.http.post(`${this.api_url}${path}`, body, headers)
            .map(this.apiHelper.checkForError)
            .map((res: Response) => {
                let token: string = res.headers.get('x-auth-token');
                localStorage.setItem('token', token);
                return res;
            })
            .map(this.apiHelper.extractData)
            .catch(err => this.apiHelper.handleErrorObs(err, errorMsg));
    }

    getPrm(path: string, errorMsg: string, addParams?: any): Promise<any> {
        let headers = {search: this.apiHelper.paramsHelper(addParams), headers: this.headers};

        return this.http.get(`${this.api_url}${path}`, headers)
            .map(this.apiHelper.checkForError)
            .toPromise()
            .then((res: Response) => {
                let token: string = res.headers.get('x-auth-token');
                localStorage.setItem('token', token);
                return res;
            })
            .then(this.apiHelper.extractData)
            .catch(err => {
                this.apiHelper.handleError(err, errorMsg)
            });
    }

    postPrm(path: string, errorMsg: string, body?: any, addParams?: any): Promise<any> {
        let headers = {search: this.apiHelper.paramsHelper(addParams), headers: this.headers};
        let payLoad = JSON.stringify(body);

        return this.http.post(`${this.api_url}${path}`, payLoad, headers)
            .map(this.apiHelper.checkForError)
            .toPromise()
            .then((res: Response) => {
                let token: string = res.headers.get('x-auth-token');
                localStorage.setItem('token', token);
                return res;
            })
            .then(this.apiHelper.extractData)
            .catch(err => {
                this.apiHelper.handleError(err, errorMsg)
            });
    }

    putObs(path: string, errorMsg: string, body?: any, addParams?: any): Observable<any> {
        let headers = {search: this.apiHelper.paramsHelper(addParams), headers: this.headers};
        let payLoad = JSON.stringify(body);

        return this.http.put(`${this.api_url}${path}`, payLoad, headers)
            .map(this.apiHelper.checkForError)
            .map((res: Response) => {
                let token: string = res.headers.get('x-auth-token');
                localStorage.setItem('token', token);
                return res;
            })
            .map(this.apiHelper.extractData)
            .catch(err => this.apiHelper.handleErrorObs(err, errorMsg));
    }


    delete(path: string): Observable<any> {
        return this.http.delete(`${this.api_url}${path}`, { headers: this.headers })
            .map(this.apiHelper.checkForError)
            .catch(err => Observable.throw(err))
            .map(this.apiHelper.getJson);
    }

}
