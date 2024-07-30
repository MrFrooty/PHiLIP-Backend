module.exports = {
    extends: ['next', 'next/core-web-vitals'],
    parserOptions: {
      babelOptions: {
        presets: [require.resolve('next/babel')],
      },
    },
  };