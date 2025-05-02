{{!
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
}}

<li class="store-locator-tooltip-box">
    <span class="store-locator-tooltip-box-count {{storetype}}"></span>
    <ul class="store-locator-tooltip-box-info">
        <li class="store-locator-tooltip-store-name"><a href="stores/details/{{storeId}}"><strong>{{storeName}}</strong></a></li>
        <li class="store-locator-tooltip-box-details">
            <div class="store-locator-list-box-distance">
                <p>
                    {{#if showStoreAddress}}
                        {{storeAddress}} <br> <span> {{longAddress}} </span> <br> Phone: {{phone}}
                    {{/if}}
                    {{#if corporateWebsite}}
                        <br> <a href="{{corporateWebsite}}" target="_blank">Corporate Web Site</a>
                    {{/if}}
                    {{#if shoppingWebsite}}
                        <br> <a href="{{shoppingWebsite}}" target="_blank">Shopping Web Site</a>
                    {{/if}}
                    {{#if showStoreDistance}}
                        <br> Distance: {{storeDistance}} {{distanceUnit}}
                    {{/if}}
                </p>
            </div>
        </li>
    </ul>
    <a href="stores/details/{{storeId}}" class="store-locator-tooltip-box-arrow-container">
        <i class="store-locator-tooltip-box-arrow-icon"></i>
    </a>
</li>
