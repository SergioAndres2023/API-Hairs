import * as awardsAward from './awards.service.js';

export async function create(req, res) {
  const awardData = req.body;
  const awards = await awardsAward.create({ awardData });
  res.json(awards);
}
