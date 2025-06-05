<div id="futureshipdate-container" class="futureshipdate-container">
    <h3 class="futureshipdate-title">{{translate 'Future Ship Date'}}</h3>
    {{#if isReview}}
    <p>{{model.options.custbody_future_ship_date}}</p>
    {{else}}
    <label for="future-ship-date" class="futureshipdate-label">
        {{translate 'Enter Future Ship Date'}}
    </label>
    <input class="futureshipdate-input" data-type="date" id="future-ship-date" name="custbody_future_ship_date" data-start-date="{{startDate}}" data-todayhighlight="true" value="{{model.options.custbody_future_ship_date}}">
    {{/if}}
</div>