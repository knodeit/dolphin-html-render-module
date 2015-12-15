/**
 * Created by Vadim on 12/14/15.
 */
'use strict';
var modules = [];

module.exports = {
    name: 'Configuration',
    entity: {
        addModule: function (module) {
            modules.push(module);
        },
        getModules: function () {
            return modules;
        }
    }
};