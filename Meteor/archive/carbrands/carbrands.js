var clearValues = function(){
  $('#make').val("").focus();
  $('#model').val("");
  $('#brand').val("");
};

var insertInfo = function(){
  var make = $('#make').val();
  var model = $('#model').val();
  var brand = $('#brand').val();
  CarBrands.insert({make:make,model:model,brand:brand});
};

CarBrands = new Mongo.Collection('carbrands');
if (Meteor.isClient) {
  Template.main.helpers({
    carbrands: function(){
      return CarBrands.find();
    }
  });

  Template.main.events({
    'click #submit': function(){
      insertInfo();
      clearValues();
    },
    'keyup': function(e){
      if (event.which === 13){
        insertInfo();
        clearValues();
      }
    }
  });
  
}

if (Meteor.isServer) {
  
}
