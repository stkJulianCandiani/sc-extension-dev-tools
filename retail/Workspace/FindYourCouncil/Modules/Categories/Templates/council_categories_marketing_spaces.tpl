{{#if image}}
<div class="marketing-space-content">
    <div class="content">
        {{#if link}}
            <div class="marketing-space-image">
                <a href="{{link}}" data-touchpoint="home">
                    <img src="{{image}}" alt="{{translate text}}"/>
                </a>
            </div>
        {{else}}
            <div class="marketing-space-image">
                <img src="{{image}}" alt="{{translate text}}"/>
            </div>
        {{/if}}
    </div>
</div>
{{/if}}