$(function(){
  function Citation(citation){
    that = this;
    this.ready = function(cb){
      $.getJSON(
        that.url = "http://cskit-server.herokuapp.com/v1/text.json?"
        + "callback=?&citations=" + citation
      )
      .done(function(data){
        citation = data[0];
        that.volume = citation.volume;
        that.citation = citation.citation;
        that.text = citation.text;
        cb();
      })
      .fail(function(jqxhr, status, error){ //Why isn't this working!!!!
        that.volume = status + " : " + error;
      });
    };
  }

  function reload_citation(){
    citation = new Citation($('#citations').val());
    citation.ready(function(){      
      $('#citation_citation').text(citation.citation);
      $('#citation_text').text(citation.text);      
    });
  }

  $('#citations').change(reload_citation);
  $('#citations').keyup(reload_citation);
  $('#citations').keydown(function (e){
    if(e.keyCode == 13){
      if ($('#citation_citation').text() != "Keep typing..") {
        f = $('#cite1').clone();
	f.hide()
	$('#cite1').before(f)
	f.fadeIn();
	f.attr('id','x')
	f.children().attr('id','x')
	$('#citation_citation').text('Keep typing..');
	$('#citation_text').text("..to add more citations. Try: bible Joshua 3:1-5 or science_health 45:1-12");      	
	$('#citations').val('science_health 3:');
      }
    }          
  })
  reload_citation();  
});
$( document ).ready(function() {
  $('#citations').focus();
  $('#citations').val("bible_kjv Gen. 12:1-3 the (to :)");
  reload_citation();
});