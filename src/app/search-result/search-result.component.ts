import {Component, OnInit, Inject} from '@angular/core';
import {CategoryService} from '../category.service';
import {SearchResult} from "../searchResult";
import {SearchResultService} from "../services/searchResult/search-result.service";
import { MessagingService } from "../services/messaging.service";
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import {environment} from "../../environments/environment";
import {SolutionDetail} from "../solutions-mode/solution-detail";

@Component({
    selector: 'app-search-result',
    templateUrl: './search-result.component.html',
    styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

    activeComponent = 'app-search-result';
    catHeaderName: string = 'SEARCH RESULTS LIST';
    resultArr: SearchResult[];
    icon: string = 'none';
    filterDialog: boolean = false;
    criteriFiltre: string;
    filterArgs: string;

    orderDialog: boolean = false;
    criteriOrderBy: string;
    orderByArgs: string;

    resultLoaded: boolean = false;

    infoVisible: boolean = false;
    orderByDesc: boolean = false;

    constructor(private categoryService: CategoryService, private searchResultService: SearchResultService, private messageService: MessagingService) {}

    ngOnInit() {

        this.categoryService.componentChanged.subscribe((activeComponent: string) => {
            this.activeComponent = activeComponent;
        });

        this.searchResultService.searchResultChanged.subscribe(result => {
            this.resultArr = result;
            this.resultArr.forEach((val: SearchResult) => {
                this.searchResultService.getSolutionDetalById(val.solutionId).subscribe((result: SolutionDetail) => {
                    if(result) {
                        if (result.vertPropietaryName) {
                            val.vertProp = result.vertPropietaryName;
                        }
                    }
                });
            });

            this.resultLoaded = true;
            // this.resultArr[1].solutionName = 'asd';
            // this.resultArr.forEach((val: SearchResult) => {
            //    console.log(val);
            // });
        });

    }

    onAlarm() {
        this.messageService.show('Se ha creado una alarma.');
    }

    onClickMoreInfo(cat) {
        if(cat.infoVisible) {
            cat.infoVisible = false;
        } else {
            cat.infoVisible = true;
        }
    }

    changeComponent(solSel) {
        this.searchResultService.solutionSelected.next([
            solSel
        ]);
        this.categoryService.componentChanged.next('app-search-result-detail');
    }

    newSolution() {
        this.categoryService.componentChanged.next('app-new-solution');
    }

    onFilter(event) {
            this.filterArgs = event;
    }

    sortSelection(event) {
        let arr = event.split('#');
        if(arr.length === 2) {
            this.orderByArgs = arr[0];
            this.orderByDesc = true;
        } else {
            this.orderByDesc = false;
            this.orderByArgs = event;
        }

    }

    initClassesStars(p, id) {
        if (p <= id - 1) {
            return 'far fa-star';
        } else if (p > id - 1 && p < id) {
            return 'fas fa-star-half checked';
        } else {
            return 'fas fa-star checked';
        }
    }

    goBack() {
        this.categoryService.componentChanged.next('app-solutions-mode');
    }

}
