{{!
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
}}

<div>
    <button data-type="add-to-cart-download" class="item-details-add-to-cart-button" {{#unless price}}disabled{{/unless}}>
        {{translate 'Download now'}}
        {{price}}
    </button>
    <span>{{translate 'Downloads appear in your My Account under "My Downloads" after order submission'}}</span>
</div>
