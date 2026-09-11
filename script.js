$(document).ready(function () {
  // ===== ENVELOPE LOGIC (ORIGINAL - NO CHANGES) =====
  var envelope = $("#envelope");
  var btn_open = $("#open");
  var btn_reset = $("#reset");

  envelope.click(function () {
    openEnvelope();
  });
  btn_open.click(function () {
    openEnvelope();
  });
  btn_reset.click(function () {
    closeEnvelope();
  });

  function openEnvelope() {
    envelope.addClass("open").removeClass("close");
  }
  function closeEnvelope() {
    envelope.addClass("close").removeClass("open");
  }

  // ===== NEW SCREEN NAVIGATION LOGIC =====

  // Screen 1: Choice Screen - Bala vs Gauri
  $("#balaBtn").click(function () {
    goToEnvelopeScreen();
  });

  $("#gauriBtn").click(function () {
    goToGauriChoiceScreen();
  });

  // Screen 2: Envelope Section - Back to Menu
  $("#backBtn").click(function () {
    goToChoiceScreen();
    closeEnvelope(); // Close envelope when going back
  });

  // Screen 3: Gauri Choice Screen
  $("#backFromGauri").click(function () {
    goToChoiceScreen();
  });

  $("#howMuchLoveBtn").click(function () {
    goToRomanticScreen();
  });

  $("#noSecondOptionBtn").click(function () {
    // You can add different behavior here if needed
    goToRomanticScreen();
  });

  // Screen 4: Romantic Screen
  $("#backFromRomantic").click(function () {
    goToGauriChoiceScreen();
  });

  // Dabao Button - Show Picture
  $("#dabaoBtn").click(function () {
    showPicture();
  });

  // ===== SCREEN TRANSITION FUNCTIONS =====

  function hideAllScreens() {
    $("#choiceScreen").hide().removeClass("active");
    $("#envelopeSection").hide();
    $("#resetSection").hide();
    $("#gauriChoiceScreen").hide();
    $("#romanticScreen").hide();
  }

  function goToChoiceScreen() {
    hideAllScreens();
    $("#choiceScreen").show().addClass("active");
  }

  function goToEnvelopeScreen() {
    hideAllScreens();
    $("#envelopeSection").show();
    $("#resetSection").show();
  }

  function goToGauriChoiceScreen() {
    hideAllScreens();
    $("#gauriChoiceScreen").show();
  }

  function goToRomanticScreen() {
    hideAllScreens();
    $("#romanticScreen").show();
    
    // Animate text lines with staggered delays
    $(".text-line").each(function () {
      $(this).css("opacity", "0");
      $(this).addClass("animated");
    });
  }

  function showPicture() {
    // Hide Dabao button
    $("#dabaoButtonContainer").fadeOut(500);

    // Show picture section with animation
    $("#pictureSection").show();
    
    // Animate the image
    setTimeout(function () {
      $("#specialPicture").fadeIn(800);
    }, 100);

    // Make hearts appear and animate
    $(".floating-heart").each(function () {
      $(this).css("opacity", "0").animate({ opacity: 0.8 }, 500);
    });
  }

  // Initialize - Show choice screen
  goToChoiceScreen();

  // ===== NEW: CALENDAR / SPECIAL DATE (12th SEPT) LOGIC =====

  var SPECIAL_DAY = 12; // 12th September - the best day 💕
  var calendarModal = $("#calendarModal");
  var birthdayModal = $("#birthdayModal");

  // Build the September calendar grid (30 days, starting on a Tuesday as example)
  function buildCalendar() {
    var grid = $("#calendarGrid");
    grid.empty();

    var daysInSeptember = 30;
    var firstDayOffset = 2; // adjust so the grid lines up (0=Sun ... 6=Sat)

    for (var i = 0; i < firstDayOffset; i++) {
      grid.append('<div class="calendar-day empty"></div>');
    }

    for (var day = 1; day <= daysInSeptember; day++) {
      var isSpecial = day === SPECIAL_DAY;
      var dayEl = $('<div class="calendar-day"></div>').text(day);
      if (isSpecial) {
        dayEl.addClass("special-day").attr("id", "specialSeptDay");
      }
      grid.append(dayEl);
    }
  }

  // Open calendar modal
  $("#calendarBtn").click(function () {
    buildCalendar();
    calendarModal.fadeIn(250);
  });

  // Close calendar modal
  $("#closeCalendar").click(function () {
    calendarModal.fadeOut(200);
  });

  calendarModal.click(function (e) {
    if (e.target === this) {
      calendarModal.fadeOut(200);
    }
  });

  // Click on the special day (12th Sept) -> open birthday celebration
  $(document).on("click", "#specialSeptDay", function () {
    calendarModal.fadeOut(200, function () {
      openBirthdayModal();
    });
  });

  // Close birthday modal
  $("#closeBirthday").click(function () {
    closeBirthdayModal();
  });

  birthdayModal.click(function (e) {
    if (e.target === this) {
      closeBirthdayModal();
    }
  });

  function openBirthdayModal() {
    birthdayModal.fadeIn(300);
    launchConfetti();
    launchBirthdayHearts();

    // Re-trigger the text line fade-in animation each time it opens
    $(".bday-line").each(function () {
      $(this).css("animation", "none");
      void this.offsetHeight; // force reflow
      $(this).css("animation", "");
    });
  }

  function closeBirthdayModal() {
    birthdayModal.fadeOut(250);
    $("#confettiContainer").empty();
    $("#birthdayHearts").empty();
  }

  // ---- Confetti (crackers) effect ----
  function launchConfetti() {
    var container = $("#confettiContainer");
    container.empty();

    var colors = ["#ff1493", "#ffd700", "#ff69b4", "#00c2ff", "#7cfc00", "#ff4500", "#da70d6"];
    var pieceCount = 90;

    for (var i = 0; i < pieceCount; i++) {
      var left = Math.random() * 100; // vw%
      var color = colors[Math.floor(Math.random() * colors.length)];
      var duration = 2.5 + Math.random() * 2.5;
      var delay = Math.random() * 1.2;
      var rotate = Math.random() * 360;
      var isCircle = Math.random() > 0.5;

      var piece = $('<div class="confetti-piece"></div>').css({
        left: left + "%",
        backgroundColor: color,
        animationDuration: duration + "s",
        animationDelay: delay + "s",
        transform: "rotate(" + rotate + "deg)",
        borderRadius: isCircle ? "50%" : "2px"
      });

      container.append(piece);
    }

    // Clean up confetti after the longest animation finishes
    setTimeout(function () {
      container.empty();
    }, 6000);
  }

  // ---- Floating hearts burst inside birthday modal ----
  function launchBirthdayHearts() {
    var container = $("#birthdayHearts");
    container.empty();

    var heartEmojis = ["❤️", "💕", "💖", "💗", "💓", "😘"];
    var heartCount = 25;

    for (var i = 0; i < heartCount; i++) {
      var left = Math.random() * 100;
      var duration = 3 + Math.random() * 3;
      var delay = Math.random() * 2;
      var emoji = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

      var heart = $('<span class="bh-heart"></span>')
        .text(emoji)
        .css({
          left: left + "%",
          animationDuration: duration + "s",
          animationDelay: delay + "s"
        });

      container.append(heart);
    }

    setTimeout(function () {
      container.empty();
    }, 7000);
  }
});
