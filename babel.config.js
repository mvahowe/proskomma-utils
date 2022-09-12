module.exports = {
  'presets': [
    [
      '@babel/preset-env',
      {
        'targets': {
          'esmodules': true,
        },
        useBuiltIns: 'entry',
        corejs: 3,
      },
    ],
  ],
};