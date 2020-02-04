import os from 'os';
import * as script from '@script-string/core';
import language from './language';

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

const params: [string, string, any][] = [
    ['args', 'ScriptArguments', []]
];

const args = 'ScriptArguments'

class PSScript extends script.Builder {
    constructor(strings: string[], values: any[], options: script.builder.BuilderOptions) {
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

export const powershell = script.define(['powershell', 'pwsh'], PSScript);
