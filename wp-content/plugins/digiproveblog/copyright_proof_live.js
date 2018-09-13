var dprv_justDisplayed = 0;
var dprv_record_IP = dprv_js_bridge.record_IP;
var dprv_site_url = dprv_js_bridge.site_url;
var dprv_ajax_url = dprv_js_bridge.ajax_url;
var dprv_noRightClickMessage = dprv_js_bridge.noRightClickMessage;
var dprv_attributeCaption = dprv_js_bridge.attributeCaption;

function dprv_DisplayAttributions(attribution_text)
{
    document.getElementById("dprv_attribution").innerHTML = attribution_text;
    document.getElementById("dprv_attribution").title = dprv_attributeCaption;
    document.getElementById("dprv_attribution").onmouseover = "";
    }
function dprv_DisplayLicense(post_id)
{
    document.getElementById('license_panel' + post_id).style.display='block';
    document.getElementById('license_panel' + post_id).style.zIndex='2';
}
function dprv_HideLicense(post_id)
{
    document.getElementById('license_panel' + post_id).style.display='none';
}
