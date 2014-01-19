BaseLayoutView = Backbone.View.extend({

    el: "base-layout",
    
    initialize: function (options) {
        this.options = options || {};
        
        $(this.options.activeTab).addClass("current");
    }
});