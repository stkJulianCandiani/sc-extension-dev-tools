{{#if showBackToAccount}}
	<a href="/" class="profile-emailpreferences-button-back">
		<i class="profile-emailpreferences-button-back-icon"></i>
		{{translate 'Back to Account'}}
	</a>
{{/if}}

<section class="profile-emailpreferences">

	<h2 class="profile-emailpreferences-title">{{pageHeader}}</h2>
	<div class="profile-emailpreferences-alert-placeholder" data-type="alert-placeholder"></div>

	<form class="profile-emailpreferences-form">

		<fieldset>
			<legend class="profile-emailpreferences-subtitle">
				{{translate 'Girl Scout Shop Email'}}
			</legend>
			<div class="profile-emailpreferences-controls-group">
				<div class="profile-emailpreferences-controls">
					<label class="profile-emailpreferences-label">
						<input type="checkbox" id="emailsubscribe" data-type="emailsubscribe-checkbox" value="T" data-unchecked-value="F" name="emailsubscribe" {{#if isEmailSuscribe}}checked{{/if}}>
						{{translate 'Yes, I would like to receive the latest news and deals from the Girl Scout Shop—your go-to for fun Girl Scout gear, accessories, and gifts—plus badges, other earned Girl Scout awards, and official insignia. Opting out does not unsubscribe you from other Girl Scouts communication.'}}
					</label>
				</div>
			</div>
		</fieldset>

		{{#if campaignSubscriptions}}
			<hr class="profile-emailpreferences-divider">

			<fieldset>
				<legend class="profile-emailpreferences-subtitle">
					{{translate 'Girl Scout Shop Email'}}
				</legend>
				{{#each subscriptions}}
					<div class="profile-emailpreferences-controls-group">
						<div class="profile-emailpreferences-controls">
							<label class="profile-emailpreferences-label">
								<input type="checkbox" id="subscription-{{internalid}}" data-type="subscription-checkbox" value="T" data-unchecked-value="F" name="subscription-{{internalid}}" {{#unless ../isEmailSuscribe}}disabled{{/unless}} {{#if subscribed}}checked{{/if}}>
								{{translate name}}
							</label>
						</div>
				</div>
				{{/each}}
			</fieldset>

		{{/if}}
		<div class="profile-emailpreferences-controls-submit">
			<button type="submit" class="profile-emailpreferences-submit">{{translate 'Update'}}</button>
			<button type="reset"  class="profile-emailpreferences-reset" data-action="reset">{{translate 'Cancel'}}</button>
		</div>
	</form>
</section>




{{!----
Use the following context variables when customizing this template:

	pageHeader (String)
	subscriptions (Array)
	isEmailSuscribe (Boolean)
	campaignSubscriptions (Boolean)
	showBackToAccount (Boolean)

----}}
