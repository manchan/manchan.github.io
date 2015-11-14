$(function()
{
    //----------------------------------
    // USAGE
    //----------------------------------
    function config_language_box()
    {
        $(".language").turnBox(
            {
                width: 40,
                height: 30
            });

        $(".language").find(".turnBoxButton").on("click", function()
        {
            var self_box = $(this).closest(".turnBoxContainer");
            if(self_box.hasClass("en") == true) {
                var text_lang = $(".text.en");
            } else {
                var text_lang = $(".text.jp");
            }

            $(".language").not(self_box).turnBoxAnimate();
            $(".text").removeClass("show");
            text_lang.addClass("show");
        });

        $(".language.jp").turnBoxAnimate({
            face: 2
        });

        $(".text.jp").addClass("show");
    }


    function init_layout()
    {
        config_language_box();
    }

    init_layout();
});


