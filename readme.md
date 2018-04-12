# 2018 Landing

## URL
[localhost:8080](http://localhost:8080/)

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

#### Webpack Aliases /
> Webpack aliases are defined in /build/webpack.base.conf.js, modify or add here :

```javascript
alias: {
    vue$: 'vue/dist/vue.esm.js',
    '@': resolve('src'),
    styles: path.resolve(__dirname, '../src/styles'),
    Components: path.resolve(__dirname, '../src/scripts/components'),
    Config: path.resolve(__dirname, '../src/scripts/config')
}
```
