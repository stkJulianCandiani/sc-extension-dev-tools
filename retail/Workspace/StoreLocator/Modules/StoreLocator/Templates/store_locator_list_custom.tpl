{{!
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
}}

<li class="store-locator-list-box" data-id={{storeId}}>
    <div class="store-locator-list-box-count {{storetype}}"></div>
    <ul class="store-locator-list-box-info">
        <li>
            <a href="stores/details/{{storeId}}"><strong class="store-locator-list-box-info-name">{{storeName}}</strong></a>
        </li>
        <li class="store-locator-list-box-details">
            <div class="store-locator-list-box-distance">
                <p> {{storeAddress}}
                    <br> <span> {{longAddress}} </span>
                    <br> Phone: {{phone}}
                    {{#if corporateWebsite}}
                        <br> <a href="{{corporateWebsite}}" target="_blank">Corporate Web Site</a>
                    {{/if}}
                    {{#if shoppingWebsite}}
                        <br> <a href="{{shoppingWebsite}}" target="_blank">Shopping Web Site</a>
                    {{/if}}
                    <br> Distance: {{storeDistance}} {{distanceUnit}}
                </p>
            </div>
        </li>
    </ul>
    <a href="stores/details/{{storeId}}" class="store-locator-list-box-arrow-container">
        <i class="store-locator-list-box-arrow-icon"></i>
    </a>
</li>
