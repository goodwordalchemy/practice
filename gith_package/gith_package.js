var gith = require('gith').create(9001);

gith({
	repo: 'goodwordalchemy/practice'
}).on('all', function(payload){
	console.log('post-receive happened!')
})