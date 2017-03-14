/*
 *  date		- 20170313
 *  author	- joonglimnam
 *
 * */

/* Setting font */
 var FontController =
 {
     selectedNum 	: null,
     fontSizeBase 	: 15,
     fontFamily 		: [
         'Roboto',
         'Roboto Condense',
         'Oswald',
         'Ranga',
         'Merriweather',
         'Sansita'],
     fontColor 		: [
         'oc-white',
         'oc-black',
         'oc-gray-9',
         'oc-red-9',
         'oc-pink-9',
         'oc-grape-9',
         'oc-violet-9',
         'oc-indigo-9',
         'oc-blue-9',
         'oc-cyan-9',
         'oc-teal-9',
         'oc-green-9',
         'oc-lime-9',
         'oc-yellow-9',
         'oc-orange-9'	],

     setFont		: function(idx)
     {
         $('.layer-preview h3').text(FontController.fontFamily[idx]);
         $('.font-preview').css({'font-family':FontController.fontFamily[idx]});
     },
     setFontSize 	: function(size)
     {
         $('.font-preview').css({'font-size':size});
     },
     createColorPick : function()
     {
         for(var i=0;i<FontController.fontColor.length;i++){
             $('.color-pallet').append('<span class='+FontController.fontColor[i]+'></span>');
         }

     },
     setFontColor 	: function(color)
     {
         $('.font-preview').css({'color':color});
     },

 };


/* Setting layer */
var LayerController =
 {
     openChk 	: false,
     setLayer 	: function(chk)
     {
         if(chk){
             $('.layer, .layer-block').addClass('on');
         }else{
             $('.layer, .layer-block').removeClass('on');
             FontController.setFontColor('#000');
         };
     },
     setColorPallet : function(){
         $('.color-pallet').toggleClass('on');
     }
 };

/* animate */
var Animate =
{
    myTime : null,
    count : 0,
    spd : 50,
    visibleItem : function()
    {
        $('.font-item').eq(Animate.count).addClass('on');

        if(Animate.count >= $('.font-item').length)
        {
            Animate.clearTime();
        }
        Animate.count++;
    },
    setTime : function()
    {
        Animate.myTime = setInterval(Animate.visibleItem, Animate.spd);
    },
    clearTime : function()
    {
        clearInterval(Animate.myTime);
    }
 };


Animate.setTime();

$(function() {

     /*when selecting font item*/
     $('.font-item').each(function(idx)
     {
         /*to arrange font list*/
         if(idx%3 == 2)
         {
             $(this).addClass('last-item');
         };
         $(this).find('.font-text').css({'font-family':FontController.fontFamily[idx]});
         $(this).find('.font-name').text(FontController.fontFamily[idx]);

         /*to click font item*/
         $(this).find('.btn').on('click', function(){
             LayerController.setLayer(true);
             FontController.selectedNum = $(this).parent().parent().index();
             FontController.setFont(FontController.selectedNum);
         })

         /*to float Layer*/
         $('.layer-block').on('click', function(){
             LayerController.setLayer(false);
             LayerController.setColorPallet();
         });

     });

     /*to set font size with jquery ui*/
     $( "#slider" ).slider({
         slide: function( event, ui ) {
             FontController.setFontSize(ui.value+FontController.fontSizeBase);
        }
     });

     /*to create color picker*/
     FontController.createColorPick();
     /*to open color picker*/
     $('.btn-colorpick').on('click', function(){
         LayerController.setColorPallet();
     });

     /*to pick selected color*/
     $('.color-pallet span').each(function(){
         $(this).on('click', function(){
             FontController.setFontColor($(this).css('background-color'));
             LayerController.setColorPallet();
         });
     });

     /* animate */


 });
