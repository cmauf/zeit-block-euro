* ZEIT Online Block Euro

This extension to Firefox aims to block any news regarding UEFA EURO 2024 from the front page of ZEIT Online. 
It does so by scanning links in HTML elements for URLS containing "em", "europameisterschaft", "fussball-em". 
Hence, it is a very basic approach to not be bombarded with news that you might find annoying, irrelevant or unpleasant.

** Installation

This extension can be added to Firefox via the (Extension Page)[https://addons.mozilla.org/en-US/firefox/addon/zeit-online-block-euro/].


** How it works

Since it's just a couple of lines in vanilla JavaScript, it is not very complex.
The script scans for HTML elements that contain an `<a>`-Tag that refers to a URL containing "em", "europameisterschaft" or "fussball-em".
It also blocks the ticker on top of the page by CSS class. 
All the elements are set to `display: none;`, so they are not rendered.

** Contributing
Feel free to improve readability, add more sophisticated ways of blocking or idenfying elements etc. via a Pull Request.
You can also report bugs or request features by (mailto:ahoj@mauf-clausen.de)[shooting me an e-mail].

Happy EURO-free browsing!

