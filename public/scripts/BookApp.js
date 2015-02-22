var BookApp = Backbone.Router.extend({
    routes: {
        "books/new": "addBook",
        "books/:id/edit": "editBook",
        "books(/)": "viewBookList",
        "(/)": "viewBookList"
    },

    initialize: function() {
        this.activeView = undefined;
    },

    viewBookList: function() {
        this.activeView && this.activeView.remove();

        this.activeView = new BookListView();

        $("body").html(this.activeView.$el);
    },

    addBook: function() {
        this.editBook();
    },

    editBook: function(id) {
        this.activeView && this.activeView.remove();

        var model = new BookModel({ id: id });

        this.activeView = new EditBookView({ model: model });

        $("body").html(this.activeView.$el);
    }
});