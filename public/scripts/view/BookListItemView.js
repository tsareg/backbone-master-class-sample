var BookListItemView =  Backbone.View.extend({
    el: "<tr>",

    template: _.template($("#book-template").html()),

    events: {
        "click .editBook": "editBook",
        "click .removeBook": "removeBook"
    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));

        return this;
    },

    editBook: function() {
        window.app.navigate("books/" + this.model.get("id") + "/edit", { trigger: true });
    },

    removeBook: function() {
        this.model.destroy({ wait: true });
    }
});