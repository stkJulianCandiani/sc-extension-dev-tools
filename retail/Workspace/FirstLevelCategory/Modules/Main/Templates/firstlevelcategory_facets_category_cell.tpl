{{!
    © 2020 Oracle Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
}}

<div class="facets-category-cell-list">
    <div class="facets-category-cell-list-title">
        <a href="{{url}}" class="facets-category-cell-anchor">
            <img src="{{resizeImage image 'thumbnail'}}" alt="{{name}}" class="facets-category-cell-image">
            {{name}}
        </a>
    </div>
    <div data-carousel="carouselCategory" class="cms-merchandising-carousel-container">
        <div class="category-list-cms-merchandising-products" data-cms-area="category_list_merchandising_products_{{index}}" data-cms-area-filters="path"></div>
    </div>
    <div class="facets-category-cell-list-view-all">
        <a href="{{url}}">
            {{translate 'See All Items'}}
        </a>
    </div>
</div>
<!--
  Available helpers:
  {{ getExtensionAssetsPath "img/image.jpg"}} - reference assets in your extension

  {{ getExtensionAssetsPathWithDefault context_var "img/image.jpg"}} - use context_var value i.e. configuration variable. If it does not exist, fallback to an asset from the extension assets folder

  {{ getThemeAssetsPath context_var "img/image.jpg"}} - reference assets in the active theme

  {{ getThemeAssetsPathWithDefault context_var "img/theme-image.jpg"}} - use context_var value i.e. configuration variable. If it does not exist, fallback to an asset from the theme assets folder
-->
