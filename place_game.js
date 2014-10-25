/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function build_main() {
    console.log("main element laoded");
    
    //global game_array
    game_array = build_game_array();
    
    //global header string
    header_string = build_header();
    
    // global sorting button
    button_str = build_button();
    
    // global last sorting function called
    last_sort = null;
    
    var body_string = "";
    body_string = body_string.concat(header_string);
    
    body_string = body_string.concat(button_str);
    
    var game_table_str = build_game_html();
    
    body_string = body_string.concat(game_table_str);
    
    document.getElementById('main').innerHTML = body_string;
}

function rebuild_main() {
    // Use this function after game list is sorted or some other change is desired
    var body_string = "";
    body_string = body_string.concat(header_string);
    
    body_string = body_string.concat(button_str);
    
    var game_table_str = build_game_html();
    
    body_string = body_string.concat(game_table_str);
    
    document.getElementById('main').innerHTML = body_string;    
}

function rebuild_main_with_labels(table_delim) {
    // Use this function after game list is sorted or some other change is desired
    var body_string = "";
    body_string = body_string.concat(header_string);
    
    body_string = body_string.concat(button_str);
    
    var game_table_str = build_special_html(table_delim);
    
    body_string = body_string.concat(game_table_str);
    
    document.getElementById('main').innerHTML = body_string;    
}



function Game(name, appID, pub, dev, release_date, wiki_link_found, wiki_string) {
    this.name = name;
    this.appID = appID;
    this.publisher = pub;
    this.developer = dev;
    this.release_date = release_date;
    this.wiki_link_found = wiki_link_found;
    this.wiki_string = wiki_string;
}

Game.prototype.print_data = function() {
    console.log("Name: " + this.name);
};


function sort_year(a,b) {
    if (a["release_date"] > b["release_date"])
      return -1;
    if (a["release_date"] < b["release_date"])
      return 1;
    return sort_name(a,b);  
}

function sort_name(a,b) {
    if (b['name'] > a['name'])
      return -1;
    if (b['name'] < a['name'])
      return 1;
    return 0;  
}

function sort_publisher(a,b) {
    if (b['publisher'] > a['publisher'])
      return -1;
    if (b['publisher'] < a['publisher'])
      return 1;
    return 0;  
}

function sort_developer(a,b) {
    if (b['developer'] > a['developer'])
      return -1;
    if (b['developer'] < a['developer'])
      return 1;
    return 0;  
}

function sort_appID(a,b) {
    if (parseInt(a['appID']) > parseInt(b['appID']))
      return -1;
    if (parseInt(a['appID']) < parseInt(b['appID']))
      return 1;
    return 0;  
}

function game_list_sort_year() {
    game_array.sort(sort_year);    
    rebuild_main_with_labels("release_date");
}

function game_list_sort_name() {
    game_array.sort(sort_name);
    rebuild_main();
}

function game_list_sort_appID() {
    game_array.sort(sort_appID);
    rebuild_main();
}

function game_list_sort_publisher() {
    game_array.sort(sort_publisher);
    rebuild_main_with_labels("publisher");
}

function game_list_sort_developer() {
    game_array.sort(sort_developer);
    rebuild_main_with_labels("developer");
}




function get_width()
{
    var x = 0;
    if (self.innerHeight) x = self.innerWidth;
    else if (document.documentElement && document.documentElement.clientHeight) {
        x = document.documentElement.clientWidth;
    }
    else if (document.body) x = document.body.clientWidth;
    return x;
}

function loadXMLDoc(filename) {
    if (window.XMLHttpRequest) xhttp=new XMLHttpRequest();
    else xhttp=new ActiveXObject("Microsoft.XMLHTTP"); // code for IE5 and IE6
    xhttp.open("GET",filename,false);
    xhttp.send();
    return xhttp.responseXML;
}


