<div class="facets-item-cell-addtocompare">
    <input type="checkbox" class="facets-item-cell-addtocompare-ckbox" value="{{ itemId }}"
           data-action="add-to-compare" data-item-id="{{ itemId }}" name="product-id-{{ itemId }}" id="product-id-{{ itemId }}" value="{{ itemId }}"
           {{#if checkForAddToCompare}} checked {{/if}}
    >
    <label for="product-id-{{ itemId }}">{{translate 'Add to Compare'}}</label>
</div>