'use strict'

$(document).ready(function() {
    function dictMoving() {
        var item = $('.dict-item__wrapp'),
        itemWidth = item.innerWidth(),
        itemHeight = item.innerHeight(),
        itemLength = item.length,
        rowLength = itemLength/3,
        containerWidth = $('.dictionary-row').width(),
        subBlock = $('.dict-subblock__wrapp');

        $(subBlock).width( containerWidth - itemWidth );
        $(subBlock).css('left', itemWidth);
        $(subBlock).css('min-height', 4.25 * itemLength + 'rem');
        var rowOffset = 0;
        for ( var i = 0; i <= rowLength; i++ ) {
            for ( var j = 0; j <= 2; j++ ) {
                $(item.eq(rowOffset)).css('top', itemHeight * i);
                $(item.eq(rowOffset)).css('left', itemWidth * j);
                rowOffset++;
            }
        }
    }
    dictMoving();

    function dictMovingTime() {
        var item = $('.dict-item__wrapp');
        $(item).each( function(){
            $(this).addClass('dict-transition');
        });
    }
    setTimeout( function () {
        dictMovingTime();
    }, 10);


    $('.dict-item').on('click', function() {
        $(this).addClass('active-dict');
        var item = $('.dict-item__wrapp'),
        itemHeight = item.innerHeight(),
        subBlock = $('.dict-subblock__wrapp'),
        subOpacity = $('.dict-subblock');

        $(item).each( function() {
            var count = $(this).index();
            $(this).css('top', 4.25 * count + 'rem');
            $(this).css('left', 0);
            $(this).addClass('dict-aside');
        });

        $(subBlock).addClass('show-dict');
        setTimeout( function() {
            $(subOpacity).addClass('sub-opacity');
        }, 10);

    });

    function itemHeigh() {
        var maxHeight = 0;
        var item = $('.dict-item__wrapp');
        $(item ).each(function(){
            if ( $(this).height() > maxHeight ) {
                maxHeight = $(this).height();
            }
        });
        $(item ).height(maxHeight);
    };
    itemHeigh();


});






// $(document).ready(function() {
//     var war = $('.part_1').width();
//     var war2 = $('.block_name').width();
//     var height1 = $('.block_name').height();
//
//     var counts = $('.block_name').length;
//     var block_row = war/war2;
//


    // $('.block_name').each(function() {
    //     var number = $(this).index();
    //     var this_w = war2 * number + war2;
    //
    //     if( number + 1 <= block_row ) {
    //         for ( var i = 1; i <= block_row; i++) {
    //             $(this).css('left', war2 * i);
    //         }
    //     }
    //
    //     else if( number + 1 >= block_row || number + 1 <= block_row * 2) {
    //         for ( var i = 1; i <= block_row; i++) {
    //             $(this).css('left', war2 * i);
    //         }
    //         $(this).css('top', height1);
    //     }
    // });


    // function span_in_row() {
    //     for ( var k = 0; k < counts; k++ ) {
    //         var number = $('.block_name').eq( k );
    //         number.css('color', red);
    //
    //         if( k < 5) {
    //
    //         }


    // var this_w = war2 * number + war2;

    // if( number + 1 <= block_row ) {
    //     for ( var i = 1; i <= block_row; i++) {
    //         $(this).css('left', war2 * i);
    //     }
    // }
    //
    // else if( number + 1 >= block_row || number + 1 <= block_row * 2) {
    //     for ( var i = 1; i <= block_row; i++) {
    //         $(this).css('left', war2 * i);
    //     }
    //     $(this).css('top', height1);
    // }
    //     }
    // };
    //
    // sdfdsfdfs();
    //
    //
    // $('.block_name').on('click', function() {
    //     $('.block_name').each(function() {
    //         var number = $(this).index();
    //         $(this).css('left', '0');
    //         $(this).css('top', height1 * number);
    //     });
    // });
//     function on_Block() {
//         var block = $('.block_name');
//         var block_width = $('.block_name').width();
//         var block_height = $('.block_name').height();
//         var block_length = $('.block_name').length;
//         var row_length = block_length/3;
//
//         var row_offset = 0;
//         for ( var i = 0; i <= row_length; i++ ) {
//             for ( var j = 0; j <= 2; j++ ) {
//                 $(block.eq(row_offset)).css('top', block_height * i);
//                 $(block.eq(row_offset)).css('left', block_width * j);
//                 row_offset++;
//             }
//         }
//     };
//     on_Block();
// });


//
// .container
//     .rows
//     .part_1
//     .block_name one
//     .block_name two
//     .block_name three
//     .block_name four
//     .block_name five
//     .block_name six
//     .block_name seven
//     .block_name eight
//     .block_name nine
//     .block_name ten
//     .block_name eleven
//     .block_name twelve

// .part_2
//     .block_content one
//     .block_content two
//     .block_content three
//     .block_content four
//     .block_content five
//     .block_content six
//     .block_content seven