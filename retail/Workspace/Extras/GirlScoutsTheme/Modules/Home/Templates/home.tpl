<div class="home">
	<div data-cms-area="home_cms_area_1" data-cms-area-filters="path"></div>

	<div data-cms-area="home_cms_area_banner_top" data-cms-area-filters="path"></div>

	<div data-cms-area="home_cms_area_2" data-cms-area-filters="path"></div>

	<div class="home-slider-container">
		<div class="home-image-slider">
			<ul data-slider class="home-image-slider-list">
				{{#each carouselImages}}
					<li>
						<a href="{{href}}" class="home-slide-caption-button" target="{{target}}">
							<div class="home-slide-main-container">
								<div class="home-slide-image-container">
									<img src="{{imageDesktop}}" alt="{{altText}}" class="home-slide-image-desktop" />
									<img src="{{imageMobile}}" alt="{{altText}}" class="home-slide-image-mobile" />
								</div>
							</div>
						</a>
					</li>""
				{{/each}}
			</ul>
		</div>
	</div>

	<div class="home-cms-page-banner-bottom-row">
		<!-- Banner Pink - Shop Your Council-->
		<div class="home-cms-page-banner-bottom pink" data-view="FindYourCouncil.View"></div>
		<!-- Banner Orange -->
		<div class="home-cms-page-banner-bottom orange" data-cms-area="home_cms_area_banner-1" data-cms-area-filters="path"></div>
		<!-- Banner Blue -->
		<div class="home-cms-page-banner-bottom blue" data-cms-area="home_cms_area_banner-2" data-cms-area-filters="path"></div>
	</div>

	<div data-cms-area="home_cms_area_3" data-cms-area-filters="path"></div>

	<div data-cms-area="home_cms_area_4" data-cms-area-filters="path"></div>

	<div class="home-merchandizing-zone">
		<div data-id="your-merchandising-zone" data-type="merchandising-zone"></div>
	</div>
</div>

{{!----
Use the following context variables when customizing this template:

	imageHomeSize (String)
	imageHomeSizeBottom (String)
	carouselImages (Array)
	bottomBannerImages (Array)

----}}
