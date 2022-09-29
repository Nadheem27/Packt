import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    constructor() { }

    dataTablesEmpty(length) {
        if (length == 0)
            document.querySelector('.dataTables_empty').classList.remove('datatables-empty');
        else
            document.querySelector('.dataTables_empty').classList.add('datatables-empty');
    }

    camelToSnake(key) {

        if(key.includes('_'))
            return key;

        let result = key.replace(/([A-Z])/g, " $1");
        return result.split(' ').join('_').toLowerCase();
    }
}
