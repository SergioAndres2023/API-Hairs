import awardsModel from './awards.model.js';

export async function getAll() {
  const awards = await awardsModel
    .find({ deleted: false })
    .lean();
  return awards;
}

export async function create({ awardData }) {
  const newAward = await awardsModel
    .create(awardData);
  return newAward;
}
