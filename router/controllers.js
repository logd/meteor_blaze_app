LoginController = RouteController.extend({
  layoutTemplate:'UtilityLayout',
  template:'login',
  action: function(){
    this.render();
  }
});

NewPostController = RouteController.extend({
  layoutTemplate:'PostLayout',
  template:'newPost',
  action: function(){
    this.render();
  }
});

PostsListController = RouteController.extend({
  template:'postsList',
  action: function(){
    this.render();
  }
});