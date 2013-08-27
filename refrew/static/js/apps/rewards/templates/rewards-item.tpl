<div class="well">
	<form>
	<p>Reward Id: <%= itemid %></p>
	<input type="hidden" name="reward" value="<%=itemid%>">
	</form>
	<% if (showSelectButton() == true) {%>
	<button type="button" id='select-reward' class="btn btn-link btn-small">Select</button>
	<%}%>
	<button type="button" id='show-details' class="btn btn-link btn-small">Details</button>
</div>
