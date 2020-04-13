$(document).ready(function() {
    var toggle = $("#toggle-menu")
    var nav = $("#nav")

    toggle.click(function() {
    nav.toggleClass('responsive');
    });
});

$("#dot-1").click(function() {
    $("#dot-1").addClass("active")
    $("#dot-2").removeClass("active")
    $("#dot-3").removeClass("active")
});

$("#dot-2").click(function() {
    $("#dot-2").addClass("active")
    $("#dot-1").removeClass("active")
    $("#dot-3").removeClass("active")
});

$("#dot-3").click(function() {
    $("#dot-3").addClass("active")
    $("#dot-1").removeClass("active")
    $("#dot-2").removeClass("active")
});