// 按键失焦
export const makeButtonUnFocus = (event) => {
    let target = event.target;
    if (target.nodeName === "I" || target.nodeName === "SPAN") {
        target = event.target.parentNode;
    }
    target.blur();
}

export const getMaxObject = (list) => {
    let maxKeys = 0;
    let maxKeyObject = list[0];
    for (const obj of list) {
        const keyCount = Object.keys(obj).length;
        if (keyCount > maxKeys) {
            maxKeys = keyCount;
            maxKeyObject = obj;
        }
    }
    return maxKeyObject;
}

import { v4 as uuid } from 'uuid';

export const getUUID = () =>{
    return uuid();
}