var BookListView = Backbone.View.extend({
    template: $("#book-collection-template").html(),

    events: {
        "click .addNewBook": "addNewBook"
    },

    initialize: function() {
        this._subviews = [];

        this.collection = new BookCollection();

        this.collection.fetch({ reset: true });

        this.listenTo(this.collection, "remove", this.removeSubview);
        this.listenTo(this.collection, "add", this.addSubview);
        this.listenTo(this.collection, "reset", this.render);
    },

    removeSubview: function(model) {
        var view = _.find(this._subviews, function(view) { return view.model === model; });

        if (view) {
            this._subviews.splice(_.indexOf(this._subviews, view), 1);
            view.remove();
        }
    },

    addSubview: function(model) {
        var view = new BookListItemView({ model: model });
        this.$("tbody").append(view.render().$el);
        this._subviews.push(view);
    },

    render: function() {
        this.$el.html(this.template);

        _.invoke(this._subviews, "remove");

        this.collection.forEach(_.bind(this.addSubview, this));

        return this;
    },

    addNewBook: function() {
        window.app.navigate("books/new", {trigger: true});
    },

    remove: function() {
        _.invoke(this._subviews, "remove");

        Backbone.View.prototype.remove.apply(this, arguments);
    }
});