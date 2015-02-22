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

        if (!this.model.isNew()) {
            this.model.fetch().done(_.bind(this.render, this));
        } else {
            this.render();
        }
    },

    render: function() {
        this.$el.html(this.template(_.extend({ isNew: this.model.isNew() }, this.model.toJSON())));

        return this;
    },

    saveBook: function() {
        this.model.set({
            title: this.$("input[name='title']").val(),
            author: this.$("input[name='author']").val()
        });

        if (this.model.isValid(true)) {
            this.model.save().done(function() {
                window.app.navigate("books", {trigger: true});
            });
        } else {
            this.model.set(this.model.previousAttributes(), { silent: true });
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