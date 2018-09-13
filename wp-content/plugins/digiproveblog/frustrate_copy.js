//<![CDATA[ 
// FUNCTIONS

var dprv_inputTags = new Array("input", "textarea", "select", "option", "optgroup", "button", "canvas");
var dprv_imageTags = new Array("img", "picture", "svg");

function dprv_disableSelection(target)
{
	// this function is used for old versions of Firefox and Opera
	function trapMouseDown(e)
	{
	    var element;
	    if (!e) var e = window.event;
	    if (e.target) element = e.target;
	    else if (e.srcElement) element = e.srcElement;
	    if (element.nodeType == 3) // defeat Safari bug
	        element = element.parentNode;
		var tagname=element.tagName.toLowerCase();
		if (tagname == "a" || dprv_inputTags.indexOf(tagname) != -1)
		{
			return true;
		}
		else
		{
		    e.preventDefault();
			return false;
		}
	}

    // MozUserSelect had a bug - Bug 561691 : sub-elements could not be excepted from the rule (fixed some years ago)
    //if (typeof target.style.MozUserSelect!='undefined')    // Firefox
    //{
    //	target.style.MozUserSelect='none';
    //	enableInputElements(target);
    //}
    //if (typeof target.style.WebkitUserSelect != 'undefined')    // Safari or Chrome
    //{
    //	target.style.WebkitUserSelect='none';
    //	enableInputElements(target);
    //}

	if (dprv_turn_off_select_style(target) == true)
	{
	    return;
	}
	if (typeof target.onselectstart != 'undefined')		// IE  (and Chrome or Safari but they are already picked up above)
	{
	    target.onselectstart = dprv_stopEvent;
	}
	target.onmousedown=trapMouseDown;	// Firefox, Opera and Netscape (and others but they all picked up above)
}

function dprv_turn_on_select_style(target)
{
    if (typeof target.style["user-select"] != 'undefined')
    {
        target.style["user-select"] = 'text';
        return true;
    }
    if (typeof target.style["-webkit-user-select"] != 'undefined')
    {
        target.style["-webkit-user-select"] = 'text';
        return true;
    }
    if (typeof target.style["-ms-user-select"] != 'undefined')
    {
        target.style["-ms-user-select"] = 'text';
        return true;
    }
    if (typeof target.style["-moz-user-select"] != 'undefined')
    {
        target.style["-moz-user-select"] = 'text';
        return true;
    }
    return false;
}
function dprv_turn_off_select_style(target)
{
    if (typeof target.style["user-select"] != 'undefined')
    {
        target.style["user-select"] = 'none';
        dprv_enableInputElements(target);
        return true;
    }
    if (typeof target.style["-webkit-user-select"] != 'undefined')
    {
        target.style["-webkit-user-select"] = 'none';
        dprv_enableInputElements(target);
        return true;
    }
    if (typeof target.style["-ms-user-select"] != 'undefined')
    {
        target.style["-ms-user-select"] = 'none';
        dprv_enableInputElements(target);
        return true;
    }
    if (typeof target.style["-moz-user-select"] != 'undefined')
    {
        target.style["-moz-user-select"] = 'none';
        dprv_enableInputElements(target);
        return true;
    }
    return false;
}

function dprv_enableInputElements(target)
{
    for (var t = 0; t < dprv_inputTags.length; t++)
    {
        var inputElements = target.getElementsByTagName(dprv_inputTags[t]);
        for (var i = 0; i < inputElements.length; i++)
        {
            //enableSelection(inputElements[i]);
            dprv_turn_on_select_style(inputElements[i]);
        }
    }
}


