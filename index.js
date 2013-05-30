$(function(){
  function Citation(citation){
    that = this;
    this.ready = function(cb){
      if (!isNaN(citation.charAt(0))) {
	citation = 'science_health ' + citation	
      }
      else {
	citation = 'bible ' + citation	
      }
      $.getJSON(
        that.url = "http://cskit-server.herokuapp.com/v1/text.json?"
        + "callback=?&citations=" + citation
      )
      .success(function(data){
        citation = data[0];
        that.volume = citation.volume;
        that.citation = citation.citation;
        that.text = citation.text;
        cb();
      })
      .error(function(jqxhr, status, error){ //Why isn't this working!!!! -> Apparently by design, there's a bug filed for it :(      
        that.volume = status + " : " + error; // This will support error handling https://github.com/jaubourg/jquery-jsonp
      });
    };
  }

  function reload_citation(){
    $('#tooltip').text("Looking up citation, keep typing if I don't find anything..");    
      if (!isNaN($('#citations').val().charAt(0))) {
	$('#detected_book').text('S&H');    
      }
      else {
	$('#detected_book').text('KJV');    
      }	    
    citation = new Citation($('#citations').val());
    citation.ready(function(){  
      if (!isNaN(citation.citation.charAt(0))) {
	citation.citation = 'S&H ' + citation.citation
      }
      $('#citation_citation').text(citation.citation);
      $('#citation_text').text(citation.text);  
      $('#tooltip').text("Citation retrieved, hit enter for the next one..");
    });
  }

  $('#citations').change(reload_citation);
  $('#citations').keyup(reload_citation);
  $('#citations').keydown(function (e){
    if(e.keyCode == 13){
      if ($('#citation_citation').text() != "Keep typing..") {
        f = $('#cite1').clone();	
	f.hide()
	$('#cite').before(f)
	f.fadeIn();
	f.attr('id','x')
	f.children().attr('id','x')
	$('#citation_citation').text('Keep typing..');
	$('#citation_text').text("..to add more citations. Try: Joshua 3:1-5 or 45:1-12");      	
	$('#citations').val('');
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