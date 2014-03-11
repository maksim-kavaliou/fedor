BaseLayoutView = Backbone.View.extend({

    initItemWidth: 80,
    slideStep: 10,

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

        var $currentActive = $currentTarget.nextAll(".slide-action.active");
        var $itemsToMove;
        var counter = this._sectionContentSize;

        if ($currentActive.length === 0) {
            $currentActive = $currentTarget.prevAll(".slide-action.active");
            $itemsToMove = $currentTarget.prevUntil($currentActive, ".slide-action").add($currentTarget);

            this.slideItems($itemsToMove, $currentActive, $currentTarget, this.moveItemBackward, counter);
        } else {
            // move forward
            $itemsToMove = $currentTarget.nextUntil($currentActive, ".slide-action").add($currentActive);;

            this.slideItems($itemsToMove, $currentActive, $currentTarget, this.moveItemForward, counter);
        }

        $currentActive.removeClass("active");
        $currentTarget.addClass("active");
    },

    slideItems: function ($itemsToMove, $currentActive, $currentTarget, moveAction, counter) {
        if (counter > 0) {
            var step = this.slideStep;

            if (counter >= step) {
                counter = counter - step;
            } else {
                step = counter;
                counter = 0;
            }

            $itemsToMove.each(function () { moveAction($(this), step); });
            this.decreaseItemWidth($currentActive, step);
            this.increaseItemWidth($currentTarget, step);

            var self = this;
            setTimeout(function () { self.slideItems($itemsToMove, $currentActive, $currentTarget, moveAction, counter); }, 1);
        }
    },

    moveItemForward: function ($item, step) {
        var leftPosition = $item.position().left;
        $item.css({ left: leftPosition + step + "px" });
    },

    moveItemBackward: function ($item, step) {
        var leftPosition = $item.position().left;
        $item.css({ left: leftPosition - step + "px" });
    },

    decreaseItemWidth: function ($item, step) {
        var width = $item.width();
        $item.css({ width: width - step + "px" });
    },

    increaseItemWidth: function ($item, step) {
        var width = $item.width();
        $item.css({ width: width + step + "px" });
    }
});