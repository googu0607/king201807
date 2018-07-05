function isNull(obj,msg){
    if(obj.value == ""){
        alert(msg);
        obj.focus();
        return true;
    }
    return false;
}
/*회원가입*/
function checkInput(){
    var f = document.createForm;
    if(isNull(f.id,'아이디를 입력해 주세요')){
        return false;
    }else if(isNull(f.password,'비밀번호를 입력해 주세요')){
        return false;
    }else if(isNull(f.CHKPW,'비밀번호를 확인 주세요')){
        return false;
    }else if(isNull(f.name,'이름을 입력해 주세요')){
        return false;
    }else if(isNull(f.email,'이메일을 입력해 주세요')){
        return false;
    }else if(isNull(f.tel,'전화번호를 입력해 주세요')){
        return false;
    }else if(f.password.value != f.CHKPW.value){
        alert('비밀번호가 일치 하지 않습니다.');
        return false;
    }else if(!(f.check.value == "yes")){
        alert('중복검사를 해주세요');
        return false;
    }
}
function check(){
    var ch = document.createForm.check.value;
    if(!(ch == "yes")){
        alert('중복검사를 해주세요');
        return false;
    }
}
function checkID(){
    var chID = document.createForm.inputID.value;
    if(chID == ""){
        alert('입력된 아이디가 없습니다');
    }else{
        window.open('/JBlog/checkID.do?id=' + chID, "","width=400 height=150");
    }
}
	