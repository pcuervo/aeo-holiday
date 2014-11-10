        </div><!-- /#wrapper -->
        <footer class="[ clearfix ]">
            <div class="row">
                <div class="[ col-xs-4 ]">
                    <p class="[ left ]"><a href="#">Términos y Condiciones</a></p>
                </div><!-- col-xs-4 -->
                <div class="[ col-xs-4 ]">
                    <p class="[ text-center ]">AEO Management 2014</p>
                </div><!-- col-xs-4 -->
                <div class="[ col-xs-4 ]">
                    <p class="[ right ]"><a href="#">Aviso de Privacidad</a></p>
                </div><!-- col-xs-4 -->
            </div>
        </footer>

        <script type="text/javascript" src="https://addthisevent.com/libs/1.5.8/ate.min.js"></script>
        <script src="<?php echo base_url().'assets/js/jquery.js' ?>"></script>
        <script src="<?php echo base_url().'assets/js/bootstrap.js' ?>"></script>
        <script src="<?php echo base_url().'assets/js/plugins.min.js' ?>"></script>
        <script src="<?php echo base_url().'assets/js/functions.js' ?>"></script>

        <script>
            insertGoogleAnalytics();
            localStorage.setItem('base_url', '<?php echo base_url() ?>');
            toggleMainMenu();

            <?php if($current_view == 'dashboard') { ?>
                getUnreadMessages();
            <?php } ?>

            <?php if($current_view == 'view_video') { ?>
                videoPost();
            <?php } ?>

            <?php if($current_view == 'new_exchange_group') { ?>
                inviteFriends('.j_group_form');
                createExchangeGroup();
            <?php } ?>

            <?php if($current_view == 'view_exchange_group') { ?>
                addGroupToCalendar();
                inviteFriends('.j_edit_group_form');
                editExchangeGroup();
            <?php } ?>

            <?php if($current_view == 'perfect_fit') { ?>
                updatePerfectFit();
            <?php } ?>

            <?php if($current_view == 'view_messages') { ?>
                showSecretFriends();
            <?php } ?>

            <?php if($current_view == 'login') { ?>
                toggleButton();
            <?php } ?>
        </script>
    </body>
</html>