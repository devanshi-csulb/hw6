import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'filter',
    pure: false
})
export class SearchFilter implements PipeTransform {

    transform(items: any, term: string): any {
        if (!term) return items;
        if (!items) return [];

        return SearchFilter.filter(items, term);
    }

    static filter(items: Array<{ [key: string]: any }>, term: string): Array<{ [key: string]: any }> {


        const toCompare = term.toLowerCase();


        return items.filter(function (item: any) {
            for (let property in item) {


                if (item[property] === null) {
                    continue;
                }

                let type = typeof item[property]
                if (type == 'object') {
                    for (let property1 in item[property]) {
                        if (item[property][property1] === null) {
                            continue;
                        }
                        if (item[property][property1].toString().toLowerCase().includes(toCompare)) {
                            return true;
                        }
                    }
                } else {
                    if (item[property].toString().toLowerCase().includes(toCompare)) {
                        return true;
                    }
                }

            }
            return false;
        });
    }
}
