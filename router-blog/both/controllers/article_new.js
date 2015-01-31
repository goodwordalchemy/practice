ArticleNewController = RouteController.extend({});

ArticleNewController.events({
	'submit form#new-article': function(e, tmpl){
		e.preventDefault();

		var form = tmpl.find('form');
		var title = tmpl.find('input[name=title]').value;
		var body = tmpl.find('textarea[name=body]').value;

		Articles.insert({
			title: title,
			body: body
		}, function (err, res){
			if (!err){
				Router.go('home', {}); // as first, you can giv "/".  data context as second param
			}
		});
	}
});