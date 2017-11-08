//<SCRIPT LANGUAGE="JavaScript">
<!--

IE = (navigator.appName == "Microsoft Internet Explorer");

  //Used to grab today's date
function DateStamp(txtbx,format) {
 today=new Date()
   //fix for old vs new method (getYear is deprecated in JS 1.3)
 todayy = today.getFullYear ? today.getFullYear() : today.getYear();
 todayd=today.getDate();
 todaym=today.getMonth()+1;
   //Quarters
 if (todaym >= 1 && todaym <= 3) { quarter = "01"; }
 else if (todaym >= 4 && todaym <= 6) { quarter = "02"; }
 else if (todaym >= 7 && todaym <= 9) { quarter = "03"; }
 else if (todaym >= 10 && todaym <= 12) { quarter = "04"; }
 todayq=todayy+quarter;

 if (format == "basic4form") {
  if (typeof(txtbx) == 'string') { eval(txtbx + ".value = todaym+'\/'+todayd+'\/'+todayy"); }
  else if (typeof(txtbx) == 'object') { txtbx.value = todaym+'\/'+todayd+'\/'+todayy; }
 } else if (format == "full4form") {
  month = new Array(13)
   month[1] = "January"
   month[2] = "February"
   month[3] = "March"
   month[4] = "April"
   month[5] = "May"
   month[6] = "June"
   month[7] = "July"
   month[8] = "August"
   month[9] = "September"
   month[10] = "October"
   month[11] = "November"
   month[12] = "December"
   month[13] = "Spendtember"
  if (typeof(txtbx) == 'string') { eval(txtbx + ".value = month[todaym]+' '+todayd+', '+todayy"); }
  else if (typeof(txtbx) == 'object') { txtbx.value = month[todaym]+' '+todayd+', '+todayy; }
 } else if (format == "4QY") { //1Q/2000 -> Winter 2000
  if(txtbx.indexOf("$") == 0) { //used as a variable
   quarter = txtbx.substring(1).split("/");
   if(quarter[0] == "1Q") { quarter[0] = "Winter"; }
   else if(quarter[0] == "2Q") { quarter[0] = "Spring"; }
   else if(quarter[0] == "3Q") { quarter[0] = "Summer"; }
   else if(quarter[0] == "4Q") { quarter[0] = "Fall"; }
   return quarter[0] + " " + quarter[1];
  } else if (typeof(txtbx) == 'string') { eval(txtbx + ".value = month[todaym]+' '+todayd+', '+todayy"); }
  else if (typeof(txtbx) == 'object') { txtbx.value = month[todaym]+' '+todayd+', '+todayy; }
 }
}

  //Used to change numbers from "1" to "1st"
function numberSuffix(number) {
 var suffix;
 last2 = number % 100;
 last = number % 10;

 if (last2 < 10 || last2 > 13) {
  if (last == 1) { suffix = "st"; }
  else if (last == 2) { suffix = "nd"; }
  else if (last == 3) { suffix = "rd"; }
  else { suffix = "th"; }
 }
 else { suffix = "th"; }
 return number + suffix;
}


  //Used to prevent editing of textboxes
function nonEdit(txtbx) { txtbx.blur(); }


  //Used to fill/check "Other" option buttons and boxes
function otherOption(type,Formname,Origin,Destination) {
   //example: ONCHANGE="otherOption('box',this.form.name,this,'payExpenses[3]');"
   //if Origin/Destination is Radio/Checkbox it should be given in array form (ie, Radio[3])
 if (type == 'button') {
  if (Origin.checked == true) { eval('document.' + Formname + '.' + Destination).focus(); }
   //this never happens with Radios when they're unchecked
  else { eval('document.' + Formname + '.' + Destination).value = ''; }
 }
 else if (type == 'box') {
  if (Origin.value.length >0) {
   eval('document.' + Formname + '.' + Destination + '.value = "' + Origin.value + '"');
   eval('document.' + Formname + '.' + Destination + '.checked = true');
  }
  else {
   eval('document.' + Formname + '.' + Destination + '.value = "Other"');
   eval('document.' + Formname + '.' + Destination + '.checked = false');
  }
 }
}


  //Used to create standard popup window, only changing focus if requesting same URL if onsite
  //Error checks for offsite vs onsite links to avoid location check permission denied error.
  //Accepts both this object and string (this.href can throw error).
     var popupWindow = new Object();
