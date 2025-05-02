/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define("FindYourCouncil.View", [
  "find_your_council.tpl",
  "Council.Model",
  "SC.Configuration",
  "Backbone",
  "underscore",
  "Utils",
], function FindYourCouncilView(
  FindYourCouncilTpl,
  CouncilModel,
  Configuration,
  Backbone,
  _
) {
  "use strict";

  return Backbone.View.extend({
    attributes: { class: "FindYourCouncil" },

    template: FindYourCouncilTpl,

    events: {
      "click [id=search]": "findCouncil",
    },

    findCouncil: function findCouncil(e) {
      // TODO: review this null
      var data = null;

      e.preventDefault();

      data = this.$el.find("form").serializeObject();
      this.model = new CouncilModel();
      this.zipcode = data.zipcode;
      this.model.fetch({
        data: data,
        success: _.bind(this.goToCouncil, this),
      });
    },

    goToCouncil: function goToCouncil(model) {
      var view;
      // TODO: change this configuration to non dependant module
      var noCouncilInfoMessage = Configuration.get("council.zipEmpty") || "";
      var noZipMessage = Configuration.get("council.zipInvalid");
      var errorMessage;

      if (model.get("fullurl")) {
        // Fix fullurl
        model.set("fullurl", model.get("fullurl").substring(1));
        model.set("isloader", true);

        // var categorySelected = SC.CATEGORIES.find(
        //   (_category) =>
        //     _category.custrecord_council_category === "T" &&
        //     _category.fullurl.includes(model.get("fullurl"))
        // );

        // var url = categorySelected.categories.length
        //   ? categorySelected.categories[0].fullurl
        //   : categorySelected.fullurl;

        Backbone.history.navigate(
          model.get("fullurl"),
          _.extend({
            trigger: true,
          })
        );
      } else {
        if (model.get("mappingid")) {
          errorMessage = noCouncilInfoMessage;
        } else {
          errorMessage = noZipMessage;
        }

        view = new Backbone.View({
          application: this.application,
        });

        view.title = _("Zip Code: $(0)").translate(this.zipcode);
        // TODO: review this 'render'
        view.render = function render() {
          this.$el.append(
            '<div class="no-council-info">' + errorMessage + "</div>"
          );
        };

        this.options.application.getLayout().showInModal(view);
      }
    },
  });
});
