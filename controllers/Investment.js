const Investment = require("../models/Investment");
const asyncWrapper = require("../middleWare/asyncWrapper");
const { StatusCodes } = require("http-status-codes");
//create investment
const create = asyncWrapper(async (req, res) => {
  const { investmentChoice, amount } = req.body;
  let profit = 0;
  if (investmentChoice === "bronze" || investmentChoice === "silver") {
    profit = Number(amount) * 0.02;
  } else if (investmentChoice === "gold" || investmentChoice === "platinum") {
    profit = Number(amount) * 0.04;
  }
  const investment = await Investment.create({
    amount: amount,
    investmentChoice: investmentChoice,
    profit: profit,
    createdBy: req.user.userId,
  });
  res.status(StatusCodes.CREATED).json({ investment });
});
//get all investment by user
const getAllInvestment = asyncWrapper(async (req, res) => {
  const allInvestment = await Investment.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ allInvestment });
});
//get specific investment
const getInvestment = asyncWrapper(async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;
  const investment = await Investment.findOne({ createdBy: userId, _id: id });
  res.status(StatusCodes.OK).json({ investment });
});

module.exports = { create, getAllInvestment, getInvestment };