function popup(Location,Target,Width,Height,Type) {
   //if onsite pages these have changed domain to domain.com via headerfooter.js
 var domained = ".html .cfm .pl"; //
 if(!window.offsite) { window.offsite = -1; } //default setting
 
 Locationre = /w+[0-9]*\./; //to check w/o www3 etc
 if(typeof(Location) == "object" && document.location.host.replace(Locationre, "").search(Location.hostname.replace(Locationre, "")) == 0) { //turn location object into string for onsite
  Locationstr = Location.pathname + Location.search + Location.hash;
    //adjusts for IE vs NN pathname formats
  if(Locationstr.substring(0,1) != "/") { Locationstr = "/" + Locationstr; }
  Locationstr = Location.protocol + "//" + Location.hostname + Locationstr;
 }
 else { Locationstr = Location + ""; } //forces stringiness

   //makes Locationstr a full-figured URL
 if(Locationstr.search("http:") == -1 && Locationstr.search("https:") == -1 && Locationstr.search("file:") == -1) {
  if(Locationstr.search(/^\//) == -1) {
   Locationstr = "http://" + document.location.hostname + location.pathname.substring(0,location.pathname.lastIndexOf('/')) + "/" + Locationstr;
  } else  { Locationstr = "http://" + document.location.hostname + Locationstr; }
 }

   // Establishes standard H & W
 if (!Target) { Target = "popup"; }
 if (!Type) { Type = Target; }
  var winname = Target;
  WidthT = 450; HeightT = 330; //defaults
 if (Type == "eTour") { WidthT = 800; HeightT = 550; }
 if (Type == "eWorkbook") { WidthT = 800; HeightT = 600; }
 if (Type == "hurbisCherrier") { WidthT = 930; HeightT = 670; }
 if (Type == "postcard") { WidthT = 400; HeightT = 400; }
 if (Type == "onSite") { WidthT = 580; HeightT = 300; }
 if (Type == "VirtualClassroom" || Type == "sample") { WidthT = 560; HeightT = 550; }
 if (Type == "VirtualClassroomBig") { WidthT = 700; HeightT = 550; }
 if (Type == "soundbyte") { WidthT = 250; HeightT = 100; }
 if (Type == "HelpPane") { //a tall window pane on the right
  if(IE) { WidthT = screen.availWidth * .4; HeightT = screen.availHeight * .9; } //stupid IE workaround
  else { WidthT = window.outerWidth * .4; HeightT = window.outerHeight * .9; }
 }
 if (Type == "WebLinks" || Type == "offsite" || Type == "Evolveoffsite" || Type == "Evolve" || Type == "percent") { //easily seen it's a new window cuz it's smaller
  if(IE) { WidthT = screen.availWidth * .9; HeightT = screen.availHeight * .75; } //stupid IE workaround
  else { WidthT = window.outerWidth * .9; HeightT = window.outerHeight * .75; }
 }
 if (!Width) { Width = WidthT; }
 if (!Height) { Height = HeightT; }

   // Establishes standard windows based on name, creating window if closed
 if(popupWindow[winname] == null || popupWindow[winname].closed == true) {
  if (Type == "full")
   { window.popupWindow[winname] = window.open(Locationstr, Target, "toolbar=1,location=1,directories=1,status=1,menubar=1,scrollbars=yes,resizable=yes,width=" + Width + ",height=" + Height); }
  else if (Type == "HelpPane")
   { window.popupWindow[winname] = window.open(Locationstr, Target, "toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=yes,resizable=yes,personalbar=0,width=" + Width + ",height=" + Height + ",screenX=600,screenY=40"); }
  else if (Type == "WebLinks" || Type == "offsite" || Type == "Evolve" || Type == "percent")
   { window.popupWindow[winname] = window.open(Locationstr, Target, "toolbar=1,location=1,directories=0,status=1,menubar=1,scrollbars=yes,resizable=yes,personalbar=0,width=" + Width + ",height=" + Height + ",screenX=50,screenY=20"); }
  else if (Type == "Course")
   { window.popupWindow[winname] = window.open(Locationstr, Target, "toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=yes,resizable=yes,personalbar=0,width=" + Width + ",height=" + Height + ",screenX=0,screenY=0"); }
  else if (Type == "Evolveoffsite")
   { window.popupWindow[winname] = window.open(Locationstr, Target, "toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=yes,resizable=yes,personalbar=0,width=" + Width + ",height=" + Height + ",screenX=50,screenY=20"); }
  else if (Type == "sample") //sample of content
   { window.popupWindow[winname] = window.open(Locationstr, Target, "toolbar=1,location=0,directories=0,status=0,menubar=0,scrollbars=yes,resizable=yes,width=" + Width + ",height=" + Height); }
  else if (Type == "windowpane") //sample of content
   { window.popupWindow[winname] = window.open(Locationstr, Target, "toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=yes,resizable=yes,width=" + Width + ",height=" + Height); }
  else if (Type == "eWorkbook") //eWorkbook
   { window.popupWindow[winname] = window.open(Locationstr, Target, "toolbar=1,location=0,directories=0,status=0,menubar=1,scrollbars=yes,resizable=yes,width=" + Width + ",height=" + Height); }
  else if (Type == "VirtualClassroom") //eWorkbook
   { window.popupWindow[winname] = window.open(Locationstr, Target, "toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=yes,resizable=yes,width=" + Width + ",height=" + Height); }
  else if (Type == "VirtualClassroomBig") //eWorkbook
   { window.popupWindow[winname] = window.open(Locationstr, Target, "toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=yes,resizable=yes,width=" + Width + ",height=" + Height); }
  else //the default is basic
   { window.popupWindow[winname] = window.open(Locationstr, Target, "toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=yes,resizable=yes,width=" + Width + ",height=" + Height); }
  if (IE) { var firstTime = 1; } //used to avoid IE 5-6 error generated by first use of popup window
  else { var firstTime = 0; } //NS doesn't have error
 }
 popupWindow[winname].focus(); //force focus on new window--can fail miserably if unrequested windows disallowed
     //document.domain security on location property and NS4 throws error on if statement
  if ((offsite == -1 && Locationstr.search(document.domain) != -1 && domained.search(Locationstr.substring(Locationstr.lastIndexOf('.'))) != -1) && (!NS || ver != 4) && (firstTime != 1))
   { if (popupWindow[winname].location != Locationstr) { popupWindow[winname].location = Locationstr; } }
  else { popupWindow[winname].location = Locationstr; }


    //sets offsite window to avoid location error.  See domained variable above.
  if (Locationstr.search(document.location.host.replace(Locationre, "")) == -1 || domained.search(Locationstr.substring(Locationstr.lastIndexOf('.'))) == -1) { window.offsite = 1; }
  else { window.offsite = -1; }
}//END popup


 //grabs params from query string by name (Field); returns empty string if returnEmpty == 'true'
function grabParams(Field,returnEmpty){
 var mysearch = document.location.search; //for (un)framed sites with code on document
 window.onerror = locationError;  //if page is framed by other domain, next line creates error (possibly dead-end if no query string is found at all, even with different name)
 window.functionName = 'grabParams';
 if (mysearch.length < 1 && parent.document.domain == self.document.domain) { mysearch = parent.location.search; } //for framed sites with code on parent, if domain identical
 if (mysearch.length >= 1) {
  mysearch = mysearch.split("?");
  mysearch = mysearch[1].split(Field + "=");
  if (mysearch.length >= 2) { mysearch = mysearch[1].split("&",1); }
  else { mysearch[0] = ""; }
  mysearch = unescape(mysearch[0]);
  return mysearch;
 } else if(returnEmpty == 'true') { return ''; }
} //end grabParams()


function Message() {
 var message = grabParams('message');
   //NS 4.x needs URLencoded queries, Perl uses + as a space and this unecodes both
 if (message != "" && message != null) { alert(unescape(message.split("+").join(" "))); }
}


  //handles errors generated by location checks across domains by stifling error;
  //add window.onerror = locationError; to problem-generating code
  //send name of broken function/location via window.functionName = "bar";
  //NOTE: all modern browsers view xxx.example.com and example.com as different domains
  //instead, be sure to set all security domains to example.com
function locationError(msg,url,line) { //params come from browser's onError event
   //error lines
 mysearch = ""; //grabParams (Message)
   //grabParams throws a dead-end error if framed by other domain and no query string is found

   //this opens a popup with same URL and forces the opener back a step.
 if(window.functionName == 'grabParams' && top != self) {
  popup(document.location.href,'percent');
  history.go(-1);
 }
 
   //always do this
 return true;
}

  //The following 3 functions are used to validate fields on forms.  See /HS/PIN 2.0/register.html for example of use.
//Checks each field
function Trim(stringval)
{ 
 var len;
 len = stringval.length;
  if(len>0)
 {
 while(stringval.substring(0,1) == " "){ //trim left
   stringval = stringval.substring(1, len);
    len = stringval.length;
 }
  while(stringval.substring(len-1, len) == " "){ //trim right
   stringval = stringval.substring(0, len-1);
    len = stringval.length;
  }
 }
  return stringval;
}


function RequiredFieldsCheck(Formname) {
 for (var i=0; i<requiredFields.length; i++) {
  eval('myfield = ' + Formname + "." + requiredFields[i]);
    while (myfield == null || ((typeof(myfield.value) == "string") && (myfield.length <= 1 || myfield.value == ""))) { myfield.value = Trim(prompt(Messages[i],"")); }
  if (typeof(myfield.value) != "string") { alert("no " + field); myfield.value = "None"; }
  if (myfield.value == "null") { myfield.value = ""; return false; }
 }
}
//Ensures password and confirm password fields are identical
function RequiredFieldsCheckPassword(Formname,Password,PasswordConfirm) {
 eval('password = ' + Formname + "." + Password);
 eval('confirm = ' + Formname + "." + PasswordConfirm);
 if (password.value != confirm.value) {
  alert("Please retype your Password and re-Confirm. These must be identical.");
  password.value = ""; confirm.value = "";
  password.focus();
  return false;
 }
}
//Checks for proper email address format
function RequiredFieldsCheckEmail(Formname,fieldname,Message) {
 eval('email = ' + Formname + "." + fieldname);
 if (typeof(email.value.split("@")[1]) != "string" || email.value.split("@")[1] == "" || email.value.split("@")[1] == -1 || (email.value.split("@")[1].lastIndexOf('.') == -1 || email.value.split("@")[1].lastIndexOf('.') == email.value.split("@")[1].length - 1)) {
  if(Message) { alert(Message); }
  else { alert("Your email address is incorrectly formed. It should look like accountname@domain.com."); }
  email.focus();
  return false;
 }
}
//Makes sure field isn't empty and is numeric
function isNaNum(Formname,fieldname,type) {
 eval('numField = ' + Formname + "." + fieldname);
 if (type=="phone") { //allows specific chars in phone numbers
  var acceptRE = /[.\-+]+/g;
  number = numField.value.replace(acceptRE, "");
 } else { number = numField.value; }
 if (isNaN(number) || number == "") { return true; }
 else { return false; }
}


  //Used to read the shopping cart, also DM# and C# and any other cookies
function read_cart(cookieName) { //cookieName should include "=" at end
  if (document.cookie.length > 0) { //if any cookies exist
  offset = document.cookie.indexOf(cookieName); //start of $cookieName
  if(cookieName.indexOf('=')==-1) { offset++; } //accounts for = sign not in cookieName
    if (offset != -1) { //if cookie exists
      offset += cookieName.length; //moves from start to end of $cookieName
      end = document.cookie.indexOf(";",offset);
      if (end == -1) { end = document.cookie.length; }
      var result = unescape(document.cookie.substring(offset,end)); //returns all values
      if ((result == null) || (result == "") || (result == "undefined") || (result == "null") || (result == cookieName))
       { return ""; }
      else { return result; }
    }
    else { return -1; }
  }
  else { return -1; }
}


  //Used to build a cookie that expires in default (8) hours
function generate_cookie(cookie_text,expireAt,domain) {
  var today = new Date();
  var expire = new Date();
  if(!expireAt || expireAt == "") {//NS4?: expireAt == undefined
   expire.setTime(today.getTime() + 1000*60*60*8);
  } else if (expireAt == "NOW"){ expire.setTime(today.getTime() - 1000); }
  else { expire.setTime(today.getTime() + 1000*60*expireAt); } //expireAt in min
  if(!domain) { domain=".us.elsevierhealth.com"; }
  var cookie1 = (cookie_text + "; expires="+expire.toGMTString() + "; path=/; domain=" + domain);
  document.cookie = cookie1;
    //checks cookie's success
  if(expireAt != "NOW" && read_cart(cookie_text.split('=')[0])=="-1") {
   Error = 'Error: Cookies are required for this page to function while framed by a different Elsevier-owned domain.';
     //corrects for IE bug disallowing child frames from setting own cookies if domain different than parent
   if(IE && ver==6) { Error = Error + '\n\nPlease lower your Privacy setting to "Low" or allow cookies from "' + domain + '" in your browser by editing Tools - Internet Options - Privacy - Individual Web Sites.'; }
   else if(IE && ver==5) { Error = Error + '\n\nPlease lower your Security setting to "Medium".'; }
     //unknown other browser errors
   else { Error = Error + '\n\nPlease allow cookies from the domain "' + domain + '".'; }
   alert(Error);
   //exit();
  }
  //if(domain.indexOf("courseware") >= 0) { alert(cookie1); }
}


  //Used to check the cart for a specific item (can also check other cookies)
function check_cart(cart,ID) {
  if ((cart != null) && (cart != "null") && (cart != "undefined") && (cart != ""))
   { return cart.indexOf(ID); } //if cookie exists (-1 if ID not here)
  else { return -1; } //no such cookie
}


  //automatically checks checkboxes if they're in cookie. fields req'd: "all"=@cartFields or can be name of array
  // or can be |-separated list of fields. formName not req'd.  See CW2/.../devResources.html
function cart_prefill(fields,formName) {
 var thisCookie = read_cart(cookieName);
 if(!formName) { formName=eval('document.forms[0]'); }
 else { formName=eval('document.' + formName); }

 if (thisCookie != -1) { //only perform if cookie exists
    //check everything
  if(fields == "all") { fields = "cartFields"; } //default
    //check explicit fields
  else if ((fields.indexOf("|") >= 1 && !eval('window.'+fields.split("|")[0])) || !eval('window.'+fields)) {
   noFields = new Array; noFields = fields.split("|");
   fields = "noFields";
  } //else fields is array's name

  if(typeof(eval(fields)) == "object") { //checks for predefined array
   for(i=0;i<eval(fields).length;i++) {

      //single box not array of 1
    if(eval('formName.' + eval(fields + '[i]')).length == undefined) {
     if(thisCookie.indexOf(eval('formName.' + eval(fields + '[i]')).value) != -1)
      { eval('formName.' + eval(fields + '[i]')).checked = true; }
    } else { //multiple boxes
     for(j=0;j<eval('formName.' + eval(fields + '[i]')).length;j++) { //stupid IE: formName.eval(eval(fields)[i]).length
      if(thisCookie.indexOf(eval('formName.' + eval(fields + '[i]') + '[j]').value) != -1)
       { eval('formName.' + eval(fields + '[i]') + '[j]').checked = true; } //stupid IE
     }
    }
   } //END for i
  }
 } //END if cookie
}


  //Adds and removes from cart via checkbox (see separated functions below)  See CW2/.../devResources.html
  function add_removeCart(VAL,ID,formName) {
   var thisCookie = read_cart(cookieName);
   if(cookieName.indexOf('=')==-1) { cookieName = cookieName + '='; } //adds =
   if(!window.cookieTime) { window.cookieTime = ""; }
   if(typeof(VAL) == "object") { ID=VAL.name; VAL=VAL.value; }
   if(!formName) {
    if(!window.formName) { alert('Error on page.'); }
    else { formName=window.formName; }
   }

      //remove VAL
    if (thisCookie != -1 && (thisCookie.indexOf(VAL) != -1 || thisCookie.indexOf(VAL) >=1)) { //changes -VAL to VAL
     thisCookie = thisCookie.split(VAL).join("");
     checkedBox = eval('document.' + formName + '.' + ID); //the selected box

       //single box not array of 1
     if(checkedBox.length == undefined) {
      if(checkedBox.value == VAL) {
         //checkbox altered first, this corrects for improperly loaded page
       if(checkedBox.checked == true) { alert('Item is already selected'); }
       else { generate_cookie(cookieName + thisCookie,cookieTime,'.'+document.domain); }
      }
     } else { //multiple boxes
      for(i=0;i<checkedBox.length;i++) {
       if(checkedBox[i].value == VAL) {
          //checkbox altered first, this corrects for improperly loaded page
        if(checkedBox[i].checked == true) { alert('Item is already selected'); }
        else { generate_cookie(cookieName + thisCookie,cookieTime,'.'+document.domain); }
       }
      } //END for i
     } //END multibox
    }
      //add VAL
    else {
     if (thisCookie == -1) { thisCookie = ""; } //kills spurious datum
     generate_cookie(cookieName + thisCookie + VAL + "|",cookieTime,'.'+document.domain);
    }
  }


  //Adds items to cart
function add_to_cart(cart,ID,qty,loc,sts,promo) {
  if (qty) { quan = "[" + qty + "]"; } else { quan = ""; } 
  if (loc && sts) { peri = "(" + loc + sts + ")"; } //for periodicals; could create a long string of commaed stuff, only last will be good
  else { peri = ""; }
  if (promo) { promo = "<" + promo + ">"; }
  else { promo = ""; }
  if (cart.indexOf(ID) != -1 && cart.indexOf(ID) >=1) //changes -ID to ID
   { alert("]" + cart.indexOf(ID) + "[" + "This title is already in your Shopping Cart."); }
  else { generate_cookie("ShoppingCart=" + cart + quan + peri + promo + ID + "|"); }//new cookie, really
}


  //Removes items from cart
function remove_from_cart(cart,ID) {
  if (cart.indexOf(ID) != -1) { //if in SC
    cart = cart.split(ID).join();
    generate_cookie("ShoppingCart=" + cart); 
  } else { //if not in SC
    alert("ERROR!  Could not remove from shopping cart.");
  }
}


  //Used to grab & write the DM# and C#
function DMtracking(newDM,newCM) {
  var DM = read_cart('DMnum=');
  var CM = read_cart('Cnum=');
  if (DM != "" && DM != "62725") { //updates cookie timeout if already set
    generate_cookie("DMnum=" + DM);
  }
  else if (DM == "" && window.location.search.indexOf('dm=') != -1) { //uses URL's parameters to set cookie
    generate_cookie("DMnum=" + window.location.search.split('dm=')[1].split('&')[0]);
  }
  else if (DM == "" && newDM != null) { //uses function's calling parameters to set cookie
    generate_cookie("DMnum=" + newDM);
  }
  else { getDMCM('DM'); generate_cookie("DMnum=" + defaultDM); } //cookie comes from file's location or defaults

  if (CM != "" && CM != "62725") { //updates cookie timeout if already set
    generate_cookie("Cnum=" + CM);
  }
  else if (CM == "" && window.location.search.indexOf('cm=') != -1) { //uses URL's parameters to set cookie
    generate_cookie("Cnum=" + window.location.search.split('cm=')[1].split('&')[0]);
  }
  else if (CM == "" && newCM != null) { //uses function's calling parameters to set cookie
    generate_cookie("Cnum=" + newCM);
  }
  else { getDMCM('CM'); generate_cookie("Cnum=" + defaultCM); } //cookie comes from file's location or defaults
}
  //part of DMtracking()
function getDMCM(number) {
  var Deck = grabParams('source');
  if (Deck == "Anesthesia_Pain_Management") { defaultDM = "65820"; defaultCM = "20893"; }
  else if (Deck == "Dentistry") { defaultDM = "65821"; defaultCM = "20894"; }
  else if (Deck == "EMS-ER_Nursing") { defaultDM = "65822"; defaultCM = "20895"; }
  else if (Deck == "EMS-Fire") { defaultDM = "65823"; defaultCM = "20896"; }
  else if (Deck == "Home_Health") { defaultDM = "65824"; defaultCM = "20897"; }
  else if (Deck == "Maternal-Child") { defaultDM = "65825"; defaultCM = "20898"; }
  else if (Deck == "Medical") { defaultDM = "65826"; defaultCM = "20899"; }
  else if (Deck == "Nursing") { defaultDM = "65827"; defaultCM = "20900"; }
  else if (Deck == "Nursing_Administration") { defaultDM = "65828"; defaultCM = "20901"; }
  else if (Deck == "Orthopedic") { defaultDM = "65829"; defaultCM = "20902"; }
  else if (Deck == "Pathology") { defaultDM = "65830"; defaultCM = "20903"; }
  else if (Deck == "Pediatric") { defaultDM = "65831"; defaultCM = "20904"; }
  else if (Deck == "Veterinary") { defaultDM = "65832"; defaultCM = "20905"; }
  else { defaultDM = "62725"; defaultCM = "62725"; }
}


  //Listens to keystrokes and is usually used to jump to next textbox with focus()
var Key;
 
function KeyPress(what,e,max,action) {
 if (NS) {
  if (e.target.value.length >= max) {
   Key = e.keyCode;
   if (Key != '9' && Key != '16') { eval(action); }
  }
 }
 else if (IE) {
  if (what.value.length > (max-1)) {
   Key = window.event.keyCode;
   if (Key != '9' && Key != '16') { eval(action); }
  }
 }
}


  //expands lists and changes expansion indicator
function showExpando(eventNum, toggle){

  //very similar to showExpando, but customized for answers
if(typeof(eventNum)=="object") {
  IDbase=eventNum.id.split("-")[0];
  /* possible IDs (in future numbers may be added to end of second part):
     A### (main DIV)
     A###-b (reveal button)
     A###-a (revealed text beneath button)
     A###-iAn (revealed inline/correct answer; n is optional number for multiple correct) */
     
  window.revealed=document.getElementById(IDbase + "-a");
    //allows multiple correct answers!
  window.inlineAArray = new Array();
  if(document.getElementById(IDbase + "-iA")) {
    //window.inlineA
    window.inlineAArray.push(document.getElementById(IDbase + "-iA"));
  } else {
    i=1;
    while(document.getElementById(IDbase + "-iA" + i)) {
      window.inlineAArray.push(document.getElementById(IDbase + "-iA" + i));
      i++;
    }
  }
  
  if(revealed.style.display=='none' || revealed.style.display=='') {
   revealed.style.display='block';
   for(i=0;i<window.inlineAArray.length;i++) {
    inlineA=window.inlineAArray[i];
    if(inlineA && inlineA.className=="inlineAnswer") {
     if(inlineA.tagName=='P' || inlineA.tagName=='DIV') { inlineA.style.display='block'; }
     else { inlineA.style.display='inline'; }
    } else if(inlineA) { inlineA.className='correctAnswer'; }
   }
  } else if(revealed.style.display=='block') {
   revealed.style.display='none';
   for(i=0;i<window.inlineAArray.length;i++) {
    inlineA=window.inlineAArray[i];
    if(inlineA && inlineA.className=="inlineAnswer") { inlineA.style.display='none'; }
    else if(inlineA) { inlineA.className=''; }
   }
  }
  
  return false; //so HREF isn't executed

} else { //classic style
   //toggle may be "on" or "off" and it will do exactly that
 var m = "m"+eventNum; //menu to be expanded/contracted
 var e = "e"+eventNum; //expanded (-)
 var c = "c"+eventNum; //contracted (+)
   //added "block" to .all for nonsolus implementation 01/03 (IE & expanding table)
 if(document.all) {
  if(eval(m).style.display=='' || eval(m).style.display=='block' || toggle == 'off') { eval(m).style.display='none'; eval(e).style.display='none'; eval(c).style.display=''; }
  else { eval(m).style.display=''; eval(m).style.display='block'; eval(e).style.display=''; eval(c).style.display='none'; }
  return false;
 }
 else if(document.getElementById) {
  if(document.getElementById(m).style.display=='' || toggle == 'off') { document.getElementById(m).style.display='none'; document.getElementById(e).style.display='none'; document.getElementById(c).style.display=''; }
  else { document.getElementById(m).style.display=''; document.getElementById(e).style.display=''; document.getElementById(c).style.display='none'; }
  return false;
 }
 else { return true; }
}
  //not used
function hideExpando(m){
 if(m.clientY<=topY) { rVExpando(); }
}
  //not used
function rVExpando() {
 q='';
 for(z=0;z<=1;z++) {
  if(document.all) { q=q+"m"+z+".style.display='none';" }
  else { q=q+"document.getElementById('m"+z+"').style.display='none';" }
 }
 return q;
}//END classic style
}

  //to allow NS4 this first display:nones everything for other browsers.  NS4 displays everything
function loadExpando(first, last) {
 if (!window.netscape || ver != 4) {
    //can separate list of individual IDs with |s
  if (last == "list") {
   listArray = first.split("|");
   for (i=0;i<listArray.length;i++) { showExpando(listArray[i] + '_1','off'); }
  }
    //otherwise normal first...last
  else { for (i=first;i<=last;i++) { showExpando(i + '_1','off'); } }
 }
}
 

  //Fills/deletes predefined text (eg, instructions) in textareas and text boxes, looks for window.textvalueglobal
function fillAnswer(field, eventname, textvalue) {
  if(!textvalue && !textvalueglobal) { textvalue = ""; }
  else if (!textvalue) { textvalue = textvalueglobal; }

  if (eventname == "focus" && field.value == textvalue) { field.value = ""; }
  else if (eventname == "blur" && field.value == "") { field.value = textvalue; }
   //2006-08-23: puts textarea contents in div.answerPrint for printing.
  else if (eventname == "blur" && field.value != "" && document.getElementById(field.name + '-print')) {
   var RE = /\n/g;
   document.getElementById(field.name + '-print').innerHTML = field.value.replace(RE, "<br \/>");
  }
}


//-->
//</SCRIPT>