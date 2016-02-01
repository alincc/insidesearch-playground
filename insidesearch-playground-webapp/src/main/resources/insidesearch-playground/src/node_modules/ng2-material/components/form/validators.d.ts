import { Validator } from "angular2/common";
import { Control } from "angular2/common";
export declare class MdPatternValidator implements Validator {
    static inline(pattern: string): Function;
    mdPattern: string;
    validate(control: Control): {
        [key: string]: any;
    };
}
export declare class MdMaxLengthValidator implements Validator {
    static inline(length: number | string): Function;
    mdMaxLength: string;
    validate(control: Control): {
        [key: string]: any;
    };
}
export declare class MdMaxValueValidator implements Validator {
    static inline(length: number | string): Function;
    mdMax: string;
    validate(control: Control): {
        [key: string]: any;
    };
}
export declare class MdMinValueValidator implements Validator {
    static inline(length: number | string): Function;
    mdMin: string;
    validate(control: Control): {
        [key: string]: any;
    };
}
export declare class MdNumberRequiredValidator implements Validator {
    static inline(): Function;
    validate(control: Control): {
        [key: string]: any;
    };
}
export declare const INPUT_VALIDATORS: (typeof MdMaxLengthValidator | typeof MdPatternValidator | typeof MdMaxValueValidator | typeof MdMinValueValidator | typeof MdNumberRequiredValidator)[];
