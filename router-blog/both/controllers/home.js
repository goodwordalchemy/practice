HomeController = RouteController.extend({
  
  action: function(){
  	this.render();
  },
  template: 'Blog',
  waitOn: function(){  //only subscribe on this route
  	return [Meteor.subscribe('articles')]; //can manage multiple stubscriptions
  }

});
HomeController.helpers({ // THIS IS FUCKING SWEET! Defines helper functions 
  
  articles: function(){  
    return Articles.find(); 
  }
});