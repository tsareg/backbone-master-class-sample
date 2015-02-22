var BookModel = Backbone.Model.extend({
    idAttribute: "isbn",

    defaults: {
        isbn: undefined,
        author: undefined,
        title: undefined
    },

    validation: {
        isbn: [
            {
                required: true
            }
        ],
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