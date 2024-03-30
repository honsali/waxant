import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

const packageJson = require('./package.json');

export default [
    {
        input: 'index.ts',
        output: [
            {
                file: packageJson.main,
                format: 'cjs',
                sourcemap: true,
            },
            {
                file: packageJson.module,
                format: 'esm',
                sourcemap: true,
            },
        ],
        plugins: [
            peerDepsExternal(),
            resolve({
                preferBuiltins: false,
            }),
            commonjs(),
            typescript({ tsconfig: './tsconfig.json', include: ['*.ts+(|x)', '**/*.ts+(|x)'] }),
            terser(),
            postcss(),
            json(),
        ],
        external: ['react', 'react-dom', 'redux', 'styled-components'],
    },
    {
        input: ['dist/esm/types/index.d.ts'],
        output: [{ file: 'dist/types.d.ts', format: 'es' }],
        plugins: [dts.default()],
    },
];
