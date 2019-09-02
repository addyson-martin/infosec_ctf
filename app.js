var ques_num=12;
var conn=-1;
function secret()
{
  console.log("congrat!!!! u hacked me!!!!!! copy this 'hjvwehjfgwehjgu3' code and submit this on competition page");
}
function dbConn()
{
  for(var i=1;i<=ques_num;i++)
  {
    var ac;
    query="ques_" + i;
    var ques_query=firebase.database().ref("student_data/"+query);
    ques_query.on("value",snap=>ac=snap.val());
  }
}
function getReplyFirebase(ques)
{
  var data;
  var ques_query=firebase.database().ref("ctf_query").child(ques);
  ques_query.on("value",snap=>data=snap.val());
  //console.log(data);
  return data;
}
function getResult(val)
{
  var ac;
  query="ques_" + val;
  var ques_query=firebase.database().ref("student_data/"+query);
  ques_query.on("value",snap=>ac=snap.val());
  if(ac==null)
  {
    document.getElementById("result_here").innerHTML="NO ONE HAS SOLVED IT";
  }
  else{
  var succ_ids=Object.keys(ac);
  document.getElementById("result_here").innerHTML="THIS PROBLEM IS SOLVED BY:-"+"<br>"+succ_ids;
}
}
function getQuestions()
{
  var i;
  for(i=1;i<=ques_num;i++)
  {
    var ques="ques_"+i;
    data=getReplyFirebase(ques);
    if(data==null)
    {
      var flag_0=document.getElementById("default_text");
      flag_0.classList.remove("hidden");
      document.getElementById("default_text").innerHTML="<b>"+"NOTE"+"</b>"+": YOUR QUESTIONS WILL BE DISPLAYED AFTER CLICKING ON ABOVE BUTTON." +"<BR>"+"AFTER SOLVING THE QUESTION SUBMIT THE FLAG IN BOX ON RIGHT HAND SIDE ACCORDINGLY."+"<b>"+"<br>"+"YOU CAN ACCESS TO RESOURCES BY CLICKING ON THE INFOSEC ICON."+"</b>"+"<BR>"+"PLEASE FETCH THE QUESTIONS TO CONTINUE";

    }
    else {
      var flag_temp;
      flag_temp=document.getElementById("question_box");
      flag_temp.classList.remove("hide");
      flag_temp=document.getElementById("grow-spinner");
      flag_temp.classList.add("hide");
      //flag_temp=document.getElementById("fetch-question-btn");
     // flag_temp.classList.add("hide")
      flag_temp=document.getElementById("default_text");
      flag_temp.classList.add("hide");
      document.getElementById(ques).innerHTML=data;
    }

  }
}
function reload()
{
  document.getElementById("enter_answer").value="";
  document.getElementById("enterId").value="";
}
function get_resouces()
{
  window.location.href="resources.html";
}
function get_flag()
{
  var flag;
  var e = document.getElementById("select_ques");
  var opt_val = e.options[e.selectedIndex].value;
  query="ans_"+opt_val;
  temp=firebase.database().ref("ctf_query").child(query);
  temp.on("value",snap=>flag=snap.val());
  return flag;
}
function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
function appendID(id,node)
{
  queries="student_data/"+node;
  input_ref=firebase.database().ref(queries);
  input_ref.child(id).set("true");
}
function check_flag()
{
  var flag_cr;
  var id=document.forms.credentials.cllg_id.value;
  flag_cr=get_flag();
  var e = document.getElementById("select_ques");
  var opt_val = e.options[e.selectedIndex].value;
  var searchFor="ques_"+opt_val;
  var usr_flag=document.forms.credentials.usr_input.value;
  if(usr_flag=="" || id=="")
  {
    alert("PLEASE ENTER THE FLAG AND ID BEFORE SUBMITTING");
  }
  else {
    var index=flag_cr.localeCompare(usr_flag);
    if(index!=0)
    {
      alert("YOU ARE NOT TOO SMART"+"\n"+"PLEASE TRY AGAIN ;) ;)");
    }
    else{
      appendID(id,searchFor);
      alert("BRAVO!!!!"+"DON'T BE OVERCONFIDENT"+"\n"+"SOLVE ATLEAST 7 QUESTIONS");
    }
  }

}
function openModal() {
  flag=document.getElementById("myModal");
  flag.style.display = "block";
}
 function close_modal() {
   flag=document.getElementById("myModal");
  flag.style.display = "none";
}
window.onclick = function(event) {
  flag=document.getElementById("myModal");
  if (event.target == flag) {
    flag.style.display = "none";
  }
}
