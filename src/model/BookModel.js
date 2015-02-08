var BookModel = Backbone.Model.extend({
    idAttribute: "isbn",

    defaults: {
        isbn: undefined,
        author: undefined,
        title: undefined
    }
});