function build_header() {
    var header_str = "";
    // Load XML from a file on the web server
    var filename = "steam_games_list_metaljoints.xml";
    var game_list_XML = loadXMLDoc(filename);
    var root = game_list_XML.documentElement;
    var root = game_list_XML.documentElement;
    var info =  root.getElementsByTagName('info');
    
    var user_ID = info[0].getElementsByTagName("user_ID")[0].childNodes[0].nodeValue;
    var ngame = info[0].getElementsByTagName("num_games")[0].childNodes[0].nodeValue;
    header_str = header_str.concat("<h1>");
    header_str = header_str.concat("Steam User ID: " + user_ID + "  ||  ");
    header_str = header_str.concat(ngame + " Steam Games");
    header_str = header_str.concat("</h1>");
    return header_str;
}


function build_button() {   
    var button_html = "<div id=\"org_buttons_div\">";
    button_html = button_html.concat("<button type=\"button\" onclick=\"game_list_sort_name()\">Name</button> ");    
    button_html = button_html.concat("<button type=\"button\" onclick=\"game_list_sort_appID()\">App ID</button> ");
    button_html = button_html.concat("<button type=\"button\" onclick=\"game_list_sort_publisher()\">Publisher</button> ");
    button_html = button_html.concat("<button type=\"button\" onclick=\"game_list_sort_developer()\">Developer</button> ");
    button_html = button_html.concat("<button type=\"button\" onclick=\"game_list_sort_year()\">Release Date</button> ");    
    button_html = button_html.concat("</div><br>");
    return button_html;
}

function build_game_array() {

    // Load XML from a file on the web server
    var filename = "steam_games_list_metaljoints.xml";
    var game_list_XML = loadXMLDoc(filename);
    var root = game_list_XML.documentElement;
    var game_list = root.getElementsByTagName('game');
    
    var game_array = [];
    for(i=0;i<game_list.length;i++) {
        var game_name = game_list[i].getAttribute('name');
        var app_ID = game_list[i].getElementsByTagName('app_ID')[0].childNodes[0].nodeValue;
        var wiki_link_found = game_list[i].getElementsByTagName('wiki_link_found')[0].childNodes[0].nodeValue;
        var wiki_link = game_list[i].getElementsByTagName('wiki_string')[0].childNodes[0].nodeValue;
        var dev = game_list[i].getElementsByTagName('developer')[0].childNodes[0].nodeValue;
        var pub = game_list[i].getElementsByTagName('publisher')[0].childNodes[0].nodeValue;
        var rd = game_list[i].getElementsByTagName('release_date')[0].childNodes[0].nodeValue;
        
        if (wiki_link_found === "False") wiki_link_found=false;
        if (wiki_link_found === "True") wiki_link_found=true;
        
        //replace Trademarks and Reserved with their correct html code
        game_name = game_name.replace("\\u2122", "&#x2122");
        game_name = game_name.replace("\\u2122", "&#x2122");
        game_name = game_name.replace("\\u00ae", "&#x00ae");
        game_name = game_name.replace("\\u00ae", "&#x00ae");
        
        var game = new Game(game_name, app_ID, pub, dev, rd, wiki_link_found, wiki_link);
        game_array[game_array.length] = game;
        
        //game.print_data();        
    }    
    return game_array;
}

