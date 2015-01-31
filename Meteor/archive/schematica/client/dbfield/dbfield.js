Template.dbfield.events({
	'click .icon-lock':function(evt,tmp){
		evt.stopPropagation();
		evt.preventDefault();
		Session.set('editing_field',this._id);
	},
	'keyup .efield': function(evt,tmp){
		evt.stopPropagation();
		evt.preventDefault();
		var fieldname = tmp.find('.efield').value;
		if(fieldname && event.which === 13){
			DBfields.update(this._id,{$set:{name:fieldname}});
			Session.set('editing_field',null);
		}
	}
});

Template.dbfield.helpers({
	editing_field: function(){
		return Session.equals('editing_field', this._id);
	}
});