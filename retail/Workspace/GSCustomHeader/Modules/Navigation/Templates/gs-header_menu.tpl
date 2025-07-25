{{!
	© 2016 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
}}

<nav class="header-menu-secondary-nav">

	<ul class="header-menu-level1">

		{{#each categories}}
			{{#if text}}
				<li {{#if categories}}data-toggle="categories-menu"{{/if}} {{#if color}} class="category-color{{color}}"{{/if}}>
					<a class="{{class}}" {{objectToAtrributes this}}>
						<span class="header-menu-link-text">{{translate text}}</span>
					</a>

					{{#if categories}}
                        <div class="header-menu-level-container">
								<div class="categories-container">
									<div class="category-item">
									<ul class="header-menu-level2">
										{{#each categories}}
											<li>
												<a class="{{class}}" {{objectToAtrributes this}}>{{translate text}}</a>

												{{#if categories}}
													<ul >
														{{#each categories}}
															<li>
																<a class="{{class}}" {{objectToAtrributes this}}>{{translate text}}</a>
															</li>
														{{/each}}
													</ul>
												{{/if}}
											</li>
										{{/each}}
									</ul>
								</div>
								

								{{#each categories}}
									{{#if featured}}
										<div class="category-item category-featured">
											<img src="{{thumbnailurl}}" alt="">
											<a class="{{class}}" {{objectToAtrributes this}}>{{translate text}}</a>
										</div>
									{{/if}}
								{{/each}}
							</div>
                        </div>
					{{/if}}
				</li>
			{{/if}}
		{{/each}}
	</ul>
</nav>
