import {Collection} from 'backbone';

	let DopeCollection = Collection.extend({
		sort_key: '_id',
		rev: false,
		url: '',

		filterBy(attr, val) {
			let filtered = this.filter( (box) => {
				return box.get(attr) === val;
			});
			return new BaseCollection(filtered);
		},

		filterHas(attr) {
			let filtered = this.filter( (model) => {
				return model.get(attr) ? model.get(attr) > 0 : false;
			});
			return new BaseCollection(filtered);
		},

		/**
		 *	BATCH DELETE
		 *	When there are multiples, collect their ids and send as batch
		 */
		batchDelete(a){
			let self = this;
			let c = new Collection(a);
			let list = JSON.stringify(c.pluck('_id'));
			console.log('list ', list);
			$.ajax({
				url: self.url + '/batch',
				type: 'POST',
				data: {ids: list}
			})
				.done(function(data, textStatus, jqXHR) {
					console.log('batchDelete .done ', data);
					self.fetch();
				})
				.fail(function(jqXHR, textStatus, errorThrown) {
					alert('fail');
				})
				.always(function(){
					console.log('always ');
				});
		},

		/**
		 *	Set Comparitor
		 *	Sets the attribute to be sorted on, 
		 *	In which order depends on state
		 */
		comparator(a, b) {
			if(!a.get(this.sort_key)) {
				return false;
			}
			if(this.rev) {
				return -a.get(this.sort_key).localeCompare(b.get(this.sort_key));
			} else {
				return a.get(this.sort_key).localeCompare(b.get(this.sort_key));
			}		
		},

		/**
		 *	Sort by attribute
		 *	Calls sort on collection after setting direction and sorting key
		 */
		sortByField(fieldName, dir) {
			if( this.sort_key != fieldName ){
				this.sort_key = fieldName;
			}else{
				this.rev = !this.rev;
			}

			if( dir ){
				this.rev = dir == -1 ? true  : false; 
			}
			this.sort();			
		}
	});

	export default DopeCollection;

