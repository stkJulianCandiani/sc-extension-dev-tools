/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define("Council.Select.View", [
  "council_select.tpl",
  "jQuery",
  "Backbone",
  "underscore",
], function CouncilSelectView(CouncilSelectTpl, jQuery, Backbone, _) {
  "use strict";

  return Backbone.View.extend({
    template: CouncilSelectTpl,

    events: {
      "click [data-navigation-selectors]": "selectCouncil",
      "click [data-submit]": "goToCouncil",
    },

    initialize: function initialize() {
      var categories = SC.CATEGORIES;
      var councilCategory = _.filter(
        categories,
        function filterCategories(category) {
          return category.custrecord_council_category === "T";
        }
      );
      var options = [];

      if (councilCategory && councilCategory.length) {
        _.each(councilCategory, function eachCouncilCategory(categoryItem) {
          options.push({
            name: categoryItem.name,
            value: categoryItem.fullurl,
          });
        });
      }

      this.options = _.sortBy(options, "name");

      this.selected = {
        name: " - Select - ",
        value: "",
      };
    },

    selectCouncil: function selectCouncil(e) {
      var $target = jQuery(e.currentTarget);
      var value = $target.data("value");
      var selected = $target.data("selected");
      var selectedOption;

      // TODO: review this undefined
      if (typeof selected === "undefined") {
        selectedOption = _.findWhere(this.options, {
          value: value,
        });

        selectedOption.isSelected = true;

        this.selected = selectedOption;

        // this.categorySelected = SC.CATEGORIES.find(
        //   (_category) =>
        //     _category.custrecord_council_category === "T" &&
        //     _category.fullurl === selectedOption.value
        // );
      }

      this.render();
    },

    goToCouncil: function goToCouncil(e) {
      // var url = this.categorySelected.categories.length
      //   ? this.categorySelected.categories[0].fullurl
      //   : this.categorySelected.fullurl;

      var url = this.selected.value;

      var $target = jQuery(e.currentTarget);

      e.preventDefault();

      if (url) {
        $target.attr("disabled", "disabled");

        Backbone.history.navigate(url, {
          trigger: true,
        });
      }
    },

    getContext: function getContext() {
      return {
        selected: this.selected,
        options: this.options,
      };
    },
  });
});
