import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { CategoryService } from "../category.service";

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

    componentActual: string;

    @Output() sortButton: EventEmitter<any> = new EventEmitter();
    @Output() filterButton: EventEmitter<any> = new EventEmitter();
    @Output() mapButton: EventEmitter<any> = new EventEmitter();
    @Output() removeSolution: EventEmitter<any> = new EventEmitter();
    @Output() addSolution: EventEmitter<any> = new EventEmitter();
    @Output() newSolution: EventEmitter<any> = new EventEmitter();
    @Input() header: string;

    orderBySelected: string;
    filterSelected: string;
    vertPropSelected: string;

    arrOrderBy: object[] = [{nom: 'Nombre',emit: 'solutionName',selected: false},{nom: 'Puntuación',emit: 'solutionStars',selected: false},{nom: 'Valor de mercado (de 0 a 5)',emit: 'valorMercado',selected: false},{nom: 'Valor de mercado (de 5 a 0)',emit: 'valorMercado',selected: false},{nom: 'Valor Estratégico (de 0 a 5)',emit: 'valorEstrategico',selected: false},{nom: 'Valor Estratégico (de 5 a 0)',emit: 'valorEstrategico',selected: false},{nom: 'Replicabilidad (de 0 a 5)',emit: 'replicabilidad',selected: false},{nom: 'Replicabilidad (de 5 a 0)',emit: 'replicabilidad',selected: false},{nom: 'Facilidad Implantación (de 0 a 5)',emit: 'facilidadImpl',selected: false},{nom: 'Facilidad Implantación (de 5 a 0)',emit: 'facilidadImpl',selected: false}];
    // arrOrderBy: object[] = [{nom: 'Nombre',emit: 'solutionName',selected: false},{nom: 'Popularidad',emit: 'solutionStars',selected: false},{nom: 'Puntuación',emit: 'numVotes',selected: false},{nom: 'Valor de mercado (de 5 a 0)',emit: 'valorMercado',selected: false},{nom: 'Valor Estratégico (de 5 a 0)',emit: 'valorEstrategico',selected: false},{nom: 'Replicabilidad (de 0 a 5)',emit: 'replicabilidad',selected: false},{nom: 'Replicabilidad (de 5 a 0)',emit: 'replicabilidad',selected: false},{nom: 'Facilidad Implantación (de 0 a 5)',emit: 'facilidadImpl',selected: false},{nom: 'Facilidad Implantación (de 5 a 0)',emit: 'facilidadImpl',selected: false}];


    constructor(private categoryService: CategoryService) {
    }

    ngOnInit() {

        this.categoryService.componentChanged.subscribe( val => {
           this.componentActual = val;
        });

    }

    onFilter(filter) {

        if (this.vertPropSelected) {
            filter+=','+this.vertPropSelected;
        }

        this.filterButton.emit(filter);
        this.filterSelected = undefined;
        this.vertPropSelected = undefined;
    }

    onNewSolution() {
        // this.newSolution.emit(null);
    }

    onAddSolution() {
        this.addSolution.emit(null);
    }

    onErase() {
        this.removeSolution.emit(null);
    }

    onSort(index,selection) {

        this.arrOrderBy.forEach(value => {
            value['selected'] = false;
        });

        this.arrOrderBy[index]['selected'] = true;
        if (index === 0 || index === 2 ||  index === 4 || index === 6 || index === 8) {
            this.sortButton.emit(selection + '#' + 'true');
        } else {
            this.sortButton.emit(selection);
        }

    }

    onMap() {
        this.mapButton.emit(null);
    }
}