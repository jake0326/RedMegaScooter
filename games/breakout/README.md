# Basic Breakout HTML Game

This is a basic implementation of the Atari Breakout game, but it's missing a few things intentionally and they're left as further exploration for the reader.

<img width="300" alt="image" src="https://user-images.githubusercontent.com/2433219/94984422-03b57400-0509-11eb-9995-3390351a8756.png">

## Further Exploration

- Lives
  - The player should have 3 chances to remove all the bricks. Display how many lives the player currently has using [context.fillText()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillText). Remove a life when the ball goes below the screen
- Score
  - When a ball collides with a brick, the score should increase based on the color. See [https://en.wikipedia.org/wiki/Breakout_(video_game)](https://en.wikipedia.org/wiki/Breakout_(video_game)#Gameplay)
  - Display a high score using [localSorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- Ball speed
  - The ball should slowly get faster at certain points in the game. See [https://en.wikipedia.org/wiki/Breakout_(video_game)](https://en.wikipedia.org/wiki/Breakout_(video_game)#Gameplay)
- Mobile and touchscreen support
  - Allow the game to be scaled down to a phone size. See https://codepen.io/straker/pen/VazMaL
  - Support [touch controls](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events)
- Better paddle movement
  - Currently the paddle movement is sticky. If you press the opposite direction while releasing the other direction, the padddle doesn't move right away. And if you release a direction while holding the other, the paddle stops. Improve it so it doesn't do this.
  
**Important note:** I will answer questions about the code but will not add more features or answer questions about adding more features. This series is meant to give a basic outline of the game but nothing more.  
  
## License

(CC0 1.0 Universal) You're free to use this game and code in any project, personal or commercial. There's no need to ask permission before using these. Giving attribution is not required, but appreciated.

## Other Basic Games

- [Snake](https://gist.github.com/straker/ff00b4b49669ad3dec890306d348adc4)
- [Pong](https://gist.github.com/straker/81b59eecf70da93af396f963596dfdc5)
- [Tetris](https://gist.github.com/straker/3c98304f8a6a9174efd8292800891ea1)
- [Bomberman](https://gist.github.com/straker/769fb461e066147ea16ac2cb9463beae)
- [Frogger](https://gist.github.com/straker/82a4368849cbd441b05bd6a044f2b2d3)
- [Missile Command](https://gist.github.com/straker/afc4e2a30b6df772a5f9f6ef01751d41)
- [Sokoban](https://gist.github.com/straker/2fddb507d4bb6bec54ea2fdb022d020c)

## Support

Basic HTML Games are made possible by users like you. When you become a [Patron](https://www.patreon.com/straker), you get access to behind the scenes development logs, the ability to vote on which games I work on next, and early access to the next Basic HTML Game.

### Top Patrons

- Innkeeper Games
- Karar Al-Remahy