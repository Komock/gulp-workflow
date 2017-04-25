// $(document).ready(function() {
//     $(function() {
//         $.getJSON('../lessons/lesson_fruit.json', function(data) {
//             var lesson = data;
//             console.log(lesson.fruits);
//         });
//     });
// });

// $(document).ready(function() {
//
//     $.getJSON('../lessons/lesson_fruit.json', function(data) {
//       var lesson_fruit = data.fruits;
//
//       function selectWord() {
//         $('.another_words').each(function() {
//           $(this).removeClass('answerTrue');
//           $(this).removeClass('answerFalse');
//           $(this).html('');
//         });
//
//         var numberItems = lesson_fruit.length;
//         var randMain = Math.floor(Math.random() * numberItems);
//         var valueRandMain = lesson_fruit[randMain].english;
//         var idMainWord = $('#main-word');
//         idMainWord.html(lesson_fruit[randMain].english);
//
//         var words = $('.another_words');
//         var wordsLength = words.length;
//         var randWords = Math.floor(Math.random() * wordsLength);
//         words.eq(randWords).html(lesson_fruit[randMain].russian);
//         console.log(lesson_fruit[randMain].russian);
//
//         $(words).on('click', function() {
//           var answer = $(this).text();
//
//           if (answer == lesson_fruit[randMain].russian) {
//             $(this).addClass('answerTrue');
//             setTimeout(function() {
//               selectWord();
//             }, 2000);
//           } else {
//               $(this).addClass('answerFalse');
//               setTimeout(function() {
//                 selectWord();
//               }, 2000);
//           }
//         });
//       }
//       selectWord();
//     });







// console.log(randWords);
// console.log(numberItems);
// console.log(randMain);
// console.log(lesson_fruit[randMain].english);
// console.log(words.length);
// });


$(document).ready(function() {

    $.getJSON('../lessons/lesson_fruit.json', function(data) {
      var lesson_fruit = data.fruits;
      var words = $('.another_words');
      var true_answer;

      function selectWord() {
        $('.another_words').each(function() {
          $(this).removeClass('answerTrue');
          $(this).removeClass('answerFalse');
          $(this).html('');
        });

        var numberItems = lesson_fruit.length;
        var randMain = Math.floor(Math.random() * numberItems);
        var valueRandMain = lesson_fruit[randMain].english;
        var idMainWord = $('#main-word');
        idMainWord.html(lesson_fruit[randMain].english);

        var wordsLength = words.length;
        var randWords = Math.floor(Math.random() * wordsLength);
        words.eq(randWords).html(lesson_fruit[randMain].russian);
        true_answer = lesson_fruit[randMain].russian;

        function put_words(a) {
          var put_words_1 =  Math.floor(Math.random() * numberItems);
          if(a == put_words_1) {
            put_words(a);
          }
          else {
            var put_words_2 =  Math.floor(Math.random() * numberItems);
            if( put_words_2 == put_words_1 || put_words_2 == a ) {
              put_words(a);
            }
            else {
              var put_words_3 =  Math.floor(Math.random() * numberItems);
              if( put_words_3 == put_words_1 || put_words_3 == put_words_2 || put_words_3 == a ) {
                put_words(a);
              }
              else {
                var put_words_pos_1 = Math.floor(Math.random() * wordsLength);
                  if( put_words_pos_1 == randWords ) {
                    put_words(a);
                  }
                  else {
                      var put_words_pos_2 = Math.floor(Math.random() * wordsLength);
                      if ( put_words_pos_2 == randWords || put_words_pos_2 == put_words_pos_1 ) {
                        put_words(a);
                      }
                      else {
                        var put_words_pos_3 = Math.floor(Math.random() * wordsLength);
                        if ( put_words_pos_3 == randWords || put_words_pos_3 == put_words_pos_2 || put_words_pos_2 == put_words_pos_1 ) {
                          put_words(a);
                        }
                        else {
                          words.eq(put_words_pos_1).html(lesson_fruit[put_words_1].russian);
                          words.eq(put_words_pos_2).html(lesson_fruit[put_words_2].russian);
                          words.eq(put_words_pos_3).html(lesson_fruit[put_words_3].russian);
                        }
                      }
                  }
              }
            }
          }
        }
        put_words(randMain);

      }
      $(words).on('click', function() {
        var answer = $(this).text();

        if (answer == true_answer) {
          $(this).addClass('answerTrue');
          setTimeout(function() {
            selectWord();
          }, 1000);
        } else {
            $(this).addClass('answerFalse');
            setTimeout(function() {
              selectWord();
            }, 1000);
        }
      });
      selectWord();
    });
  });