// FUNCTIONS TO PREVENT RIGHT-CLICK:
function dprv_evalEvent(e)
{
    var eventMessage = "";
    if (typeof e != "undefined" && typeof e.target != "undefined")
    {
        if (typeof e.target.id != "undefined" && e.target.id != null && e.target.id != "")
        {
            eventMessage += " on " + e.target.tagName + "/" + e.target.id;
        }
        if (typeof e.target.src != "undefined" && e.target.src != null && e.target.src != "")       // determine url if it is e.g an image
        {
            var url = e.target.src.replace(dprv_site_url, "").replace("http://","").replace("https://","");
            if (url.substr(0,1) == "/")
            {
                url = url.substr(1);
            }
            eventMessage += ", src=" + url;
        }
    }
    return eventMessage;
}
function dprv_manage_right_click(e)
{
    e.preventDefault();
    var action = "right-clicked";
    var eventMessage = dprv_evalEvent(e)
    dprv_manage_warning(action, eventMessage);
}
//function dprv_manage_right_click(e)
function dprv_manage_warning(action, eventMessage)
{
	function htmlspecialchars_decode(encodedString)
	{
		var decodedString = encodedString.replace('&amp;', '&');
		return decodedString.replace('&quot;', '"').replace('&#039;', '\'').replace('&lt;', '<').replace('&gt;','>');
	}
	if (dprv_justDisplayed == 0)
	{
		if (dprv_noRightClickMessage != "")
		{
			alert(htmlspecialchars_decode(dprv_noRightClickMessage));
			dprv_justDisplayed = 1;
			setTimeout("dprv_justDisplayed = 0;", 50);
		}
		if (dprv_record_IP != "off")
		{
		    var logMessage = "A user " + action + eventMessage;
			dprv_error_log("Low", logMessage);
		}
	}
}


function dprv_disableRightClick()
{
	function clickCheck(e)
	{
		if (e.button && e.button == 2 || e.which && e.which == 3)	// Was it a right-click? 
		{
			dprv_manage_right_click(e);
			return false;
		}
		return true;
	}
	if (typeof document.oncontextmenu != "undefined")
    {
        // modern browsers
        document.oncontextmenu = dprv_manage_right_click;	// works in modern versions of Safari, Chrome, Opera, IE, and FF
    }
    else
    {
        // legacy browsers
        document.onmousedown = clickCheck;		// Works in FF, Chrome, IE, but in Safari, Opera still shows context menu
    }

}

function dprv_disableDrag(target)
{
	// This doesn't work as it looks like Safari/Chrome default value for this property at element level is auto (would have expected inherit)
	//if (typeof target.style.WebkitUserDrag != 'undefined')    // Safari or Chrome
	//{
	//	target.style.WebkitUserDrag='none';
	//	return;
	//}

	if (typeof target.ondragstart != 'undefined') //	Seems to exist ok for up-to-date versions of IE, Opera, FF, Safari, Chrome
	{
	    target.ondragstart = dprv_stopDragEvent;
	}
	else
	{
		if (typeof target.ondrag != "undefined")
		{
			//target.ondrag=new Function("if(dprv_record_IP!='off'){dprv_error_log('Low','User tried to drag');}return false;");		// Doesn't stop the dragging in Chrome or Safari
			target.ondrag = dprv_stopDragEvent;
        }
		else
		{
			// dragging will probably be stopped by the disable selection code
		}
	}
}
function dprv_stopDragEvent(e)
{
    var ev = e || window.event;                                         // window.event for old IE browsers
    var eTarget = ev.target || ev.srcElement;                           // srcElement for old IE browsers
    if (dprv_inputTags.indexOf(eTarget.tagName.toLowerCase()) == -1)    // Allow Input elements to be dragged
    {
        ev.preventDefault();
        if (dprv_record_IP != "off")
        {
            var offence = "User tried to drag" + dprv_evalEvent(e);
            dprv_error_log("Low", offence);
        }
        return false;
    }
    return true;
}
function dprv_stopEvent(e)
{
    var ev = e || window.event;                                         // window.event for old IE browsers
    var eTarget = ev.target || ev.srcElement;                           // srcElement for old IE browsers
    if (dprv_inputTags.indexOf(eTarget.tagName.toLowerCase()) == -1)    // Allow Input elements to be dragged
    {
        ev.preventDefault();
        return false;
    }
    return true;
}

