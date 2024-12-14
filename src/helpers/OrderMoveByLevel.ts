import {Move, Pokemon} from '../domain/entities/pokemon';

export const OrderMoveByLevel = ({move}: Pokemon) => {
  if (!move) return [];
  return [...move].sort((a, b) => a.level - b.level);
};
