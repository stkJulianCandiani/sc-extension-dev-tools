define('FAQ.Grid.Cell', [
    'Backbone',
    'faq_grid_cell.tpl',
    'Utils',
    'SC.Configuration'
], function StarterKitsRouter(
    Backbone,
    FAQGridCellTpl
) {
    'use strict';

    return Backbone.View.extend({
        template: FAQGridCellTpl,

        getContext: function getContext() {
            return {
                section: this.model.get('section'),
                questions: this.model.get('questions'),
                gridIndex: this.options.index
            };
        }
    });
});
