define('FAQ.View', [
    'FAQ.Grid.Cell',
    'faq_view.tpl',
    'faq_collection_view_row.tpl',
    'faq_collection_view_cell.tpl',
    'Backbone',
    'Backbone.CollectionView'
], function FAQView(
    FAQGridCell,
    faqViewTpl,
    FaqCollectionViewRowTpl,
    FaqCollectionViewCellTpl,
    Backbone,
    BackboneCollectionView
) {
    'use strict';

    return Backbone.View.extend({
        template: faqViewTpl,

        initialize: function initialize(options) {
            var self = this;

            this.collection = options.collection;

            this.collection.on('sync', function onSync() {
                self.render();
            });
        },

        childViews: {
            'FAQ.Grid': function FAQGrid() {
                return new BackboneCollectionView({
                    collection: this.collection,
                    viewsPerRow: 1,
                    childView: FAQGridCell,
                    cellTemplate: FaqCollectionViewCellTpl,
                    rowTemplate: FaqCollectionViewRowTpl
                });
            }
        }
    });
});
