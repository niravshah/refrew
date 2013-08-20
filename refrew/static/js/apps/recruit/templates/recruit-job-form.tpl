<div class="well">
<form id="ex1">	
	<div class="form-group">
                <label  class="bot-pad-20" for="exampleInputEmail1">Where's this job Located?</label>
                <div class="input-group bot-pad-10">
                        <span class="input-group-addon">Location</span>
                        <input type="text" class="form-control" placeholder="London,United Kingdom / NY, United States ...">
                </div>
        </div>

	<div class="form-group">
                <label  class="bot-pad-20" for="exampleInputEmail1">Enter a Title for this job:</label>
                <div class="input-group bot-pad-10">
                        <span class="input-group-addon">Title</span>
                        <input type="text" class="form-control" placeholder="Javascript Ninja / Super Star Marketing Head / VP, Securities ...">
                </div>
        </div>
	
	<div class="row bot-pad-20">
                <div class="col-lg-12">
                        <label  class="bot-pad-20" for="exampleInputEmail1">Is this a Permanent or Contract Vacancy?</label>
                </div>
                 <div class="col-lg-12">
                <div class="input-group">
                <div class="input-group-btn">
                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">Perm/Cont <span class="caret"></span></button>
                <ul class="dropdown-menu">
                        <li><a href="#">Perm</a></li>
                        <li><a href="#">Cont</a></li>
                </ul>
                </div><!-- /btn-group -->
                <input type="text" class="form-control" placeholder="Annual Remuneration / Dail Rate">
                </div><!-- /input-group -->
                </div>
        </div>
		

	 <div class="form-group top-pad-10">
    		<label  class="bot-pad-20" for="exampleInputEmail1">What are the Top 3 Technical Skills needed for this job?</label>
		<div class="input-group bot-pad-10">
			<span class="input-group-addon">Skill #1</span>
  			<input type="text" class="form-control" placeholder="Backbone / Python / Java ...">
		</div>
		<div class="input-group bot-pad-10">
                        <span class="input-group-addon">Skill #2</span>
                        <input type="text" class="form-control" placeholder="Microsoft Word / Excel ...">
                </div>
		<div class="input-group bot-pad-10">
                        <span class="input-group-addon">Skill #3</span>
                        <input type="text" class="form-control" placeholder="Journalizing Financial Transactions / Reconciling Account Balances">
                </div>
	</div>

         <div class="form-group top-pad-10">
                <label  class="bot-pad-20" for="exampleInputEmail1">What are the Top 3 Interpersonal Skills needed for this job?</label>
                <div class="input-group bot-pad-10">
                        <span class="input-group-addon">Skill #1</span>
                        <input type="text" class="form-control" placeholder="Negotiation / Problem Solving">
                </div>
                <div class="input-group bot-pad-10">
                        <span class="input-group-addon">Skill #2</span>
                        <input type="text" class="form-control" placeholder="Decision Making / Leadership">
                </div>
                <div class="input-group bot-pad-10">
                        <span class="input-group-addon">Skill #3</span>
                        <input type="text" class="form-control" placeholder="Assertiveness">
                </div>
        </div>

	<div class="row bot-pad-20">
		<div class="col-lg-12">
			<label  class="bot-pad-20" for="exampleInputEmail1">Does this job need any special Qualifications?</label>
		</div>
		 <div class="col-lg-12">
		<div class="input-group">
  		<div class="input-group-btn">
       		<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">Qualification <span class="caret"></span></button>
        	<ul class="dropdown-menu">
          		<li><a href="#">Yes</a></li>
          		<li><a href="#">No</a></li>
        	</ul>
      		</div><!-- /btn-group -->
      		<input type="text" class="form-control">
    		</div><!-- /input-group -->	
		</div>
	</div>

	 <div class="form-group top-pad-10">
                <label  class="bot-pad-20" for="exampleInputEmail1">What are the most prominent 3 characteristics of this team?</label>
                <div class="input-group bot-pad-10">
                        <span class="input-group-addon">Char. #1</span>
                        <input type="text" class="form-control" placeholder="Agile / Pair Programing ...">
                </div>
                <div class="input-group bot-pad-10">
                        <span class="input-group-addon">Char. #2</span>
                        <input type="text" class="form-control" placeholder="Etc">
                </div>
                <div class="input-group bot-pad-10">
                        <span class="input-group-addon">Char. #3</span>
                        <input type="text" class="form-control" placeholder="Etc">
                </div>
        </div>

         <div class="form-group top-pad-10">
                <label  class="bot-pad-20" for="exampleInputEmail1">Describe the Product / Project / Nature of work breifly: </label>
                <div class="input-group bot-pad-10">
                        <span class="input-group-addon">Skill #1</span>
                        <input type="text" class="form-control" placeholder="Maintenance / Re-engineering / Greenfield ...">
                </div>
                <div class="input-group bot-pad-10">
                        <span class="input-group-addon">Skill #2</span>
                        <input type="text" class="form-control" placeholder="Etc">
                </div>
                <div class="input-group bot-pad-10">
                        <span class="input-group-addon">Skill #3</span>
                        <input type="text" class="form-control" placeholder="Etc">
                </div>
        </div>
	


	
        	
</form>

<script type="text/javascript">
$(".dropdown-menu li a").click(function(){
  var selText = $(this).text();
  $(this).parents('.input-group-btn').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');
});

</script>
</div>
