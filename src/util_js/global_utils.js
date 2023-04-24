// 按键失焦
export const makeButtonUnFocus = (event) => {
    let target = event.target;
    if (target.nodeName === "I" || target.nodeName === "SPAN") {
        target = event.target.parentNode;
    }
    target.blur();
}
import { v4 as uuid } from 'uuid';

export const getUUID = () =>{
    return uuid();
}