// FUNCTIONS TO DISABLE CERTAIN CTRL KEY COMBINATIONS for Select All or Show Source code:
function dprv_disableCtrlKeys()
{
    //if (typeof document.onkeypress == 'undefined' || navigator.userAgent.indexOf('Safari') != -1 || navigator.userAgent.indexOf('MSIE') != -1 || navigator.userAgent.indexOf('Trident') != -1) {
    //    document.onkeydown = dprv_trapCtrlKeyCombination;	// IE or Safari or Chrome or Opera
    //}
    //else {
    //    document.onkeypress = dprv_trapCtrlKeyCombination;	// Others (just Firefox, only one that fires onkeypress with CTRL key combinations)
    //}
    if (typeof document.onkeydown != 'undefined')
    {
        document.onkeydown = dprv_trapCtrlKeyCombination;      // onkeydown gets fired for all keys in all browsers
    }
    else
    {
        document.onkeypress = dprv_trapCtrlKeyCombination;      // onkeypress in some browsers does not fire for ALT / CTL etc.
    }
}
function dprv_trapCtrlKeyCombination(ev)
{
    var key;
    // probably ev is true in all browsers today
    if (typeof ev == "undefined" && typeof window.event != "undefined")
    {
        ev = window.event;
        key = ev.keyCode;
    }
    else
    {
        key = ev.which;
    }
    if (key == 16 || key == 17 || key == 18)    // pressing shift, ctrl, or alt without (or before) pressing another key	
    {
        return true;
    }
    if (
            (navigator.userAgent.indexOf('Macintosh') != -1 && ev.metaKey && ev.altKey && String.fromCharCode(key).toLowerCase() == 'u')	// Show source code on Mac/Safari
        || (navigator.userAgent.indexOf('Macintosh') == -1 && ev.ctrlKey && !ev.altKey && String.fromCharCode(key).toLowerCase() == 'u')	// Show source code on Windows
        || (navigator.userAgent.indexOf('Firefox') != -1 && ev.altKey && ev.shiftKey)							// Show source code on old versions of Firefox?
        || (navigator.userAgent.indexOf('Macintosh') != -1 && ev.metaKey && !ev.altKey && String.fromCharCode(key).toLowerCase() == 'a')	// Select all on Mac
        || (navigator.userAgent.indexOf('Macintosh') == -1 && ev.ctrlKey && !ev.altKey && String.fromCharCode(key).toLowerCase() == 'a')	// Select all on Windows
        )
    {
        ev.preventDefault();
        void (0);           // CANCEL LAST EVENT (probably unnecessary)
        if (dprv_record_IP != "off")
        {
            dprv_error_log("Low", "Forbidden Control Key combination");
        }
        return false;
    }
    return true;
}


function dprv_addLoadEvent(func)
{ 
    if (typeof window.onload != 'function')
    { 
        window.onload = func; 
    }
    else
    { 
        var oldonload = window.onload;
        window.onload = function()
        { 
            if (oldonload)
            { 
                oldonload(); 
            }
            func(); 
        } 
    } 
} 
function dprv_copy_frustrate()
{
    if (typeof dprv_unlockPage == 'undefined' || dprv_unlockPage !== true)
    {
        if (dprv_isMobile())
        {
            // Prevent Hold-Touch and context menu (entire page)
            dprv_noMobileCopy();
            // Prevent Control Key combinations (like CTRL A, CTRL U)
            dprv_disableCtrlKeys();
        }
        else
        {
            // Prevent Right-Clicking (entire page)
            dprv_disableRightClick();

            // Prevent Drag (entire page)
            dprv_disableDrag(document.body);

            // Prevent Control Key combinations (like CTRL A, CTRL U)
            dprv_disableCtrlKeys();

            // Disable selection
            dprv_disableSelection(document.body);
        }
    }
}

// Set up dprv_copy_frustrate to run after load
if (window.addEventListener)
{
    window.addEventListener('load', dprv_copy_frustrate, false);	// For modern browsers
}
else
{
    if (window.attachEvent)
    {
        window.attachEvent('onload', dprv_copy_frustrate);			// For older versions of IE
    }
    else
    {
        dprv_addLoadEvent(dprv_copy_frustrate);						// Do it the old way (should never get here)
    }
}


function dprv_error_log(severity, message)
{
	if (severity == null)
	{
		severity = "Low";
	}
	var url = document.URL.replace(dprv_site_url, "").replace("http://","").replace("https://","");
	if (url.substr(0,1) == "/")
	{
		url = url.substr(1);
	}
	url = encodeURIComponent(url);
	jQuery(document).ready(function($) 
	{
		// This does the ajax request
		$.ajax({
			url: dprv_ajax_url,
			data:
			{
				'action':'dprv_log_event',
				'severity':severity,
				'message' : message,
				'url':url
			},
			success:function(data)
			{
				// This outputs the result of the ajax request
				//alert(data);	(not interested in response, hopefully logged ok
			},
			error: function(errorThrown){}
		});  
				  
	});
}

function dprv_enableMobileInputElements(target)
{
    for (var t = 0; t < dprv_inputTags.length; t++)
    {
        var inputElements = target.getElementsByTagName(dprv_inputTags[t]);
        for (var i = 0; i < inputElements.length; i++)
        {
            dprv_enableMobileSelection(inputElements[i]);
        }
    }
    function dprv_enableMobileSelection(target)
    {
        dprv_turn_on_select_style(target);
        if (typeof target.style["-webkit-touch-callout"] != 'undefined')   // works on Safari/iOS
        {
            target.style["-webkit-touch-callout"] = "default";
        }
        else
        {
            if (typeof target.style["touch-callout"] != 'undefined')     // not supported yet - for future use
            {
                target.style["touch-callout"] = "default";
            }
        }
    }
}

