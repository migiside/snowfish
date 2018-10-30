import sourceMaps from "rollup-plugin-sourcemaps";
import typescript from "rollup-plugin-typescript2";


export default {
    input: `src/snowfish.ts`,
    output: [
        {file: "dist/snowfish.js", name: "snowfish", format: "umd", sourcemap: true},
    ],
    external: [],
    watch: {
        include: "src/**",
    },
    plugins: [
        typescript({useTsconfigDeclarationDir: true}),
        sourceMaps(),
    ],
};
