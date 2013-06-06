$(document).ready(function() {
  var $input = $('#hn_submission_autocomplete');
  var $informations = $('#hn_submission_informations');
  var $display = $('#hn_submission_informations_content');
  var $id = $('#hn_submission_informations_id');
  var $link = $('#hn_submission_informations_link');
  $input.autocomplete({
    source: function(request, response) {
      $.getJSON(
        'http://api.thriftdb.com/api.hnsearch.com/items/_search?callback=?',
        {
          q: request.term,
          filter: {
            fields: {
              type: 'submission'
            }
          }
        },
        function(data) {
          response( $.map( data.results, function( item ) {
            return {
              label: item.item.title,
              value: item.item.title,
              data: item
            }
          }));
        }
      );
    },
    minLength: 2,
    select: function(event, ui) {
      var content = JSON.stringify(ui.item.data, null, 4);
      $id.text(ui.item.data.item._id);
      $display.text(content);
      $link.empty();
      var link = 'https://news.ycombinator.com/item?id=' + ui.item.data.item.id;
      $link.append(
        $('<a></a>').attr({
          href: link,
          target: '_blank'
        }).text(link)
      );
      console.log($link[0]);
      $informations.css({
        visibility: 'visible'
      });
    }
  });
});