import {Component, OnInit} from '@angular/core';
import {SearchResult} from "../../searchResult";
import {CategoryService} from "../../category.service";
import {SearchResultService} from "../../services/searchResult/search-result.service";
import { SolutionDetail } from "../../solutions-mode/solution-detail";
import {MessagingService} from "../../services/messaging.service";

@Component({
    selector: 'app-search-result-detail',
    templateUrl: './search-result-detail.component.html',
    styleUrls: ['./search-result-detail.component.css']
})
export class SearchResultDetailComponent implements OnInit {

    activeComponent = 'app-search-result-detail';
    catHeaderName: string = 'SOLUTION DETAIL';

    arrValuesSliders: object[] = [
        {titol: 'VALORACIÓN GENERAL', value: 0},
        {titol: 'FACILIDAD IMPLEMENTACIÓN', value: 0},
        {titol: 'NIVEL REPLICABILIDAD', value: 0},
        {titol: 'VALOR EN EL MERCADO', value: 0},
        {titol: 'VALOR ESTRATÉGICO', value: 0}
    ];

    solutionSelectedId: number[];
    solutionSelected: SolutionDetail;
    result: any[];
    detailLoaded: boolean = false;

    verticalProp: string[] = ['AUTOMOTIVE', 'VOLKSWAGEN'];
    personaContacto: string = 'tsystems.user@t-systems.com';

    constructor(private categoryService: CategoryService, private searchResultService: SearchResultService, private messagingService: MessagingService) {
    }

    ngOnInit() {
        this.categoryService.componentChanged.subscribe(val => {
            this.activeComponent = val;
        });

        this.searchResultService.solutionSelected.subscribe(solSel => {
            this.solutionSelectedId = solSel;
            this.getSolDetail();
        }, error => {
            alert("An error ocurred");
            this.detailLoaded = true;
        })
    }

    getSolDetail() {
        this.searchResultService.getSolutionDetalById(this.solutionSelectedId[0]).subscribe((result: SolutionDetail) => {
            if (result) {
                this.solutionSelected = result;
                this.arrValuesSliders[0]['value'] = this.solutionSelected.valoracionGlobal;
                this.arrValuesSliders[1]['value'] = this.solutionSelected.facilidadIMPL;
                this.arrValuesSliders[2]['value'] = this.solutionSelected.nivelReplicabilidad;
                this.arrValuesSliders[3]['value'] = this.solutionSelected.valorMercado;
                this.arrValuesSliders[4]['value'] = this.solutionSelected.valorEstrategico;
            } else {
                this.messagingService.show('No se ha encontrado el detalle para esta solución, disculpe las molestias.');
            }

            this.detailLoaded = true;
        }, error => {
            console.log('error');
        });
    }

    commentView(commType: string) {
        // this.searchResultService.getCommentsSearchResult(this.solutionSelected, commType).subscribe(result => {
        //     this.result = result;
        // });

        let arr = [
            {
                emailAutor: 'tsystems25@t-systems.com',
                comentario: 'Me ha servido mucho esta solución ya que era lo que estaba buscando desde hace mucho tiempo'
            },
            {
                emailAutor: 'tsystems27@t-systems.com',
                comentario: 'Yo le añadiria un par de cosas más por que no es exactamente lo que dice la solucion principal.'
            }
        ];

        this.result = arr;
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

    removeSolution() {
        alert('Not implemented');
    }

    aviso(mess) {
        alert(mess);
    }

    goBack() {
        this.categoryService.componentChanged.next('app-search-result');
    }

}
