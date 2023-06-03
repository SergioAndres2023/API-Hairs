import * as awardsRepo from './awards.repository.js';

export async function create({ awardData }) {
  const awards = await awardsRepo.create({ awardData });
  return awards;
}
