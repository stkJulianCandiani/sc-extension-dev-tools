/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define("CS.FindYourCouncil.Shopping", [
  "Council.Router",
  "Council.Categories",
  //   "Council.Facets.Browse.View",
  "Council.Home.View",
], function CSFindYourCouncilShopping(CouncilRouter) {
  "use strict";

  return {
    mountToApp: function mountToApp(container) {
      CouncilRouter.mountToApp(container);
    },
  };
});
