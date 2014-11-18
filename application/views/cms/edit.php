<div class="[ contenido ] [ container ]">
    <div class="[ row ]">
        <div class="[ col-xs-12 col-md-10 ] [ center-block margin-bottom ]">
            <h2 class="[ text-center ] [ margin-bottom-small ]">Agregar producto</h2>
            <div class="[ row ]">
                <div class="[ col-xs-12  col-sm-10 col-md-8 ] [ center-block margin-bottom ]">
                    <?php
                    $attributes = array('class' => '[ text-center ]');
                    echo form_open_multipart('cms/update_product/'.$catalog_image["id"], $attributes);
                    ?>
                        <div class="[ form-group ] [ margin-bottom ]">
                            <label class="[ center-block ]" for="name">Nombre del producto</label>
                            <input type="text" class="[ form-control ]" maxlength="50" name="name" value="<?php echo $catalog_image['name'] ?>">
                        </div>
                        <div class="[ form-group ] [ margin-bottom ]">
                            <label class="[ center-block ]" for="gender">Género</label>
                            <select class="[ form-control ] [ required ]" name="gender">
                                <?php if($catalog_image['gender'] == 'hombre') { ?>
                                    <option value="hombre" selected>hombre</option>
                                    <option value="mujer">mujer</option>
                                <?php } else {  ?>
                                    <option value="hombre">hombre</option>
                                    <option value="mujer" selected>mujer</option>
                                <?php } ?>
                            </select>
                        </div>
                        <div class="[ form-group ] [ margin-bottom ]">
                            <label class="[ center-block ]" for="category">Categoría</label>
                            <select class="[ form-control ] [ required ]" name="category">
                                <?php if($catalog_image['category'] == 'accesorios') { ?>
                                    <option value="accesorios" selected>accesorio</option>
                                    <option value="top">top</option>
                                    <option value="pantalones">pantalón</option>
                                <?php } else if($catalog_image['category'] == 'top') { ?>
                                    <option value="accesorios">accesorio</option>
                                    <option value="top" selected>top</option>
                                    <option value="pantalones">pantalón</option>
                                <?php } else {  ?>
                                    <option value="accesorios">accesorio</option>
                                    <option value="top">top</option>
                                    <option value="pantalones" selected>pantalón</option>
                                <?php } ?>
                            </select>
                        </div>
                        <div class="[ col-xs-3 col-md-3 ] [ margin-bottom ]">
                            <img class="[ img-responsive margin-bottom ]" src="../../uploads/catalog/<?php echo $catalog_image['url_big'] ?>">
                        </div>
                        <div class="[ form-group ] [ col-xs-9 col-md-9 ]">
                            <label class="[ center-block ]" for="userfile">Selecciona otra imagen</label>
                            <input class="[ margin-bottom ] [ center-block ] [ form-control ]" type="file" name="userfile" placeholder="Agregar foto del producto" />
                        </div>
                        <div class="[ text-center ]">
                            <?php 
                            if(isset($_SESSION['upload_success'])){
                                echo '<p class="[ text-center ]">'.$_SESSION['upload_success'].'</p>';
                                unset($_SESSION['upload_success']);
                            }
                            ?>
                            <?php 
                            if(isset($_SESSION['upload_error'])){
                                echo '<p class="[ text-center ]">'.$_SESSION['upload_error'].'</p>';
                                unset($_SESSION['upload_error']);
                            }
                            ?>
                            <input type="hidden" name="url_anterior" value="<?php echo $catalog_image['url_big'] ?>">
                            <button type="submit" value="" class="[ btn btn-primary btn-go ]"><span>Editar producto</span></button>
                        </div>
                    </form>
                </div>
            </div><!-- row -->
        </div>
    </div>
</div><!-- cms-home -->
