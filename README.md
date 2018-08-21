# Showdown Homescreen

## React Player Warnings/Issues

- (Getting warning 'video is being deferred until the player has loaded')[https://github.com/CookPete/react-player/issues/413]
- Vimeo permissions that prevent the video from loading may cause the player to not load subsequent videos withuot `onError` handler

## CSS References for `player.js

- [How player manages the size](https://github.com/vimeo/player.js/blob/dfc3f922e4676b66624dbaa89b3d8f9144c092f1/src/lib/embed.js#L194)
```js
            // Change padding-bottom of the enclosing div to accommodate
            // card carousel without distorting aspect ratio
            const space = iframes[i].parentElement;
            space.style.paddingBottom = `${event.data.data[0].bottom}px`;
```