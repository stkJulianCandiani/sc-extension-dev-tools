<div class="product-details-full">
	<div data-cms-area="item_details_banner" data-cms-area-filters="page_type"></div>

	<header class="product-details-full-header">
		<div id="banner-content-top" class="product-details-full-banner-top"></div>
	</header>
	<div class="product-details-full-divider-desktop"></div>
	<article class="product-details-full-content" >
		<meta itemprop="url" content="{{itemUrl}}">
		<div id="banner-details-top" class="product-details-full-banner-top-details"></div>

		<section class="product-details-full-main-content">
			<div class="product-details-full-content-header">

				<div data-cms-area="product_details_full_cms_area_1" data-cms-area-filters="page_type"></div>
				<div class="product-details-full-tag product-details-full-d-display" data-view="ProductTag"></div>
				<h1 class="product-details-full-content-header-title" itemprop="name">{{pageHeader}}</h1>
				<div data-cms-area="item_info" data-cms-area-filters="path"></div>
			</div>
			<div class="product-details-full-main-content-left">
				<div class="product-details-full-image-gallery-container">
					<div id="banner-image-top" class="content-banner banner-image-top"></div>
					<div data-view="Product.ImageGallery"></div>
					<div id="banner-image-bottom" class="content-banner banner-image-bottom"></div>

					<div data-cms-area="product_details_full_cms_area_2" data-cms-area-filters="path"></div>
					<div data-cms-area="product_details_full_cms_area_3" data-cms-area-filters="page_type"></div>
					<div class="product-details-full-social-sharing product-details-full-d-display" data-view="SocialSharing.Flyout"></div>
				</div>
			</div>

			<div class="product-details-full-main-content-right">
			<div class="product-details-full-divider"></div>
			<div class="product-details-full-tag product-details-full-m-display" data-view="ProductTag"></div>
			<div class="product-details-full-main">
				{{#if isItemProperlyConfigured}}
					<form id="product-details-full-form" data-action="submit-form" method="POST">

						<section class="product-details-full-info">
							<div id="banner-summary-bottom" class="product-details-full-banner-summary-bottom"></div>
						</section>

						<div data-cms-area="product_details_full_cms_area_4" data-cms-area-filters="path"></div>

						<div data-view="Product.Sku"></div>

						<div class="product-details-full-rating only-desktop" data-view="Global.StarRating"></div>

						{{#unless isDownloadItemList}}
							<div data-view="Product.Price"></div>
						{{/unless}}

						<div class="product-details-full-rating only-mobile" data-view="Global.StarRating"></div>

						<section data-view="Product.Options"></section>

						<div data-view="Quantity.Pricing"></div>

						{{#if isPriceEnabled}}
						<div class="product-details-full-custom-content">
								{{#unless isDownloadItemList}}
									<div data-view="Quantity"></div>
								{{/unless}}
								<div class="product-details-full-actions-container">
                                {{#unless isIronOnItem}}
								    <div data-view="AddToProductList" class="product-details-full-actions-addtowishlist"></div>
                                {{/unless}}
								{{!-- <div data-view="ProductDetails.AddToQuote" class="product-details-full-actions-addtoquote"></div> --}}
							</div>
						</div>

						<div data-view="OutOfStockNotification"></div>

						<section class="product-details-full-actions">
							<div class="product-details-full-actions-container">
								<div data-view="DownloadableItems.ChildItems"></div>
								<div data-view="MainActionView"></div>
								<div data-view="DownloadableItem" class="product-details-full-actions-downloadable-item"></div>
							</div>
						</section>
						{{/if}}

						<div data-view="Product.Stock.Info"></div>

						<div class="product-details-full-m-display" data-view="ProductInfoAccordionMobile"></div>

						<div data-view="StockDescription"></div>

						<div class="product-details-full-main-bottom-banner">
							<div id="banner-summary-bottom" class="product-details-full-banner-summary-bottom"></div>
						</div>

                        <div class="product-details-full-d-display" data-view="ProductInfoAccordion"></div>
					</form>
				{{else}}
					<div data-view="GlobalViewsMessageView.WronglyConfigureItem"></div>
				{{/if}}

				<div id="banner-details-bottom" class="product-details-full-banner-details-bottom" data-cms-area="item_info_bottom" data-cms-area-filters="page_type"></div>
			</div>
			</div>

		</section>

		<div data-cms-area="product_details_full_cms_area_5" data-cms-area-filters="page_type"></div>
		<div data-cms-area="product_details_full_cms_area_6" data-cms-area-filters="path"></div>

		<div data-cms-area="product_details_full_cms_area_7" data-cms-area-filters="path"></div>

		<div data-cms-area="product_details_full_cms_area_8" data-cms-area-filters="path"></div>

		<div class="product-details-full-content-related-items">
			<div data-view="Related.Items"></div>
		</div>

		<div class="product-details-full-social-sharing-m-container">
			<h2 class="product-details-full-social-sharing-title">{{translate 'Like it? Share it on Social!'}}</h2>
			<div class="product-details-full-m-display product-details-full-social-sharing" data-view="SocialSharing.Flyout"></div>
		</div>

		<div data-view="ProductReviews.Center"></div>

		<div id="banner-details-bottom" class="content-banner banner-details-bottom" data-cms-area="item_details_banner_bottom" data-cms-area-filters="page_type"></div>
	</article>
</div>



{{!----
Use the following context variables when customizing this template:

	model (Object)
	model.item (Object)
	model.item.internalid (Number)
	model.item.type (String)
	model.quantity (Number)
	model.options (Array)
	model.options.0 (Object)
	model.options.0.cartOptionId (String)
	model.options.0.itemOptionId (String)
	model.options.0.label (String)
	model.options.0.type (String)
	model.location (String)
	model.fulfillmentChoice (String)
	pageHeader (String)
	itemUrl (String)
	isItemProperlyConfigured (Boolean)
	isPriceEnabled (Boolean)

----}}
