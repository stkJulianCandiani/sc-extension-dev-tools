{{!
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
}}

<div class="store-locator-main-container">
    <div class="store-locator-main-container-box">
        <div class="store-locator-main-container-box-wrap">
            <h1>{{title}}</h1>
        </div>
    </div>

    <div class="store-locator-main-container-box">
        <div class="store-locator-main-left">
            <!-- <div class="store-locator-main-location" data-view="LocatorLocation"></div> -->
            <div class="store-locator-main-search" data-view="StoreLocatorSearch"></div>
            <div class="store-locator-main-results" data-view="StoreLocatorResults"></div>
            <!--
            <div class="store-locator-main-see-all-stores">
                <a data-touchpoint="{{touchpoint}}" data-hashtag="stores/all" href="stores/all">{{translate 'See complete list of stores'}}</a>
            </div>
            -->
            <div class="store-icon-containter">
                <div class="store-icon-info">
                    <img class="store-icon" src="{{ getExtensionAssetsPath 'img/councilIcon.png' }}">
                    <span class="store-info"><strong>Council Store</strong> - Carries most Girl Scout and Council products</span>
                </div>
                <div class="store-icon-info">
                    <img class="store-icon" src="{{ getExtensionAssetsPath 'img/retailIcon.png' }}">
                    <span class="store-info"><strong>Retail Store</strong> - Carries selected Girl Scout core products</span>
                </div>
            </div>
        </div>
        <div class="store-locator-main-right" data-type="main-right">
            <div class="store-locator-main-map" data-view="StoreLocatorMap" data-type="map-view"></div>
        </div>
    </div>
</div>
