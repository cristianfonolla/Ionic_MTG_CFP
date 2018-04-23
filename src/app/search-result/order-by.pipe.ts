import {Pipe, PipeTransform} from '@angular/core';
import {SearchResult} from "../searchResult";

@Pipe({
    name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

    transform( value: Array<any>, args: string, orderType: boolean ): Array<SearchResult> {
        if (args === null || args === undefined || args === '') {
            return value;
        } else {
            value.sort((a: any, b: any) => {
                let ae = a[args];
                let be = b[args];
                if (ae == undefined && be == undefined) return 0;
                if (ae == undefined && be != undefined) return args ? 1 : -1;
                if (ae != undefined && be == undefined) return args ? -1 : 1;
                if (ae == be) return 0;
                if(orderType){
                    return ae.toString().toLowerCase() < be.toString().toLowerCase() ? -1 : 1;
                } else {
                    return ae.toString().toLowerCase() > be.toString().toLowerCase() ? -1 : 1;
                }
                // return args ? (ae.toString().toLowerCase() < be.toString().toLowerCase() ? -1 : 1) : (be.toString().toLowerCase() > ae.toString().toLowerCase() ? -1 : 1);
            });
            return value;
        }
    }
}