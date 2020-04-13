# proxy-switcher-cli
An easy proxy switch cli.
The supported apps are including git, npm , yarn.

## Install
```
npm install -g proxy-switch
```

or

```
yarn global add proxy-switch
```

## Use
### List configuration
List all supported app's configuration.
```
proxy-switch list all
```

List a specific app's configuration.
For example:
```
proxy-switch list yarn
```

### Add proxy
Add proxy url to all supported app's configuration.
```
proxy-switch add all http://YOUR_PROXY_URL
```

Add proxy url to a specific app's configuration.
For example:
```
proxy-switch add git http://YOUR_PROXY_URL
```

### Reset proxy
Delete proxy url from all supported app's configuration.
```
proxy-switch reset all
```

Delete proxy url from a specific app's configuration.
For example:
```
proxy-switch reset npm
```
