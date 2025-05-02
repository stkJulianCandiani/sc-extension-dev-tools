{{! Edited for Summit Theme }}

<div class="error-management-page-not-found">
	<div data-cms-area="error_management_page_not_found_cms_area_1" data-cms-area-filters="path"></div>
    <div class="error-management-page-not-found-header" style="{{#if errorManagement.backgroundImage}}background-image: url({{getThemeAssetsPathWithDefault errorManagement.backgroundImage 'img/summit-page-not-found.jpg'}});{{/if}}{{#if errorManagement.backgroundColor}}background-color: {{errorManagement.backgroundColor}};{{/if}}">
		<div class="error-management-page-not-found-caption">
			<div class="error-management-page-not-found-title">
				{{#if errorManagement.title}}
					<h1>{{{errorManagement.title}}}</h1>
				{{else}}
					<h1>{{pageHeader}}</h1>
				{{/if}}
				{{#if errorManagement.text}}
					<p class="error-management-page-not-found-text">{{errorManagement.text}}</p>
				{{/if}}
			</div>
			{{#if errorManagement.btnText}}
			<div class="error-management-page-not-found-button-container">
				<a href="{{errorManagement.btnHref}}" class="error-management-page-not-found-button">
					{{errorManagement.btnText}}
				</a>
			</div>
			{{/if}}
		</div>
    </div>

	<div id="error-management-page-not-found-content" class="error-management-page-not-found-content"></div>

	<div data-cms-area="error_management_page_not_found_cms_area_2" data-cms-area-filters="path"></div>
</div>



{{!----
Use the following context variables when customizing this template:

	title (String)
	pageHeader (String)

----}}
