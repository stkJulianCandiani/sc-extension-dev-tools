<nav>
    <ul>
        {{#each footerNavigationLinks}}
            <li class="footer-policies-item">
                <a class="footer-policies-link" {{objectToAtrributes item}}>
                    {{translate text}}
                </a>
            </li>
        {{/each}}
    </ul>
</nav>
<small>&copy; {{ translate '2008-2015 Company Name' }}</small>
