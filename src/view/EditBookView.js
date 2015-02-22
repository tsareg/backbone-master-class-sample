var EditBookView = Backbone.View.extend({
    template: _.template($("#edit-book-template").html()),

    events: {
        "click .saveBook": "saveBook"
    },

    initialize: function() {
        Backbone.Validation.bind(this, {
            valid: this.fieldIsValid,
            invalid: this.fieldIsInvalid,
            forceUpdate: true,
            selector: "name"
        });
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

        if (this.model.isValid(true)) {
            this.collection.set([ this.model ], { merge: true, add: true, remove: false });

            window.app.navigate("books", {trigger: true});
        }
    },

    remove: function() {
        Backbone.Validation.unbind(this);

        Backbone.View.prototype.remove.apply(this, arguments);
    },

    fieldIsValid: function(view, attr, selector) {
        var $parentEl = view.$('[' + selector + '="' + attr + '"]').parent();
        $parentEl.removeClass("error");
        $parentEl.find(".errorMessage").text("");
    },

    fieldIsInvalid: function(view, attr, error, selector) {
        var $parentEl = view.$('[' + selector + '="' + attr + '"]').parent();
        $parentEl.addClass("error");
        $parentEl.find(".errorMessage").text(error);
    }
});