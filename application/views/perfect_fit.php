<div class="[ contenido ] [ content ] [ margin-bottom ] [ clearfix ]">
	<form role="form" class="[ col-xs-11 col-sm-8 col-md-6 ] [ center-block ] [ margin-bottom ] [ j_update_perfect_fit ]">
		<div class="[ form-group ]">
			<?php foreach ($perfect_fit_quiz as $key => $question) { ?>
			<label class="[ center-block ]" for="<?php echo $question['question'] ?>"><?php echo $question['question'] ?></label>
			<select class="[ form-control ]" name="<?php echo $question['question'] ?>">
				<?php foreach ($question['answers'] as $key => $answer) { ?>
				<option value="<?php echo $question['question_id'].'-'.$answer['id'] ?>"><?php echo $answer['answer'] ?></option>
				<?php } ?>
			</select>
			<?php } ?>
			<button class="[ btn btn-primary ] [ center-block ]">Actualizar Perfect Fit</button>
		</div>
	</form>
</div><!-- contenido -->


        
