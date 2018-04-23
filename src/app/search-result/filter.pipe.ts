import {Pipe, PipeTransform} from '@angular/core';
import { SearchResult } from "../searchResult";

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {

    transform(value: any, args?: any): any[] {

        let arrProp;
        let arr = [];

        if (args) {
            arrProp = args.split(',');
        }

        if (args === null || args === undefined || args === '') {
            return value;
        }

        if (arrProp[1] === undefined) {
            value.filter((val: SearchResult) => {
                if (val.contactName.toUpperCase().indexOf(args.toUpperCase()) === 0 || val.contactEmail.toUpperCase().indexOf(args.toUpperCase()) === 0) {
                    arr.push(val);
                }
            });
            return arr;
        }

        if(arrProp[0] === 'undefined') {
            value.filter((val: SearchResult) => {
                if(val.vertProp) {
                    if (val.vertProp.toUpperCase().indexOf(arrProp[1].toUpperCase()) === 0) {
                        arr.push(val);
                    }
                }

            });
            return arr;
        }

        if(arrProp[0] !== 'undefined' && arrProp[1] !== undefined) {
            value.filter((val: SearchResult) => {
                if ((val.contactName.toUpperCase().indexOf(arrProp[0].toUpperCase()) === 0 || val.contactEmail.toUpperCase().indexOf(arrProp[0].toUpperCase()) === 0) && val.vertProp.toUpperCase().indexOf(arrProp[1].toUpperCase()) === 0) {
                    arr.push(val);
                }
            });
            return arr;
        }
    }
}

// if(args === 'nom') {
//     value.forEach((val: SearchResult) => {
//         if(val.contactEmail === 'jajaj@jejeje.com') {
//             arr.push(val);
//         }
//     })
//     return arr;