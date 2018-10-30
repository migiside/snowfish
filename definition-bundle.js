var dts = require('dts-bundle');

dts.bundle({
    name: 'snowfish',
    main: 'build/**/*.d.ts',
    out: '../dist/snowfish.d.ts',
    outputAsModuleFolder: true
});
