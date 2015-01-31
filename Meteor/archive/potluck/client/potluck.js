Template.content.helpers({
  users: function () {
    return Meteor.users.find();
  }
});