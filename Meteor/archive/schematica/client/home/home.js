Template.home.events({
	'dblclick .schema': function(evt, tmp){
		evt.preventDefault();
		evt.stopPropagation();
		if(evt.target.className === "container-fluid schema"){
			var id = Positions.insert({name:"New Table", 
										left:(evt.pageX) + "px",
										top:(evt.pageY) + "px"});
			Session.set('editing_table', id);
		}
	}
});

Template.home.helpers({
	positions: function () {
		return Positions.find();
	}
});