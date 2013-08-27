<div class="well">
<form id="ex1">
	<%if (!editMode()){%>
		<button type="button" id='edit-job' class="btn btn-link btn-small">Edit</button>	
	<%}%>	
	<div class="form-group">
                <%if (editMode()){%>
		<label  class="bot-pad-20" for="exampleInputEmail1">Where's this job Located?</label>
                <div class="input-group bot-pad-10">
			<span class="input-group-addon">Location</span>
			<input type="hidden" name="user" id="recruit-linkedin-userid" value="<%=user%>">
			<input type="text" name="locationName" class="form-control" placeholder="London,UK / NY, US ..." value="<%=locationName%>">
		</div>
		<%}else{%>
                         <span>Location: <%=locationName%></span>
                <%}%>
		<% if (jobid != null) {%>
                       <input type="hidden" name="jobid" value="<%=jobid%>">
                <%}%>
        </div>

	<div class="form-group">
		<%if (editMode()){%>
                <label  class="bot-pad-20" for="exampleInputEmail1">Enter a Title for this job:</label>
                <div class="input-group bot-pad-10">
                        <span class="input-group-addon">Title</span>
                        <input type="text" name="title" class="form-control" value="<%=title%>" placeholder="Javascript Ninja / Super Star Marketing Head / VP, Securities ...">
                </div>
		 <%}else{%>
                         <span>Title: <%=title%></span>
                <%}%>
        </div>
	
                <%if (editMode()){%>
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
		<input type="hidden" name="permOrCont" value="<%=permOrCont%>">
                <input type="text" name="remuneration" value="<%=remuneration%>"class="form-control" placeholder="Annual Remuneration / Dail Rate">
                </div><!-- /input-group -->
                </div>
		</div>
	 	<%}else{%>
		<div class="form-group">
			 <span>Permanent/Contract:<%=permOrCont%></span>
                         <span>Remuneration: <%=remuneration%></span>
		</div>
                <%}%>
		
		 <%if (editMode()){%>
	 	<div class="form-group top-pad-10">
    		<label  class="bot-pad-20" for="exampleInputEmail1">What are the Top 3 Technical Skills needed for this job?</label>
		<div class="input-group bot-pad-10">
			<span class="input-group-addon">Skill #1</span>
  			<input name="tSkill1" value="<%=tSkill1%>" type="text" class="form-control" placeholder="Backbone / Python / Java ...">
		</div>
		<div class="input-group bot-pad-10">
                        <span class="input-group-addon">Skill #2</span>
                        <input name="tSkill2" value="<%=tSkill2%>" type="text" class="form-control" placeholder="Microsoft Word / Excel ...">
                </div>
		<div class="input-group bot-pad-10">
                        <span class="input-group-addon">Skill #3</span>
                        <input name="tSkill3" value="<%=tSkill3%>" type="text" class="form-control" placeholder="Journalizing Financial Transactions / Reconciling Account Balances">
                </div>
		</div>
		<%}else{%>
		<div class="form-group">
                         <span>Technical Skills:<%=tSkill1%>,<%=tSkill2%>,<%=tSkill3%></span>
		</div>
		<%}%>

         <div class="form-group top-pad-10">
                <label  class="bot-pad-20" for="exampleInputEmail1">What are the Top 3 Interpersonal Skills needed for this job?</label>
                <div class="input-group bot-pad-10">
                        <span class="input-group-addon">Skill #1</span>
                        <input name="pSkill1"  value="<%=pSkill1%>" type="text" class="form-control" placeholder="Negotiation / Problem Solving">
                </div>
                <div class="input-group bot-pad-10">
                        <span class="input-group-addon">Skill #2</span>
                        <input name="pSkill2"  value="<%=pSkill2%>" type="text" class="form-control" placeholder="Decision Making / Leadership">
                </div>
                <div class="input-group bot-pad-10">
                        <span class="input-group-addon">Skill #3</span>
                        <input name="pSkill3" value="<%=pSkill3%>" type="text" class="form-control" placeholder="Assertiveness">
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
		<input type="hidden" name="qalNeeded" value="<%=qalNeeded%>" class="hidden">
      		<input name="qal" type="text" class="form-control">
    		</div><!-- /input-group -->	
		</div>
	</div>

	 <div class="form-group top-pad-10">
                <label  class="bot-pad-20" for="exampleInputEmail1">What are the most prominent 3 characteristics of this team?</label>
                <div class="input-group bot-pad-10">
                        <span class="input-group-addon">Char. #1</span>
                        <input name="teamChar1" value="<%=teamChar1%>" type="text" class="form-control" placeholder="Agile / Pair Programing ...">
                </div>
                <div class="input-group bot-pad-10">
                        <span class="input-group-addon">Char. #2</span>
                        <input name="teamChar2" value="<%=teamChar2%>" type="text" class="form-control" placeholder="Etc">
                </div>
                <div class="input-group bot-pad-10">
                        <span class="input-group-addon">Char. #3</span>
                        <input name="teamChar3" value="<%=teamChar3%>" type="text" class="form-control" placeholder="Etc">
                </div>
        </div>

         <div class="form-group top-pad-10">
                <label  class="bot-pad-20" for="exampleInputEmail1">Describe the Product / Project / Nature of work breifly: </label>
                <div class="input-group bot-pad-10">
                        <span class="input-group-addon">Skill #1</span>
                        <input name="projChar1" value="<%=projChar1%>" type="text" class="form-control" placeholder="Maintenance / Re-engineering / Greenfield ...">
                </div>
                <div class="input-group bot-pad-10">
                        <span class="input-group-addon">Skill #2</span>
                        <input name="projChar2" value="<%=projChar2%>" type="text" class="form-control" placeholder="Etc">
                </div>
                <div class="input-group bot-pad-10">
                        <span class="input-group-addon">Skill #3</span>
                        <input name="projChar3" value="<%=projChar3%>" type="text" class="form-control" placeholder="Etc">
                </div>
        </div>
        	
</form>

<script type="text/javascript">
$(".dropdown-menu li a").click(function(){
  var selText = $(this).text();
        $(this).parents('.input-group-btn').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');
        $(this).parents('.input-group-btn').find('.dropdown-toggle').val(selText);
});

</script>



</div>
