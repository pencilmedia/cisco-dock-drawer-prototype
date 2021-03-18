 /* ===================================================
  * dockdrawer.js - Sidebar Dock and Drawer
  * =================================================== */

 // GLOBAL VARIABLES
 let globalDock = {};

 const navcontainer = $('.nav-container');
 const sidebar = $('.anim-sidebar');
 const dockdrawer = $('.anim-dockdrawer');
 const l2dialog = $('.anim-l2');

 globalDock = {
   init: function () {
     globalDock.dockDrawerBehaviors();
     globalDock.pinPanel();
   },
   pinPanel() {
     $('[data-id="expand-sidebar"]').on('click', function () {
       $('body').toggleClass('panel-pinned');
       sidebar.addClass('panel-open');
       dockdrawer.addClass('panel-open');
     });
   },
   dockDrawerBehaviors: function () {
     //Onclick: dock button expands sidebar and opens drawer
        $('.btn-anim-dock').on('click', function (e) {
             globalDock.toggleDock();
          //    if ($('.l2-dialog').hasClass('l2-dialog--open')) {
          //         globalDock.toggleDock();
          //         $('.anim-dockdrawer').addClass('l2-opened');
          //    } else {
          //         globalDock.toggleDock();
          //    }
     });

     // Minimize L2 Dialog
     $('[data-id="minimize-l2"]').on('click', function () {
       globalDock.minimizeL2Dialog();
     });

     // Confirm Clear All Drawer Items
     $('[data-id="confirm-clear-l2"]').on('click', function () {
       globalDock.clearAllConfirmation();
     });

     // Open L2 Dialog from trigger
     $('[data-id="open-l2"]').on('click', function () {
       let modalID = $(this).attr('data-modal');

       //toggle drawer items when opening l2
       $(".dialog-opened").toggleClass('hide-item dialog-opened');
       $(this).parent().toggleClass('hide-item dialog-opened');

       // pass modalID (data-modal 'target ID' dialog to open)
       globalDock.openL2Dialog(modalID);
     });

     // Close L2 Dialog
     $('[data-id="close-l2"]').on('click', function () {
       let whichDialog = $(this).attr('data-modal');
       $('.anim-drawer--list .dialog-opened.hide-item').toggleClass('dialog-opened hide-item');
       globalDock.closeL2Dialog(whichDialog);
     });
   },
   // Dock Drawer Behaviors
   // /////
     toggleDock: function () {
          // open drawer
          dockdrawer.toggleClass('open');
          // Remove the opened list item from drawer
          globalDock.removeDrawerListItem();
          // toggle dock chevron up/down
          $('.btn-anim-dock--label [data-id="icon-toggle"]').toggleClass('icon-chevron-up icon-chevron-down');
          // If L2 dialog is open adjust drawer top position to allow for L2 Header
          if (l2dialog.hasClass('l2-dialog--open')) {
               if (dockdrawer.hasClass('l2-opened')) {
                    dockdrawer.removeClass('l2-opened');
               } else {
                    dockdrawer.addClass('l2-opened');
               };
          }
   },
   clearAllConfirmation: function () {
     //bootstrap modal
     $('#modal-confirm-close').modal({
       backdrop: 'static',
       focus: true,
       show: true
     });
     globalDock.clearAllItems();
   },
   // L2 Dialog
   // /////
      openL2Dialog: function (modalID) {
     // passed data-modal 'target ID' to open
     let whichDialog = '#' + modalID;
     // close dock
     globalDock.toggleDock();

     // if l2 already open minimize it then open new one
     if (l2dialog.hasClass('l2-dialog--open')) {
       globalDock.minimizeL2Dialog();
       window.setTimeout(function () {
         // open dialog after minize animation
         $(whichDialog).toggleClass('l2-dialog--open animated5s zoomInUp');
       }, 300);
     } else {
       // else just open new dialog
       // open dialog
       $(whichDialog).toggleClass('l2-dialog--open animated5s zoomInUp');
     }
   },
   closeL2Dialog: function (whichDialog) {
     let closeThisDialog = '#' + whichDialog;
     // close dock drawer
     dockdrawer.removeClass('open l2-opened');
     // close dialog into close button (top right) then remove classes after animation runs through
     $(closeThisDialog).removeClass('l2-dialog--open animated5s zoomInUp').toggleClass('l2-dialog--close animated5s zoomOut');
     window.setTimeout(function () {
       $(closeThisDialog).toggleClass('l2-dialog--close animated5s zoomOut');
     }, 750);
   },
   minimizeL2Dialog: function () {
     // remove drawer list item class
     $(".dialog-opened").removeClass('hide-item dialog-opened');
     // close dock drawer
        dockdrawer.removeClass('open l2-opened');
        
     // close dialog right away if it is opened otherwise wait for animations to play through then close dialog
     if (l2dialog.hasClass('l2-dialog--open')) {
          // remove open animation
          l2dialog.removeClass('animated5s zoomInUp');
       l2dialog.removeClass('l2-dialog--open');
     } else {
       window.setTimeout(function () {
          // remove open animation
          l2dialog.removeClass('animated5s zoomInUp');
         l2dialog.removeClass('l2-dialog--open');
       }, 250);
     }
   },
   clearAllItems: function () {
     // allow some time to bind event. Bootstrap shown.bs.modal not working
     window.setTimeout(function () {
       $('#confirm-clear').on("click", function () {
         $('.anim-drawer--list li').toggleClass('hide-item');
         // clear counter animation after animation finished
         $('.btn-anim-dock--count .counter').html('0').addClass('animated5s heartBeat').delay(1000).queue(function () {
           $('.btn-anim-dock--count .counter').removeClass('animated5s heartBeat');
         });
       });
     }, 250);
   },
   // Drawer List Items Behaviors
   // /////
   removeDrawerListItem: function () {
     $('[data-id="remove-drawer-item"]').on('click', function () {
       let removeItem = $(this).parent();
       let markedItem = removeItem.addClass('animated5s fadeOutLeft');
       // max-height for list items in css is for this remove animation
       removeItem.addClass('remove-drawer-item ');
       // wait .3s for anim to complete then remove item
       window.setTimeout(function () {
         markedItem.remove();
       }, 300);
       // clear counter animation after animation finished
          $('.btn-anim-dock--count .counter').delay(750).queue(function () { 
               $('.btn-anim-dock--count .counter').html('2').addClass('animated1s heartBeat').delay(1000).queue(function () {
                    $('.btn-anim-dock--count .counter').removeClass('animated5s heartBeat');
          });
       });
     });
   }
 };

 $(globalDock.init);
