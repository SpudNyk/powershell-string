import os from 'os';
import { Builder, builder, define, include, raw } from '@script-string/core';
import language from './language';
export { include, raw };
const runner = {
    useStdIn: true,
    extension: '.ps1',
    command: {
        bin: os.platform() === 'win32' ? 'powershell.exe' : 'pwsh',
        common: ['-NoProfile'],
        stdin: ['-Command', '-'],
        file: ['-File']
    }
};

const params: [string, string, any][] = [['args', 'ScriptArguments', []]];

const args = 'ScriptArguments';

class PSScript extends Builder {
    constructor(
        strings: string[],
        values: any[],
        options: builder.BuilderOptions
    ) {
        super(strings, values, {
            name: 'powershell',
            language,
            runner,
            params,
            args,
            ...options
        });
    }

    *_foot() {
        // powershell -Command - needs the extra lines at the end to correctly
        // excute multi lines scripts
        yield '\n\n';
    }
}

export const powershell = define(['powershell', 'pwsh'], PSScript);
// alias
export { powershell as pwsh };
