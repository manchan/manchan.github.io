$(function(){

    // emoji test
    var div = document.createElement('li');
    div.textContent = 'I \u2764\uFE0F emoji!';
    $('.box2 ul').append(div);
    twemoji.parse($('.box2').get(0), {size: 16});

    $(".box2 li img").hover(function(){

        $(".box2 li img").animate({top:"-10px"}, 200).animate({top:"-1px"}, 200)
            // second jump
            .animate({top:"-7px"}, 100).animate({top:"-1px"}, 100)
            // the last jump
            .animate({top:"-6px"}, 100).animate({top:"-1px"}, 100);
    });
});