{{!
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
}}

<div class="footer-store-locator">
    <div class="footer-nav-list-title">
        <a data-touchpoint="storelocator" data-hashtag="#stores" href="#">
            <h4 class="footer-d-main-navigation-head">{{translate 'Store Finder'}}</h4>
        </a>
    </div>
    <div class="nearest-store">
        <a data-action="find-nearest-store" class="nearest-store-title">{{translate 'Find Your Nearest Store'}}</a>
        {{#if address}}
            <p>{{address}}</p>
        {{/if}}
    </div>
</div>
