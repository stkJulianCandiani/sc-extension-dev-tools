define('Custom.jQuery.sidebarMenu', [
    'jQuery'
], function CustomjQuerysidebarMenu(jQuery) {
    'use strict';

    function detectAnimationSupport() {
        var domPrefixes = 'Webkit Moz O ms Khtml'.split(' ');
        var elm = document.createElement('div');
        var i;
        if (elm.style.animationName !== undefined) {
            return true;
        }
        for (i = 0; i < domPrefixes.length; i++) {
            if (elm.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
                return true;
            }
        }
        return false;
    }
    function Menu(el) {
        var wrapper = el;
        var lastOpenedMenu = wrapper;
        var rootUl = wrapper.find('.header-sidebar-menu:first');
        var animating = false;
        var anchor;
        var parentUl;
        var parentLi;
        var parentOpenLi;
        var openMenu;
        var nextMenu;
        var flyerMenu;
        var pushingMenu;
        var flyerClassName;
        var hasAnimationSupport = detectAnimationSupport();
        var classNames = {
            menuOpened: 'header-sidebar-menu-opened',
            menuPath: 'header-sidebar-menu-path',
            menuTransition: 'header-sidebar-menu-transition',
            animateIn: 'header-sidebar-menu-flyer-in',
            animateOut: 'header-sidebar-menu-flyer-out',
            flyer: 'header-sidebar-menu-flyer',
            dropdownIn: 'header-sidebar-menu-dropdown-in',
            dropdown: 'header-sidebar-menu-dropdown'
        };
        var heightStack = [];
        lastOpenedMenu.addClass(classNames.menuPath);
        lastOpenedMenu.addClass(classNames.menuOpened);
        jQuery(rootUl).on('click', '[data-action="open-menu"]', function (e) {
            e.preventDefault();
            e.stopPropagation();
            anchor = jQuery(this);
            parentUl = anchor.closest('ul');
            parentOpenLi = anchor.closest('li');
            openMenu = parentUl.find('.' + classNames.dropdown);
            nextMenu = anchor.next();
            if (parentOpenLi.hasClass('dropdown-opened')) {
                parentUl.find('.dropdown-opened').removeClass();
                openMenu.removeClass(classNames.dropdownIn);
            } else {
                parentUl.find('.dropdown-opened').removeClass();
                parentOpenLi.addClass('dropdown-opened');
                openMenu.removeClass(classNames.dropdownIn);
                nextMenu.addClass(classNames.dropdownIn);
            }
            flyerMenu = parentUl.clone(false);
            flyerMenu.removeClass()
                .addClass(classNames.flyer)
                .css({ opacity: 0 })
                .insertAfter(rootUl);
            rootUl.css('height', flyerMenu.height());
            setTimeout(function () {
                flyerMenu.remove();
            }, 300);
        });
        function animate(subMenu, animationClass, cb) {
            flyerMenu = subMenu.clone(false);
            flyerMenu.removeClass()
                .data('color', subMenu.data('color'))
                .addClass(classNames.flyer)
                .insertAfter(rootUl)
                .addClass(animationClass);
            if (animationClass === classNames.animateIn) {
                heightStack.push(rootUl.height());
                rootUl.css('height', flyerMenu.height());
            } else {
                rootUl.css('height', heightStack.pop());
            }
            flyerMenu.data('callback', cb);
            if (!hasAnimationSupport) {
                if (cb) {
                    cb();
                }
                flyerMenu.remove();
                animating = false;
                rootUl.addClass(classNames.menuTransition);
            }
        }
        jQuery(rootUl).on('click', '[data-action="push-menu"]', function (e) {
            anchor = jQuery(this);
            parentLi = anchor.closest('li');
            pushingMenu = anchor.next();
            e.preventDefault();
            e.stopPropagation();
            if (animating === true) {
                return;
            }
            animating = true;
            animate(pushingMenu, classNames.animateIn, function () {
                // change the last opened menu.
                lastOpenedMenu.removeClass(classNames.menuOpened);
                lastOpenedMenu = parentLi;
                // add current opened subview
                parentLi
                    .addClass(classNames.menuPath)
                    .addClass(classNames.menuOpened);
            });
        });

        jQuery(rootUl).on('click', '[data-action="pop-menu"]', function (e) {
            var anchorMenu;
            var openedLi;
            e.preventDefault();
            e.stopPropagation();
            if (animating === true) {
                return;
            }
            animating = true;
            anchor = jQuery(this);// anchor is the back button
            anchorMenu = anchor.closest('ul');
            openedLi = anchor.closest('.' + classNames.menuOpened);
            openedLi
                .removeClass(classNames.menuPath)
                .removeClass(classNames.menuOpened);
            lastOpenedMenu = openedLi.closest('.' + classNames.menuPath);
            lastOpenedMenu.addClass(classNames.menuOpened);
            animate(anchorMenu, classNames.animateOut);
        });
        flyerClassName = '.' + classNames.flyer;
        jQuery(wrapper).on('animationend MSAnimationEnd oAnimationEnd webkitAnimationEnd', flyerClassName, function () {
            var cb = jQuery(this).data('callback');
            if (cb) {
                cb();
            }
            jQuery(this).remove();
            animating = false;
            rootUl.addClass(classNames.menuTransition);// fix ios transition glitch
        });
    }
    jQuery.fn.sidebarMenu = function () {
        return this.each(function () {
            Menu(jQuery(this));
        });
    };
    return jQuery.fn.sidebarMenu;
});
