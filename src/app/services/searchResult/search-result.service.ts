import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { environment } from "../../../environments/environment";
import {SearchResult} from "../../searchResult";
import {NewSolution} from "../../new-solution/new-solution";

@Injectable()
export class SearchResultService {

    searchResultChanged: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

    solutionSelected: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

    constructor(private http: HttpClient) { }

    getCommentsSearchResult(solution: SearchResult, type: string): Observable<any> {

        // const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
        // const options = { headers: headers };

        return this.http.get(environment.API.endpoint + environment.API.getSolutionCommentsSolutionId + solution.solutionId + environment.API.getSolutionCommentsTextType + type)
            .map((res: Response) => {
                return res;
            }).catch((error: any) => Observable.throw(console.log(error)));
    }

    getSolutionDetalById(solId: number): Observable<any> {

        // const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
        // const options = { headers: headers };

        return this.http.get( environment.API.endpoint + environment.API.getSolutionDetailById + solId)
            .map((res: Response) => {
                return res;
            }).catch((error: any) => Observable.throw(console.log(error)));

    }

    postNewSolution(newSol: NewSolution) {

        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
        const options = { headers: headers };

        // return this.http.post(environment.API.endpoint + 'api/Solution/PostNewSolution',
        return this.http.post(environment.API.endpoint + 'api/Solution/TestEmail',
            // JSON.stringify(newSol),options)
            {},options)
            .map((res: Response) => res)
            .catch((error: any) => Observable.throw(error || environment.errorMsg.serverConnection));


    }

}
