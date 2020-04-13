$(document).ready(function() {
    var toggle = $("#toggle-menu")
    var nav = $("#nav")

    toggle.click(function() {
    nav.toggleClass('responsive');
    });
});