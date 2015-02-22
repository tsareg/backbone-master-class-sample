var BookModel = Backbone.Model.extend({
    urlRoot: "/api/books",

    defaults: {
        id: undefined,
        author: undefined,
        title: undefined
    },

    validation: {
        author: [
            {
                required: true
            }
        ],
        title: [
            {
                required: true
            }
        ]
    }
});

_.extend(BookModel.prototype, Backbone.Validation.mixin);