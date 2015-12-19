import Collection from '../../base/collections/collection';
import Game from '../models/game';

let GamesCollection = Collection.extend({
	url: 'http://localhost:3000/games',
	model: Game
});

export default GamesCollection;