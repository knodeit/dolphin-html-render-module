/**
 * Created by Vadim on 12/14/15.
 */
'use strict';
var Module = require('dolphin-core-modules').Module;
var swig = require('swig');
var Q = require('q');
var deferred = Q.defer();

var myModule = new Module('HtmlRender', __dirname);

myModule.configureFactories(function (WebServerConfigurationFactory) {
    WebServerConfigurationFactory.addPromise(deferred.promise);

    //init
    var app = WebServerConfigurationFactory.getApp();

    if (process.env.NODE_ENV == 'production') {
        app.set('view cache', true);
        swig.setDefaults({cache: 'memory'});
    } else {
        app.set('view cache', false);
        swig.setDefaults({
            cache: false
        });
    }
});

myModule.run(function (HtmlRenderConfigurationFactory) {
    var modules = HtmlRenderConfigurationFactory.getModules();
    for (var i in modules) {
        var module = modules[i];
        module.render = function (view, options) {
            var deferred = Q.defer();
            swig.renderFile(this.resolvePath('/server/views/' + view), options, function (err, html) {
                if (err) {
                    return deferred.reject(err);
                }
                deferred.resolve(html);
            });
            return deferred.promise;
        };
    }
    deferred.resolve();
});