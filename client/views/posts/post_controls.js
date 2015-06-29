Template.post_controls.onCreated(function () {
   // this.contentIsEmpty = new ReactiveVar(true);
   // this.isEditing = new ReactiveVar(true);
});

// Template.new_post.onRendered(function(){
//     $('.autosize').autosize();
// });

Template.post_controls.helpers({
  newPost: function() {
    return Iron.controller().state.get('newPost');
  },
  postTitleHasContent: function() {
    return Iron.controller().state.get('postTitleHasContent');
  }
});


Template.post_controls.events({
  "keyup .post-form": function(e,t){
    e.preventDefault();
    var postContent = event.target.value;
    // console.log(postContent);
  
    // on return, if post is not empty, create post and go to edit post view
    if(event.which === 13){
      var postTitle = Logd.posts.getTitleFromContent(postContent).title;
      var postTags = Logd.tags.getHashTags(postTitle);

      // postContent = Logd.posts.getTitleFromContent(postContent).content;

    
      var postAttributes = {
        title: postTitle,
        tags: postTags
        // ,
        // content: postContent,
        // tags: postTags 
      };

      Meteor.call('postInsert', postAttributes, function(error, result){
        if (error){
          alert(error.reason);
        } else {
           Router.go('edit_post', { _id: result._id });
        }
      });
    }
  }
});
