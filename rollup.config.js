import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

export default {
  input: 'source/index.ts',
  output: [
    {
      file: 'package/dist/cjs/bundle.js',
      name: 'bundle.js',
      format: 'cjs',
      globals: {
        react: 'React',
      },
    },
    {
      file: 'package/dist/umd/bundle.js',
      name: 'bundle.js',
      format: 'umd',
      globals: {
        react: 'React',
      },
    },
    {
      file: 'package/dist/es/bundle.m.js',
      name: 'bundle.m.js',
      format: 'es',
      globals: {
        react: 'React',
      },
    },
  ],
  plugins: [
    peerDepsExternal(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    resolve({
      browser: true,
      resolveOnly: [/^(?!react$)/],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
  ],
};
