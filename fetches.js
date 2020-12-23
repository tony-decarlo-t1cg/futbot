// Get trade pile
fetch("https://utas.external.s3.fut.ea.com/ut/game/fifa21/tradepile", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "x-ut-sid": "70a70901-af00-4cee-b23f-09eee978110d"
  },
  "referrer": "https://www.ea.com/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors"
});

// Put in trade pile
fetch("https://utas.external.s3.fut.ea.com/ut/game/fifa21/item", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/json",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "x-ut-sid": "96c2dff3-5223-4fca-8260-f02f9208a8af"
  },
  "referrer": "https://www.ea.com/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": "{\"itemData\":[{\"id\":162945033438,\"pile\":\"trade\"}]}",
  "method": "PUT",
  "mode": "cors",
  "credentials": "omit"
});

// List on auction house
fetch("https://utas.external.s3.fut.ea.com/ut/game/fifa21/auctionhouse", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/json",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "x-ut-sid": "96c2dff3-5223-4fca-8260-f02f9208a8af"
  },
  "referrer": "https://www.ea.com/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": "{\"itemData\":{\"id\":162945033438},\"startingBid\":1400,\"duration\":3600,\"buyNowPrice\":1600}",
  "method": "POST",
  "mode": "cors"
});

fetch("https://utas.external.s3.fut.ea.com/ut/game/fifa21/auctionhouse", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site"
  },
  "referrer": "https://www.ea.com/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "OPTIONS",
  "mode": "cors"
});

fetch("https://utas.external.s3.fut.ea.com/ut/game/fifa21/auctionhouse", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/json",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "x-ut-sid": "4416eadb-1d69-45f2-a99c-ddb41d5f42e8"
  },
  "referrer": "https://www.ea.com/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": "{\"itemData\":{\"id\":163508534826},\"startingBid\":1500,\"duration\":3600,\"buyNowPrice\":1600}",
  "method": "POST",
  "mode": "cors"
});

fetch("https://utas.external.s3.fut.ea.com/ut/game/fifa21/auctionhouse", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/json",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "x-ut-sid": "9d2ddf9f-bf50-4658-b4f6-08c4570c0537"
  },
  "referrer": "https://www.ea.com/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": "{\"itemData\":{\"id\":162062525424},\"startingBid\":2400,\"duration\":3600,\"buyNowPrice\":2500}",
  "method": "POST",
  "mode": "cors"
});

