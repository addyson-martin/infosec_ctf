var ques_num=13;
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

return succ_ids;
}
function prepareRanks()
{
  var lst="B518006,";
    for(var i=1;i<=ques_num;i++)
    {
      lst=lst+getResult(i)+",";
    }
    var all_studs=lst.split(",");
    all_studs.pop();

    // for(var j=0;j<all_studs.length;i++)
    // {
    //   var ref=firebase.database().ref("leaderboard/")
    // }
    var newArr=rmDuplicate(all_studs);
    newArr.sort(function(a, b){
    return b.count-a.count;
})
    //console.log(newArr);
    var response="SOLVED BY;)))<br>";
    for(var j=0;j<newArr.length;j++)
    {
      var id=newArr[j].value;
      var solved_ques=newArr[j].count;
      response=response+id+"::"+solved_ques+"<br>";
    }
    document.getElementById("myModal").style.display="block";
    document.getElementById("result_here").innerHTML=response;
}
function rmDuplicate(original) {

	var area = [];
	var copy = original.slice(0);
	for (var i = 0; i < original.length; i++) {
		var mCount = 0;
		for (var w = 0; w < copy.length; w++) {
			if (original[i] == copy[w]) {
				mCount++;
				delete copy[w];
			}
		}
 		if (mCount > 0) {
			var a = new Object();
			a.value = original[i];
			a.count = mCount;
			area.push(a);
		}
	}

	return area;
};

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
      // flag_temp=document.getElementById("fetch-question-btn");
      // flag_temp.classList.add("hide");
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
  var id_raw=document.forms.credentials.cllg_id.value;
  var id = id_raw.charAt(0).toUpperCase()+id_raw.slice(1);
  flag_cr=get_flag();
  var e = document.getElementById("select_ques");
  var opt_val = e.options[e.selectedIndex].value;
  var searchFor="ques_"+opt_val;
  var usr_flag=document.forms.credentials.usr_input.value;
  if(usr_flag=="" || id=="")
  {
    alert("PLEASE ENTER THE FLAG AND ID BEFORE SUBMITTING");
  }
  else if (id.length === 7) {
    if (/[Bb][1-5]\d[19]/.test(id)) {
      var index=flag_cr.localeCompare(usr_flag);
      if(index!=0)
      {
        alert("YOU ARE NOT TOO SMART"+"\n"+"PLEASE TRY AGAIN ;) ;)");
      }
      else{
        appendID(id,searchFor);
        alert("BRAVO!!!!"+"DON'T BE OVERCONFIDENT"+"\n"+"SOLVE ATLEAST 7 QUESTIONS");
      }
    } else {
      var temp_1=flag_cr.localeCompare(usr_flag);
      if(temp_1!=0)
      {
        alert("YOU ARE NOT TOO SMART"+"\n"+"PLEASE TRY AGAIN ;) ;)");
      }
      else{
        alert("YOUR ANSWER IS CORRECT!!! BUT THESE QUESTIONS ARE TOO SIMPLE FOR YOU ;))");
      }
    }

  }
  else {
    alert("PLEASE USE YOUR 2019 BATCH STUDENT ID")
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
function pop_notice()
{
  flag=document.getElementById("myModal");
  flag.style.display="block";
  document.getElementById("result_here").innerHTML="<b>"+"NOTICE:"+"<br>"+"</b>"+"IT IS ADVISED TO INSTALL LINUX(RECOMMENDED:KALI LINUX) IN YOUR SYSTEM BEFORE COMING TO THE"+"<b>"+" BLACK HAT "+"</b>"+"GROUP OF IIIT!!"+"<br>"+"HOWEVER YOU DON'T REQUIRE LINUX FOR SOLVING THIS CONTEST.";
}
function pop_notice_1()
{
  flag=document.getElementById("myModal");
  flag.style.display="block";
  document.getElementById("result_here").innerHTML="<b>"+"NOTICE:"+"<br>"+"</b>"+"SITE IS NOW OPEN FOR ALL THE STUDENTS OF IIIT , BUT ONLY FIRST YEARS WILL BE INCLUDED IN THE RANKLIST.<br>(UPDATE: NOW THERE IS LEADERBOARD AVAILABLE ON SITE FIND IT OUT IF YOU WANT TO SEE YOUR RANK)";
}
