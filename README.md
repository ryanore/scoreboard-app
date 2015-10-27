# scoreboard-backbone

A fairly simple Scoreboard (scorekeeping) App built with backbone on the front end.

- Started with, and heavily modified from https://github.com/mikechau/backbone-webpack-boilerplate

## TODO

- production webpack config
- webpack config consolidation
- setup backbone


## Selenium

Selenium must be installed and running in order to run integration tests.

### Global Install (recommended)

```
./bin/install/selenium.sh (may need to use sudo)
selenium-standalone start
```

### Local Install

```
npm run selenium:install
npm run selenium:start
```

## Testing

- `npm run test` - run integration and unit tests
- `npm run test:integration` - run only integration tests (WebdriverIO)
- `npm run test:unit` - run only unit tests (karma)

## Build
- needs prod config for webpack.
- `npm run build:assets` - will build the assets for production, Once you do that you can view them with any server 
## References

- [Web app (Karma+Mocha example)](https://github.com/cesarandreu/web-app)
- [PhantomJS Setup](https://github.com/angular/protractor/blob/master/docs/browser-setup.md#setting-up-phantomjs)
- [Selenium Standalone](https://github.com/vvo/selenium-standalone)
- [WebdriverIO](https://github.com/webdriverio/webdriverio)
- [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate)
- [Backbone Webpack Example](https://github.com/jerrysu/backbone-webpack-example)
- [Modern Backbone Starter-kit](https://github.com/sabarasaba/modern-backbone-starterkit)
- [Flux React Router Example (Webpack Dev Server example)](https://github.com/gaearon/flux-react-router-example)
