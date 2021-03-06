Template.app_header.helpers({
  headerLeft: function () {
    return LogdAppHeader[Router.current().route.getName()].headerLeft;
  },
  headerCenter: function () {

    // TODO: Create a global 'current_view' helper
    var current_view = Router.current().route.getName();
  
    switch (current_view){
      case 'home':
        return "user_nav";      

      case 'login':
        return "page_title";

      case 'tag_matches':
        return "page_title";

      case 'edit_post':
        return "post_title";

      case 'show_post':
        return "post_title";

      case 'tags_list':
        return "page_title";

      case 'search_results':
         return "search_form";   

      default: 
        return "page_title";
    };
  },
  headerRight: function () {
    return LogdAppHeader[Router.current().route.getName()].headerRight;
  },
    saveNotice: function() {

      // GOAL: if save changes was displayed, wait 2s before displaying a save notice again
      // if save notice + pause after is currently being displayed, ignore any requests to redisplay it until done

      // if (Session.get("saveNotice") === "Changes Saved."){
      //   return Session.get('saveNotice');
      //     Meteor.setTimeout(function() {
      //       Session.set("displaySaveNotice", false);
      //     }, 2000);
      // }

      // every 2 seconds set notice to ""
      // then get 
    // if(Session.get("hasContent")){
      //    Meteor.setTimeout(function() {
      //   Session.set("displaySaveNotice", false);
      //    // Session.set("saveNotice", "");
      // }, 2000);

   if(Session.get("hasContent")){
      return Session.get('saveNotice');
    }
  },
  // newPost: function () {
  //   return LogdButtons.newPost;
  // },
    showRightButton: function() {
      if(Router.current().route.getName() === 'edit_post'){

        return Session.get("hasContent");
      } else {
        return true;
      };
  },
    disableCreate: function(){
    if (Session.get("disableCreate")) {
      return "disabled";
    } else{
       return "";
    };
  }
});

Template.app_header.events({
  "click .tags-list": function(event) {
    event.preventDefault();
    Router.go('tags_list');
  },
   "click .create-post": function(event) {
     event.preventDefault();
     LogdPosts.createPost();

  },
    "click .edit-post": function(event) {
      event.preventDefault();
        Router.go('edit_post', {_id: Router.current().params._id});
  },
    "click .done-editing": function(event) {
      event.preventDefault();
      Router.go('show_post', {_id: Router.current().params._id});
  },
    "click .back-to-previous": function (e,t) {
      e.preventDefault();

      var current_view = Router.current().route.getName();
    
      switch (current_view){
        case 'show_post':
          Router.go('home');
          break;    

        case 'edit_post':
          // delete a new post that was abandoned
          if(Session.get("hasContent") === false){
            var postId = Router.current().params._id;
            Meteor.call('deletePost', postId, function (error, result) {
              if (error){ alert(error.reason);} 
            });
          };

          Router.go('home');
          break;   

        default: 
          history.back();
      };
  },
    "click .search": function (e,t) {
      e.preventDefault();
      Router.go('search_results');
    }
});
