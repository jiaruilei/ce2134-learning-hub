window.MathJax = {
  loader: {
    paths: {
      mathjax: new URL('./vendor/mathjax', document.baseURI).href,
      sre: new URL('./vendor/mathjax/sre', document.baseURI).href,
    },
  },
  output: {
    font: 'mathjax-newcm',
    fontPath: new URL('./vendor/mathjax-newcm-font', document.baseURI).href,
    displayAlign: 'left',
  },
  svg: {fontCache: 'local'},
  startup: {typeset: false},
};
