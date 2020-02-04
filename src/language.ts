import {
    LanguageInterface,
    LanguageDefinition
} from '@script-string/core/lib/language-types';

const stringEscape = (str: string) => str.replace(/[`"$]/g, '`$&');

const plainName = /^[a-zA-Z_]\w+$/;
const objectKey = (name: string) =>
    plainName.test(name) ? name : `"${stringEscape(name)}"`;

const declareName = (name: string, lang: LanguageInterface) => {
    lang.invalid(plainName.test(name), name, 'name');
    return `$${name}`;
};

const reprBigInt = (val: bigint) => `[bigint]"${String(val)}"`;
const reprString = (val: string) => `"${stringEscape(val)}"`;
const reprDate = (val: any) => `$(Get-Date -Format o "${val.toISOString()}")`;

const language: LanguageDefinition = {
    reprs: {
        string: reprString,
        bigint: reprBigInt,
        date: reprDate
    },
    consts: {
        // string representations of language
        // constants 'null' or undefined for unsupported
        true: '$true',
        false: '$false',
        null: '$null',
        invalid_date: '$null',
        nan: '[double]::NaN',
        positive_infinity: '[double]::PositiveInfinity',
        negative_infinity: '[double]::NegativeInfinity',
        undefined: '$null'
    },
    format: {
        indent: '  ',
        eol: '\n',
        declare: {
            name: declareName,
            start: '',
            assign: ' = ',
            end: '',
            sep: ';\n'
        },
        // 2 space indentation
        iterable: {
            sep: ', ',
            start: '@(',
            end: ')',
            // array of types that are valid
            valid: false,
            // array of types that are invalid
            invalid: false
        },
        object: {
            key: objectKey,
            sep: '; ',
            start: '@{',
            end: '}',
            assign: ' = ',
            // array of types that are valid
            valid: false,
            // array of types that are invalid
            invalid: false
            // break into new
            // into length
        }
    }
};

export default language;
