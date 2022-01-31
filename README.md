# jQuery scrollPaging

- Easy jQuery plugin for scroll pagination(infinite scroll)


## Features

* Easy and simple

* Different URL option(Request URL and Show URL)

* Custom XHR (XMLHttpRequest) useable

* Easy to use and short coding

* Small size (less than 8KB)

* Multi-events




## Installations

jquery-scrollpaging is available on [npmjs](https://www.npmjs.com/package/jquery-scrollpaging), [github](https://github.com/mamedul/jquery-scrollpaging) and [gitlab](https://gitlab.com/mamedul/jquery-scrollpaging)(using semantic versioning).

```
npm install jquery-scrollpaging
```
or 

```
npm i jquery-scrollpaging
```
or

```
npm save jquery-scrollpaging
```

Or you can use CDN in your HTML file-

jsDelivr CDN
```html
<script src="https://cdn.jsdelivr.net/npm/jquery-scrollpaging@1.0.0/src/jquery-scrollpaging-v1.0.0.min.js"></script>
```
Or Cloudflare CDN

```html
<script src="https://unpkg.com/jquery-scrollpaging@1.1.0/src/jquery-scrollpaging-v1.1.0.min.js"></script>
```

Or you can use locally downloaded file in your HTML file-
```html
<script src="./pathname/src/jquery-scrollpaging-v1.0.0.min.js"></script>
```


## How to use

-Simple to use

 ```html
 jQuery('.scroll-dom').scrollPaging()
 ```

 or 
With settings and events-
```html
jQuery('.scroll-dom').scrollPaging({
    requestURL: 'your-pagination-url?page=scrollPaging',
    minPage: 1,
    amount: 128,
    direction: 'vertical',
    affectURL: true,
    affectTitle: true,
    onBefore: function(evt, scrollDirection, isPositiveScroll, targetPage, isFuncRunnable, opts){
      if( jQuery('.scroll-dom').length == 0 ){
        jQuery('.scroll-dom').append('<div class="scroll-suggest" style="padding: 32px; text-align: center;">Loading..</div>');
      }
    },
    onBlank: function(evt, scrollDirection, isPositiveScroll, targetPage, url, opts){
      jQuery('.scroll-dom').find('.scroll-suggest').html('No data found!');
    },
    onFail : function(evt, scrollDirection, isPositiveScroll, targetPage, url, xhr, textStatus, errorThrown, opts){
      jQuery('.scroll-dom').find('.scroll-suggest').html('Fail to load');
    },
    onError: function(evt, scrollDirection, isPositiveScroll, targetPage, url, xhr, textStatus, errorThrown, opts){
      jQuery('.scroll-dom').find('.scroll-suggest').html('Got error on load');
    },
    onComplete: function(evt, scrollDirection, isPositiveScroll, targetPage, url, data, textStatus, jqXHR, opts){
      jQuery('.scroll-dom').find('.scroll-suggest').remove();
    },
    onMaxPageComplete: function(evt, scrollDirection, isPositiveScroll, targetPage, url, data, textStatus, jqXHR, opts){
      if( jQuery('.scroll-dom').length == 0 ){
        jQuery('.scroll-dom').append('<div class="scroll-suggest" style="padding: 32px; text-align: center;">Loading..</div>');
      }
    }
})
```


## Documentation

Check the [documentations here.](https://github.com/mamedul/jquery-scrollpaging/wiki)



## License

The plugin is Licensed under the [MIT license](https://github.com/mamedul/jquery-scrollpaging/blob/master/LICENSE).



## Contributing

The plugin is developed by [MAMEDUL ISLAM](https://mamedul.github.io).