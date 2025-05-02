<div class="cart-confirmation-modal">
	<div class="cart-confirmation-modal-img">
		<img data-loader="false" src="{{resizeImage thumbnail.url 'main'}}" alt="{{thumbnail.altimagetext}}">
	</div>
	<div class="cart-confirmation-modal-details">
		<a href="{{model.item._url}}" class="cart-confirmation-modal-item-name">{{itemName}}</a>
		<div class="cart-confirmation-modal-price">
			<div data-view="Line.Price"></div>
		</div>
		<!-- SKU -->
		<div data-view="Line.Sku" class="cart-confirmation-modal-sku"></div>
		<!-- Item Options -->
		<div class="cart-confirmation-modal-options">
			<div data-view="Line.SelectedOptions"></div>
            {{#if showTroopNumeral}}
                <div class="transaction-line-views-selected-option" name="Troop Numeral">
                    <p>
                        <span class="transaction-line-views-selected-option-label">{{translate 'Troop Numeral: '}} </span>
                        <span class="transaction-line-views-selected-option-value">{{numeralSelection}}</span>
                    </p>
                </div>
            {{/if}}
            {{#if showMonogram}}
                <div class="transaction-line-views-selected-option" name="Troop Numeral">
                    <p>
                        <span class="transaction-line-views-selected-option-label">{{translate 'Monogram: '}} </span>
                        <span class="transaction-line-views-selected-option-value">{{monogramSelection}}</span>
                    </p>
                </div>
                <div class="transaction-line-views-selected-option" name="Troop Numeral">
                    <p>
                        <span class="transaction-line-views-selected-option-label">{{translate 'Monogramming Fee: '}} </span>
                        <span class="transaction-line-views-selected-option-value">{{monogrammingFee}}</span>
                    </p>
                </div>
            {{/if}}
            {{#if council}}
                <div class="transaction-line-views-selected-option" name="Council">
                    <p>
                        <span class="transaction-line-views-selected-option-label">{{translate 'Council Id Set: '}}</span>
                        <span class="transaction-line-views-selected-option-value">{{council}}</span>
                    </p>
                </div>
            {{/if}}
            {{#if flagFee}}
                <div class="transaction-line-views-selected-option" name="Flag">
                    <p>
                        <span class="transaction-line-views-selected-option-label">{{translate 'American Flag Patch'}}</span>
                    </p>
                </div>
            {{/if}}
			{{#if flagFee}}
                <div class="transaction-line-views-selected-option" name="Flag">
                    <p>
                        <span class="transaction-line-views-selected-option-label">{{translate 'American Flag Patch'}}</span>
                    </p>
                </div>
            {{/if}}
			{{#if troopCrestFee}}
                <div class="transaction-line-views-selected-option" name="Flag">
                    <p>
                        <span class="transaction-line-views-selected-option-label">{{translate 'Troop Crest'}}: {{troopCrestName}} </span>
                        <span class="transaction-line-views-selected-option-value">{{troopCrestFee}}</span>
                    </p>
                </div>
            {{/if}}
			{{#if insigniaPinFee}}
				<div class="transaction-line-views-selected-option" name="serviceFee">
                    <p>
                        <span class="transaction-line-views-selected-option-label">{{insigniaPinName}}: </span>
                        <span class="transaction-line-views-selected-option-value">{{insigniaPinFee}}</span>
                    </p>
                </div>
			{{/if}}
			{{#if membershipPinFee}}
				<div class="transaction-line-views-selected-option" name="serviceFee">
                    <p>
                        <span class="transaction-line-views-selected-option-label">{{membershipPinName}}: </span>
                        <span class="transaction-line-views-selected-option-value">{{membershipPinFee}}</span>
                    </p>
                </div>
			{{/if}}
			{{#if trefoilFee}}
				<div class="transaction-line-views-selected-option" name="serviceFee">
                    <p>
                        <span class="transaction-line-views-selected-option-label">{{trefoilName}}: </span>
                        <span class="transaction-line-views-selected-option-value">{{trefoilFee}}</span>
                    </p>
                </div>
			{{/if}}
            {{#if serviceFee}}
                <div class="transaction-line-views-selected-option" name="serviceFee">
                    <p>
                        <span class="transaction-line-views-selected-option-label">{{translate 'Service Cost: '}}</span>
                        <span class="transaction-line-views-selected-option-value">{{serviceFee}}</span>
                    </p>
                </div>
            {{/if}}
            {{#if aggregatedTotal}}
                <div class="transaction-line-views-selected-option" name="serviceFee">
                        <span class="transaction-line-views-selected-option-label">Total Amount: </span>
                        <span class="transaction-line-views-selected-option-value">{{aggregatedTotal}}</span>
                    </div>
            {{/if}}
		</div>
		<!-- Quantity -->
		{{#if showQuantity}}
			<div class="cart-confirmation-modal-quantity">
				<span class="cart-confirmation-modal-quantity-label">{{translate 'Quantity: '}}</span>
				<span class="cart-confirmation-modal-quantity-value">{{model.quantity}}</span>
			</div>
		{{/if}}
		<div class="cart-confirmation-modal-actions">
			<div class="cart-confirmation-modal-view-cart">
				<a href="/cart" class="cart-confirmation-modal-view-cart-button">{{translate 'View Cart &amp; Checkout'}}</a>
			</div>
			<div class="cart-confirmation-modal-continue-shopping">
				<button class="cart-confirmation-modal-continue-shopping-button" data-dismiss="modal">{{translate 'Continue Shopping'}}</button>
			</div>
		</div>
	</div>
</div>



{{!----
Use the following context variables when customizing this template:

	model (Object)
	model.item (Object)
	model.item.internalid (Number)
	model.quantity (Number)
	model.options (Array)
	model.options.0 (Object)
	model.options.0.cartOptionId (String)
	model.options.0.itemOptionId (String)
	model.options.0.label (String)
	model.options.0.type (String)
	model.options.0.value (Object)
	model.options.0.value.internalid (String)
	model.options.0.value.label (String)
	model.location (String)
	model.fulfillmentChoice (String)
	thumbnail (Object)
	thumbnail.altimagetext (String)
	thumbnail.url (String)
	showQuantity (Boolean)
	itemName (String)

----}}
