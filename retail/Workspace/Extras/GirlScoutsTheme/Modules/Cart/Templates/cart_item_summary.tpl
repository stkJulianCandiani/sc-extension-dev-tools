{{#if isPriceEnabled}}
<div class="cart-item-summary-item-list-actionable-qty">
	<form action="#" class="cart-item-summary-item-list-actionable-qty-form" data-action="update-quantity" data-validation="control-group">
		<input type="hidden" name="internalid" id="update-internalid-{{lineId}}" class="update-internalid-{{lineId}}" value="{{lineId}}">
		<label for="quantity-{{lineId}}" data-validation="control">
			{{#if showQuantity}}
				<input type="hidden" name="quantity" id="quantity-{{lineId}}" value="1">
			{{else}}
				<div class="cart-item-summary-item-list-actionable-container-qty">
					<label class="cart-item-summary-item-list-actionable-label-qty">{{translate 'Quantity:'}}</label>
					<div class="cart-item-summary-item-list-actionable-input-qty">
						<input type="number" data-type="cart-item-quantity-input" name="quantity" id="quantity-{{lineId}}" class="cart-item-summary-quantity-value quantity-{{lineId}}" value="{{line.quantity}}" min="1"/>
					</div>
					{{#if showMinimumQuantity}}
						<small class="cart-item-summary-quantity-title-help">
							{{translate 'Minimum of $(0) required' minimumQuantity}}
						</small>
					{{/if}}
					{{#if showMaximumQuantity}}
						<small class="cart-item-summary-quantity-title-help">
							{{translate 'A maximum of $(0) is allowed' maximumQuantity}}
						</small>
					{{/if}}
				</div>
			{{/if}}
			<div data-type="alert-placeholder"></div>
		</label>
	</form>
</div>

<div data-view="Quantity.Pricing"></div>

<div class="cart-item-summary-item-list-actionable-amount">
	<span class="cart-item-summary-item-list-actionable-amount-label">{{translate 'Amount: ' }}</span>
	<span class="cart-item-summary-amount-value">{{ totalFormatted }}</span>
	{{#if showComparePrice}}
		<small class="muted cart-item-summary-item-view-old-price">{{ line.amount_formatted}}</small>
	{{/if}}
</div>
{{#if line.showTroopNumeral}}
    <div class="transaction-line-views-selected-option">
        <p>
            <span class="transaction-line-views-selected-option-label">{{translate 'Troop Numeral'}}: </span>
            <span class="transaction-line-views-selected-option-value">{{line.troopNumeralSelection}}</span> </br>
            <span class="cart-item-summary-item-list-actionable-amount-label">{{translate 'Troop Numeral Cost'}}: </span>
            <span class="transaction-line-views-selected-option-value">{{line.troopNumeralCost}}</span>
        </p>
    </div>
{{/if}}
{{#if line.council}}
    <div class="transaction-line-views-selected-option" name="Council">
        <p>
            <span class="transaction-line-views-selected-option-label">{{translate 'Council ID Set: '}}</span>
            <span class="transaction-line-views-selected-option-value">{{line.council}}</span> </br>
            <span class="cart-item-summary-item-list-actionable-amount-label">{{translate 'Council ID Set Cost'}}: </span>
            <span class="transaction-line-views-selected-option-value">{{line.councilCost}}</span>
        </p>
    </div>
{{/if}}
{{#if line.flagFee}}
    <div class="transaction-line-views-selected-option" name="Flag">
        <p>
            <span class="transaction-line-views-selected-option-label">{{translate 'American Flag Patch'}}</span> </br>
            <span class="cart-item-summary-item-list-actionable-amount-label">{{translate 'Flag Cost'}}: </span>
            <span class="transaction-line-views-selected-option-value">{{line.flagFee}}</span>
        </p>
    </div>
{{/if}}
{{#if line.troopCrestFee}}
    <div class="transaction-line-views-selected-option" name="Flag">
        <p>
            <span class="transaction-line-views-selected-option-label">{{translate 'Troop Crest'}}: <span class="transaction-line-views-selected-option-value">{{line.troopCrestName}}</span></span> </br>
            <span class="cart-item-summary-item-list-actionable-amount-label">{{translate 'Troop Crest Patch Cost'}}: </span>
            <span class="transaction-line-views-selected-option-value">{{line.troopCrestFee}}</span>
        </p>
    </div>
{{/if}}
{{#if line.insigniaPinFee}}
    <div class="cart-item-summary-item-list-actionable-amount">
            <span class="cart-item-summary-item-list-actionable-amount-label">{{translate '$(0) Cost: ' line.insigniaPinName}}</span>
            <span class="cart-item-summary-amount-value">{{line.insigniaPinFee}}</span>
        </div>
{{/if}}
{{#if line.membershipPinFee}}
    <div class="cart-item-summary-item-list-actionable-amount">
            <span class="cart-item-summary-item-list-actionable-amount-label">{{translate '$(0) Cost: ' line.membershipPinName}}</span>
            <span class="cart-item-summary-amount-value">{{line.membershipPinFee}}</span>
        </div>
{{/if}}
{{#if line.trefoilFee}}
    <div class="cart-item-summary-item-list-actionable-amount">
            <span class="cart-item-summary-item-list-actionable-amount-label">{{translate '$(0) Cost: ' line.trefoilName}}</span>
            <span class="cart-item-summary-amount-value">{{line.trefoilFee}}</span>
        </div>
{{/if}}
{{#if line.showMonogram}}
    <div class="transaction-line-views-selected-option">
        <p>
            <span class="transaction-line-views-selected-option-label">{{translate 'Monogram'}}: </span>
            <span class="transaction-line-views-selected-option-value">{{line.monogramSelection}}</span> </br>
            <span class="cart-item-summary-item-list-actionable-amount-label">{{translate 'Monogramming Fee'}}: </span>
            <span class="transaction-line-views-selected-option-value">{{line.monogramCost}}</span>
        </p>
    </div>
{{/if}}
{{#if line.serviceFee}}
    <div class="cart-item-summary-item-list-actionable-amount">
            <span class="cart-item-summary-item-list-actionable-amount-label">{{translate 'Service Cost: '}}</span>
            <span class="cart-item-summary-amount-value">{{line.serviceFee}}</span>
        </div>
{{/if}}
{{#if line.aggregatedTotal}}
    <div class="cart-item-summary-item-list-actionable-amount">
            <span class="cart-item-summary-item-list-actionable-amount-label">{{translate 'Total Amount: '}} </span>
            <span class="cart-item-summary-amount-value">{{line.aggregatedTotal}}</span>
        </div>
{{/if}}
<div data-view="PromocodeList" class="cart-item-summary-promocodes"></div>
{{/if}}




{{!----
Use the following context variables when customizing this template:

	line (Object)
	line.item (Object)
	line.item.internalid (Number)
	line.item.type (String)
	line.quantity (Number)
	line.internalid (String)
	line.options (Array)
	line.location (String)
	line.fulfillmentChoice (String)
	lineId (String)
	isMinusButtonDisabled (Boolean)
	showQuantity (Boolean)
	showComparePrice (Boolean)
	showMinimumQuantity (Boolean)
	minimumQuantity (Number)
	isPriceEnabled (Boolean)

----}}
