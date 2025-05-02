{{#if accordionElements}}
<section class="pdp-accordion-details">
    {{#each accordionElements}} 
      {{#if dropDownBody}}
          {{#if dropDownHeader.active}}
            <a  href="#" 
                class="pdp-accordion-header" 
                data-toggle="collapse" 
                data-target="#{{dropDownHeader.mappedField}}-{{placeholder}}-container" 
                data-type="collapse"
                {{#if dropDownHeader.open}}aria-expanded="true"{{else}}aria-expanded="false"{{/if}} 
                title="{{dropDownHeader.mappedField}}">
              <i class="pdp-accordion-header-element gs-icon-c-right"></i>
              <h4 class="pdp-accordion-header-element">{{dropDownHeader.title}}</h4>
            </a>
            <div id="{{dropDownHeader.mappedField}}-{{placeholder}}-container" class="collapse {{#if dropDownHeader.open}}in{{/if}}">
              <div class="pdp-accordion-body">{{{dropDownBody}}}</div>
            </div>
          {{/if}}  
      {{/if}}
    {{/each}}
</section>
{{/if}}
