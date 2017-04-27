import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';


@Injectable()
export class FormGroupHelper {

    loading: boolean = true;
    updateSet: number[] = [];

    constructor(
        public _fb: FormBuilder
    ) { }

    /**
     * Initializes a form array, based off a collection of form builder elements.
     * @param _arryFB
     * @returns {FormGroup} - The form group
     */
    initForm(_arryFB?: any): FormGroup  {
        return this._fb.group(_arryFB);
    }

    /**
     *
     * Initializes a repeatable form array. Used for Form Arrays
     * @param arrayObj - Array of objects, each object will get its own form row.
     * @param groupObj
     * @returns {FormArray}
     */
    initFormArray(arrayObj:any, groupObj: any): FormArray {
        let fbArr = this._fb.array([]);
            for (let entry of arrayObj) {

                let template = {};
                for (let prop in groupObj){
                    let arr = groupObj[prop].slice(0);
                    arr.unshift(entry[prop]);
                    template[prop] = arr;
                }

                let newGroup: FormGroup = this._fb.group(template)
                fbArr.push(newGroup);
        }
        return fbArr;
    }

     update(serviceName: any, newValuesVar: any, oldValueVar: any, updateParam1: any, updateParam2?: any, updateParam3?: any, updateParam4?: any) {
        this.loading = true;
        let updateItems = this.updateSet.map((i) => {
            let newValues = newValuesVar[i]; // is the form array definition... (what is editable to change)
            let oldValue = oldValueVar[i]; // this arrary is the entire array object deffinition
            console.log('newValues = ' + JSON.stringify(newValues) + ' -+- controls = ' + newValuesVar);
            console.log('oldValues = ' + JSON.stringify(oldValue) + ' -+- controls = ' + oldValueVar);
            oldValue.updateParam1 = newValues.updateParam1; // until old and new are the same and added to the entire object
            oldValue.updateParam2 = newValues.updateParam2;
            let updatedValue = oldValue;
            console.log('return of old value = ' + JSON.stringify(updatedValue));
            return updatedValue; // return the new value
        });
        serviceName.update(updateItems).subscribe((res: any) => {
            if (res) {
                oldValueVar = res;
            }
            this.loading = false;
            this.updateSet = [];
        });
    }

}
