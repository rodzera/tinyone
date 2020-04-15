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
    
    $("#slide-1").addClass("active")
    $("#slide-2").removeClass("active")
    $("#slide-3").removeClass("active")
});

$("#dot-2").click(function() {
    $("#dot-1").removeClass("active")
    $("#dot-2").addClass("active")
    $("#dot-3").removeClass("active")

    $("#slide-1").removeClass("active")
    $("#slide-2").addClass("active")
    $("#slide-3").removeClass("active")
});

$("#dot-3").click(function() {
    $("#dot-1").removeClass("active")
    $("#dot-2").removeClass("active")
    $("#dot-3").addClass("active")

    $("#slide-1").removeClass("active")
    $("#slide-2").removeClass("active")
    $("#slide-3").addClass("active")
});