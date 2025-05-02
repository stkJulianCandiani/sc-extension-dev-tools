{{!
	© 2016 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
}}

<form class="newsletter-suscription-form" data-action="newsletter-subscribe" novalidate>

	<div data-validation="control-group">
        <div class="mobile-form-label">
            <div class="newsletter-icon">
                <i class="gs-icon-mail"></i>
            </div>
            <p>{{translate 'Never Miss a Thing!'}}</p>
        </div>
		<div class="newsletter-subscription-form-container {{#if showErrorMessage}}error{{/if}}" data-validation="control">
			
			<button type="submit" class="newsletter-subscription-form-button-subscribe-gs">
				<span class="text">{{translate 'Join Our Email List'}}</span>
                <span class="mobile-text">{{translate 'Join Our Email List'}}</span>
			</button>
		</div>
	</div>
</form>
