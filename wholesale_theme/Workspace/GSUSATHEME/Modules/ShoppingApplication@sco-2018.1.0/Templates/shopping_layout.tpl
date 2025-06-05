{{! Edited for Summit Theme }}

<div id="layout" class="shopping-layout">
	<header id="site-header" class="shopping-layout-header {{#if fixedHeader}}fixed-header{{/if}}" data-view="Header"></header>
	<div id="main-container" class="{{#if fixedHeader}}theme-has-fixed-header{{else}}theme-has-static-header{{/if}}">
		<div class="shopping-layout-breadcrumb" itemscope itemtype="https://schema.org/WebPage">
			<div data-view="Global.Breadcrumb" data-type="breadcrumb"></div>
		</div>
		<div class="shopping-layout-notifications">
			<div data-view="Notifications"></div>
		</div>
		<!-- Main Content Area -->
		<div id="content" class="shopping-layout-content"></div>
		<!-- / Main Content Area -->
	</div>
	<footer id="site-footer" class="shopping-layout-footer" data-view="Footer"></footer>
</div>




{{!----
The context variables for this template are not currently documented. Use the {{log this}} helper to view the context variables in the Console of your browser's developer tools.

----}}
