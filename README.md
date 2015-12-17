### Adding render method to a module

### Installation
```npm install dolphin-html-render-package --save```

### HtmlRenderConfigurationFactory

methods:
* addModule - registration custom module


When you call "addModule" the plugin will know all your views:
```
package_folder
   server
      views
```


### Example
```
var Module = require('dolphin-core-modules').Module;
var test = new Module('Test', __dirname);

test.configureFactories(function (HtmlRenderConfigurationFactory) {
    HtmlRenderConfigurationFactory.addModule(test);
});
```

