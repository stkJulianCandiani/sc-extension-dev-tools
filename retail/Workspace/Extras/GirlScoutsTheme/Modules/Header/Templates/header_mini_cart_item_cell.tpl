<li class="header-mini-cart-item-cell" data-item-id="{{itemId}}" data-item-type="{{itemType}}">
		<a {{{linkAttributes}}}>
			<div class="header-mini-cart-item-cell-image">
		    	{{#if isFreeGift}}
		    		<span class="header-mini-cart-item-cell-free-badge">{{translate 'FREE'}}</span>
		    	{{/if}}
				<img src="{{resizeImage thumbnail.url 'tinythumb'}}?resizeh=60" alt="{{thumbnail.altimagetext}}">
			</div>
		</a>
		<div class="header-mini-cart-item-cell-details">
			<ul>
				<li class="header-mini-cart-item-cell-product-title">
					<a {{{linkAttributes}}} class="header-mini-cart-item-cell-title-navigable">{{line.item._name}}</a>
				</li>

		    {{#if isPriceEnabled}}
		    	{{#if isFreeGift}}
			    	<li class="header-mini-cart-item-cell-product-price">{{line.total_formatted}}</li>
		    	{{else}}
			    <li class="header-mini-cart-item-cell-product-price">{{rateFormatted}}</li>
		    	{{/if}}
		    {{else}}
		    	<li>
					{{translate '<a data-touchpoint="login" data-hashtag="login-register" origin-hash="" href="#">Login</a> to see price'}}
				</li>
		    {{/if}}

				<div data-view="Item.SelectedOptions"></div>
                {{#if line.showTroopNumeral}}
                    <div class="transaction-line-views-selected-option">
                        <p>
                            <span class="transaction-line-views-selected-option-label">{{translate 'Troop Numeral'}}: </span>
                            <span class="transaction-line-views-selected-option-value">{{line.troopNumeralSelection}}</span> </br>
                            <span class="transaction-line-views-selected-option-label">{{translate 'Troop Numeral Cost'}}: </span>
                            <span class="transaction-line-views-selected-option-value">{{line.troopNumeralCost}}</span>
                        </p>
                    </div>
                {{/if}}
                {{#if line.council}}
                    <div class="transaction-line-views-selected-option">
                        <p>
                            <span class="transaction-line-views-selected-option-label">{{translate 'Council ID Set'}}: </span>
                            <span class="transaction-line-views-selected-option-value">{{line.council}}</span> </br>
                            <span class="transaction-line-views-selected-option-label">{{translate 'Council ID Set Cost'}}: </span>
                            <span class="transaction-line-views-selected-option-value">{{line.councilCost}}</span> </br>
                        </p>                     
                    </div>
                {{/if}}
                {{#if line.flagFee}}
                    <div class="transaction-line-views-selected-option">
                        <p>
                            <span class="transaction-line-views-selected-option-label">{{translate 'American Flag Patch'}}: </span>  </br>
                            <span class="transaction-line-views-selected-option-label">{{translate 'Flag Cost'}}: </span>
                            <span class="transaction-line-views-selected-option-value">{{line.flagFee}}</span> </br>                         
                        </p>
                    </div>
                {{/if}}
                {{#if line.troopCrestFee}}
                    <div class="transaction-line-views-selected-option">
                        <p>
                            <span class="transaction-line-views-selected-option-label">{{translate 'Troop Crest'}}: <span class="transaction-line-views-selected-option-value">{{line.troopCrestName}}</span> </span>  </br>
                            <span class="transaction-line-views-selected-option-label">{{translate 'Troop Crest Patch Cost'}}: </span>
                            <span class="transaction-line-views-selected-option-value">{{line.troopCrestFee}}</span> </br>                         
                        </p>
                    </div>
                {{/if}}
                {{#if line.insigniaPinFee}}
                    <div class="transaction-line-views-selected-option">
                        <p>
                            <span class="transaction-line-views-selected-option-label">{{translate '$(0) Cost: ' line.insigniaPinName}} </span>
                            <span class="transaction-line-views-selected-option-value">{{line.insigniaPinFee}}</span> </br>
                        </p>
                    </div>
                {{/if}}
                {{#if line.membershipPinFee}}
                    <div class="transaction-line-views-selected-option">
                        <p>
                            <span class="transaction-line-views-selected-option-label">{{translate '$(0) Cost: ' line.membershipPinName}} </span>
                            <span class="transaction-line-views-selected-option-value">{{line.membershipPinFee}}</span> </br>
                        </p>
                    </div>
                {{/if}}
                {{#if line.trefoilFee}}
                     <div class="transaction-line-views-selected-option">
                        <p>
                            <span class="transaction-line-views-selected-option-label">{{translate '$(0) Cost: ' line.trefoilName}} </span>
                            <span class="transaction-line-views-selected-option-value">{{line.trefoilFee}}</span> </br>
                        </p>
                    </div>
                {{/if}}
                {{#if line.showMonogram}}
                    <div class="transaction-line-views-selected-option">
                        <p>
                            <span class="transaction-line-views-selected-option-label">{{translate 'Monogram'}}: </span>
                            <span class="transaction-line-views-selected-option-value">{{line.monogramSelection}}</span> </br>
                            <span class="transaction-line-views-selected-option-label">{{translate 'Monogramming Fee'}}: </span>
                            <span class="transaction-line-views-selected-option-value">{{line.monogramCost}}</span>
                        </p>
                    </div>
                {{/if}}
                {{#if line.serviceFee}}
                    <div class="transaction-line-views-selected-option">
                        <p>
                            <span class="transaction-line-views-selected-option-label">{{translate 'Service Cost '}}: </span>
                            <span class="transaction-line-views-selected-option-value">{{line.serviceFee}}</span> </br>
                        </p>
                    </div>
                {{/if}}
                {{#if line.aggregatedTotal}}
                    <div class="transaction-line-views-selected-option">
                        <p>
                            <span class="transaction-line-views-selected-option-label">{{translate 'Total Amount'}}: </span>
                            <span class="transaction-line-views-selected-option-value">{{line.aggregatedTotal}}</span> </br>
                        </p>
                    </div>
                {{/if}}
			    <li class="header-mini-cart-item-cell-product-qty">
		    	<span class="header-mini-cart-item-cell-quantity-label">
		    		{{translate 'Quantity: '}}
		    	</span>
			    	<span class="header-mini-cart-item-cell-quantity-value">
			    		{{line.quantity}}
			    	</span>
			    </li>

				<li class="header-mini-cart-item-cell-out-of-stock-notification">
					<div class="out-of-stock-notification-container" data-view="OutOfStockNotification"></div>
				</li>
		    </ul>
		</div>
</li>



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
	itemId (Number)
	itemType (String)
	linkAttributes (String)
	thumbnail (Object)
	thumbnail.altimagetext (String)
	thumbnail.url (String)
	isPriceEnabled (Boolean)

----}}
