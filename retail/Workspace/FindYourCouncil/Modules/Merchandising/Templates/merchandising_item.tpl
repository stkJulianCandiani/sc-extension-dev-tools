<div itemprop="itemListElement" itemscope="" itemtype="https://schema.org/Product" data-item-id="{{itemId}}" data-track-productlist-list="{{track_productlist_list}}" data-track-productlist-category="{{track_productlist_category}}" data-track-productlist-position="{{track_productlist_position}}" data-sku="{{sku}}">
    <a class="merchandising-item-view-thumbnail" {{{linkAttributes}}}>
        <img src="{{resizeImage thumbnailURL 'thumbnail'}}" alt="{{thumbnailAltImageText}}" />
    </a>
    <div class="merchandising-item-tag-section">
        {{#if hasItemTag}}
        <span class="merchandising-item-tag">{{itemTag}}</span>
        {{/if}}
    </div>
    <a {{{linkAttributes}}} class="merchandising-item-view-title">
        <span itemprop="name">{{itemName}}</span>
    </a>
    <div class="merchandising-item-view-price" data-view="Item.Price">
    </div>
</div>
