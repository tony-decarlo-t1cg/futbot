# futbot

This is a Node.js bot for the FIFA 21 web application. You must supply the bot with the filter of the players you want to snipe (See filters.js for examples). The bot will run on a loop every 15 seconds trying to search a player. After a player is found it will attempt to buy the player, put it into your trade pile, and then sell the player. WARNING if you abuse the bot too frequently and repeatedly get locked out of your account you will get banned.

## Getting started

1. Login to the FIFA 21 Web App (Preferably Google Chrome)
2. Right anywhere on the page and click "Inspect"
3. Go to the sources tab. In the top right click the "Deactivate breakpoints" button and the "Resume script execution" button. This should cause the yellow "Paused in debugger" message on the main page go away.
4. Go to the network tab. On the left side you will see all of the network requests. Click on a network request and then view the headers tab on the right. Try to find a request with `x-ut-sid` or `sid`. Save this value and insert it into the code

```
const token = "TOKEN_HERE";
```

5. Search for the player you want to snipe with the network tab open. Find the searchPlayer request and view the Request URL. See filters.js for examples. Save your search filter and replace it in the code block below

```
const fetchSearch = async () => {
  const api_call = await fetch(
    `https://utas.external.s3.fut.ea.com/ut/game/fifa21/transfermarket?num=21&start=0&type=player&zone=attacker&lev=gold&leag=13&team=1&maxb=${maxBuy}&rarityIds=1`,
```

6. Run node index.js
