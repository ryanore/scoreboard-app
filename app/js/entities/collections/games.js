import Collection from 'base/collections/collection';
import Game from 'entities/models/game';
import {apiRoot} from 'config';

let GamesCollection = Collection.extend({
  url: apiRoot+'games',
  model: Game
});

export default GamesCollection;
