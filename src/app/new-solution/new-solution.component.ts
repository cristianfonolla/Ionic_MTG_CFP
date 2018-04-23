import {Component, OnInit} from '@angular/core';
import { CategoryService } from "../category.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NewSolution } from "./new-solution";
import { SearchResultService } from "../services/searchResult/search-result.service";
import {IndustrialSectorDto} from "../industrial-sector.dto";
import {forEach} from "@angular/router/src/utils/collection";
import { loginInfo } from "../../environments/loginInfo";

@Component({
    selector: 'app-new-solution',
    templateUrl: './new-solution.component.html',
    styleUrls: ['./new-solution.component.css']
})
export class NewSolutionComponent implements OnInit {

    catHeaderName: string = 'Nueva Solución';
    activeComponent: string = 'app-new-solution';
    newSolutionFrom: FormGroup;
    technologies: any;
    stagedTechs: Map<number, boolean> = new Map<number, boolean>();
    gridItemClass = 'grid-item';
    industrialSectors: IndustrialSectorDto[];
    stagedIndSectors: Map<number, boolean> = new Map<number, boolean>();
    groupsIndSectors: string[];
    techLoaded: boolean = false;
    sectorLoaded: boolean = false;
    techsSelected: number[] = [];
    industrialSectorSelected: number[] = [];

    constructor(private categoryService: CategoryService, private searchResultService: SearchResultService) {
    }

    ngOnInit() {
        this.initForm();

        // console.log(loginInfo.username);

        this.categoryService.componentChanged.subscribe((component: string) => {
            this.activeComponent = component;

        });

        this.categoryService.loadTechnologiesForSearch().subscribe((technologies: any) => {
                this.technologies = technologies;
                this.techLoaded = true;
        });

        this.categoryService.loadIndustrialSectorsForSearch()
            .subscribe((industrialSectors: IndustrialSectorDto[]) => {
                this.industrialSectors = industrialSectors;
                if(this.industrialSectors.length > 0){
                    this.groupsIndSectors = this.getGroupSectors();
                }
                this.sectorLoaded = true;
            });
    }

    getGroupSectors(): any{
        const groupSectors = []
        let groupItem = ''
        for (let cat of this.industrialSectors){
            if(groupItem != cat.groupName){
                groupSectors.push(cat.groupName);
                groupItem = cat.groupName;
            }
        }
        return groupSectors;
    }

    isChecked(id: number) {
        const tech = this.stagedTechs.get(id);
        if (tech) {
            return true;
        }
    }

    isCheckedSector(id: number) {
        const tech = this.stagedIndSectors.get(id);
        if (tech) {
            return true;
        }
    }

    setSelected(id: number) {
        const selected = this.stagedTechs.get(id);
        if (selected === undefined || selected === false) {
            this.stagedTechs.set(id, true);
            this.gridItemClass = 'grid-item-selected';
            this.techsSelected.push(id);
        } else {
            this.stagedTechs.set(id, false);
            this.gridItemClass = 'grid-item';
            this.techsSelected.forEach((idT, key) => {
                if(idT === id) {
                    this.techsSelected.splice(key,1);
                    // console.log(this.techsSelected);
                }
            });
        }
    }

    setSelectedSector(id: number) {
        const selected = this.stagedIndSectors.get(id);
        if (selected === undefined || selected === false) {
            this.stagedIndSectors.set(id, true);
            this.gridItemClass = 'grid-item-selected';
            this.industrialSectorSelected.push(id);
        } else {
            this.stagedIndSectors.set(id, false);
            this.gridItemClass = 'grid-item';
            this.industrialSectorSelected.forEach((idT, key) => {
                if(idT === id) {
                    this.industrialSectorSelected.splice(key,1);
                }
            });
        }
    }

    private initForm() {
        this.newSolutionFrom = new FormGroup({
            'id': new FormControl(null, [Validators.required]),
            'name': new FormControl(null, [Validators.required]),
            'imagePath': new FormControl(null, [Validators.required]),
            'tipologiaId': new FormControl(null, [Validators.required]),
            'fechaAlta': new FormControl(null, [Validators.required]),
            'popularidad': new FormControl(null, [Validators.required]),
            'valGlobal': new FormControl(null, [Validators.required]),
            'valImplementacion': new FormControl(null, [Validators.required]),
            'valreplicabilidad': new FormControl(null, [Validators.required]),
            'valMercado': new FormControl(null, [Validators.required]),
            'valEstrategico': new FormControl(null, [Validators.required]),
            'problemSolved': new FormControl(null, [Validators.required]),
            'tsystemsAdv': new FormControl(null, [Validators.required]),
            'customerAdv': new FormControl(null, [Validators.required]),
            'propitarioWiw': new FormControl(null, [Validators.required])
        });
    }

    onSubmit() {

        let newSolution = new NewSolution();
        newSolution.id = this.newSolutionFrom.value.id;
        newSolution.name = this.newSolutionFrom.value.name;
        newSolution.imagePath = this.newSolutionFrom.value.imagePath;
        newSolution.tipologiaId = this.newSolutionFrom.value.tipologiaId;
        newSolution.fechaAlta = this.newSolutionFrom.value.fechaAlta;
        newSolution.popularidad = this.newSolutionFrom.value.popularidad;
        newSolution.valGlobal = this.newSolutionFrom.value.valGlobal;
        newSolution.valImplantacion = this.newSolutionFrom.value.valImplementacion;
        newSolution.valReplicabilidad = this.newSolutionFrom.value.valreplicabilidad;
        newSolution.valMercado = this.newSolutionFrom.value.valMercado;
        newSolution.valEstrategico = this.newSolutionFrom.value.valEstrategico;
        newSolution.problemSolved = this.newSolutionFrom.value.problemSolved;
        newSolution.tsystemsAdv = this.newSolutionFrom.value.tsystemsAdv;
        newSolution.customerAdv = this.newSolutionFrom.value.customerAdv;
        newSolution.propietarioWiw = loginInfo.username;
        newSolution.technologies = this.techsSelected;
        newSolution.industrialSectors = this.industrialSectorSelected;

        // console.log(newSolution)

        this.searchResultService.postNewSolution(newSolution).subscribe(val => {
            // console.log(val);
        });

    }

    goBack() {
        this.categoryService.componentChanged.next('app-search-result');
    }

    addSolution() {
        alert('pepito');
    }

}
