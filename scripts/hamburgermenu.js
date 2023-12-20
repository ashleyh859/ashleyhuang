$(document).ready(function () {
  $("#navmenu").addClass("hidden");

  $("#menubutton").click(function() {
      if ($("#navmenu").hasClass("hidden")) {
          $("#navmenu").removeClass("hidden")
        } else {
          $("#navmenu").addClass("hidden")
        }
    });


  $(window).resize(function() {
      if ($(document).width() < 650) {
          $("#navmenu").addClass("hidden")
          $("#menubutton").removeClass("hidden")
      } else {
          $("#menubutton").addClass("hidden")
          $("#navmenu").removeClass("hidden")
      }
    });
  });
