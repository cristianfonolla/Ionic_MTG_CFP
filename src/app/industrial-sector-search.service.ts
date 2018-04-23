import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import { BreadcrumbService } from './services/breadcrumb.service';
import { UserRequestDto } from './user-request-dto';
import { MessagingService } from './services/messaging.service';
import { CategoryService } from './category.service';
import {SearchResultService} from "./services/searchResult/search-result.service";


@Injectable()
export class IndustrialSectorSearchService {

    stagedIndustrial: any[];

    constructor(private searchResultService: SearchResultService, private caterogyService: CategoryService, private http: HttpClient, private breadcrumbService: BreadcrumbService, private messagingService: MessagingService) { }

    searchCriteria(industrial: number[]) {
        this.stagedIndustrial = industrial;
        this.saveSearchCriteriaRequest().subscribe(result => {
            // const jsonstr = JSON.stringify(result);
            // const arr = jsonstr.split(':');
            // const msg = arr[0].replace('{', '').replace('\"', '').replace('\"', '');
            // this.messagingService.show(msg);
            // console.log(result);
            this.searchResultService.searchResultChanged.next(result);
            this.caterogyService.componentChanged.next('app-search-result');
        });
    }

    getTechnologySearchJSON(industrial) {
        const techJson = {
            "IndustrialSectorIdList": industrial
        };
        // return JSON.stringify(techJson);
    }

    saveSearchCriteriaRequest(): Observable<any> {

        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
        const options = { headers: headers };

        return this.http.post(environment.API.endpoint + environment.API.sendIndustrialSectorsRequest,
            this.getTechnologySearchJSON(this.stagedIndustrial),
            options)
            .map((res: Response) => res)
            .catch((error: any) => Observable.throw(error || environment.errorMsg.serverConnection));
    }
}
