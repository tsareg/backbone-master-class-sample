var EditBookView = Backbone.View.extend({
    template: _.template($("#edit-book-template").html()),

    events: {
        "click .saveBook": "saveBook"
    },

    render: function() {
        this.$el.html(this.template(_.extend({ isNew: this.model.isNew() }, this.model.toJSON())));

        return this;
    },

    saveBook: function() {
        this.model.set({
            isbn: this.$("[name='isbn']").val(),
            title: this.$("[name='title']").val(),
            author: this.$("[name='author']").val()
        });

        window.app.navigate("books", {trigger: true, replace: true});
    }
});