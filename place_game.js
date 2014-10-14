/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//document.getElementById('main').innerHTML = 'Does this work?';



function get_width()
{
    var x = 0;
    if (self.innerHeight)
    {
        x = self.innerWidth;
    }
    else if (document.documentElement && document.documentElement.clientHeight)
    {
        x = document.documentElement.clientWidth;
    }
    else if (document.body)
    {
        x = document.body.clientWidth;
    }
    return x;
}

function loadXMLDoc(filename) {
    if (window.XMLHttpRequest)
      {
      xhttp=new XMLHttpRequest();
      }
    else // code for IE5 and IE6
      {
      xhttp=new ActiveXObject("Microsoft.XMLHTTP");
      }
    xhttp.open("GET",filename,false);
    xhttp.send();
    return xhttp.responseXML;
}


function build_header(html_string, ngame, user_ID) {
    html_string = html_string.concat("<h1>");
    html_string = html_string.concat("Steam User ID: " + user_ID + "  ||  ");
    html_string = html_string.concat(ngame + " Steam Games");
    html_string = html_string.concat("</h1>");
    return html_string;
}

function build_game_html() {

    // Load XML from a file on the web server
    var filename = "steam_games_list_metaljoints.xml";
    var game_list_XML = loadXMLDoc(filename);
    var root = game_list_XML.documentElement;
    var game_list = root.getElementsByTagName('game');
    var root = game_list_XML.documentElement;
    var info =  root.getElementsByTagName('info');
    
    var user_ID = info[0].getElementsByTagName("user_ID")[0].childNodes[0].nodeValue;
    var ngame = info[0].getElementsByTagName("num_games")[0].childNodes[0].nodeValue;
    //get screen width
    var sw = get_width();
    console.log("screen width: "+ sw);
    console.log("client width: "+ document.documentElement.clientWidth );
    console.log("client width: "+ document.body.clientWidth );
    
    var item_width = 200;  
    //num_rows= Math.floor(sw/item_width);
    num_rows= 4;
    
    console.log("rows " + num_rows);
    var base_wiki_url = 'http://en.wikipedia.org/wiki/';
    var base_steam_url = "http://store.steampowered.com/app/";
    var html_string = '';
    html_string = build_header(html_string, ngame, user_ID);
    console.log(html_string);
    //html_string = html_string.concat("<table border='1'>");
    html_string = html_string.concat("<table>");
    row_count = 0;
    for(i=0;i<game_list.length;i++) {
        var game_name = game_list[i].getAttribute('name');
        var app_ID = game_list[i].getElementsByTagName('app_ID')[0].childNodes[0].nodeValue;
        var wiki_link_found = game_list[i].getElementsByTagName('wiki_link_found')[0].childNodes[0].nodeValue;
        var wiki_link = game_list[i].getElementsByTagName('wiki_string')[0].childNodes[0].nodeValue;
        var dev = game_list[i].getElementsByTagName('developer')[0].childNodes[0].nodeValue;
        var pub = game_list[i].getElementsByTagName('publisher')[0].childNodes[0].nodeValue;
        var rd = game_list[i].getElementsByTagName('release_date')[0].childNodes[0].nodeValue;
        
        //replace Trademarks and Reserved
        game_name = game_name.replace("\\u2122", "&#x2122");
        game_name = game_name.replace("\\u2122", "&#x2122");
        game_name = game_name.replace("\\u00ae", "&#x00ae");
        game_name = game_name.replace("\\u00ae", "&#x00ae");
        
        if (wiki_link_found === "False") wiki_link_found=false;
        if (wiki_link_found === "True") wiki_link_found=true;
        if (row_count ===0) html_string = html_string.concat("<tr>");
        if (row_count < num_rows) {
            html_string = html_string.concat("<td> ");
            html_string = html_string.concat("<div id=\"game_box\">");

            html_string = html_string.concat("<div id=\"name_div\">");
            html_string = html_string.concat(game_name);
            html_string = html_string.concat("</div>");

            html_string = html_string.concat("<div id=\"text_div\">");
            html_string = html_string.concat("App ID: " + app_ID + "  ");
            
            if (wiki_link_found) {
                var wiki_url = base_wiki_url.concat(wiki_link);
                html_string = html_string.concat("<a href=\"" + wiki_url + "\"><img src=\"wikipedia-icon.png\"></a>");
                html_string = html_string.concat("    ");
            }
            var steam_url = base_steam_url.concat(app_ID);
            html_string = html_string.concat("<a href=\"" + steam_url + "\"><img src=\"steam_icon.png\"></a>");
            
            html_string = html_string.concat("</div>");
             
            //developer
            html_string = html_string.concat("<div id=\"text_div\">");
            html_string = html_string.concat("Developer: " + dev);
            html_string = html_string.concat("</div>");
            
            //publisher
            html_string = html_string.concat("<div id=\"text_div\">");
            html_string = html_string.concat("Publisher: " + pub);
            html_string = html_string.concat("</div>");
         
            //release date
            html_string = html_string.concat("<div id=\"text_div\">");
            html_string = html_string.concat("Release date: " + rd);
            html_string = html_string.concat("</div>");            
            
            //end game box
            html_string = html_string.concat("</div>");
            html_string = html_string.concat(" </td>");
            row_count++;
        }
        if (row_count ===num_rows) {
            html_string = html_string.concat("</tr>");
            row_count = 0;
        }
    }
    html_string = html_string.concat("</table>");
    document.getElementById('main').innerHTML = html_string;
}
