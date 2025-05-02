{{#if isTroopCrest}}
    {{#if showTroopCrest}}
        <div class="iron-on-extra-buttons-area-header">
            <div class="iron-on-list-circle">
                <span class="iron-on-list-numbers">3</span>
            </div>
            <label class="product-views-option-tile-label">{{translate 'Troop Crest Patch Options:'}}</label>
            <div class="ironon-feature-subtitle">
                <span class="ironon-feature-subtitle-label">
                    {{translate 'Troop crest patch $(0)/ea.' itemPrice}}
                </span>
            </div>
        </div>
        <select class="product-views-option-dropdown-select" data-action="select-troop-crest">
            <option value="">{{translate '-- Select --'}}</option>
            {{#each troopCrestItems}}
                <option value="{{internalid}}" {{#if selected}}selected{{/if}}>{{storedisplayname2}}</option>
            {{/each}}
        </select>
    {{/if}}
{{else}}
    <div class="iron-on-extra-patches-area-cell{{#if selected}} iron-on-extra-patches-area-cell-selected{{/if}}">
        <a data-action="extra-item-selection">
            <img class="facets-item-cell-list-image" src="{{resizeImage thumbnail.url 'thumbnail'}}" alt="{{thumbnail.altimagetext}}" itemprop="image">
            <span class="iron-on-extra-buttons-area-name">{{itemName}}</span>
            <span class="iron-on-extra-buttons-area-price">{{itemPrice}}</span>
        </a>
    </div>
{{/if}}