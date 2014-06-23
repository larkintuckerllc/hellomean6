This "Hello Word" app is the sixth and final effort at learning the basics of the MEAN application stack. In this revision, I clean up the Bootstrap UI a bit, roll my own mobile menu slider, and use the HTML5 cache to speed up loading.

_Mobile Menu Slider_

Found lots of examples and tutorials of sliders on the Internet, but never found one that was entirely simple.  I took all the examples I found and rolled my own.

This example is just some basic CSS that I apply (triggering the slide animation) by using the Angular ng-class directive.

```
.slider_container {
        overflow-x: hidden;
}
.slider_content {
        position: relative;
        left: 0px;
        top: 0px;
        margin: 0px;
        overflow-x: hidden;
        transition: left 0.3s;
        -webkit-transition: left 0.3s;
        -moz-transition: left 0.3s;
}
.slider_content-right {
        left: 240px;
}
.slider_menu {
        position: absolute;
        left: -240px;
        top: 0px;
        width: 240px;
        height: 100%;
        overflow-x: hidden;
        background-color: #f5f5f5;
        transition: left 0.3s;
        -webkit-transition: left 0.3s;
        -moz-transition: left 0.3s;
}
.slider_menu-right {
        left: 0px;
}
```

_Browser Compatibility_

The two core frameworks are AngularJS and Bootstrap 3 with the intersection of their browser support as follows:

IE 9, IE 10, and IE 11 (Windows)
Firefox (Windows and MacOS)
Safari (MacOS and IOS)
Chrome (Windows, MacOS, IOS, and Android)


note: Going to avoid messing with the stock Android browser.
