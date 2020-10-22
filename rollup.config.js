import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'source/index.ts',
  output: [
    {
      file: 'package/amd/bundle.js',
      format: 'amd',
      globals: {
        react: 'React',
      },
    },
    {
      file: 'package/es/bundle.js',
      format: 'es',
      globals: {
        react: 'React',
      },
    },
  ],
  plugins: [
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
