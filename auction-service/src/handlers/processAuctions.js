import { getEndedAuctions } from "../lib/getEndedAuctions";
import { closeAuction } from "../lib/closeAuction";
import createError from "http-errors";

const processAuctions = async (event, context) => {
  try {
    const auctionsToClose = await getEndedAuctions();
    const closeAuctionPromises = auctionsToClose.map((auction) =>
      closeAuction(auction)
    );
    await Promise.all(closeAuctionPromises);

    return { closed: closeAuctionPromises.length };
  } catch (error) {
    console.log(error);
    throw new createError.InternalServerError(error);
  }
};

export const handler = processAuctions;
