function Demoplugin(options) {
  this.options = options.name;
}

Demoplugin.prototype.apply = function(compiler) {
  compiler.plugin("normal-module-factory", (nmf) => {
      nmf.plugin("before-resolve", (result, callback) => {
          if ( result.request === '../shared/router') {
              result.request = `../dist/${this.options}/router`
          }

          callback(null, result);
      });
  });

}

module.exports= Demoplugin;
