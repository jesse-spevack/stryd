# Stryd Tech Challenge

## Features

1. Visit the [Leaderboard page](https://planetefficacy.github.io/stryd/) to view the overall top 10 Stryders.
2. Visit the [User page](https://planetefficacy.github.io/stryd/user.html) to view Kun's ranking as well as the ten users above and below him in the ranks.

The user page simulates a real time feed by swapping positions of random users every 4-5 seconds. The swap is accompanied by a style update to make the change more visible to the user.

## Notes

This project was written in HTML, CSS, and vanilla Javascript. The lodash Javascript library was also used in two places to sort and randomize data.

Thank you very much for reviewing this project!

## Project Organization

- HTML
  - `index.html` - Contains the html for the main leaderboard page.
  - `user.html` - Contains the html for the user specific page.
- Styles
  - `grid.css` - Contains my own grid implementation, used throughout the site.
  - `main.css` - Contains css for the `index.html` page.
  - `shared.css` - Contains css shared between `index.html` and `user.html` pages.
  - `user.css` - Contains css for the `user.html` page.
- Scripts
  - `data.js` - Stores the original json data for the project.
  - `index.js` - Contains the javascript used on both `index.html` and `user.html` pages.
  - `lodash.min.js` - copied from lodash.
  - `main.js` - Contains the javascript used on the `index.html` page.
  - `user.js` - Contains the javascript used on the `user.html` page.
