# Turbolinks + Vue.js Demo

* [Turbolinks][turbolinks] is a javascript utility to speed up clicking between server-side generated pages.
* [Vue.js][vuejs] is a small-yet-mighty javascript framework for building interactive UIs for the browser.

[turbolinks]: https://github.com/turbolinks/turbolinks
[vuejs]: https://vuejs.org

I like them both because they're small, thoughtfully made, and they stand against the big client-side frameworks.

## Making them work together

There's one major hurdle in making them work together. Since Turbolinks replaces the DOM of the body on page transitions, the event handlers and listeners that Vue.js sets up get wiped on page restores (when hitting the Back button in the browser). The Vue.js components are there, they're just no longer hooked up to the original data model.

## The trick used in this demo

So this demo uses one technique in action: [a mixin is used to upgrade all Vue.js components to save their state][mixin] right before Turbolinks goes to the next page. On page restores, the components get re-built from scratch, and get their saved-state loaded again. This happens really quickly, and you don't notice that components get re-built from scratch.

[mixin]: ./_assets/vue/mixins/vue-turbolinks.js

## The demo: An app to show a random article from my reading list

On the first page, a random article is picked from a sample of 10 articles from my [Instapaper][instapaper] reading list. (These articles are saved as blog posts in a jekyll-based site, I'm not interfacing with Instapaper here. The articles are available as static pages at a URL inside the demo.) That first page is a Vue.js app, and you can cycle through the random article list until you find an article to read. You click on the article preview and you're taken to the full article.

[instapaper]: https://www.instapaper.com

Some more details:

* Turbolinks is loaded on every page of the app
* The Vue.js app is loaded when a `turbolinks:load` event is fired. That's detailed in the `_assets/app.js` page
* `app.js` is also loaded on all pages of the site, so that if you come in through an full article page and click a link to go back to the home page, the home page's app gets built (without any information on the original state to load back, of course)
* The app makes use of four nested vue.js components, just to make the point that they all get rebuilt from their previous state, and each get re-built exactly as they were.
* The mixin saves the state in a large attribute (`turbolinks-state`) on the original HTML element that was  used to build the original vue.js instance. Just before Turbolinks saves the body DOM in the restore cache, the original HTML element is reverted back in the DOM, and the `turbolinks-state` attribute is applied to it. This means that if your Vue.js components have large data sets, that attribute will be huge. So that might be an issue.

## Who this is best for

This technique will be most appealing to you if:

* You're building a server-side generated site in Rails or Laravel
* You use, for most of your interactivity, the method Turbolinks encourages, which is to not use stuff like Vue.js and instead detect DOM events on the body element through even bubbling and detecting which element was clicked or handled.
* In a few spots in your app, you'd like a little more interactivity, and you upgrade that component with a Vue.js-based component. This is where this trick comes in.

Let's build small, quick apps.

## About me

My name is Pascal Laliberté and I care about starting small and building intentional stuff. You can learn more about what I do and what I care for at [pascallaliberte.me](http://pascallaliberte.me).

I also gave a [presentation at the Ottawa Ruby  meetup on Sept. 27, 2016 on this topic](https://speakerdeck.com/pascallaliberte/making-turbolinks-work-with-vue-dot-js-fast-server-generated-pages-with-reactive-front-end-components). Hope all this helps with what you're build.

Have a good day, and thanks for checking this out.