function dprv_disableImageElements(target)
{
    for (var t = 0; t < dprv_imageTags.length; t++)
    {
        var imageElements = target.getElementsByTagName(dprv_imageTags[t]);
        for (var i = 0; i < imageElements.length; i++)
        {
            dprv_disableElement(imageElements[i]);
        }
    }
    var anchorElements = target.getElementsByTagName("a");
    for (i = 0; i < anchorElements.length; i++)
    {
        dprv_disableElement(anchorElements[i]);
    }
}
function dprv_disableElement(target)
{
    if (typeof target.style["-webkit-touch-callout"] != 'undefined')   // works on Safari/iOS
    {
        target.style["-webkit-touch-callout"] = "none";
    }
    else
    {
        if (typeof target.style["touch-callout"] != 'undefined')     // not supported yet - for future use
        {
            target.style["touch-callout"] = "none";
        }
        else
        {
            // TODO: This for android/android and other combinations not supporting contextmenu event or touch-callout
            // TODO: add disableImagePointersOnMobile == true
            if (typeof target.style["pointer-events"] != 'undefined' && 0 == 0)
            {
                // This is a blunt instrument - stops all pointer events, could stop legitimate actions
                //target.style["pointer-events"] = 'none';
            }
        }
    }
}

var dprv_t;
var dprv_startTime;

function dprv_noMobileCopy()
{
    dprv_disableImageElements(document.body);
    dprv_turn_off_select_style(document.body);
    document.body.style["-webkit-touch-callout"] = "none";
    dprv_enableMobileInputElements(document.body);

    document.addEventListener('contextmenu', dprv_killContextMenu, true);
    document.addEventListener('copy', dprv_killCopy, true);

    document.addEventListener('touchstart', dprv_touchStarted, true);
    document.addEventListener('touchend', dprv_touchEnded, true);
    document.addEventListener('touchcancel', dprv_touchCancelledOrMoved, true);
    document.addEventListener('touchmove', dprv_touchCancelledOrMoved, true);
}
function dprv_touchStarted(ev)
{
    var touchCount = ev.touches.length;
    if (touchCount > 1)
    {
        clearTimeout(dprv_t);
        return;
    }
    dprv_startTime = new Date().valueOf();
    dprv_t = setTimeout("dprv_manage_warning('longtouched', '')", 1000);
}
function dprv_touchEnded(ev)
{
    elapsedTime = new Date().valueOf() - dprv_startTime;
    if (ev.touches.length > 0 || elapsedTime < 900)
    {
        clearTimeout(dprv_t);
    }
}
function dprv_touchCancelledOrMoved(ev)
{
    clearTimeout(dprv_t);
}
function dprv_killContextMenu(ev)
{
    var b = dprv_arrayContains(dprv_inputTags, ev.target.tagName);
    if (!b)
    {
        clearTimeout(dprv_t);
        ev.preventDefault();
        dprv_noCopyMessage(ev);
    }
}
function dprv_killCopy(ev)
{
    var b = dprv_arrayContains(dprv_inputTags, ev.target.tagName);
    if (!b)
    {
        ev.preventDefault();
    }
    dprv_noCopyMessage(ev);
}

function dprv_noCopyMessage(ev)
{
    var eventMessage = dprv_evalEvent(ev);
    dprv_manage_warning("long-touched (tried to select)", eventMessage);
}
function dprv_arrayContains(stringHaystack, stringNeedle)
{
    for (var i = 0; i < stringHaystack.length; i++)
    {
        if (stringHaystack[i].toLowerCase() == stringNeedle.toLowerCase())
        {
            return true;
        }
    }
    return false;
}
function dprv_isMobile()
{
    var n = navigator.userAgent.toLowerCase();
    var mobileTells = new Array("ipad", "ipod", "iphone", "android", "mobile", "windows phone", "blackberry", "opera mini", "operamobi", "silk/", "kindle");
    for (var i = 0; i < mobileTells.length; i++)
    {
        if (n.indexOf(mobileTells[i]) > -1)
        {
            return true;
        }
    }
    return false;
}

//]]>