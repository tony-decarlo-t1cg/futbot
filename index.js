const fetch = require("node-fetch");

let count = 0;

// x-ut-sid
const token = "TOKEN_HERE";

// Filter Builder
const playerId = "200104";
const lev = "gold";
const rarityIds = "1";
const pos = "";
const zone = "";
const playStyle = "";
const nat = "45";
const leag = "31";
const team = "114153";
const maxBuy = "1200";

let lastBuy = [];

let difference = (arr1, arr2) => {
  return arr1.filter((x) => !arr2.includes(x));
};

const equals = (lastBuy, newBuy) => {
  if (lastBuy.length === 0) {
    return false;
  } else {
    return (
      lastBuy.length === newBuy.length &&
      lastBuy.every((v, i) => v === newBuy[i])
    );
  }
};

const bidFormula = (boughtFor) => {
  return Number(
    Math.ceil((parseInt(boughtFor) * 0.1 + parseInt(boughtFor)) / 100) * 100
  );
};

const buyFormula = (boughtFor) => {
  return Number(
    Math.ceil((parseInt(boughtFor) * 0.15 + parseInt(boughtFor)) / 100) * 100
  );
};

searchPlayer = async () => {
  try {
    const data = await fetchSearch();
    // Check if the player exists and if we previously have not tried to buy the player
    if (
      data.auctionInfo.length > 0 &&
      !equals(
        lastBuy,
        data.auctionInfo.map((player) => player.tradeId)
      )
    ) {
      const tradeList = data.auctionInfo.map((player) => player.tradeId);
      const itemList = data.auctionInfo.map((player) => player.itemData.id);

      console.log("Players found");
      console.log("itemId", itemList);
      const searchData = {
        tradeList: difference(tradeList, lastBuy),
        itemList,
      };
      lastBuy = [...tradeList];
      await buyPlayer(searchData);
    } else {
      console.log("Not found, returning...");
      return;
    }
  } catch (err) {
    console.log("findPlayer error:", err);
  }
};

const buyPlayer = async (searchData) => {
  try {
    const buyPromises = [];
    for (let i = 0; i < searchData.tradeList.length; i++) {
      buyPromises.push(fetchBuy(searchData.tradeList[i]));
    }

    Promise.all(buyPromises)
      .then(() => {
        for (let i = 0; i < searchData.tradeList.length; i++) {
          console.log("Player buy attempted " + searchData.tradeList[i]);
        }
      })
      .catch((err) => {
        console.log("Buy player error", err);
      })
      .then(() => {
        const putPromises = [];
        for (let i = 0; i < searchData.itemList.length; i++) {
          putPromises.push(putTradePile(searchData.itemList[i]));
        }
        Promise.all(putPromises)
          .then(() => {
            for (let i = 0; i < searchData.itemList.length; i++) {
              console.log("Player put attempted " + searchData.itemList[i]);
            }
          })
          .catch((err) => {
            console.log("put player error");
          })
          .then(async () => {
            let tradePile = await getTradePile();

            const filterTradePile = await tradePile.auctionInfo.filter(
              (player) => {
                return (
                  player.tradeState === "expired" || player.tradeState === null
                );
              }
            );

            console.log("filterTradePile", filterTradePile);

            const sellPromises = [];
            for (let i = 0; i < searchData.itemList.length; i++) {
              sellPromises.push(sellPlayer(searchData.itemList[i]));
            }

            Promise.all(sellPromises)
              .then(() => {
                for (let i = 0; i < searchData.itemList.length; i++) {
                  console.log(
                    "Player sell attempted " + searchData.itemList[i]
                  );
                }
              })
              .catch((err) => {
                console.log("sell player error");
              });
          });
      });
  } catch (err) {
    console.log("err" + err);
  }
};

const getTradePile = async () => {
  const api_call = await fetch(
    "https://utas.external.s3.fut.ea.com/ut/game/fifa21/tradepile",
    {
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "no-cache",
        "content-type": "application/json",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "x-ut-sid": `${token}`,
      },
      referrer: "https://www.ea.com/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      method: "GET",
      mode: "cors",
    }
  );
  const data = await api_call.json();
  return data;
};

const putTradePile = async (itemDataId) => {
  fetch("https://utas.external.s3.fut.ea.com/ut/game/fifa21/item", {
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/json",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "x-ut-sid": `${token}`,
    },
    referrer: "https://www.ea.com/",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: `{\"itemData\":[{\"id\":${itemDataId},\"pile\":\"trade\"}]}`,
    method: "PUT",
    mode: "cors",
    credentials: "omit",
  });
};

const sellPlayer = async (itemDataId) => {
  const startingBid = bidFormula(maxBuy);
  const buyNowPrice = buyFormula(maxBuy);
  try {
    await fetch(
      "https://utas.external.s3.fut.ea.com/ut/game/fifa21/auctionhouse",
      {
        headers: {
          accept: "*/*",
          "accept-language": "en-US,en;q=0.9",
          "content-type": "application/json",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          "x-ut-sid": `${token}`,
        },
        referrer: "https://www.ea.com/",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: `{\"itemData\":{\"id\":${itemDataId}},\"startingBid\":${startingBid},\"duration\":3600,\"buyNowPrice\":${buyNowPrice}}`,
        method: "POST",
        mode: "cors",
      }
    );
  } catch (err) {
    console.log("sell player error", err);
  }
};

const fetchSearch = async () => {
  const api_call = await fetch(
    `https://utas.external.s3.fut.ea.com/ut/game/fifa21/transfermarket?num=21&start=0&type=player&zone=attacker&lev=gold&leag=13&team=1&maxb=${maxBuy}&rarityIds=1`,
    {
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "no-cache",
        "content-type": "application/json",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "x-ut-sid": `${token}`,
      },
      referrer: "https://www.ea.com/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      method: "GET",
      mode: "cors",
      credentials: "omit",
    }
  );
  const data = await api_call.json();
  return data;
};

const fetchBuy = async (searchData) => {
  await fetch(
    `https://utas.external.s3.fut.ea.com/ut/game/fifa21/trade/${searchData}/bid`,
    {
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "x-ut-sid": `${token}`,
      },
      referrer: "https://www.ea.com/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: `{\"bid\":${maxBuy}}`,
      method: "PUT",
      mode: "cors",
    }
  );
};

const main = async () => {
  console.log("Hit: " + count);
  await searchPlayer();
  count++;
};

try {
  setInterval(main, 15000);
} catch (err) {
  console.log("err" + err);
}
