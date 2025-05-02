{{!
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
}}

<div itemprop="itemListElement" itemscope="" itemtype="https://schema.org/Product" data-item-id="{{itemId}}" data-track-productlist-list="{{track_productlist_list}}" data-track-productlist-category="{{track_productlist_category}}"
    data-track-productlist-position="{{track_productlist_position}}" data-sku="{{sku}}">
    <a class="merchandising-item-view-thumbnail" {{linkAttributes}}>
        <img src="{{resizeImage thumbnailURL 'thumbnail'}}" alt="{{thumbnailAltImageText}}" />
    </a>
    <div class="merchandising-item-tag-section">
        {{#if hasItemTag}}
            <span class="merchandising-item-tag">{{itemTag}}</span>
        {{/if}}
    </div>
    <a {{linkAttributes}} class="merchandising-item-view-title">
        <span itemprop="name">{{itemName}}</span>
    </a>
    <div class="merchandising-item-view-price" data-view="Item.Price">
    </div>
</div>
