{{#if showPatchesSection}}
<div class="custom-message-controls-group" data-validation="control-group">  
    <label class="product-views-option-dropdown-label" for="custom-patch-message"> {{customMessageLabel}} :</label>  
    <div data-validation="control">  
        <input name="custom-patch-message" data-action="add-patch-message" type="text" id="custom-patch-message" class="product-views-option-text-input" maxlength="{{customMessageLength}}" value={{customMessageValue}}> 
    </div>
</div>
<div class="patch-information-validation">
    <input type="checkbox" data-action="patch-confirmation" name="patch-information-confirmation" id="patch-confirmation" {{#if orderConfirmed}} checked {{/if}}>
    <label class="product-views-option-dropdown-label" for="patch-confirmation"> {{translate 'The information entered is correct'}}</label>
</div>

<div data-view="Patch-Selection-Error"></div>
{{/if}}