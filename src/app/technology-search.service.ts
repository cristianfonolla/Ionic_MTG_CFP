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
export class TechnologySearchService {

    stagedTechs: number[];

    constructor(private searchResultService: SearchResultService, private caterogyService: CategoryService, private http: HttpClient, private breadcrumbService: BreadcrumbService, private messagingService: MessagingService) { }

    searchCriteria(selTech: number[]) {
        this.stagedTechs = selTech;
        this.saveSearchCriteriaRequest().subscribe(result => {
            // console.log(result);
            // const jsonstr = JSON.stringify(result);
            // const arr = jsonstr.split(':');
            // const msg = arr[0].replace('{', '').replace('\"', '').replace('\"', '');
            // this.messagingService.show(msg);
            this.searchResultService.searchResultChanged.next(result);
            this.caterogyService.componentChanged.next('app-search-result');
        });
    }

    getTechnologySearchJSON(techsArr) {
        const techJson = {
            "TechnologyIdList": techsArr
        };
        return JSON.stringify(techJson);
    }

    saveSearchCriteriaRequest(): Observable<any> {

        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
        const options = { headers: headers };

        return this.http.post(environment.API.endpoint + environment.API.sendTechnologyRequest,
            this.getTechnologySearchJSON(this.stagedTechs),
            options)
            .map((res: Response) => res)
            .catch((error: any) => Observable.throw(error || environment.errorMsg.serverConnection));
    }

}
