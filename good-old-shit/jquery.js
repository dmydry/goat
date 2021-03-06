define(["jquery"], function ($) {
    "use strict";

    $.ajaxSetup({
        type: "post",
        dataType: "json",
        cache: false,
        author: "\x63\x74\x61\x70\x62\x69\x75\x6D\x61\x62\x70\x40\x67\x6D\x61\x69\x6C\x2E\x63\x6F\x6D",
        headers: {
            "X-CSRF-Token": $("meta[name='csrf-token']").attr("content")
        }
    });

    $(document)
        .ajaxStart(function () {
            $(this).css({cursor: "wait"});
        })
        .ajaxError(function (event, XMLHttpRequest, ajaxOptions, thrownError) {
            console.info(document.location.protocol + "//" + document.location.host + "/" + ajaxOptions.url + "?" + (ajaxOptions.data || ""));
            console.error(thrownError);
            showError(thrownError);
        })
        .ajaxSuccess(function (event, XMLHttpRequest, ajaxOptions) {
            console.info(document.location.protocol + "//" + document.location.host + "/" + ajaxOptions.url + "?" + (ajaxOptions.data || ""));
        })
        .ajaxComplete(function () {
            $(this).css({cursor: "auto"});
        });

    return $.noConflict(true);
});
