import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import { uglify } from 'rollup-plugin-uglify'
import pkg from './package.json'

export default [
  // browser-friendly UMD build
  {
    input: 'src/index.js',
    output: {
      file: 'dist/emotion.umd.js',
      format: 'umd',
      name: 'hyperappEmotion',
      globals: ['hyperapp'],
    },
    plugins: [
      resolve(),
      replace({
        'process.env.NODE_ENV': '"production"',
        'const styled = ': 'export const styled = ',
        'export default styled': '',
      }),
      commonjs(),
      babel({
        exclude: ['node_modules/**'],
      }),
      uglify(),
    ],
  },
  {
    input: 'src/index.js',
    external: ['hyperapp', 'emotion'],
    output: { file: pkg.main, format: 'cjs' },
    plugins: [
      // replace({
        // 'const styled = ': 'export const styled = ',
        // 'export default styled': '',
      // }),
      babel({
        exclude: ['node_modules/**'],
      }),
    ],
  },
  {
    input: 'src/index.js',
    external: ['hyperapp', 'emotion'],
    output: { file: pkg.module, format: 'es' },
    plugins: [
      babel({
        exclude: ['node_modules/**'],
      }),
    ],
  },
]
