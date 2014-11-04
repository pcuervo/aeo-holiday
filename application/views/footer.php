        </div><!-- /#wrapper -->
        
        <script src="<?php echo base_url().'assets/js/jquery.js' ?>"></script>
        <script src="<?php echo base_url().'assets/js/bootstrap.js' ?>"></script>
        <script src="<?php echo base_url().'assets/js/plugins.js' ?>"></script>
        <script src="<?php echo base_url().'assets/js/functions.js' ?>"></script>
        <script>
            // Add current view to local storage to use in Javascript
            //localStorage.setItem('current_view', '<?php echo $current_view ?>');
            localStorage.setItem('base_url', '<?php echo base_url() ?>');

            toggleMainMenu();
            //facebookInit();

            <?php if($current_view == 'new_exchange_group') { ?>
                inviteFriends('.j_group_form');
                createExchangeGroup();
            <?php } ?>

            <?php if($current_view == 'view_exchange_group') { ?>
                inviteFriends('.j_edit_group_form');
                editExchangeGroup();
            <?php } ?>

            <?php if($current_view == 'perfect_fit') { ?>
                updatePerfectFit();
            <?php } ?>
            
        </script>
    </body>
</html>