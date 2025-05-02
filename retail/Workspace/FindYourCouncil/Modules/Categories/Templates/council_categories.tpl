<div class="category-council-container">
    <h1 class="category-council-heading">
        {{translate name}}
    </h1>
    <div class="category-council-nav">
        {{#if siteUrl}}
        <a href="{{siteUrl}}" target="_blank">{{translate 'Visit Our Council Site'}}</a>
        {{/if}}
        {{#if description}}
        <span class="sep">/</span>
        <a href="#" data-section="description" data-navigation="ignore-click">{{translate 'About Us'}}</a>
        {{/if}}
        {{#if storeInfo}}
        <span class="sep">/</span>
        <a href="#" data-section="store-info" data-navigation="ignore-click">{{translate 'Store Locations & Hours'}}</a>
        {{/if}}
    </div>
    {{#if hasSliderItems}}
    <div class="category-council-slider">
        {{#if showSlider}}
            <ul data-slider>
                {{#each slider}}
                    <li class="{{#if mobileImage}} has-mobile-image{{/if}}">
                    {{#if href}}
                    <a href="{{href}}">
                    {{/if}}
                        <img class="desk-image" src="{{image}}" alt=""/>
                        {{#if mobileImage}}
                            <img class="mobile-image" src="{{mobileImage}}" alt=""/>
                        {{/if}}
                    {{#if href}}
                    </a>
                    {{/if}}
                    </li>
                {{/each}}
            </ul>
        {{else}}
        {{/if}}
    </div>
    {{/if}}

    <div class="category-council-nav category-council-nav-mobile">
        {{#if siteUrl}}
            <a href="{{siteUrl}}" target="_blank">{{translate 'Visit Our Council Site'}}</a>
        {{/if}}
        {{#if description}}
            <span class="sep">/</span>
            <a href="#" data-section="description" data-navigation="ignore-click">{{translate 'About Us'}}</a>
        {{/if}}
        {{#if storeInfo}}
            <span class="sep">/</span>
            <a href="#" data-section="store-info" data-navigation="ignore-click">{{translate 'Store Locations & Hours'}}</a>
        {{/if}}
    </div>

    <div class="category-council-items">

        <div data-view="CategorySliderItemView"></div>

        {{#if shopAllCouncilUrl}}
        <div class="category-council-items-action">
            <a href="{{shopAllCouncilUrl}}" data-touchpoint="home" data-hashtag="#{{shopAllCouncilUrl}}" class="shop-al-council-button">{{translate 'Shop All Council Items'}}</a>
        </div>
        {{/if}}
    </div>

    <div data-view="MarketingSpaces"></div>

    <div class="category-council-info-list {{#unless description}} no-council-description{{/unless}}">
    {{#if description}}
        <div class="category-council-info-item" data-section-area="description">
            <h3 class="category-council-info-title"><i class="gs-icon-light"></i>{{translate 'About Us'}}</h3>
            <div class="category-council-info-description">
                {{{description}}}
            </div>
        </div>
    {{/if}}

    {{#if showStoreData}}
        <div class="category-council-info-item {{#unless storeDescription}} no-council-description{{/unless}}" data-section-area="store-info">
            <h3 class="category-council-info-title"><i class="gs-icon-open"></i>{{translate 'Store Locations & Hours'}}</h3>
            {{#if storeDescription}}
                {{{storeDescription}}}
            {{/if}}
        </div>
    {{/if}}

    {{#if storeInfo}}
        <div class="category-council-info-item">
            {{{storeInfo}}}
        </div>
    {{/if}}

        <!--<div class="category-council-info-item">-->
            <!--<ul class="category-council-info-item-time">-->
                <!--<li><strong>St. Paul Shop (Headquarters)</strong><br/>-->
                    <!--400 Robert St. S, St. Paul, MN 55107<br/>-->
                    <!--<strong>Shop Hours:</strong>-->
                    <!--Monday, Wednesday & Thursday, 10:00 a.m. – 6:30 p.m.<br/>-->
                    <!--Tuesday, Closed<br/>-->
                    <!--Friday, 10:00 a.m – 3:00 p.m.<br/>-->
                    <!--First Saturday of the month, 10:00 a.m. – 1:30 p.m.<br/>-->
                    <!--<strong>1-800-845-0787</strong></li>-->
                <!--<li><strong>Brooklyn Center Shop</strong><br/> -->
                    <!--5601 Brooklyn Blvd, Brooklyn Center, MN 55429<br/> -->
                    <!--<strong>Shop Hours:</strong> <br/>-->
                    <!--Monday, Tuesday & Wednesday, 10:00 a.m. – 6:30 p.m. <br/>-->
                    <!--Closed on Thursday <br/>-->
                    <!--Friday, 10:00 a.m – 3:00 p.m. <br/>-->
                    <!--Second Saturday of the month, 10:00 a.m. – 1:30 p.m. <br/>-->
                    <!--<strong>1-800-845-0787</strong></li>-->
                <!--<li><strong>Burnsville Satellite Shop</strong><br/>-->
                    <!--Wood Park Office Building <br/>-->
                    <!--1000 E. 146th St., Suite 119, Burnsville, MN <br/>-->
                    <!--<strong>Shop Hours:</strong> <br/>-->
                    <!--Wednesday, 10:00 a.m. – 6:00 p.m. <br/>-->
                    <!--<strong>1-800-845-0787</strong></li>-->
                <!--<li><strong>Chanhassen Satellite Shop</strong> <br/>-->
                    <!--Klein Bank Building <br/>-->
                    <!--600 W 78th St., Suite 10D, Chanhassen, MN 55317 <br/>-->
                    <!--<strong>Shop Hours:</strong><br/>-->
                    <!--Tuesday, 10:00 a.m. – 6:00 p.m. <br/>-->
                    <!--<strong>1-800-845-0787</strong></li>-->
                <!--<li><strong>Mankato Shop </strong><br/>-->
                    <!--1751 North Victory Drive, Suite 400, Mankato, MN 5600 <br/>-->
                    <!--<strong>Shop Hours:</strong> <br/>-->
                    <!--Tuesday, 10:00 a.m. – 6:00 p.m. <br/>-->
                    <!--First Saturday of the month in <br/>-->
                    <!--October, November, April, May, & June, 10:00 a.m. – 1:30 p.m. <br/>-->
                    <!--<strong>1-800-845-0787</strong></li>-->
                <!--<li><strong>Rochester Service Center </strong><br/>-->
                    <!--90 14th St. SW #500, Rochester, MN 55902 <br/>-->
                    <!--<strong>Shop Hours:</strong> <br/>-->
                    <!--Monday, Tuesday & Thursday, 10:00 a.m. – 5:30 p.m. <br/>-->
                    <!--Wednesday, Closed <br/>-->
                    <!--Friday, 10:00 a.m – 3:00 p.m. <br/>-->
                    <!--First Saturday of the month in <br/>-->
                    <!--October, November, April, May, & June, 10:00 a.m. – 1:30 p.m. <br/>-->
                    <!--<strong>1-800-845-0787</strong> </li>-->
            <!--</ul>-->
        <!--</div>-->
    </div>
</div>