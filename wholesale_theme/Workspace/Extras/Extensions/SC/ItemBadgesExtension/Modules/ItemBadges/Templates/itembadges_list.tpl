<div class="itembadges-wrapper">
    <div class="itembadges-image-row {{#if showIcon}}itembadges-show{{/if}}">
        <img class="itembadges-cell-image"
            {{#with icon}}​
            {{#if ../isPdp}}
                src="{{resizeImage name 'itembadges_pdp'}}"
            {{else}}
                src="{{resizeImage name 'itembadges_plp'}}"
            {{/if}}
            data-id="{{internalid}}"
            data-name="{{name}}"
            {{/with}}
            {{#if alt.length}}​
            alt="{{alt}}"
            {{else}}
            alt="{{name}}"
            {{/if}}
            itemprop="image">
    </div>
    <div class="itembadges-badge-row {{#if showText}}itembadges-show{{/if}}" style="background:#{{bgcolor}}">
        <div class="itembadges-badge">
            {{name}}
        </div>
    </div>
</div>