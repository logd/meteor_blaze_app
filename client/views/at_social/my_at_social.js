
// Template.myAtSocial.hooks({
//   created: function() {
//     console.log("created");
//   }
// });

Template.myAtSocial.replaces("atSocial");

Template.atSocial.helpers({
  socialButtonLabel: function() {   
    return LgdTxtHelpers.capitalizeFirstLetter(this._id);
  }
});