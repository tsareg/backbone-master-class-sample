var BookApp = Backbone.Router.extend({
    routes: {
        "books/new": "addBook",
        "books/:isbn/edit": "editBook",
        "books(/)": "viewBookList",
        "(/)": "viewBookList"
    },

    initialize: function() {
        this.books = new BookCollection([
            {
                isbn: "1234",
                title: "Test",
                author: "Me"
            },
            {
                isbn: "5678",
                title: "Test",
                author: "Me"
            }
        ]);

        this.activeView = undefined;
    },

    viewBookList: function() {
        this.activeView && this.activeView.remove();

        this.activeView = new BookCollectionView({ collection: this.books });

        $("body").html(this.activeView.render().$el);
    },

    addBook: function() {
        this.activeView && this.activeView.remove();

        var model = new BookModel();

        this.books.add(model);

        this.activeView = new EditBookView({ model: model });

        $("body").html(this.activeView.render().$el);
    },

    editBook: function(isbn) {
        this.activeView && this.activeView.remove();

        var model = this.books.get(isbn);

        if (model) {
            this.activeView = new EditBookView({model: model});

            $("body").html(this.activeView.render().$el);
        } else {
            $("body").html("Not found");
        }
    }
});