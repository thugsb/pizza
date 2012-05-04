(function($) {
  
  // cart hasmany pizzas
  // pizza hasmany toppings
  // pizza hasone sauce
  
  window.Topping = Backbone.Model.extend({});
  window.Sauce = Backbone.Model.extend({});
  
  // Got to 12mins through 2nd vid.
  
  window.Toppings = Backbone.Collection.extend({
    model: Topping,
    url: '/toppings'
  });
  window.Sauces = Backbone.Collection.extend({
    model: Sauce,
    url: '/sauces'
  });
  
  window.Pizza = Toppings.extend({});
  
  window.library = new Toppings();
  window.sauceList = new Sauces();
  
  window.ToppingView = Backbone.View.extend({
    // className: 'toppings',
    initialize: function() {
      _.bindAll(this, 'render');
      this.model.bind('change', this.render); // Whenever the model data changes, update the view
      this.template = _.template($('#topping-template').html());
    },
    render: function() {
      $(this.el).html(this.template(this.model.toJSON())); // Render the view via the template
      return this;
    }
      
  });
  
  window.LibraryToppingView = ToppingView.extend({
    events: {
      'click .topping': 'add_to_pizza'
    },
    add_to_pizza: function() {
      this.collection.trigger('select', this.model); // I think: The pizza's collection will bind to this event
      console.log('triggered add_to_pizza', this.model);
    }
  });
  
  window.LibraryView = Backbone.View.extend({
    tagName: 'section',
    className: 'library',
    // template: '#library-template',
    initialize: function() {
      _.bindAll(this, 'render');
      this.template = _.template($('#library-template').html());
      this.collection.bind('reset', this.render);
    },
    render: function() {
      var $toppings, collection = this.collection;
      
      
      $(this.el).html(this.template({}));
      $toppings = this.$('.toppings');
      
      collection.each(function(topping) {
        var view = new LibraryToppingView({
          model: topping,
          collection: collection
        });
        $toppings.append(view.render().el);
      });
      
      return this;
    }
  });
  
  window.PizzaKing = Backbone.Router.extend({
    routes: {
      '': 'home',
      'cart': 'cart'
    },
    
    initialize: function() {
      this.libraryView = new LibraryView({
        collection: window.library
      });
      this.sauceListView = new LibraryView({
        collection: window.sauceList
      });
    },
    
    home: function() {
      $('#container').empty();
      $('#container').append(this.libraryView.render().el);
      $('#container').append(this.sauceListView.render().el);
    },
    cart: function() {
      alert('cart');
    }
    
    
  });
  
  $(function() {
    window.App = new PizzaKing();
    Backbone.history.start();
  });
  
})(jQuery);
