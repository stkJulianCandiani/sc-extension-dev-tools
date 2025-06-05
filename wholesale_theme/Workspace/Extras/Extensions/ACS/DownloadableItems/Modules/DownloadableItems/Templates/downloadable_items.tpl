<section class="downloadable-items-list">
    <header class="downloadable-items-list-header">
        <h2>{{pageHeader}}</h2>
    </header>

    <div class="downloadable-items-list-nav">
        <div class="downloadable-items-list-button-group"></div>
    </div>

    <div data-view="ListHeader"></div>
    {{#if collectionLengthGreaterThan0}}
        <div class="downloadable-items-list-container">
            <table class="table table-hover downloadable-items-list-actionable-table">
                <thead class="downloadable-items-list-header">
                <tr>
                    <th class="downloadable-items-list-name-header">
                        <span>{{ translate 'Name' }}</span>
                    </th>
                    <th class="downloadable-items-list-remaining-header">
                        <span>{{translate 'Remaining Downloads'}}</span>
                    </th>
                    <th class="downloadable-items-list-actions-header">
                        <span>{{translate 'Actions'}}</span>
                    </th>
                </tr>
                </thead>
                <tbody class="downloadable-items-list" data-view="DownloadableItems.List"></tbody>
            </table>
        </div>
    {{else}}
        {{#if isLoading}}
            <p class="downloadable-items-list-empty">{{translate 'Loading...'}}</p>
        {{else}}
            <div class="downloadable-items-list-empty-section">
                <h5>{{translate 'You don\'t have any purchases in your account right now.'}}</h5>
            </div>
        {{/if}}
    {{/if}}

    {{#if showPagination}}
        <div class="downloadable-items-list-paginator">
            <div data-view="GlobalViews.Pagination"></div>
            {{#if showCurrentPage}}
                <div data-view="GlobalViews.ShowCurrentPage"></div>
            {{/if}}
        </div>
    {{/if}}
</section>
