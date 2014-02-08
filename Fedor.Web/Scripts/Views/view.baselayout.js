BaseLayoutView = Backbone.View.extend({

    sectionSIze: 660,
    initItemWidth: 65,

    el: ".main-content",
    slideContent: ".slide-content",

    events: {
        "click .slide-content li": "expandSection"
    },

    initialize: function (options) {
        this.options = options || {};
        $(this.options.activeTab).addClass("active");

        this.$slideContent = $(this.slideContent)
        this.$slideElements = this.$slideContent.find("li");
        this.initSize();
        this.initPositions();
    },

    initSize: function () {
        var self = this;

        this._sectionContentSize = this.$slideContent.outerWidth() - this.$slideElements.length * this.initItemWidth;
        this._sectionSize = this.$slideElements.find(".title-text").outerWidth() + this._sectionContentSize;

        this.$slideElements.each(function (index) {
            var item = $(this);
            item.css({ left: self.initItemWidth * index + "px" });
            item.find(".content").css({ width: self._sectionContentSize + "px" });
        });
    },

    initPositions: function () {
        var $active = this.$slideElements.filter(function () {
            return $(this).hasClass("active");
        });

        $active.css({ width: this._sectionSize + "px" });

        var $next = $active.nextAll("li").each(function () {
            var $item = $(this);

            var leftPosition = $item.position().left;
            
        });

    },

    expandSection: function (event) {
        var $currentTarget = $(event.currentTarget);

        if ($currentTarget.hasClass("active")) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }

        var $siblings = $currentTarget.siblings("li");



    }
});