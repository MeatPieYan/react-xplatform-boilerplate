const fs= require('fs');
const path = require('path');

function crossPlatformPlugin(options){
    this.options = options.name;
    console.log('options' ,this.options);
}

crossPlatformPlugin.prototype.apply = function(compiler){

    function  isPathExist (context, url){
        const _path = path.resolve(context ,url)+'.js'; 

        if(fs.existsSync(_path)){
            return true
        }
        return false
    }
    // h5, user/demo/react, ../test.js
    function resolvePath (options , context , url){
        
        const num = url.lastIndexOf('.');
        const beforePath = url.substring(0,num);

        if( ~ url.indexOf('.js') ){

            if(isPathExist(context,`${beforePath}.${options}`)){
                return `${beforePath}.${options}`
            } 
            
        }else {
            if(isPathExist(context, `${url}`)){
                if(isPathExist(context, `${url}.${options}`)){
                    return `${url}.${options}`
                } 
            }
            if (isPathExist(context,`${url}/index`)){
                if(isPathExist(context, `${url}/index.${options}`)){
                    return `${url}/index.${options}`
                }
                return `${url}/index`
            }

        }

        return url
        
    }

    compiler.plugin("normal-module-factory", (nmf) => {
        nmf.plugin("before-resolve", (result, callback) => {
            
            let _path = result.request;

            if( ~result.context.indexOf('/pages') ){
                
                _path  = resolvePath(this.options, result.context , _path);
            
            }

            result.request = _path;

            callback(null, result );
        });
    });

}

module.exports= crossPlatformPlugin;