function build_game_html() {
    
    html_string = "";
    html_string = html_string.concat("<table>");
    
    var base_wiki_url = 'http://en.wikipedia.org/wiki/';
    var base_steam_url = "http://store.steampowered.com/app/";
    
    //get screen width
    var sw = get_width();
    console.log("screen width: "+ sw);
    console.log("client width: "+ document.documentElement.clientWidth );
    console.log("client width: "+ document.body.clientWidth );
    
    var item_width = 200;
    //num_rows= Math.floor(sw/item_width);
    num_rows= 4;
    
    console.log("rows " + num_rows);
    
    row_count = 0;    
    for(i=0;i<game_array.length;i++) {    
        if (row_count ===0) html_string = html_string.concat("<tr>");
        if (row_count < num_rows) {
            var game_temp = game_array[i];
            
            html_string = html_string.concat("<td> ");
            html_string = html_string.concat("<div id=\"game_box\">");

            html_string = html_string.concat("<div id=\"name_div\">");
            html_string = html_string.concat(game_temp.name);
            html_string = html_string.concat("</div>");

            html_string = html_string.concat("<div id=\"text_div\">");
            html_string = html_string.concat("App ID: " + game_temp.appID + "  ");
            
            if (game_temp.wiki_link_found) {
                var wiki_url = base_wiki_url.concat(game_temp.wiki_string);
                html_string = html_string.concat("<a href=\"" + wiki_url + "\"><img src=\"wikipedia-icon.png\"></a>");
                html_string = html_string.concat("    ");
            }
            var steam_url = base_steam_url.concat(game_temp.appID);
            html_string = html_string.concat("<a href=\"" + steam_url + "\"><img src=\"steam_icon.png\"></a>");
            
            html_string = html_string.concat("</div>");
             
            //developer
            html_string = html_string.concat("<div id=\"text_div\">");
            html_string = html_string.concat("Developer: " + game_temp.developer);
            html_string = html_string.concat("</div>");
            
            //publisher
            html_string = html_string.concat("<div id=\"text_div\">");
            html_string = html_string.concat("Publisher: " + game_temp.publisher);
            html_string = html_string.concat("</div>");
         
            //release date
            html_string = html_string.concat("<div id=\"text_div\">");
            html_string = html_string.concat("Release date: " + game_temp.release_date);
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
    return html_string;
}


function build_special_html(table_delim) {
    
    html_string = "";
    console.log("table label: " + table_delim);
    var base_wiki_url = 'http://en.wikipedia.org/wiki/';
    var base_steam_url = "http://store.steampowered.com/app/";
    
    //get screen width
    //var sw = get_width();
    var item_width = 200;
    //num_columns= Math.floor(sw/item_width);
    num_columns= 4;
    
    current_table = "";
    table_open = false;
    
    c_count = 0;
    for(i=0;i<game_array.length;i++) {
        var game_temp = game_array[i];
        
        //make new table if field is different than current table
        if (game_temp[table_delim] !== current_table) {
           current_table = game_temp[table_delim];
           if (table_open) html_string = html_string.concat("</table>");
           html_string = html_string.concat("<div id=\"table_name_div\">" + game_temp[table_delim] + "</div>");
           html_string = html_string.concat("<table>");
           table_open = true;
           c_count = 0;
        }
        
        if (c_count ===0) html_string = html_string.concat("<tr>");
        if (c_count < num_columns) {      
                    
            html_string = html_string.concat("<td> ");
            html_string = html_string.concat("<div id=\"game_box\">");

            html_string = html_string.concat("<div id=\"name_div\">");
            html_string = html_string.concat(game_temp.name);
            html_string = html_string.concat("</div>");

            html_string = html_string.concat("<div id=\"text_div\">");
            html_string = html_string.concat("App ID: " + game_temp.appID + "  ");
            
            if (game_temp.wiki_link_found) {
                var wiki_url = base_wiki_url.concat(game_temp.wiki_string);
                html_string = html_string.concat("<a href=\"" + wiki_url + "\"><img src=\"wikipedia-icon.png\"></a>");
                html_string = html_string.concat("    ");
            }
            var steam_url = base_steam_url.concat(game_temp.appID);
            html_string = html_string.concat("<a href=\"" + steam_url + "\"><img src=\"steam_icon.png\"></a>");
            
            html_string = html_string.concat("</div>");
             
            //developer
            html_string = html_string.concat("<div id=\"text_div\">");
            html_string = html_string.concat("Developer: " + game_temp.developer);
            html_string = html_string.concat("</div>");
            
            //publisher
            html_string = html_string.concat("<div id=\"text_div\">");
            html_string = html_string.concat("Publisher: " + game_temp.publisher);
            html_string = html_string.concat("</div>");
         
            //release date
            html_string = html_string.concat("<div id=\"text_div\">");
            html_string = html_string.concat("Release date: " + game_temp.release_date);
            html_string = html_string.concat("</div>");            
            
            //end game box
            html_string = html_string.concat("</div>");
            html_string = html_string.concat(" </td>");
            c_count++;
        }
        if (c_count ===num_columns) {
            html_string = html_string.concat("</tr>");
            c_count = 0;
        }
    }
    html_string = html_string.concat("</table>");
    return html_string;
}