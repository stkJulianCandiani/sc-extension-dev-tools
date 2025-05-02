define('GTMCustomEvents.Items.Utilities', [], function () {
    'use strict';

    return {
        findItemList($item) {
            {
                var displayName = $($item)
                    .find(['div.merch-home-item-name a', 'span[itemprop="name"]'].join())
                    .text();

                var listName = $item.closest('[data-view="CCT-View"]')
                    ? $($item.closest('[data-view="CCT-View"]').parentNode).prev().find('h2').text()
                    : $(
                          $item.closest(
                              [
                                  'aside.item-relations-related',
                                  'aside.item-relations-correlated',
                                  'aside.recently-viewed-items',
                                  '.facets-facet-browse-results',
                              ].join()
                          )
                      )
                          .find('h3 span, h1')
                          .text()
                          .trim();

                var listId = listName.toLocaleLowerCase().replaceAll(' ', '_');

                var lastItemTitle = window.currentItem ? window.currentItem.title : null;

                var selectedItems = localStorage.getItem('selectedItems')
                    ? JSON.parse(localStorage.getItem('selectedItems'))
                    : [];

                var itemSelected = selectedItems.find(function (_itemSelected) {
                    return _itemSelected.displayName === displayName;
                });

                if (!itemSelected) {
                    itemSelected = {
                        listId,
                        listName,
                        displayName,
                        isInCart: false,
                    };
                    selectedItems = [...selectedItems, itemSelected];
                } else {
                    itemSelected.listId = itemSelected.isInCart ? itemSelected.listId : listId;
                    itemSelected.listName = itemSelected.isInCart
                        ? itemSelected.listName
                        : listName;
                }

                localStorage.setItem('selectedItems', JSON.stringify(selectedItems));

                localStorage.setItem('lastItemTitle', lastItemTitle);
            }
        },

        log(item) {
            console.log('Log Test: ', item);
        },
    };
});
