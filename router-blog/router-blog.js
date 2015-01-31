DEBUG = false;

Articles = new Meteor.Collection('articles');

Router.configure({
  layoutTemplate: 'Layout',
  loadingTemplate: 'Loading'
});

Iron.Router.plugins.authorize = function (router, options) {
  router.onBeforeAction(function(){ //Defining this globally.
    if (Meteor.loggingIn())
      return;
    else if (!Meteor.user())
      this.redirect(this.lookupOption('notAuthorizedRoute')); // route can be defined anywhere that options can be provided.  See below in this case.
    else
      this.next();
  }, options);
};

Router.plugin('authorize', {
  only: ['article.new'],
  notAuthorizedRoute: 'home' // <==== option from lookup option above.
});

// // These lines don't work:
// if(Meteor.isServer)
//   Router.use(Router.bodyParser.json());

Router.route("/", {name: "home"}); //name is specific to route.  Stays here for use with link helpers
Router.route('/blog/new', {name: 'article.new'});
Router.route("/blog/:_id", { name: 'article.show'});

Router.route('/webhooks/stripe', { name: 'webhooks.stripe', where: 'server' })
  .get(function(){
    this.response.end('GET hello world\n');
  })
  .post(function(){
    var json = this.request.body;
    this.response.end("You posted\n");
  });
  
if (Meteor.isClient) {
  Meteor.subscribe('articles');
}

if (Meteor.isServer) {

  Meteor.publish('articles', function(){
    if(DEBUG){
      console.log('articles is publishing.');
    }
    return Articles.find();
  });
  Meteor.publish('article', function(id){  //how does this get a parameter?
    if(DEBUG){
      console.log('article is publishing.');
    }
    return Articles.find({_id: id});
  });

  Meteor.startup(function(){
    Articles.remove({});
    for (var i = 0; i < 3; i++) {
      Articles.insert({
        title: 'Blog Article ' + i,
        body: 'This is the text body for the article I want to show',
        createdAt: new Date(),
        author: "David Goldberg"
      });
    }
  });
}
