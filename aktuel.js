
var customAccessible = false;


(function ($) {
  function debounce(func, delay) {
    let timerId;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timerId);
      timerId = setTimeout(function () {
        func.apply(context, args);
      }, delay);
    };
  }

  function shouldIgnoreMutation(a) {
    makePageAccessible(a);
  }

  function makePageAccessible(a, b) {

    console.log("make Accessible");
    customAccessible = false;

    // should intrexx Fix
    // WAI-ARIA

    //missing element for id aria-labelledby
    $('[aria-labelledby="Header_Container_AppMain"]').removeAttr(
      "aria-labelledby"
    );

    //ID doesnt exist. If the ID specified in the aria-activedescendant attribute does not exist, the attribute is set to the ID of the second child element.
    $("[aria-activedescendant]").each(function (elm) {
      var elmId = $(this).attr("aria-activedescendant");
      if (!$("#" + elmId).length) {
        $(this).attr("aria-activedescendant", $(this).children()[1].id);
      }
    });

    //role on link and button redundant
    $("a[role='link']").removeAttr("role");
    $("[type='button'][role='button']").removeAttr("role");


    //set the appropriate ARIA role
    $("span[aria-label]:not([role])").attr("role", "button");
    $("#Container_Header").attr("role", "banner");
    //<img> need an alt Attribut. If an <img> lacks an alt attribute, it's treated as decorative with role="presentation", leaving alt empty
    $("img:not([alt])").attr("role", "presentation").attr("alt", "");

    //remove the wrong attribute
    $("label[role='button']").removeAttr("role").removeAttr("aria-expanded");
    $(".pagination .active [tabindex]").removeAttr("tabindex");
    $(".ListCtrl").removeAttr("tabindex");

    //remove the elements
    $(".test-system-hint").remove();
    $(".DistributionControlVerticalBottom .Filters").remove();

    // aria-hidden or aria-readonly redundent on native "readonly" element
    $(`[aria-hidden="true"][readonly]`).removeAttr("aria-hidden");
    $(`[aria-readonly][readonly]`).removeAttr("aria-readonly");


    /**Semantics wrong. Menus that are built with <li>,<ul>,<a>,<button> require the role = ''menuitem"
     * The menuitem role must be attached to <a> elements within <li> elements. The <li> element is assigned the presentation role and aria-label is removed
     * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/menuitem_role
     **/
    $("li[role='menuitem'] > a")
      .attr("role", "menuitem")
      .parent()
      .attr("role", "presentation")
      .removeAttr("aria-label");





    /**
    * All <li> elements within a <ul> element, which in turn are located within an element with the class.ListCrtl, are removed from the role and the title and the aria label are set to the text content of the list element. 
    * The first element is hidden with aria-hidden=true
    **/
    $('.ListCtrl ul li').each((index, element) => {
      $(element).removeAttr('role')
      element.querySelector('.Title').setAttribute('title', element.textContent)
      element.querySelector('.Title').setAttribute('aria-label', element.textContent)
      element.querySelector('.Additional').setAttribute('aria-hidden', true)
    })


    $(".DistributionControlVerticalBottom ")
      .find("ul")
      .each((index, element) => {
        if (index === 0) {
          $(element).removeAttr('role')
          $(element).attr("aria-label", "Zur Verfuegung stehende Benutzer");
        }
        if (index === 1) {
          $(element).attr("aria-label", "Ausgewaehlte Benutzer");
        }
      });



    $('[aria-haspopup="dialog"]').each((index, element) => {
      var tooltipElement = $("#" + element.id.replace("ID", "key"));
      var label = $(element).attr("aria-label");
      if (tooltipElement.length) {
        tooltipElement.attr("aria-label", label);
        $(element).attr("aria-expanded", true);
      } else {
        $(element).attr("aria-expanded", false);
      }
    });


    $("label").each((index, element) => {
      var text = $(element).text();
      if (!text.trim()) {
        $(element).remove();
      }
    });

    $("table").each((index, element) => {
      var $el = $(element);
      var label = $el.attr("aria-label");
      var nav = $el.find("nav");
      if (nav.length) {
        nav.attr("aria-label", label + " Pagination Navigation");
      }
    });
    // fixing aria-checked issu
    $("[type='checkbox'][name]").each((index, el) => {
      el.setAttribute("aria-checked", el.checked);
      el.setAttribute(
        "onclick",
        "this.setAttribute('aria-checked',this.checked)"
      );
    });

    // rename Tooltip Title
    $(".TT_Close").each((index, el) => {
      el.setAttribute("title", "Fenster schliessen");
    });



    customAccessible = true;
  }

  var debounced = debounce(shouldIgnoreMutation, 200);
  var observer = new MutationObserver(debounced);
  $(document).ready(function () {
    observer.observe(document.body, { childList: true, subtree: true });

    const handleMenuFix = function () {
      const list = document.querySelector('#CHILDREN-BF9B4B8CE2D6CCDD56729E6BBDAB7C5171991FB4')
      if (window.innerWidth < 640) {
        list.style.overflowX = 'auto'
      } else {
        list.style.overflowX = 'visible'
      }
      list.style.maxHeight = 'calc(100vh - 100px)'
      // console.log('menufixInit',list)
    }
    handleMenuFix()

    function fixTooltipContainer(id) {
      const tooltip = document.querySelector('#' + id)
      if (tooltip) {
        tooltip.style.transform = 'translate(-50%,-50%)';
        tooltip.style.marginTop = '0';
        tooltip.style.marginLeft = '0'
      }
    }

    function handLeResize() {
      fixTooltipContainer("key_textactioncontrolE70B85CC")
      fixTooltipContainer("key_buttoncontrol67A8BCA0")
      handleMenuFix()
    }
    addEventListener("resize", handLeResize);

  });
  $(window).on("unload", function () {
    observer.disconnect();
  });
})($);
