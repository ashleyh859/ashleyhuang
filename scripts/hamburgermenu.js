$("#menubutton").click(function() {
    if ($("#navmenu").hasClass("accessible-hidden")) {
        $("#navmenu").removeClass("accessible-hidden")
      } else {
        $("#navmenu").addClass("accessible-hidden")
      }
  });


$(window).resize(function() {
    if ($(document).width() < 650) {
        $("#navmenu").addClass("accessible-hidden")
        $("#menubutton").removeClass("accessible-hidden")
    } else {
        $("#menubutton").addClass("accessible-hidden")
        $("#navmenu").removeClass("accessible-hidden")
    }
  });
