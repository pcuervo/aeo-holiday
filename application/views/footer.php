        </div><!-- /#wrapper -->
        
        <script src="https://addthisevent.com/libs/1.5.8/ate.min.js"></script>
        <script src="<?php echo base_url().'assets/js/jquery.js' ?>"></script>
        <script src="<?php echo base_url().'assets/js/bootstrap.js' ?>"></script>
        <script src="<?php echo base_url().'assets/js/plugins.js' ?>"></script>
        <script src="<?php echo base_url().'assets/js/functions.js' ?>"></script>
        <script>
            addthisevent.settings({
                license   : "aao8iuet5zp9iqw5sm9z",
                mouse     : false,
                css       : true,
                outlook   : {show:true, text:"Outlook Calendar"},
                google    : {show:true, text:"Google Calendar"},
                ical      : {show:true, text:"iCal Calendar"},
                facebook  : {show:true, text:"Facebook Event"},
                dropdown  : {order:"outlook,google,ical, facebook"},
                callback  : ""
            });
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