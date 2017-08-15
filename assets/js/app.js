

var app = (function() {

    let $el = $('#search');
    let $input = $el.find('input');
    let $ul = $('<ul>');
    let $li = $('<li>');
    let $a = $('<a>');

    // 
    function init(){
        search();
    }

    function search() {
        $(document).keypress(function(event) {
            if(event.which == 13) {
                let term = $input.val();
                console.log('term-' +term+ '-');
                $ul.empty();
                getData(term);
            }

            
        });
    }

    function getData(term) {
        const url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search='+term+'&format=json&callback=?';

        console.log(url);

        $.ajax({
            url: url,
            dataType: 'jsonp',
            success: function(data) {
                // do something with data
                console.log(data);
                
                // make ul
                $el.find('.container').append($ul);
                
                // data[1].forEach(function(element) {
                //     $ul.append('<li>' +element+ '</li>');
                //     $li.append();
                // }, this);

                for(var i = 0; i < data[3].length; i++){
                    console.log(data[3][i]);
                    console.log(data[1][i]);
                    console.log(data[2][i]);

                    let link = data[3][i];
                    let title = data[1][i];
                    let body = data[2][i];
                    
                    // append <a href="+link+"><li>+title+<p>+body+</p></li></a>
                    $ul.append('<a href="'+link+'"><li>'+title+'<p>'+body+'</p></li></a>');
                    
                }


            }
        });
    }

    return {
        init: init
    }
   
})();

app.init();