import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, Headers } from '@angular/http';

import { Observable } from 'rxjs';

@Injectable()
export class ApiHelper {

    constructor(
        private http: Http,
    ) { }

    public getJson(response: Response) {
        return response.json();
    }

    private getStatus(response: Response) {
        return response;
    }

    paramsHelper(addParams?: any) {
        let organization: string;
        let property: number;
        let params: URLSearchParams = new URLSearchParams();
        // if(this.accessCheck.isLoggedIn()){
        //     params.set('organization', state.services.currentOrganization.id);
        //     params.set('property', state.services.currentProperty.id);
        //     if (addParams) {
        //         for (let key in addParams) {
        //             params.set(key, addParams[key]);
        //         }
        //     }
        // }
        return params;
    }

    extractData(res: Response) {
        let body = res.json();
        return body || { };
    }

    public checkForError(response: Response): Response {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            let error = new Error(response.statusText);
            error['response'] = response;
            console.error(error + ': *** THERE IS AN ERROR BY THE CHECK_FOR_ERROR SERVICE CALL *** RESPONSE STATUS = ' + response.status);
            throw error;
        }
    }

    public handleError(error: Response | any, errorMsg: string) {
        let errMsg: string;
        console.error('this is errorMsg = ' + errorMsg);
        if (error instanceof Response) {
            const body = error || '';
            const err = body || JSON.stringify(body);
            console.log('error.status = ' + error.status + ' error.statusText = ' + error.statusText + ' err = ' + err);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error('PROMISE ERROR RETURN === ' + errMsg);
        return Promise.reject(errMsg);
    }

    public handleErrorObs(error: Response | any, errorMsg: string) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error || '';
            const err = body || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error('OBSERVABLE ERROR RETURN === ' + errMsg);
        return Observable.throw(errMsg);
    }

}

