{{#if showIronOn}}
    {{#if showCustomizationOptions}}
        <div class="product-views-option-tile-container ironon-feature">
            <label class="product-views-option-tile-picker ironon-feature-buttom">
                <input class="product-views-option-tile-input-picker" type="radio" name="remove-customization" data-action="remove-customization" value="remove">
                {{translate 'Remove Customization'}}
            </label>
            {{#if serviceFeeMessage}}
                <label class="ironon-feature-tooltip">
                    <span class="ironon-feature-tooltip-label">
                        {{translate 'Heat-Press Service'}} {{serviceFeeCost}}
                    </span>
                    <div class="ironon-feature-tooltip-content">{{{serviceFeeMessage}}}</div>
                </div>
            {{/if}}
        </div>

        <div class="ironon-feature">
            <div class="ironon-feature-header">
                <div class="iron-on-list-circle">
                    <span class="iron-on-list-numbers">1</span>
                </div>
                <label class="product-views-option-tile-label">{{translate 'Choose Council Identification patch Set *'}}:</label>
                <div class="ironon-feature-subtitle">
                    <span class="ironon-feature-subtitle-label">
                        {{translate 'Council Identification Patch Set $(0).' councilPrice}}
                    </span>
                </div>
            </div>
            <div data-view="Extra.Customization.Options"></div>

            <div class="ironon-feature-divider"></div>

            <div data-view="Council.Error"></div>
            <div class="ironon-feature-header">
                <div class="iron-on-list-circle">
                    <span class="iron-on-list-numbers">2</span>
                </div>
                <label class="product-views-option-tile-label">{{translate 'Troop Number Patch Options'}}:</label>
                <div class="ironon-feature-subtitle">
                    <span class="ironon-feature-subtitle-label">
                        {{translate 'Troop number patch $(0)/ea. Adjust the number of digits if needed' troopNumeralPrice}}
                    </span>
                </div>
            </div>

            <div class="ironon-feature-numeral-selection">
                <div class="ironon-feature-minus"><span class="remove-troop-numerals" data-action="remove-troop-numerals"> - </span></div>
                <div class="ironon-feature-numerals-row" data-view="Troop.Numerals"></div>
                <!-- {{#if showMobileRow}}
                    <div class="ironon-feature-numerals-row-mobile" data-view="Troop.Numerals.Mobile.Row"></div>
                {{/if}}-->
                <div class="ironon-feature-plus"><span class="add-troop-numerals" data-action="add-troop-numerals"> + </span></div>
            </div>
            <div data-view="Troop.Numerals.Error"></div>
            <div data-view="Troop.Numerals.BackOrderMessage"></div>

            <div class="ironon-feature-divider"></div>
            {{#if showTroopCrest}}
                <div data-view="Extra.TroopCrest"></div>
                <div class="ironon-feature-divider"></div>  
            {{/if}}
            <div class="iron-on-extra-buttons-area-header">
                <div class="iron-on-list-circle">
                    <span class="iron-on-list-numbers">{{#if showTroopCrest}}4{{else}}3{{/if}}</span>
                </div>
                <label class="product-views-option-tile-label">{{translate 'Insignia Options:'}}</label>
            </div>
            <div  class="iron-on-feature-patches-pin" data-view="Extra.PatchesAndPin"></div>    
             <div class="ironon-feature-add-all-insignia">
                <input type="checkbox" data-action="add-all-insignia" name="add-all-insignia" id="add-all-insignia">
                <label class="add-all-insignia-label" for="add-all-insignia"> {{translate 'Select all insignia options'}}</label>
            </div>

            <div data-view="Extra.ItemPrice"></div>    

             
        </div>
    {{else}}
        <div class="ironon-feature">
            <label class="product-views-option-tile-picker ironon-feature-buttom" >
                <input class="product-views-option-tile-input-picker" type="radio" name="show-customization" data-action="show-customization" value="show">
                {{translate 'Customize Your Item'}}
            </label>
        </div>
    {{/if}}
{{/if}}

