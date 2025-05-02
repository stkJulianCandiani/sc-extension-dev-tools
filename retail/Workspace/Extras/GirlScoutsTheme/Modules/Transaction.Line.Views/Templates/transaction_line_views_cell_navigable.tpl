<tr class="transaction-line-views-cell-navigable {{cellClassName}} item-{{itemId}}" data-id="{{itemId}}" data-item-type="{{itemType}}">
	<td class="transaction-line-views-cell-navigable-item-image" name="item-image">
		{{#if isFreeGift}}
    		<span class="transaction-line-views-cell-navigable-free-badge">{{translate 'FREE'}}</span>
    	{{/if}}
		<img src="{{resizeImage thumbnail.url 'thumbnail'}}" alt="{{thumbnail.altimagetext}}">
	</td>
	<td class="transaction-line-views-cell-navigable-details" name="item-details">
		<p class="transaction-line-views-cell-navigable-product-name">
			{{#if isNavigable}}
				<a class="transaction-line-views-cell-navigable-product-title-anchor" {{{itemURLAttributes}}}>{{itemName}}</a>
			{{else}}
				<span class="transaction-line-views-cell-navigable-product-title">
					{{itemName}}
				</span>
			{{/if}}
		</p>
		{{#unless isFreeGift}}
		<p>
			<div data-view="Item.Price"></div>
		</p>
		{{/unless}}
		<div class="transaction-line-views-cell-navigable-sku" data-view="Item.Sku"></div>
		<div data-view="Item.Tax.Info"></div>
		{{#if showOptions}}
			<div data-view="Item.Options"></div>
		{{/if}}
		<p>
			<span class="transaction-line-views-cell-navigable-stock" data-view="ItemViews.Stock.View">
		</p>

		<div data-view="StockDescription"></div>
	</td>
	{{#if showBlockDetail2}}
    <td class="transaction-line-views-cell-navigable-item-unit-price" name="item-unit-price">
        <p>
            <span class="transaction-line-views-cell-navigable-item-unit-price-label">{{detail2Title}}</span>
            <span class="transaction-line-views-cell-navigable-item-unit-price-value">{{detail2}}</span>
        </p>
    </td>
    {{/if}}
	<td class="transaction-line-views-cell-navigable-item-quantity" name="item-quantity">
		<p>
			<span class="transaction-line-views-cell-navigable-item-quantity-label">{{translate 'Quantity:'}} </span>
			<span class="transaction-line-views-cell-navigable-item-quantity-value">{{quantity}}</span>
		</p>
	</td>
	<td class="transaction-line-views-cell-navigable-amount" name="item-amount">
		<p>
		{{#if showDetail3Title}}
			<span class="transaction-line-views-cell-navigable-item-amount-label">{{detail3Title}}</span>
		{{/if}}
		<span class="transaction-line-views-cell-navigable-item-amount-value">{{detail3}}</span>
		{{#if showComparePrice}}
			<small class="transaction-line-views-cell-navigable-item-old-price">{{comparePriceFormatted}}</small>
		{{/if}}
		</p>
	</td>
    {{#if model.showTroopNumeral}}
        <td class="transaction-line-views-cell-navigable-item-unit-price" name="item-amount">
            <p>
                <span class="transaction-line-views-cell-navigable-item-amount-label">{{translate 'Troop Numeral:'}} </span>
                <span class="transaction-line-views-cell-navigable-item-amount-value">{{model.troopNumeralSelection}}</span>
            </p>
            <p>
                <span class="transaction-line-views-cell-navigable-item-amount-label">{{translate 'Troop Numeral Cost:'}} </span>
                <span class="transaction-line-views-cell-navigable-item-amount-value">{{model.troopNumeralCost}}</span>
            </p>
        </td>
    {{/if}}
    {{#if model.council}}
        <td class="transaction-line-views-cell-navigable-item-unit-price" name="item-amount">
            <p>
                <span class="transaction-line-views-cell-navigable-item-amount-label">{{translate 'Council ID Set:'}} </span>
                <span class="transaction-line-views-cell-navigable-item-amount-value">{{model.council}}</span>
            </p>
            <p>
                <span class="transaction-line-views-cell-navigable-item-amount-label">{{translate 'Council ID Set Cost:'}} </span>
                <span class="transaction-line-views-cell-navigable-item-amount-value">{{model.councilCost}}</span>
            </p>
        </td>
    {{/if}}
    {{#if model.flagFee}}
     <td class="transaction-line-views-cell-navigable-item-unit-price" name="item-amount">
            <p>
                <span class="transaction-line-views-cell-navigable-item-amount-label">{{translate 'American Flag Patch'}}</span>
            </p>
             <p>
                <span class="transaction-line-views-cell-navigable-item-amount-label">{{translate 'Flag Cost:'}} </span>
                <span class="transaction-line-views-cell-navigable-item-amount-value">{{model.flagFee}}</span>
            </p>
        </td>
    {{/if}}
	{{#if model.troopCrestFee}}
     <td class="transaction-line-views-cell-navigable-item-unit-price" name="item-amount">
            <p>
                <span class="transaction-line-views-cell-navigable-item-amount-label">{{translate 'Troop Crest'}}: <span class="transaction-line-views-cell-navigable-item-amount-value">{{model.troopCrestName}}</span></span>
            </p>
             <p>
                <span class="transaction-line-views-cell-navigable-item-amount-label">{{translate 'Troop Crest Patch Cost:'}} </span>
                <span class="transaction-line-views-cell-navigable-item-amount-value">{{model.troopCrestFee}}</span>
            </p>
        </td>
    {{/if}}
    {{#if model.insigniaPinFee}}
     <td class="transaction-line-views-cell-navigable-item-unit-price" name="item-amount">
            <p>
                <span class="transaction-line-views-cell-navigable-item-amount-label">{{translate '$(0) Cost: ' model.insigniaPinName}}</span>
                <span class="transaction-line-views-cell-navigable-item-amount-value">{{model.insigniaPinFee}}</span>
            </p>
        </td>
    {{/if}}
    {{#if model.membershipPinFee}}
     	<td class="transaction-line-views-cell-navigable-item-unit-price" name="item-amount">
            <p>
                <span class="transaction-line-views-cell-navigable-item-amount-label">{{translate '$(0) Cost: ' model.membershipPinName}}</span>
                <span class="transaction-line-views-cell-navigable-item-amount-value">{{model.membershipPinFee}}</span>
            </p>
        </td>
    {{/if}}
	{{#if model.trefoilFee}}
		<td class="transaction-line-views-cell-navigable-item-unit-price" name="item-amount">
            <p>
                <span class="transaction-line-views-cell-navigable-item-amount-label">{{translate '$(0) Cost: ' model.trefoilName}}</span>
                <span class="transaction-line-views-cell-navigable-item-amount-value">{{model.trefoilFee}}</span>
            </p>
        </td>
	{{/if}}
     {{#if model.showMonogram}}
        <td class="transaction-line-views-cell-navigable-item-unit-price" name="item-amount">
            <p>
                <span class="transaction-line-views-cell-navigable-item-amount-label">{{translate 'Monogram:'}} </span>
                <span class="transaction-line-views-cell-navigable-item-amount-value">{{model.monogramSelection}}</span>
            </p>
            <p>
                <span class="transaction-line-views-cell-navigable-item-amount-label">{{translate 'Monogramming Fee:'}} </span>
                <span class="transaction-line-views-cell-navigable-item-amount-value">{{model.monogramCost}}</span>
            </p>
        </td>
    {{/if}}
    {{#if model.serviceFee}}
     <td class="transaction-line-views-cell-navigable-item-unit-price" name="item-amount">
            <p>
                <span class="transaction-line-views-cell-navigable-item-amount-label">{{translate 'Service Cost: '}} </span>
                <span class="transaction-line-views-cell-navigable-item-amount-value">{{model.serviceFee}}</span>
            </p>
        </td>
    {{/if}}
    {{#if model.aggregatedTotal}}
        <td class="transaction-line-views-cell-navigable-item-unit-price" name="item-amount">
             <p>
                <span class="transaction-line-views-cell-navigable-item-amount-label">Total Amount: </span>
                <span class="transaction-line-views-cell-navigable-item-amount-value">{{model.aggregatedTotal}}</span>
            </p>
        </td>
    {{/if}}
</tr>




{{!----
Use the following context variables when customizing this template:

	model (Object)
	model.item (Object)
	model.item.internalid (Number)
	model.item.type (String)
	model.quantity (Number)
	model.internalid (String)
	model.options (Array)
	model.shipaddress (undefined)
	model.shipmethod (undefined)
	model.location (String)
	model.fulfillmentChoice (String)
	itemId (Number)
	itemName (String)
	isNavigable (Boolean)
	rateFormatted (String)
	showOptions (Boolean)
	itemURLAttributes (String)
	quantity (Number)
	showDetail2Title (Boolean)
	detail2Title (String)
	detail2 (String)
	showBlockDetail2 (Boolean)
	showDetail3Title (Boolean)
	detail3Title (String)
	detail3 (String)
	showComparePrice (Boolean)
	comparePriceFormatted (String)
	thumbnail (Object)
	thumbnail.url (String)
	thumbnail.altimagetext (String)

----}}
