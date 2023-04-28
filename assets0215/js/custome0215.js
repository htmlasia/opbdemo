/* Document Ready
 ********************************************** */
jQuery(document).ready(function ($) {
  var t = $;
  var pathname = window.location.pathname; // Returns path only (/path/example.html)
  var url = window.location.href; // Returns full URL (https://example.com/path/example.html)
  var origin = window.location.origin; // Returns base URL (https://example.com)
  var pathOne = window.location.pathname.split("/");

  var originPathOne = window.location.origin + "/" + pathOne[1];
  let numb = 2;
  function appHeight() {
    const doc = document.documentElement;
    doc.style.setProperty("--vh", window.innerHeight * 0.01 + "px");
  }

  const limit = 5;
  let page = 1;

  const type = {
    all: "All",
    page: "Pages",
    articles: "Articles",
    forms: "Forms",
    publications: "Publications",
  };
  const typeNumber = {
    all: "01",
    page: "02",
    articles: "03",
    forms: "04",
    publications: "05",
  };

  const typeArticle = {
    news: "Articles - News",
    letter: "Articles - Newsletter",
    blog: "Articles - Blog",
  };

  const typeCategoryPage = {
    "01": "all",
    "02": "member_pages",
    "03": "current_pages",
    "04": "retired_members",
    "05": "employers",
  };

  const typeCategoryArticles = {
    "01": "all",
    "02": "news",
    "03": "letter",
    "04": "blog",
  };

  const typeCategoryForms = {
    all: "All",
    enrollment: "Enrollment",
    transfer: "Transfer",
    buyback: "Buyback",
    retirement: "Retirement",
  };

  const typeForms = {
    opb: "OPB",
    fsra: "FSRA Family Law",
    canada: "Canada Life",
    cowan: "Cowan",
  };
  // const typeCategoryFormsV2 = {
  //   "01": "all",
  //   "02": "enroll",
  //   "03": "transfer",
  //   "04": "buyback",
  //   "05": "retirement",
  // };

  const typePublications = {
    booklet: "Booklets",
    flyer: "Flyer and Brochures",
    obp: "OPB News for Members",
    annual_en: "Annual Reports - EN",
    annual_fr: "Annual Reports - FR",
    financial_en: "Financial Reports - EN",
    financial_fr: "Financial Reports - FR",
    business_en: "Business Plans - EN",
  };
  const typeCatPublications = {
    "01": "all",
    "02": "booklet",
    "03": "flyer",
    "04": "obp",
    "05": "annual_en",
    "06": "annual_fr",
    "07": "financial_en",
    "08": "financial_fr",
    "09": "business_en",
    "010": "business_fr",
  };
  let typeActive = "all";

  window.addEventListener("resize", appHeight);
  appHeight();
  if (pathOne[numb] == "form") {
    searchFormAll();
  } else {
    getTotal();
  }

  // $(".c-tab-menu_list li:first-child").addClass("item-active");
  headerSearch0215();
  homepage0215();
  initEvent();
  // search0215();
  // searchAll();
  let isInitialSearch = false;
  $("#search-data").keypress(function (event) {
    if (event.which === 13) {
      let $form = $("#search-page-form");
      var valid = $form.hasClass("is-input");
      var error_free = true;
      if (!valid) {
        $(".opb-search-page .input-warning").addClass("is-active");
        if (!isInitialSearch) {
          if (pathOne[numb] == "form") {
            typeActive = "forms";
          }
          if (typeActive == "all") {
            searchAll();
          } else {
            searchByType(typeActive);
          }
          isInitialSearch = true;
        }
        error_free = false;
      }
      if (!error_free) {
        event.preventDefault();
      } else {
        event.preventDefault();
        isInitialSearch = false;
        const searchValue = $(".opb-search-page .opb-form-text").val();
        if (searchValue) {
          if (pathOne[numb] == "form") {
            typeActive = "forms";
          }
          if (typeActive == "all") {
            searchAll();
          } else {
            searchByType(typeActive);
          }
          search0215();
        }
      }
    }
  });
  $(".opb-page-header").insertBefore("#carouselHomepageIndicators");
  function initEvent() {
    $(".c-tab-menu_list li:first-child").addClass("item-active");
    var $form = $("#search-page-form");
    var $input = $(".opb-search-page .opb-form-text");
    $(".opb-btn-submit").click(function (event) {
      var valid = $form.hasClass("is-input");
      var error_free = true;
      if (!valid) {
        $(".opb-search-page .input-warning").addClass("is-active");
        if (!isInitialSearch) {
          if (pathOne[numb] == "form") {
            typeActive = "forms";
          }
          if (typeActive == "all") {
            searchAll();
          } else {
            searchByType(typeActive);
          }
          isInitialSearch = true;
        }
        error_free = false;
      }
      if (!error_free) {
        event.preventDefault();
      } else {
        isInitialSearch = false;
        const searchValue = $input.val();
        if (searchValue) {
          if (pathOne[numb] == "form") {
            event.preventDefault();
            typeActive = "forms";
          }
          if (typeActive == "all") {
            searchAll();
          } else {
            searchByType(typeActive);
          }
          search0215();
        }
      }
    });

    $("select[name='selectPage']").on("change", function () {
      var val = $(this).val();
      if (val) {
        if (val == "01") searchByType(typeActive);
        else searchByType(typeActive, typeCategoryPage[val]);
      }
    });

    $("select[name='selectArticle']").on("change", function () {
      var val = $(this).val();
      if (val) {
        const activeCondition = document.querySelector(
          ".cat-filter-sort-list.sort-articles li.is-active"
        );
        const sortCondition = activeCondition.id;
        if (val == "01") searchByType(typeActive, null, sortCondition);
        else searchByType(typeActive, typeCategoryArticles[val], sortCondition);
      }
    });

    // $("select[name='selectForm']").on("change", function () {
    //   if (pathOne[numb] == "form") {
    //     typeActive = "forms";
    //   }
    //   var val = $(this).val();
    //   var valCode = $(
    //     ".code-filter-selectV1 select[name='selectFormV1']"
    //   ).val();

    //   if (val) {
    //     const activeCondition = document.querySelector(
    //       ".cat-filter-sort-list.sort-forms li.is-active"
    //     );
    //     let sortCondition;
    //     if (activeCondition) {
    //       sortCondition = activeCondition.id;
    //     } else {
    //       sortCondition = "asc";
    //     }
    //     if (val == "01" && valCode == "all")
    //       searchByType(typeActive, null, sortCondition, null);
    //     else if (val !== "01" && valCode == "all")
    //       searchByType(typeActive, typeCategoryForms[val], sortCondition, null);
    //     else if (val == "01" && valCode != "all")
    //       searchByType(typeActive, null, sortCondition, valCode);
    //     else
    //       searchByType(
    //         typeActive,
    //         typeCategoryForms[val],
    //         sortCondition,
    //         valCode
    //       );
    //   }
    // });
    // $("select[name='selectFormV1']").on("change", function () {
    //   if (pathOne[numb] == "form") {
    //     typeActive = "forms";
    //   }
    //   var val = $(this).val();
    //   var valCat = $(".cat-filter-selectV1 select[name='selectForm']").val();

    //   if (val) {
    //     const activeCondition = document.querySelector(
    //       ".cat-filter-sort-list.sort-forms li.is-active"
    //     );
    //     let sortCondition;
    //     if (activeCondition) {
    //       sortCondition = activeCondition.id;
    //     } else {
    //       sortCondition = "asc";
    //     }
    //     if (valCat == "01" && val != "all")
    //       searchByType(typeActive, null, sortCondition, val);
    //     else if (valCat == "01" && val == "all")
    //       searchByType(typeActive, null, sortCondition, null);
    //     else if (valCat != "01" && val == "all")
    //       searchByType(
    //         typeActive,
    //         typeCategoryForms[valCat],
    //         sortCondition,
    //         null
    //       );
    //     else
    //       searchByType(
    //         typeActive,
    //         typeCategoryForms[valCat],
    //         sortCondition,
    //         val
    //       );
    //   }
    // });
    function handleSelectChange() {
      if (pathOne[numb] == "form") {
        typeActive = "forms";
      }

      if (window.innerWidth < 991) {
        var val = $('.list input[name="filter-advanced-form"]:checked').attr(
          "dt-value"
        );
        var valCode = $('.list input[name="code-advanced-form"]:checked').attr(
          "dt-value"
        );
      } else {
        var val = $("select[name='selectForm']").val();
        var valCode = $("select[name='selectFormV1']").val();
      }

      let sortCondition, activeCondition;
      if (pathOne[numb] == "form") {
        activeCondition = $(".page-sub-soft li.active");
        if (activeCondition.length > 0) {
          sortCondition =
            activeCondition.text() + "-" + activeCondition.attr("data-sort");
        } else {
          sortCondition = "Title-asc";
        }
      } else {
        activeCondition = $(".cat-filter-sort-list.sort-forms li.is-active");
        sortCondition = activeCondition ? activeCondition.id : "asc";
      }

      if (val === "01" && valCode === "all") {
        searchByType(typeActive, null, sortCondition, null);
      } else {
        var typeCategory = null;
        var codeCategory = null;

        if (val !== "all") {
          typeCategory = typeCategoryForms[val];
        }

        if (valCode !== "all") {
          codeCategory = valCode;
        }

        searchByType(typeActive, typeCategory, sortCondition, codeCategory);
      }
    }

    $("select[name='selectForm']").on("change", function () {
      handleSelectChange();
    });

    $("select[name='selectFormV1']").on("change", function () {
      handleSelectChange();
    });
    $("select[name='selectPublications']").on("change", function () {
      var val = $(this).val();
      if (val) {
        const activeCondition = document.querySelector(
          ".cat-filter-sort-list.sort-publications li.is-active"
        );
        const sortCondition = activeCondition.id;
        if (val == "01") searchByType(typeActive, null, sortCondition);
        else searchByType(typeActive, typeCatPublications[val], sortCondition);
      }
    });

    $(".cat-filter-item.item-page .content-body_btn a").on(
      "click",
      function () {
        $(".cat-filter-advanced_ttl span span span").empty();
        let radioButtons = $("input[name=filter-advanced-page]");
        let selectedRadio = null;
        radioButtons.each(function () {
          if ($(this).prop("checked")) {
            selectedRadio = $(this);
            return false; // break out of the each loop
          }
        });

        if (selectedRadio) {
          $(".cat-filter-advanced_ttl span span span").append(
            selectedRadio.next("label").text()
          );
          let val = selectedRadio.attr("dt-value");
          if (val) {
            if (val == "01") searchByType(typeActive);
            else searchByType(typeActive, typeCategoryPage[val]);
          }
        } else {
          console.log("No radio selected.");
        }
      }
    );
    // -----------------------------------------------------------------
    $(".cat-filter-item.item-articles .content-body_btn a").on(
      "click",
      function () {
        $(".cat-filter-advanced_ttl span span span").empty();
        let radioButtons = $("input[name=filter-advanced-article]");
        let selectedRadio = null;
        radioButtons.each(function () {
          if ($(this).prop("checked")) {
            selectedRadio = $(this);
            return false; // break out of the each loop
          }
        });
        let radioButtonsSort = $("input[name=soft-advanced-article]");
        let selectedRadioSort = null;
        radioButtonsSort.each(function () {
          if ($(this).prop("checked")) {
            selectedRadioSort = $(this);
            return false; // break out of the each loop
          }
        });
        if (selectedRadio) {
          $(".cat-filter-advanced_ttl span span span").append(
            selectedRadio.next("label").text()
          );
          let val = selectedRadio.attr("dt-value");
          if (val) {
            const sortCondition = selectedRadioSort.attr("ds-value");
            if (val == "01") searchByType(typeActive, null, sortCondition);
            else
              searchByType(
                typeActive,
                typeCategoryArticles[val],
                sortCondition
              );
          }
        } else {
          console.log("No radio selected.");
        }
      }
    );
    $(
      ".cat-filter-item.item-forms .content-body_btn a, .opb-page-header-form .cat-filter-advanced_content .content-body_btn a,.opb-page-header-form .code-filter-advanced_content .content-body_btn a"
    ).on("click", function () {
      $(".cat-filter-advanced_ttl span span span").empty();

      let radioButtons = $("input[name=filter-advanced-form]");
      let selectedRadio = null;
      radioButtons.each(function () {
        if ($(this).prop("checked")) {
          selectedRadio = $(this);
          return false; // break out of the each loop
        }
      });
      let radioButtonsCode = $("input[name=code-advanced-form]");
      let selectedRadioCode = null;
      radioButtonsCode.each(function () {
        if ($(this).prop("checked")) {
          selectedRadioCode = $(this);
          return false; // break out of the each loop
        }
      });
      if (selectedRadio || selectedRadioCode) {
        $(".cat-filter-advanced_ttl span span span").append(
          selectedRadio.next("label").text()
        );
        if ($(".code-filter-advanced_ttl span span span").length > 0) {
          $(".code-filter-advanced_ttl span span span").append(
            selectedRadioCode.next("label").text()
          );
        }

        let val = selectedRadio.attr("dt-value");
        let valcode = null;
        if (radioButtonsCode.length > 0) {
          valcode = selectedRadioCode.attr("dt-value");
        }
        if (pathOne[numb] == "form") {
          $(".cat-filter-advanced_ttl span span").empty();
          $(".code-filter-advanced_ttl span span").empty();
          $(".cat-filter-advanced_ttl span span ").append(
            selectedRadio.next("label").text()
          );
          if ($(".code-filter-advanced_ttl span span ").length > 0) {
            $(".code-filter-advanced_ttl span span ").append(
              selectedRadioCode.next("label").text()
            );
          }
          let sortCondition, activeCondition;
          typeActive = "forms";
          activeCondition = $(".page-sub-soft li.active");
          if (activeCondition.length > 0) {
            sortCondition =
              activeCondition.text() + "-" + activeCondition.attr("data-sort");
          } else {
            sortCondition = "Title-asc";
          }

          if (val && valcode) {
            if (val == "all" && valcode == "all") {
              searchByType(typeActive, null, sortCondition, null);
            } else if (val == "all" && valcode != "all") {
              searchByType(typeActive, null, sortCondition, valcode);
            } else if (val != "all" && valcode == "all") {
              searchByType(
                typeActive,
                typeCategoryForms[val],
                sortCondition,
                null
              );
            } else {
              searchByType(
                typeActive,
                typeCategoryForms[val],
                sortCondition,
                valcode
              );
            }
          }
        } else {
          searchByType(typeActive, typeCategoryForms[val], "asc");
        }
      } else {
        console.log("No radio selected.");
      }
    });
    $(".cat-filter-item.item-publications .content-body_btn a").on(
      "click",
      function () {
        $(".cat-filter-advanced_ttl span span span").empty();
        let radioButtons = $("input[name=filter-advanced-public]");
        let selectedRadio = null;
        radioButtons.each(function () {
          if ($(this).prop("checked")) {
            selectedRadio = $(this);
            return false; // break out of the each loop
          }
        });
        let radioButtonsSort = $("input[name=soft-advanced-public]");
        let selectedRadioSort = null;
        radioButtonsSort.each(function () {
          if ($(this).prop("checked")) {
            selectedRadioSort = $(this);
            return false; // break out of the each loop
          }
        });
        if (selectedRadio) {
          $(".cat-filter-advanced_ttl span span span").append(
            selectedRadio.next("label").text()
          );
          let val = selectedRadio.attr("dt-value");
          if (val) {
            const sortCondition = selectedRadioSort.attr("ds-value");
            if (val == "01") searchByType(typeActive, null, sortCondition);
            else
              searchByType(typeActive, typeCatPublications[val], sortCondition);
          }
        } else {
          console.log("No radio selected.");
        }
      }
    );
    /* Sort Select
     ********************************************** */
    $(".cat-filter-sort-list li:first-child").addClass("is-active");
    $(".cat-filter-sort-list.sort-articles li").click(function () {
      $(".cat-filter-sort-list.sort-articles li.is-active").removeClass(
        "is-active"
      );
      $(".cat-filter-sort-list.sort-articles li").addClass("is-active");
      $(this).removeClass("is-active");
      const activeCondition = document.querySelector(
        ".cat-filter-sort-list.sort-articles li.is-active"
      );
      const sortCondition = activeCondition.id;
      var val = $("select[name='selectArticle']").val();
      if (val) {
        if (val == "01") searchByType(typeActive, null, sortCondition);
        else searchByType(typeActive, typeCategoryArticles[val], sortCondition);
        return;
      }
      searchByType(typeActive, "", sortCondition);
      // return false;
    });

    $(".cat-filter-sort-list.sort-forms li").click(function () {
      $(".cat-filter-sort-list.sort-forms li.is-active").removeClass(
        "is-active"
      );
      $(".cat-filter-sort-list.sort-forms li").addClass("is-active");
      $(this).removeClass("is-active");
      const activeCondition = document.querySelector(
        ".cat-filter-sort-list.sort-forms li.is-active"
      );

      const sortCondition = activeCondition.id;
      var val = $("select[name='selectForm']").val();
      if (val) {
        if (val == "01") searchByType(typeActive, null, sortCondition);
        else searchByType(typeActive, typeCategoryArticles[val], sortCondition);
        return;
      }
      searchByType(typeActive, "", sortCondition);
      // return false;
    });

    $(".cat-filter-sort-list.sort-publications li").click(function () {
      $(".cat-filter-sort-list.sort-publications li.is-active").removeClass(
        "is-active"
      );
      $(".cat-filter-sort-list.sort-publications li").addClass("is-active");
      $(this).removeClass("is-active");
      const activeCondition = document.querySelector(
        ".cat-filter-sort-list.sort-publications li.is-active"
      );
      const sortCondition = activeCondition.id;
      var val = $("select[name='selectPublications']").val();
      if (val) {
        if (val == "01") searchByType(typeActive, null, sortCondition);
        else searchByType(typeActive, typeCatPublications[val], sortCondition);
        return;
      }
      searchByType(typeActive, "", sortCondition);
      // return false;
    });
    $(".page-sub-soft ul").on("click", "li", function () {
      var $this = $(this);
      var sortClass = "asc";
      if ($this.hasClass("asc")) {
        sortClass = "desc";
      }
      $("li").removeClass("active asc desc");
      $this.addClass("active " + sortClass).attr("data-sort", sortClass);

      handleSelectChange();
    });
    $(".js-select-nws").each(function () {
      var $this = $(this);
      var $select = $this.find("select");
      var $options = $select.find("option");

      var $selectSelected = $("<div>", {
        class: "select-selected",
        html: $options.eq($select.prop("selectedIndex")).html(),
      });
      $this.append($selectSelected);

      var $selectItems = $("<div>", {
        class: "select-items select-hide",
      });
      $options.each(function (i) {
        var $option = $(this);
        var $item = $("<p>", {
          class: "item",
          html: $option.html(),
          value: $option.val(), // thêm value vào danh sách
        });
        $item.click(function () {
          $select.prop("selectedIndex", i);
          $selectSelected.html($option.html());
          handleSelectChange();
          $item
            .addClass("same-as-selected")
            .siblings()
            .removeClass("same-as-selected");
          $selectSelected.click();
        });
        $selectItems.append($item);
      });
      $this.append($selectItems);

      $selectSelected.click(function (e) {
        e.stopPropagation();
        $(".select-items").addClass("select-hide");
        $selectItems.toggleClass("select-hide");
        $(this).toggleClass("select-arrow-active");
      });
    });

    $(document).click(function () {
      $(".select-items").addClass("select-hide");
      $(".select-selected").removeClass("select-arrow-active");
    });
  }
  function getTotal() {
    $.ajax({
      url: originPathOne + "/search/search.php",
      type: "POST",
      dataType: "json",
      data: {
        action: "getTotal",
      },
      success: function (data) {
        const dataRender = data?.data || {};
        let liHtml = ``;
        for (const [key, value] of Object.entries(type)) {
          liHtml += `<li class="c-tab-menu_item${
            key === "all" ? " item-active" : ""
          }"><a href="#cat-${typeNumber[key]}">
          <svg class="icon-resize opb-icon opb-icon-search-${key}" viewBox="0 0 16 16">
            <use xlink:href="#icon-search-${key}"></use>
          </svg>
          <span>${value} <span class="txt-num">(${
            dataRender[key] || 0
          })</span></span></a>
          </li>`;
        }
        const html = `<div class="c-tab-menu"><ul class="c-tab-menu_list">${liHtml}</ul></div>`;
        $("#menu-tab-id").html(html);
        searchAll("all");
        handleClickFromTab();
      },
    });
  }

  function handleClickFromTab() {
    const $input = $(".opb-search-page .opb-form-text");
    $(".c-tab-menu_list li a").click(function () {
      var item = $(this).attr("href");
      $(".c-tab-menu_list li").removeClass("item-active");
      $(this).parent().addClass("item-active");
      const index = $(this).parent().index();
      // $(".cat-filter-sort-list li.is-active").removeClass("is-active");
      if ($(".cat-filter-item").length > 0) {
        const searchValue = $input.val();
        page = 1;
        switch (index) {
          case 0:
            typeActive = "all";
            searchAll("all");
            $(".cat-filter-item").removeClass("is-active");
            break;
          case 1:
            typeActive = "page";
            searchByType("page");
            $("#selectPage").prop("selectedIndex", 0);
            $(".cat-filter-item").removeClass("is-active");
            $(".cat-filter-item.item-page").addClass("is-active");
            $(
              ".cat-filter-item.item-page .cat-filter-advanced_ttl span span span"
            ).empty();
            $(
              ".cat-filter-item.item-page .cat-filter-advanced_ttl span span span"
            ).append("All web pages");
            $('input[name="filter-advanced-page"]:first').prop("checked", true);
            break;
          case 2:
            typeActive = "articles";
            searchByType("articles");
            $(".cat-filter-item").removeClass("is-active");
            $(".cat-filter-item.item-articles").addClass("is-active");
            $(
              ".cat-filter-item.item-articles .cat-filter-advanced_ttl span span span"
            ).empty();
            $(
              ".cat-filter-item.item-articles .cat-filter-advanced_ttl span span span"
            ).append("All article types");
            $('input[name="filter-advanced-article"]:first').prop(
              "checked",
              true
            );
            $('input[name="soft-advanced-article"]:first').prop(
              "checked",
              true
            );
            break;
          case 3:
            typeActive = "forms";
            searchByType("forms");
            $(".cat-filter-item").removeClass("is-active");
            $(".cat-filter-item.item-forms").addClass("is-active");
            $(
              ".cat-filter-item.item-forms .cat-filter-advanced_ttl span span span"
            ).empty();
            $(
              ".cat-filter-item.item-forms .cat-filter-advanced_ttl span span span"
            ).append("All categories");
            $('input[name="filter-advanced-forms"]:first').prop(
              "checked",
              true
            );
            // $('input[name="soft-advanced-forms"]:first').prop("checked", true);
            if (pathOne[numb] == "form") {
              $(
                ".cat-filter-item.item-forms .cat-filter-advanced_ttl span span, .code-filter-item.item-forms .cat-filter-advanced_ttl span span"
              ).empty();
              $(
                ".cat-filter-item.item-forms .cat-filter-advanced_ttl span span"
              ).append("All categories");
              $(
                ".cat-filter-item.item-forms .cat-filter-advanced_ttl span span"
              ).append("All code groups");
              $('input[name="code-advanced-forms"]:first').prop(
                "checked",
                true
              );
            }
            break;
          case 4:
            typeActive = "publications";
            searchByType("publications");
            $(".cat-filter-item").removeClass("is-active");
            $(".cat-filter-item.item-publications").addClass("is-active");
            $(
              ".cat-filter-item.item-publications .cat-filter-advanced_ttl span span span"
            ).empty();
            $(
              ".cat-filter-item.item-publications .cat-filter-advanced_ttl span span span"
            ).append("All publications");
            $('input[name="filter-advanced-publications"]:first').prop(
              "checked",
              true
            );
            $('input[name="soft-advanced-publications"]:first').prop(
              "checked",
              true
            );
            break;
        }
      }
      $(".opb-search-page-body .opb-search-page-cat").removeClass("is-active");
      $(item).addClass("is-active");
      return false;
    });
  }

  function searchByType(
    type = "",
    category = "",
    sortCondition = null,
    name = ""
  ) {
    // console.log(type);
    page = 1;
    const data = {
      action: "getByType",
      type: type,
      category: category,
      page: page,
      limit: limit,
      name: name,
    };
    var $input = $(".opb-search-page .opb-form-text");
    const searchData = $input.val();
    // let sortCondition;
    let activeCondition;
    if (searchData) {
      data["searchData"] = searchData;
    }
    if (sortCondition) {
      data["sort"] = sortCondition;
    }
    if (type == "forms") {
      if (pathOne[numb] == "form") {
        activeCondition = $(".page-sub-soft li.active");
        if (activeCondition.length > 0) {
          sortCondition =
            activeCondition.text() + "-" + activeCondition.attr("data-sort");
        } else {
          sortCondition = "Title-asc";
        }
        if (sortCondition) {
          data["sort"] = sortCondition;
        }
      } else {
        activeCondition = document.querySelector(
          ".cat-filter-sort-list.sort-forms li.is-active"
        );
        if (activeCondition) {
          sortCondition = activeCondition.id;
        } else {
          sortCondition = "asc";
        }
        if (sortCondition) {
          data["sort"] = sortCondition;
        }
      }
      var val = $("select[name='selectForm']").val();
      if (val) {
        if (val !== "all") data["category"] = typeCategoryForms[val];
      }
      var valCode = $("select[name='selectFormV1']").val();
      if (valCode) {
        if (valCode !== "all") data["name"] = valCode;
      }
    }
    $.ajax({
      url: originPathOne + "/search/search.php",
      type: "POST",
      dataType: "json",
      data: data,
      beforeSend: function () {
        $(".opb-page-header-form .loading").show();
      },
      success: function (data) {
        const values = data?.data.results || [];
        let dynamicHtml = "",
          showBtnLoad = "";
        values?.forEach((item) => {
          const htmlRedner = renderSubItemForGetAll(item);
          dynamicHtml += htmlRedner;
        });
        setTimeout(() => {
          if (data?.data.displayedResults < limit) {
            showBtnLoad = "hide";
          }
          let render = "";
          switch (type) {
            case "page":
              render = `<div id="cat-02" class="opb-search-page-cat">
                          <div class="cat-inner">
                            <h3 class="body-ttl">Pages search results for “2022 pay dates”</h3>
                            <div class="cat-list">${dynamicHtml}</div>
                            <div class="cat-more">
                              <a href="#" id="cat-more-page" class="cat-more-btn">
                                <span>Load more results</span>
                                <svg class="opb-icon opb-icon-search-more" viewBox="0 0 16 16">
                                  <use xlink:href="#icon-search-more"></use>
                                </svg>
                              </a>
                            </div>
                          </div>
                        </div>`;
              break;
            case "articles":
              render = `<div id="cat-03" class="opb-search-page-cat">
                      <div class="cat-inner">
                        <h3 class="body-ttl">Articles search results for “2022 pay dates”</h3>
                        <div class="cat-list">${dynamicHtml}</div>
                        <div class="cat-more">
                          <a href="#" id="cat-more-articles" class="cat-more-btn">
                            <span>Load more results</span>
                            <svg class="opb-icon opb-icon-search-more" viewBox="0 0 16 16">
                              <use xlink:href="#icon-search-more"></use>
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>`;
              break;
            case "forms":
              if (pathOne[numb] == "form") {
                render = `<div id="cat-04" class="opb-search-page-cat">
                        <div class="cat-inner">
                          <div class="cat-list">${dynamicHtml}</div>
                          <div class="cat-more ${showBtnLoad} ">
                            <a href="#" id="cat-more-forms" class="cat-more-btn">
                              <span>Load more results</span>
                              <svg class="opb-icon opb-icon-search-more" viewBox="0 0 16 16">
                                <use xlink:href="#icon-search-more"></use>
                              </svg>
                              <i class="fa fa-spinner fa-spin mx-1" style="display: none;"></i>
                            </a>
                          </div>
                        </div>
                      </div>`;
              } else {
                render = `<div id="cat-04" class="opb-search-page-cat opb-search-page-form ">
                        <div class="cat-inner">
                          <h3 class="body-ttl">Forms search results for “2022 pay dates”</h3>
                          <div class="cat-list">${dynamicHtml}</div>
                          <div class="cat-more ${showBtnLoad}">
                            <a href="#" id="cat-more-forms" class="cat-more-btn">
                              <span>Load more results</span>
                              <svg class="opb-icon opb-icon-search-more" viewBox="0 0 16 16">
                                <use xlink:href="#icon-search-more"></use>
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>`;
              }
              break;
            case "publications":
              render = `<div id="cat-05" class="opb-search-page-cat">
                        <div class="cat-inner">
                          <h3 class="body-ttl">Publications search results for “2022 pay dates”</h3>
                          <div class="cat-list">${dynamicHtml}</div>
                          <div class="cat-more">
                            <a href="#" id="cat-more-publications" class="cat-more-btn">
                              <span>Load more results</span>
                              <svg class="opb-icon opb-icon-search-more" viewBox="0 0 16 16">
                                <use xlink:href="#icon-search-more"></use>
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>`;
              break;
            default:
              break;
          }
          if (data?.data.totalResults == 0) {
            render = `<div class="noResults ">
                  <div class="content-noResults">
                    <div class="ttl-noResults">No matching results</div>
                    <p class="txt-noResults">It seems we can’t find any matching results based on the search input. Enter different search terms or filters and try again.</p>
                    <div class="btn-wrap">
                      <a href="javascript:void(0);" class="noResults-reset">Try again</a>
                    </div>
                  </div>
                </div>`;
          }
          if (pathOne[numb] == "form") {
            let current = data?.data.displayedResults;
            $(".itemofshow").html(
              `Showing <span>${current}</span> of ${
                data?.data.totalResults || 0
              } results`
            );
            $("#form-list-v1").html(render);
          } else {
            $("#all-data").html(render);
          }
          search0215();
          $(".opb-page-header-form .loading").hide();
          resetSearch();
        }, 1000);
      },
    });
  }
  function searchAll() {
    page = 1;
    const data = {
      action: "getAll",
      page: page,
      limit: limit,
    };
    var $input = $(".opb-search-page .opb-form-text");
    const searchData = $input.val();
    if (searchData != "") {
      data["searchData"] = searchData;
    }

    $.ajax({
      url: originPathOne + "/search/search.php",
      type: "POST",
      dataType: "json",
      data: data,
      success: function (data) {
        const values = data?.data || [];
        let dynamicHtml = "";
        values?.forEach((item) => {
          const htmlRedner = renderSubItemForGetAll(item);
          dynamicHtml += htmlRedner;
        });

        const render = `<div id="cat-01" class="opb-search-page-cat is-active">
                            <div class="cat-inner">
                              <h3 class="body-ttl">All search results for “2022 pay dates</h3>
                              <div class="cat-list"> ${dynamicHtml} </div>
                              <div class="cat-more">
                                <a href="#" id="cat-more-all" class="cat-more-btn">
                                  <span>Load more results</span>
                                  <svg class="opb-icon opb-icon-search-more" viewBox="0 0 16 16">
                                    <use xlink:href="#icon-search-more"></use>
                                  </svg>
                                </a>
                              </div>
                            </div>
                          </div>
                        `;
        $("#all-data").html(render);
        search0215();
      },
    });
  }

  function loadMore(searchData = "", type = "") {
    const data = {
      page: page,
      limit: limit,
    };
    data["name"] = null;
    data["category"] = null;
    if (type) {
      data["type"] = type;
      data["action"] = "getByType";
    } else {
      data["action"] = "getAll";
    }
    if (searchData) {
      data["searchData"] = searchData;
    }

    if (type == "articles") {
      const activeCondition = document.querySelector(
        ".cat-filter-sort-list.sort-articles li.is-active"
      );
      const sortCondition = activeCondition.id;
      if (sortCondition) {
        data["sort"] = sortCondition;
      }
      var val = $("select[name='selectArticle']").val();
      if (val) {
        if (val !== "01") data["category"] = typeCategoryArticles[val];
      }
    } else if (type == "forms") {
      let sortCondition;
      let activeCondition;
      if (pathOne[numb] == "form") {
        activeCondition = $(".page-sub-soft li.active");
        if (activeCondition.length > 0) {
          sortCondition =
            activeCondition.text() + "-" + activeCondition.attr("data-sort");
        } else {
          sortCondition = "Title-asc";
        }
        if (sortCondition) {
          data["sort"] = sortCondition;
        }
      } else {
        activeCondition = document.querySelector(
          ".cat-filter-sort-list.sort-forms li.is-active"
        );
        if (activeCondition) {
          sortCondition = activeCondition.id;
        } else {
          sortCondition = "asc";
        }
        if (sortCondition) {
          data["sort"] = sortCondition;
        }
      }

      if (window.innerWidth < 991) {
        var val = $('.list input[name="filter-advanced-form"]:checked').attr(
          "dt-value"
        );
        var valCode = $('.list input[name="code-advanced-form"]:checked').attr(
          "dt-value"
        );
      } else {
        var val = $("select[name='selectForm']").val();
        var valCode = $("select[name='selectFormV1']").val();
      }
      if (val) {
        if (val !== "all") data["category"] = typeCategoryForms[val];
      }
      if (valCode) {
        if (valCode !== "all") data["name"] = valCode;
      }
    } else if (type == "publications") {
      const activeCondition = document.querySelector(
        ".cat-filter-sort-list.sort-publications li.is-active"
      );
      const sortCondition = activeCondition.id;
      if (sortCondition) {
        data["sort"] = sortCondition;
      }
      var val = $("select[name='selectPublications']").val();
      if (val) {
        if (val !== "01") data["category"] = typePublications[val];
      }
    }
    // let count = limit;

    $.ajax({
      url: originPathOne + "/search/search.php",
      type: "POST",
      dataType: "json",
      data: data,
      beforeSend: function () {
        $("#cat-more-forms .fa-spin").show();
      },
      success: function (data) {
        const values = data?.data.results || {};
        let dynamicHtml = "",
          showBtnLoad = "";
        values.forEach((item) => {
          const htmlRedner = renderSubItemForGetAll(item);
          dynamicHtml += htmlRedner;
        });

        setTimeout(() => {
          if (pathOne[numb] == "form") {
            let current = parseInt($(".itemofshow span").text());
            current = current + data?.data.displayedResults;
            $(".itemofshow").html(
              `Showing <span>${current}</span> of ${
                data?.data.totalResults || 0
              } results`
            );
          }
          // count = count + values.length;
          // getFromTotal(count);
          $cat_list = $(`#cat-${typeNumber[typeActive]} .cat-list`);
          $cat_list.append(dynamicHtml);
          $("#cat-more-forms .fa-spin").hide();
          if (data?.data.displayedResults < limit) {
            $(".cat-more").addClass("hide");
          }
        }, 1000);
      },
    });
  }

  function renderSubItemForGetAll(item) {
    switch (item.type) {
      case "page":
        let breadcrums = ``;
        if (item.breadcrums && item.breadcrums.length > 0) {
          item.breadcrums.forEach((bread) => {
            breadcrums += `<li><a href="#">${bread}</a></li>`;
          });
        }
        const htmlPage = `<div class="cat-item cat-item-01">
                        <div class="item-inner">
                          <div class="item-head">
                            <h3 class="item-cat item-cat-page">
                              <svg class="opb-icon opb-icon-search-page">
                                <use xlink:href="#icon-search-page"></use>
                              </svg>
                              <strong>Web Page</strong>
                            </h3>
                            ${
                              breadcrums
                                ? `<div class="c-breadcrumb">
                                              <ul class="c-breadcrumb_list">
                                                ${breadcrums}
                                              </ul>
                                          </div>`
                                : ""
                            }

                          </div>
                          <h2 class="item-ttl"><a href="#">${
                            item.title
                          }</a></h2>
                          <div class="item-copy">
                            <p>${item.description}</p>
                          </div>
                        </div>
                      </div>`;
        return htmlPage;

      case "articles":
        const dateCreate = new Date(item?.date);
        const formattedDate = dateCreate.toLocaleString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });
        const htmlArticles = `<div class="cat-item cat-item-02">
                                <div class="item-inner">
                                  <a href="#">
                                    <div class="item-text">
                                      <div class="item-head">
                                        <h3 class="item-cat item-cat-articles">
                                          <svg class="opb-icon opb-icon-search-articles">
                                            <use xlink:href="#icon-search-articles"></use>
                                          </svg>
                                          <strong>${
                                            typeArticle[item.category]
                                          }</strong>
                                        </h3>
                                      </div>
                                      <p class="item-date">${
                                        item.date ? formattedDate : ""
                                      }</p>
                                      <h2 class="item-ttl">${item.title}</h2>
                                      <p class="item-time">4 minute read</p>
                                    </div>
                                    <div class="item-image">
                                      <figure><img src="${
                                        item.image
                                      }" alt=""></figure>
                                    </div>
                                  </a>
                                </div>
                              </div>`;
        return htmlArticles;

      case "forms":
        let htmlForm;
        if (pathOne[numb] == "form") {
          htmlForm = `<div class="item item-01">
                            <div class="item-content">
                              <h3 class="item-ttl">
                                <a href="#">${item.title}</a>
                              </h3>
                              <p>${item.description}</p>
                            </div>
                            <div class="item-cat">${
                              typeCategoryForms[item.category]
                            }</div>
                            <div class="item-code item-code-01">${
                              item.code
                            }</div>
                        </div>`;
        } else {
          htmlForm = `
          <div class="item item-01">
                            <div class="item-content">
                              <h3 class="item-ttl">
                                <a href="#">${item.title}</a>
                              </h3>
                              <p>${item.description}</p>
                            </div>
                            <div class="item-cat">${
                              typeCategoryForms[item.category]
                            }</div>
                            <div class="item-code item-code-01">${
                              item.code
                            }</div>
                        </div>
       `;
        }

        return htmlForm;
      case "publications":
        const htmlPublications = ` <div class="cat-item cat-item-03">
                                    <div class="item-inner">
                                      <div class="item-head">
                                        <h3 class="item-cat item-cat-publications">
                                          <svg class="opb-icon opb-icon-search-publications">
                                            <use xlink:href="#icon-search-publications"></use>
                                          </svg>
                                          <strong>${
                                            typePublications[item.category]
                                          }</strong>
                                          <span>${item.publish}</span>
                                        </h3>
                                      </div>
                                      <h2 class="item-ttl">${item.title}</h2>
                                      <div class="item-link item-link-download">
                                        <a href="${
                                          item.link
                                        }" target="_blank">Download PDF</a>
                                      </div>
                                    </div>
                                  </div>`;
        return htmlPublications;

      default:
        return "";
    }
  }
  function headerSearch0215() {
    $(".search-header-icon").click(function () {
      $(this).toggleClass("is-active");
      $(".search-header-from").toggleClass("is-active");
      $("html").toggleClass("is-hidden");
      return false;
    });

    var $form = $("#search-header");
    var $input = $(".search-header-input");
    $input.keyup(function () {
      var value = $(this).val().toLowerCase();
      if ($(this).val() == "") {
        $(this).parents().removeClass("is-input");
        $(".search-header-from .input-clear").removeClass("is-active");
      } else {
        $(this).parents().addClass("is-input");
        $(".search-header-from .input-clear").addClass("is-active");
        $(".search-header-from .input-warning").removeClass("is-active");
      }
    });

    var items = [];
    $(".input-show ul li a").each(function (i, ele) {
      items.push({ data: i, value: $(ele).text() });
    });

    $(".search-header-input").autocomplete({
      lookup: items,
    });

    $(".search-header-from .input-clear").click(function () {
      $input.val("");
      $(this).removeClass("is-active");
      $form.removeClass("is-input");
    });

    $(".search-header-submit").click(function (event) {
      var valid = $form.hasClass("is-input");
      var error_free = true;
      if (!valid) {
        $(".search-header-from .input-warning").addClass("is-active");
        error_free = false;
      }
      if (!error_free) {
        event.preventDefault();
      } else {
      }
    });
  }

  function homepage0215() {
    $(".carousel-item").each(function (i, e) {
      $img = $(e).getElem("img");
      if ($img.attr("src") == "") {
        $img.addClass("is-none");
        $img.attr(
          "src",
          "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
        );
      }
    });
    if (t(".opb-homepage").length) {
      var $item = t("#carouselHomepageIndicators").getElem(".carousel-item");
      if ($item.length == 1) {
        t(".opb-homepage-controls").hide();
        t(".opb-page-header").addClass("is-one");
        t("#carouselHomepageIndicators").addClass("is-one");
      }
      var e = t("#carouselHomepageIndicators")
        .getElem(".carousel-item")
        .first()
        .getElem("img");
      t(".opb-page-header").getElem("h1").html(e.attr("data-slide-title"));
      t(".opb-page-header").getElem("h4").html(e.attr("data-slide-desc"));
      if (e.attr("data-slide-desc") == "") {
        t(".opb-page-header").getElem("h4").addClass("is-none");
      } else {
        t(".opb-page-header").getElem("h4").removeClass("is-none");
      }
      if (
        e.attr("src") ==
        "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
      ) {
        $(".carousel-indicators").addClass("is-none-image");
      } else {
        $(".carousel-indicators").removeClass("is-none-image");
      }
      t(".opb-page-header")
        .getElem("a")
        .attr("href", e.attr("data-slide-url"))
        .getElem("span")
        .text(e.attr("data-slide-subtitle"));
      t("#carouselHomepageIndicators").on("slide.bs.carousel", function (e) {
        var a = t(".carousel-indicators"),
          n = "[data-slide-to=" + e.to + "]",
          i = t(e.relatedTarget).getElem("img"),
          o = t(".opb-page-header").getElem("h1"),
          v = t(".opb-page-header").getElem("h4"),
          s = t(".opb-page-header").getElem("a");
        a.find("li").removeClass("active");
        a.find(n).addClass("active");
        o.html(i.attr("data-slide-title"));
        v.html(i.attr("data-slide-desc"));
        t(".opb-page-header")
          .getElem("a")
          .attr("intial-position", e.to + 1);
        if (i.attr("data-slide-desc") == "") {
          v.addClass("is-none");
        } else {
          v.removeClass("is-none");
        }
        if (
          i.attr("src") ==
          "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
        ) {
          $(".carousel-indicators").addClass("is-none-image");
        } else {
          $(".carousel-indicators").removeClass("is-none-image");
        }
        s.attr("href", i.attr("data-slide-url"))
          .getElem("span")
          .text(i.attr("data-slide-subtitle"));
      });
    }
    function checkWidth() {
      var windowsize = $(window).width();
      if (windowsize < 768) {
        $("#carouselHomepageIndicators").carousel({
          interval: false,
        });
      } else {
        $("#carouselHomepageIndicators").carousel({
          interval: 5000,
        });
      }
    }
    checkWidth();
    $(window).resize(checkWidth);
  }

  function search0215() {
    var $form = $("#search-page-form");
    var $input = $(".opb-search-page .opb-form-text");

    $input.keyup(function () {
      if ($(this).val() == "") {
        $(this).parents().removeClass("is-input");
        $(".opb-search-page .input-clear").removeClass("is-active");
      } else {
        $(this).parents().addClass("is-input");
        $(".opb-search-page .input-clear").addClass("is-active");
        $(".opb-search-page .input-warning").removeClass("is-active");
      }
    });

    var items = [];
    $(".input-show ul li a").each(function (i, ele) {
      items.push({ data: i, value: $(ele).text() });
    });

    $input.autocomplete({
      lookup: items,
    });

    $(".opb-search-page .input-clear").click(function () {
      $input.val("");
      $(this).removeClass("is-active");
      $form.removeClass("is-input");
    });

    // $(".opb-btn-submit").click(function (event) {
    //   console.log("----")
    //   var valid = $form.hasClass("is-input");
    //   var error_free = true;
    //   if (!valid) {
    //     $(".opb-search-page .input-warning").addClass("is-active");
    //     error_free = false;
    //   }
    //   if (!error_free) {
    //     event.preventDefault();
    //   } else {
    //     const searchValue = $input.val();
    //     if (searchValue) {
    //       searchAll(searchValue);
    //       search0215();
    //     }
    //   }
    // });

    /* Tab
     ********************************************** */
    // $('.opb-search-page-cat').hide();
    // $(".c-tab-menu_list li:first-child").addClass("item-active");
    $(".opb-search-page-body .opb-search-page-cat:first-child").addClass(
      "is-active"
    );
    //   $(".c-tab-menu_list li a").click(function (event) {
    //     event.preventDefault();
    //     var item = $(this).attr("href");
    //     $(".c-tab-menu_list  li").removeClass("item-active");
    //     $(this).parent().addClass("item-active");
    //     const index = $(this).parent().index();

    //     if ($(".cat-filter-item").length > 0) {
    //       const searchValue = $input.val();
    //       page = 1;
    //       switch (index) {
    //         case 0:
    //           searchAll(searchValue);
    //           $(".cat-filter-item").removeClass("is-active");
    //           break;
    //         case 1:
    //           // Get value
    //           searchByType(searchValue, 'page')
    //           $(".cat-filter-item").removeClass("is-active");
    //           $(".cat-filter-item.item-page").addClass("is-active");
    //           break;
    //         case 2:
    //           $(".cat-filter-item").removeClass("is-active");
    //           $(".cat-filter-item.item-articles").addClass("is-active");
    //           break;
    //         case 3:
    //           $(".cat-filter-item").removeClass("is-active");
    //           $(".cat-filter-item.item-forms").addClass("is-active");
    //           break;
    //         case 4:
    //           $(".cat-filter-item").removeClass("is-active");
    //           $(".cat-filter-item.item-publications").addClass("is-active");
    //           break;
    //       }
    //     }

    //   $(".opb-search-page-body .opb-search-page-cat").removeClass("is-active");
    //   $(item).addClass("is-active");
    //   return false;
    // });

    /* Custome Select
     ********************************************** */
    var $customeSelect = $(".js-custom-select");
    if ($customeSelect.length < 1) {
      return false;
    }
    // $customeSelect.customSelectBox().change(function () {
    //   // Do something with `$(this).val()` !!
    // });

    $(".cat-filter-advanced_ttl").click(function () {
      if (pathOne[numb] == "form") {
        $(this)
          .parents(".cat-filter-advanced")
          .find(".cat-filter-advanced_content")
          .addClass("is-active");
      } else {
        $(this).next().addClass("is-active");
      }
    });
    $(".code-filter-advanced_ttl").click(function () {
      if (pathOne[numb] == "form") {
        $(this)
          .parents(".cat-filter-advanced")
          .find(".code-filter-advanced_content")
          .addClass("is-active");
      }
    });
    $(".content-body_btn").click(function () {
      $(this).parents(".cat-filter-advanced_content").removeClass("is-active");
      $(this).parents(".code-filter-advanced_content").removeClass("is-active");
    });

    /* Ajax Loading more
     ********************************************** */
    $("#cat-more-all").click(function () {
      page++;
      const searchValue = $input.val();
      loadMore(searchValue);
      return false;
    });

    $("#cat-more-page").click(function () {
      page++;
      const searchValue = $input.val();
      loadMore(searchValue, "page");
    });

    $("#cat-more-articles").click(function () {
      page++;
      const searchValue = $input.val();
      loadMore(searchValue, "articles");
      // $cat_list = $("#cat-03 .cat-list");
      // $button = $(this);
      // $.ajax({
      //   type: "GET",
      //   url: origin + "/search/search-more-data.php",
      //   success: function (result) {
      //     $cat_list.append(result);
      //   },
      // }).always(function () { });
      return false;
    });

    $("#cat-more-forms").click(function () {
      page++;
      const searchValue = $input.val();
      loadMore(searchValue, "forms");

      return false;
      // $cat_list = $("#cat-04 .cat-list");
      // $button = $(this);
      // $.ajax({
      //   type: "GET",
      //   url: origin + "/search/search-more-data.php",
      //   success: function (result) {
      //     $cat_list.append(result);
      //   },
      // }).always(function () { });
      // return false;
    });

    $("#cat-more-publications").click(function () {
      page++;
      const searchValue = $input.val();
      loadMore(searchValue, "publications");
      return false;
      // $cat_list = $("#cat-05 .cat-list");
      // $button = $(this);
      // $.ajax({
      //   type: "GET",
      //   url: origin + "/search/search-more-data.php",
      //   success: function (result) {
      //     $cat_list.append(result);
      //   },
      // }).always(function () {});
      // return false;
    });

    $("#load-more-form-v1").click(function () {
      $form_list = $("#form-list-v1");
      $button = $(this);
      $.ajax({
        type: "GET",
        url: origin + "/opb/form/form-more-v1.php",
        success: function (result) {
          $form_list.append(result);
        },
      }).always(function () {});
      return false;
    });

    $("#load-more-form-v2").click(function () {
      $form_list = $("#form-list-v2");
      $button = $(this);
      $.ajax({
        type: "GET",
        url: origin + "/opb/form/form-more-v2.php",
        success: function (result) {
          $form_list.append(result);
        },
      }).always(function () {});
      return false;
    });
    $("#load-more-form-v3").click(function () {
      $form_list = $("#form-list-v3");
      $button = $(this);
      $.ajax({
        type: "GET",
        url: origin + "/opb/form/form-more-v3.php",
        success: function (result) {
          $form_list.append(result);
        },
      }).always(function () {});
      return false;
    });
    $("#load-more-form-v4").click(function () {
      $form_list = $("#form-list-v4");
      $button = $(this);
      $.ajax({
        type: "GET",
        url: origin + "/opb/form/form-more-v4.php",
        success: function (result) {
          $form_list.append(result);
        },
      }).always(function () {});
      return false;
    });
    $("#load-more-form-v5").click(function () {
      $form_list = $("#form-list-v5");
      $button = $(this);
      $.ajax({
        type: "GET",
        url: origin + "/opb/form/form-more-v5.php",
        success: function (result) {
          $form_list.append(result);
        },
      }).always(function () {});
      return false;
    });

    /* Ajax Slect Page
     ********************************************** */
    // $("select[name='selectPage']").on("change", function () {
    //   var val = $(this).val();
    //   console.log('val: ', val)
    //   // if (val) {
    //   //   if (val === '01') {

    //   //   }
    //   //   searchByType()
    //   // }

    //   // var val = $(this).val();
    //   // if (val) {
    //   //   var req = $.ajax({
    //   //     type: "GET",
    //   //     url: origin + "/_html/search/search-page-data.php",
    //   //     data: { selectPageVal: "" + val + "" },
    //   //     success: function (htmlresponse) {
    //   //       $("#cat-02 .cat-list").html(htmlresponse);
    //   //       $("#cat-02 .cat-list .cat-item").hide();
    //   //       setTimeout(function () {
    //   //         $("#cat-02 .cat-list .cat-item")
    //   //           .slideDown(500, "swing")
    //   //           .css("opacity", 0)
    //   //           .animate({ opacity: 1 }, { queue: false, duration: 1000 });
    //   //       }, 100);
    //   //     },
    //   //     complete: function () {
    //   //       console.log("done");
    //   //     },
    //   //   });
    //   // }
    // });

    // $("select[name='selectArticle']").on("change", function () {
    //   var val = $(this).val();
    //   if (val) {
    //     var req = $.ajax({
    //       type: "GET",
    //       url: origin + "/_html/search/search-page-data.php",
    //       data: { selectPageVal: "" + val + "" },
    //       success: function (htmlresponse) {
    //         $("#cat-03 .cat-list").html(htmlresponse);
    //         $("#cat-03 .cat-list .cat-item").hide();
    //         setTimeout(function () {
    //           $("#cat-03 .cat-list .cat-item")
    //             .slideDown(500, "swing")
    //             .css("opacity", 0)
    //             .animate({ opacity: 1 }, { queue: false, duration: 1000 });
    //         }, 100);
    //       },
    //       complete: function () {
    //         console.log("done");
    //       },
    //     });
    //   }
    // });

    // $("select[name='selectForm']").on("change", function () {
    //   var val = $(this).val();
    //   if (val) {
    //     var req = $.ajax({
    //       type: "GET",
    //       url: origin + "/_html/search/search-page-data.php",
    //       data: { selectPageVal: "" + val + "" },
    //       success: function (htmlresponse) {
    //         $("#cat-04 .cat-list").html(htmlresponse);
    //         $("#cat-04 .cat-list .cat-item").hide();
    //         setTimeout(function () {
    //           $("#cat-04 .cat-list .cat-item")
    //             .slideDown(500, "swing")
    //             .css("opacity", 0)
    //             .animate({ opacity: 1 }, { queue: false, duration: 1000 });
    //         }, 100);
    //       },
    //       complete: function () {
    //         console.log("done");
    //       },
    //     });
    //   }
    // });

    // $("select[name='selectPublications']").on("change", function () {
    //   var val = $(this).val();
    //   if (val) {
    //     var req = $.ajax({
    //       type: "GET",
    //       url: origin + "/_html/search/search-page-data.php",
    //       data: { selectPageVal: "" + val + "" },
    //       success: function (htmlresponse) {
    //         $("#cat-05 .cat-list").html(htmlresponse);
    //         $("#cat-05 .cat-list .cat-item").hide();
    //         setTimeout(function () {
    //           $("#cat-05 .cat-list .cat-item")
    //             .slideDown(500, "swing")
    //             .css("opacity", 0)
    //             .animate({ opacity: 1 }, { queue: false, duration: 1000 });
    //         }, 100);
    //       },
    //       complete: function () {
    //         console.log("done");
    //       },
    //     });
    //   }
    // });

    // $("select[name='selectFormV1']").on("change", function () {
    //   var val = $(this).val();
    //   if (val) {
    //     var req = $.ajax({
    //       type: "GET",
    //       url: origin + "/form/form-more-v1.php",
    //       data: { selectPageVal: "" + val + "" },
    //       success: function (htmlresponse) {
    //         $("#form-list-v1").html(htmlresponse);
    //         $("#form-list-v1 .item").hide();
    //         setTimeout(function () {
    //           $("#form-list-v1 .item")
    //             .slideDown(500, "swing")
    //             .css("opacity", 0)
    //             .animate({ opacity: 1 }, { queue: false, duration: 1000 });
    //         }, 100);
    //       },
    //       complete: function () {
    //         console.log("done");
    //       },
    //     });
    //   }
    // });

    // $("select[name='selectFormV2']").on("change", function () {
    //   var val = $(this).val();
    //   if (val) {
    //     var req = $.ajax({
    //       type: "GET",
    //       url: origin + "/opb/form/form-more-v2.php",
    //       data: { selectPageVal: "" + val + "" },
    //       success: function (htmlresponse) {
    //         $("#form-list-v2").html(htmlresponse);
    //         $("#form-list-v2 .item").hide();
    //         setTimeout(function () {
    //           $("#form-list-v2 .item")
    //             .slideDown(500, "swing")
    //             .css("opacity", 0)
    //             .animate({ opacity: 1 }, { queue: false, duration: 1000 });
    //         }, 100);
    //       },
    //       complete: function () {
    //         console.log("done");
    //       },
    //     });
    //   }
    // });

    // $("select[name='selectFormV3']").on("change", function () {
    //   var val = $(this).val();
    //   if (val) {
    //     var req = $.ajax({
    //       type: "GET",
    //       url: origin + "/opb/form/form-more-v3.php",
    //       data: { selectPageVal: "" + val + "" },
    //       success: function (htmlresponse) {
    //         $("#form-list-v3").html(htmlresponse);
    //         $("#form-list-v3 .cat-item").hide();
    //         setTimeout(function () {
    //           $("#form-list-v3 .cat-item")
    //             .slideDown(500, "swing")
    //             .css("opacity", 0)
    //             .animate({ opacity: 1 }, { queue: false, duration: 1000 });
    //         }, 100);
    //       },
    //       complete: function () {
    //         console.log("done");
    //       },
    //     });
    //   }
    // });

    // $("select[name='selectFormV4']").on("change", function () {
    //   var val = $(this).val();
    //   if (val) {
    //     var req = $.ajax({
    //       type: "GET",
    //       url: origin + "/opb/form/form-more-v4.php",
    //       data: { selectPageVal: "" + val + "" },
    //       success: function (htmlresponse) {
    //         $("#form-list-v4").html(htmlresponse);
    //         $("#form-list-v4 .item").hide();
    //         setTimeout(function () {
    //           $("#form-list-v4 .item")
    //             .slideDown(500, "swing")
    //             .css("opacity", 0)
    //             .animate({ opacity: 1 }, { queue: false, duration: 1000 });
    //         }, 100);
    //       },
    //       complete: function () {
    //         console.log("done");
    //       },
    //     });
    //   }
    // });

    // $("select[name='selectFormV5']").on("change", function () {
    //   var val = $(this).val();
    //   if (val) {
    //     var req = $.ajax({
    //       type: "GET",
    //       url: origin + "/opb/form/form-more-v5.php",
    //       data: { selectPageVal: "" + val + "" },
    //       success: function (htmlresponse) {
    //         $("#form-list-v5").html(htmlresponse);
    //         $("#form-list-v5 .item").hide();
    //         setTimeout(function () {
    //           $("#form-list-v5 .item")
    //             .slideDown(500, "swing")
    //             .css("opacity", 0)
    //             .animate({ opacity: 1 }, { queue: false, duration: 1000 });
    //         }, 100);
    //       },
    //       complete: function () {
    //         console.log("done");
    //       },
    //     });
    //   }
    // });

    /* Sort Form
     ********************************************** */
    // $(".page-sub-soft li").click(function () {
    //   $(this).toggleClass("is-soft");
    //   console.log("sort forms");
    // });
  }

  /* Sort Forms
   ********************************************** */
  function searchFormAll() {
    page = 1;
    const data = {
      action: "getFormAll",
      page: page,
      limit: limit,
    };
    var $input = $(".opb-search-page .opb-form-text");
    const searchData = $input.val();
    if (searchData != "") {
      data["searchData"] = searchData;
    }

    $.ajax({
      url: originPathOne + "/search/search.php",
      type: "POST",
      dataType: "json",
      data: data,
      success: function (data) {
        const values = data?.data || [];
        let dynamicHtml = "";
        values?.forEach((item) => {
          const htmlRedner = renderSubItemForGetAll(item);
          dynamicHtml += htmlRedner;
        });
        const render = `<div id="cat-01" class="opb-search-page-cat is-active">
                            <div class="cat-inner">
                              <div class="cat-list"> ${dynamicHtml} </div>
                              <div class="cat-more">
                                <a href="#" id="cat-more-forms" class="cat-more-btn">
                                  <span>Load more results</span>
                                  <svg class="opb-icon opb-icon-search-more" viewBox="0 0 16 16">
                                    <use xlink:href="#icon-search-more"></use>
                                  </svg>
                                  <i class="fa fa-spinner fa-spin mx-1" style="display:none"></i>
                                </a>
                              </div>
                            </div>
                          </div>
                        `;
        $("#form-list-v1").html(render);
        getFromTotal(limit);
        search0215();
      },
    });
  }
  function getFromTotal(number) {
    $.ajax({
      url: originPathOne + "/search/search.php",
      type: "POST",
      dataType: "json",
      data: {
        action: "getTotal",
      },
      success: function (data) {
        const dataRender = data?.data || {};
        let liHtml = ``;
        for (const [key, value] of Object.entries(type)) {
          if (typeNumber[key] == "04") {
            liHtml += `Showing <span>${number}</span> of ${
              dataRender[key] || 0
            } results
           `;
          }
        }
        $(".itemofshow").html(liHtml);
      },
    });
  }
  function resetSearch() {
    $(".noResults-reset").on("click", function () {
      if (pathOne[numb] == "form") {
        $(
          ".cat-filter-item.item-forms .cat-filter-advanced_ttl span span, .code-filter-item.item-forms .cat-filter-advanced_ttl span span"
        ).empty();
        $(
          ".cat-filter-item.item-forms .cat-filter-advanced_ttl span span"
        ).append("All categories");
        $(
          ".cat-filter-item.item-forms .cat-filter-advanced_ttl span span"
        ).append("All code groups");
        $('input[name="code-advanced-forms"]:first').prop("checked", true);
        $('input[name="cat-advanced-forms"]:first').prop("checked", true);
        $(".select-items p[value='all']").click();
        $(".opb-search-page .opb-form-text").empty();
      }
      searchFormAll();
    });
  }
  $(".input-clear").on("click", function () {
    if (pathOne[numb] == "form") {
      $(".opb-search-page .opb-form-text").empty();
      setTimeout(() => {
        searchByType("forms");
      }, 200);
    }
  });
});
