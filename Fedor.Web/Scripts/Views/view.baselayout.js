BaseLayoutView = Backbone.View.extend({

    initItemWidth: 65,

    el: ".main-content",
    slideContent: ".slide-content",

    events: {
        "click .slide-content .slide-action": "expandSection"
    },

    initialize: function (options) {
        this.options = options || {};
        $(this.options.activeTab).addClass("active");

        this.$slideContent = $(this.slideContent);
        this.$slideElements = this.$slideContent.find(".slide-action");
        this.initSize();
        this.initPositions();
    },

    initSize: function () {
        var self = this;

        this._sectionContentSize = this.$slideContent.outerWidth() - this.$slideElements.length * this.initItemWidth;
        this._closedElementWidth = this.$slideElements.find(".title-text").outerWidth();
        this._sectionSize = this._closedElementWidth + this._sectionContentSize;

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

        var self = this;
        $active.nextAll(".slide-action").each(function () {
            var $item = $(this);

            var leftPosition = $item.position().left;
            $item.css({
                left: leftPosition + self._sectionContentSize + "px"
            });
        });
    },

    expandSection: function (event) {
        var $currentTarget = $(event.currentTarget);

        if ($currentTarget.hasClass("active")) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }

        var self = this;
        var $currentActive = $currentTarget.nextAll(".slide-action.active");
        var $itemsToMove;

        if ($currentActive.length === 0) {
            $currentActive = $currentTarget.prevAll(".slide-action.active");
            $itemsToMove = $currentTarget.prevUntil($currentActive, ".slide-action").add($currentTarget);

            $currentTarget.css({ width: this._sectionSize + "px" });
            $currentActive.css({ width: this._closedElementWidth });

            $itemsToMove.each(function () {
                var $item = $(this);

                self.moveItemBackward($item);
            });
        } else {
            // move forward
            $itemsToMove = $currentTarget.nextUntil($currentActive, ".slide-action").add($currentActive);;

            $currentTarget.css({ width: this._sectionSize + "px" });
            $currentActive.css({ width: this._closedElementWidth });

            $itemsToMove.each(function () {
                var $item = $(this);

                self.moveItemForward($item);
            });
        }

        $currentActive.removeClass("active");
        $currentTarget.addClass("active");
    },
    
    moveItemForward: function ($item) {
        var leftPosition = $item.position().left;
        $item.css({ left: leftPosition + this._sectionContentSize + "px" });
    },

    moveItemBackward: function ($item) {
        var leftPosition = $item.position().left;
        $item.css({ left: leftPosition - this._sectionContentSize + "px" });
    }
});