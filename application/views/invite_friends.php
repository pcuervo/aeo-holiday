<h2>Create an exchange group</h2>

<p>2. Invite friends</p>

<form action="" class="j_group_form">
	<fieldset>
		<label for="name">Nombre del intercambio</label>
		<input type="text" name="name" value="Test group">
	</fieldset>
	<fieldset>
		<label for="description">Descripción del intercambio</label>
		<input type="text" name="description" value="Test group">
	</fieldset>
	<fieldset>
		<label for="exchange_date">Fecha del intercambio</label>
		<input type="text" name="exchange_date" value="2014-12-23 01:02:03">
	</fieldset>
	<fieldset>
		<label for="join_deadline">Fecha límite</label>
		<input type="text" name="join_deadline" value="2014-12-20 01:02:03">
	</fieldset>
	<fieldset>
		<label for="place">Lugar del intercambio</label>
		<input type="text" name="place" value="Mi casa">
	</fieldset>
	<fieldset>
		<label for="budget">Monto del regalo</label>
		<input type="text" name="budget" value="500">
	</fieldset>
	<fieldset>
		<input type="hidden" name="fb_users_id" value="3">
	</fieldset>
	<fieldset>
		<a href="#" class="j_invite_friends" onclick="ga('send', 'event', 'intercambio', 'click', 'agregarInvitados');">Invitar</a><br/>
		<input type="submit" value="Enviar">
	</fieldset>
</form>


<div id="status"></div>
        
