import awardsModel from './awards.model.js';

export async function create({ awardData }) {
  const newAward = await awardsModel
    .create(awardData);
  return newAward;
}
