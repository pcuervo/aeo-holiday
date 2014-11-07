        </div><!-- /#wrapper -->

        <script type="text/javascript" src="https://addthisevent.com/libs/1.5.8/ate.min.js"></script>
        <script src="<?php echo base_url().'assets/js/jquery.js' ?>"></script>
        <script src="<?php echo base_url().'assets/js/bootstrap.js' ?>"></script>
        <script src="<?php echo base_url().'assets/js/plugins.min.js' ?>"></script>
        <script src="<?php echo base_url().'assets/js/functions.js' ?>"></script>

        <script>
            insertGoogleAnalytics();
            localStorage.setItem('base_url', '<?php echo base_url() ?>');
            toggleMainMenu();

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