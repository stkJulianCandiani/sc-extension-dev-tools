<section class="product-reviews-center-content">
	<button class="product-reviews-center-pusher" data-target="product-reviews-center-review" data-type="sc-pusher">
		<span class="product-reviews-center-pusher-title">{{ translate 'Reviews' }}</span>
		<div class="product-reviews-center-pusher-rating" data-view="Global.StarRating"></div>
		<i class="product-reviews-center-pusher-icon"></i>
	</button>
	<div class="product-reviews-center-more-info-content-container" data-action="pushable" data-id="product-reviews-center-review">
		<div class="product-reviews-center">
			{{#if itemCount}}
				<div class="product-reviews-center-container">
					<div class="product-reviews-center-container-header">
						<h3 class="product-reviews-center-container-header-title">
							<span>{{translate 'Star Rating'}}</span>
						</h3>
					</div>
					<div class="product-reviews-stars">
						<h2>{{translate 'OVERALL STAR RATING'}}</h2>
						<div data-view="Global.StarRating"></div>
					</div>
					<div class="product-reviews-center-container-wrapper">
						<h2>{{translate 'RATING BREAKDOWN'}}</h2>
						<div data-view="Global.RatingByStar"></div>
					</div>
					<div class="product-reviews-center-container-footer">
						<div class="product-reviews-content-action">
							<h2>{{translate 'TELL US WHAT YOU THINK!'}}</h2>
							<p>{{translate 'Help us and other shoppers learn more about this product!'}}</p>
						</div>
						<a href="{{itemUrl}}/newReview" class="product-reviews-center-container-footer-button">{{translate 'Rate this item'}}</a>
					</div>
				</div>

				<section class="product-reviews-center-list">
					<div  data-view="ListHeader.View"></div>
					{{#if totalRecords}}
						<div data-view="ProductReviews.Review" class="product-reviews-center-review-container"></div>
					{{else}}
						{{translate 'There are no reviews available for your selection'}}
					{{/if}}
				</section>

				<div class="product-reviews-center-footer">
					<div data-view="GlobalViews.Pagination"></div>
				</div>
			{{else}}
				<div class="product-reviews-center-container">
					<div class="product-reviews-center-container-header">
						<h3 class="product-reviews-center-container-header-title"><span>{{translate 'Ratings &amp; Reviews'}}</span></h3>
						<h4 class="product-reviews-center-container-header-title">{{translate 'No reviews available'}}</h4>
						<p>{{translate 'Be the first to'}} <a href="{{itemUrl}}/newReview" class="product-reviews-center-container-button">{{translate 'Write a Review'}}</a></p>
					</div>
				</div>
			{{/if}}
		</div>
	</div>
</section>



{{!----
Use the following context variables when customizing this template:

	itemCount (Number)
	hasOneReview (Boolean)
	itemUrl (String)
	totalRecords (Number)

----}}
