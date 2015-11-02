import {CollectionView} from 'backbone.marionette';

	let CollectionTableView = CollectionView.extend({
		del_id: "overrideThis",
		selected: [],
		initialize() {
			console.log('init ');
		},
		events:{
			'change input[type="checkbox"]': 'handleSelectRow',
			'click .btn-delete': 'deleteRow'
		},

		/**
		 *	Delete users from collection
		 *	If there are a bunch, then batch delete, 
		 *	otherwise broadcast for models to delete themselves
		 */
		deleteRow() {
			if( confirm('You sure you wanna delete?')){
				if(this.selected.length > 1){
					if( typeof this.collection.batchDelete != 'undefined' ){
						this.collection.batchDelete(this.selected);
						return;
					}
				}
				vent.trigger('table:deleteRow')
			}
		},

		
		/**
		 *	Handle row selection
		 *	Makes delete button disabled when none selected
		 */
		handleSelectRow(e) {
			let sel = [];
			console.log('SELECT ', e);
			if( $(e.currentTarget).is('.selectAll')){
	  		$('.selectRow input').prop('checked', e.currentTarget.checked);
			}
			this.$el.find('.select-row:checked').each( function(i,el){
				sel.push(el.value);
			});

			this.$('.btn-delete').attr('disabled', sel.length == 0);
			this.selected = sel;
		}

	});

	export default CollectionTableView;

