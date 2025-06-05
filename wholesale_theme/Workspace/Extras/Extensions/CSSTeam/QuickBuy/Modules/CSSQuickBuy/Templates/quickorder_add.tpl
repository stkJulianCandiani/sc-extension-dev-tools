<section class="quick-order-container">
    <header class="quick-order-header">
        <h1 class="quick-order-title">{{translate 'Quick Order'}}</h1>
    </header>

    <div data-type="alert-placeholder"></div>

    <div class="quick-order-column-labels">
        <div class="quick-order-item-label">
            {{translate 'Item'}} <span class="quick-order-required-label">{{translate '(Required)'}}</span>
        </div>
        <div class="quick-order-item-details-label">
          {{translate 'Item Details'}}
        </div>
        <div class="quick-order-unit-price-label">
            {{translate 'Unit Price'}}
        </div>
        <div class="quick-order-unit-price-label">
            {{translate 'Available'}}
        </div>
        <div class="quick-order-qty-label">
            {{translate 'Quantity'}}
        </div>
        <div class="quick-order-amount-label">
            {{translate 'Amount'}}
        </div>
        <div class="quick-order-remove-label">
            {{translate 'Remove'}}
        </div>
    </div>

    <div class="quick-order-column-data" data-view="QuickView.CollectionView"></div>

    <div class="quick-order-buttons">
        <button class="quick-order-addline-button" data-action="addEmptyLine">{{translate 'Add Line'}}</button>
        
        <button class="quick-order-add-to-cart-button" data-action="multiadd">{{translate 'Add to Cart'}}</button>
    </div>
    <div class="quick-order-buttons">
        <p>
            Want to start over? <a class="reset-action" data-action="reset">Click Here </a>
        </p>
    </div>
</section>


<section class="quick-order-mobile-unavailable-message">
  {{translate 'In order to use this Quick Order feature, please use a desktop computer'}}
</section>
