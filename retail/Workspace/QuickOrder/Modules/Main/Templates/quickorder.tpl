{{!
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
}}

<div data-type="alert-placeholder"></div>

<div class="quick-order-column-labels">
    <div class="quick-order-item-label">
        {{translate 'Item'}} <span class="quick-order-required-label">{{translate '(Required)'}}</span>
    </div>
    <div class="quick-order-item-details-label">
        {{translate 'Item Details'}}
    </div>
    <div class="quick-order-qty-label">
        {{translate 'Quantity'}}
    </div>
    <div class="quick-order-price-label">
        {{translate 'Unit Price'}}
    </div>
    <div class="quick-order-amount-label">
        {{translate 'Amount'}}
    </div>
    <div class="quick-order-remove-label">
        {{translate 'Remove'}}
    </div>
</div>

<hr class="hr-double"/>

<div data-view="QuickView.CollectionView"></div>

<div class="quick-order-buttons row">
    <div class="col-sm-6"><button class="quick-order-addline-button" data-action="addEmptyLine">{{translate 'Add Line'}}</button></div>
    <div class="col-sm-6"><button class="quick-order-add-to-cart-button" data-action="multiadd">{{translate 'Add to Cart'}}</button></div>
</div>
