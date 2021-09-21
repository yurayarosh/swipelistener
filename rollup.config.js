import babel from '@rollup/plugin-babel'
import css from 'rollup-plugin-import-css'
import htmlTemplate from 'rollup-plugin-generate-html-template'
import { uglify } from 'rollup-plugin-uglify'

export default [
  {
    input: './src/main.js',
    output: {
      file: './build/index.js',
      name: 'Popup',
      format: 'umd',
    },
    plugins: [
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**', // only transpile our source code
      }),
      uglify(),
    ],
  },
  {
    input: './src/main.js',
    output: [
      {
        file: './build/index.es.js',
        format: 'es',
      },
    ],
  },
  {
    input: './src/test.js',
    output: {
      file: './build/test.js',
      format: 'cjs',
    },
    plugins: [
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**', // only transpile our source code
      }),
      htmlTemplate({
        template: './src/index.html',
        target: './index.html',
      }),
      css(),
    ],
  },
]
