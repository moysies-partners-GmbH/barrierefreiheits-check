
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
    //role on link redundent
    $("a[role='link']").removeAttr("role");
    // aria-hidden or aria-readonly redundent on native "readonly" element
    $(`[aria-hidden="true"][readonly]`).removeAttr("aria-hidden");
    $(`[aria-readonly][readonly]`).removeAttr("aria-readonly");
    // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/menuitem_role
    $("li[role='menuitem'] > a")
      .attr("role", "menuitem")
      .parent()
      .attr("role", "presentation")
      .removeAttr("aria-label");
    $("label[role='button']").removeAttr("role").removeAttr("aria-expanded");
    $("[aria-activedescendant]").each(function (elm) {
      var elmId = $(this).attr("aria-activedescendant");
      if (!$("#" + elmId).length) {
        $(this).attr("aria-activedescendant", $(this).children()[1].id);
      }
    });
    $("[type='button'][role='button']").removeAttr("role");
    $("span[aria-label]:not([role])").attr("role", "button");
    $("#Container_Header").attr("role", "banner");
    $(".test-system-hint").remove();

    $("img:not([alt])").attr("role", "presentation").attr("alt", "");
    $(".ListCtrl").removeAttr("tabindex");
    $('.ListCtrl ul li').each((index,element)=>{
          $(element).removeAttr('role')

        element.querySelector('.Title').setAttribute('title',element.textContent)
	element.querySelector('.Title').setAttribute('aria-label',element.textContent)

        element.querySelector('.Additional').setAttribute('aria-hidden',true)
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
    $(".pagination .active [tabindex]").removeAttr("tabindex");
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

    $(".DistributionControlVerticalBottom .Filters").remove();

    customAccessible = true;
  }

  var debounced = debounce(shouldIgnoreMutation, 200);
  var observer = new MutationObserver(debounced);
  $(document).ready(function () {
     observer.observe(document.body, { childList: true, subtree: true });

     const handleMenuFix = function(){
         const list = document.querySelector('#CHILDREN-BF9B4B8CE2D6CCDD56729E6BBDAB7C5171991FB4')
         if(window.innerWidth < 640){
             list.style.overflowX = 'auto'
         }else{
             list.style.overflowX = 'visible'
         }
         list.style.maxHeight = 'calc(100vh - 100px)'
         // console.log('menufixInit',list)
    }
    handleMenuFix()

    function fixTooltipContainer(id){
	const tooltip = document.querySelector('#'+id)
		if(tooltip){
            		tooltip.style.transform='translate(-50%,-50%)';
			tooltip.style.marginTop='0';
			tooltip.style.marginLeft='0'
		}
	}

    function handLeResize(){
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
