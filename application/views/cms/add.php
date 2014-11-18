<div class="[ contenido ] [ container ]">
    <div class="[ row ]">
        <div class="[ col-xs-12 col-md-10 ] [ center-block margin-bottom ]">
            <h2 class="[ text-center ] [ margin-bottom-small ]">Agregar producto</h2>
            <div class="[ row ]">
                <?php 
                if(isset($_SESSION['upload_success']))
                    echo '<p>'.$_SESSION['upload_success'].'</p>';
                ?>
                <div class="[ col-xs-12  col-sm-10 col-md-8 ] [ center-block margin-bottom ]">
                    <?php
                    $attributes = array('class' => '[ text-center ]');
                    echo form_open_multipart('cms/insert_product/', $attributes);
                    ?>
                        <div class="[ form-group ] [ margin-bottom ]">
                            <label class="[ center-block ]" for="name">Nombre del producto</label>
                            <input type="text" class="[ form-control ]" maxlength="50" name="name">
                        </div>
                        <div class="[ form-group ] [ margin-bottom ]">
                            <label class="[ center-block ]" for="gender">Género</label>
                            <select class="[ form-control ] [ required ]" name="gender">
                                <option value="m">hombre</option>
                                <option value="f">mujer</option>
                            </select>
                        </div>
                        <div class="[ form-group ] [ margin-bottom ]">
                            <label class="[ center-block ]" for="category">Categoría</label>
                            <select class="[ form-control ] [ required ]" name="category">
                                <option value="accesorio">accesorio</option>
                                <option value="top">top</option>
                                <option value="pantalon">pantalón</option>
                            </select>
                        </div>
                        <div class="[ form-group ]">
                            <label class="[ center-block ]" for="userfile">Selecciona una imagen</label>
                            <input class="[ margin-bottom ] [ center-block ] [ form-control ]" type="file" name="userfile" placeholder="Agregar foto del producto" />
                        </div>
                        <div class="[ text-center ]">
                            <button type="submit" value="" class="[ btn btn-primary btn-go ]"><span>Agregar producto</span></button>
                        </div>
                    </form>
                </div>
            </div><!-- row -->
        </div>
    </div>
</div><!-- cms-home -->
