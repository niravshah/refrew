<form>
<div class="row">
<div class="col-lg-12">
<div class="input-group">
	<div class="input-group-btn">
		<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">Select Stage <span class="caret"></span></button>
                <ul class="dropdown-menu">
                    	<li><a>Introduction</a></li>
                    	<li><a>Telephone Interview</a></li>
			<li><a>Face-Face Interview</a></li>
			<li><a>Hired!</a></li>
                </ul>
         </div><!-- /input-group -->
	 <input type="text" name="reward" class="form-control" placeholder="Pick a Reward from Left..." value="<%=reward%>">
	 <input type="hidden" name="stage" id="select-value" value="">
</div>
<div class="input-group">
	 <div class="input-group-btn">	
		<button type="button" id='save-reward' class="btn btn-link btn-small">Save</button><p>
	 </div>
</div><!-- /input-group -->
</div>
</div>
</form>
<script type="text/javascript">
$(".dropdown-menu li a").click(function(){
  var selText = $(this).text();
        $(this).parents('.input-group-btn').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');
        $(this).parents('.input-group-btn').find('.dropdown-toggle').val(selText);
	$(this).parents('.input-group-btn').parent().find('#select-value').val(selText);
});

</script>

