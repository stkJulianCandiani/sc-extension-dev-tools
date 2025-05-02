{{!
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
}}

<div class="product-list-share-list">
    <form action="#" class="product-list-new">
        {{#if inModal}}
        <div class="product-list-new-modal-body">
        {{/if}}

        <div data-validation="control-group">
            <h2 class="product-list-share-list-name">
                {{ translate 'List' }} {{name}}
            </h2>
        </div>
        <div class="product-list-new-form-controls-group" data-validation="control-group">
            <label for="product-list-new-description" class="product-list-new-form-label">
                {{translate 'Share with'}}: <span class="product-list-new-form-required">*</span>
            </label>
            <div class="product-list-new-form-controls"  data-validation="control">
                <textarea id="product-list-new-description" class="product-list-new-form-textarea" name="sharelistwith" placeholder="{{translate 'Please enter the email address you want to share this list with.'}}">{{#if isEdit}}{{sharelistwith}}{{/if}}</textarea>
            </div>
            <input type="text" name="scopeName" value="shared" hidden="hidden" />
        </div>

        {{#if inModal}}
        </div>
        {{/if}}

        <div data-type="alert-placeholder" data-confirm-message=""></div>

        <div class="{{#if inModal}}product-list-new-modal-footer{{/if}} product-list-new-form-controls-group">

            <button type="submit" class="product-list-new-form-submit" data-action="save">
                {{#if isEdit}}{{translate 'Save'}}{{else}}{{translate 'Share List'}}{{/if}}
            </button>
            {{#if inModal}}
                <button class="product-list-new-form-cancel" data-dismiss="modal">{{translate 'Cancel'}}</button>
            {{/if}}
        </div>
    </form>
</div>
