<div class="[ container ]">
	<h2 class="[ margin-bottom ] [ text-center ] [ center-block ]">Mi perfil</h2>
	<div class="[ row ]">
		<p class="[ col-xs-11 col-sm-8 col-md-6 ] [ margin-bottom-big ] [ center-block ] [ text-center ]">Completa tu perfil para recibir el regalo que realmente quieres.</p>
		<form role="form" class="[ col-xs-11 col-sm-8 col-md-6 ] [ center-block ] [ margin-bottom ] [ j_update_perfect_fit ]">
			<?php foreach ($perfect_fit_quiz as $key => $question) { ?>
				<div class="[ form-group ] [ margin-bottom ]">
					<label class="[ center-block ]" for="<?php echo $question['question'] ?>"><?php echo $question['question'] ?></label>
					<select class="[ form-control ]" name="<?php echo $question['question'] ?>">
						<?php foreach ($question['answers'] as $key => $answer) { ?>
						<option value="<?php echo $answer['id'] ?>"><?php echo $answer['answer'] ?></option>
						<?php } ?>
					</select>
				</div>
			<?php } ?>
			<button class="[ btn btn-primary btn-go ] [ center-block ]" onclick="ga('send', 'event', 'perfil', 'click', 'perfilListo');"><span>Actualizar Perfect Fit</span></button>
		</form>
	</div>
</div><!-- contenido -->



