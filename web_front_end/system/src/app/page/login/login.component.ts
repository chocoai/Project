import { Component, OnInit } from '@angular/core';
import { InterfaceService } from 'src/app/interface/interface.component';
import { NzMessageService } from 'ng-zorro-antd';
import {Router} from '@angular/router';
import * as $ from 'jquery';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls:['login.component.css']
})

export class LoginComponent implements OnInit {
    name:any="";
    word:any="";
    checked = false;
    //显示捐款
    show = false;
    constructor(private service:InterfaceService,private router: Router,private message: NzMessageService) { 
     
    }
    ngAfterContentInit(){
    }
    ngOnInit() {
        
    }
    submit(){
        var username=this.name;
        var password =this.word;    
        var data= {loginid:username,password:password};
        var that = this;
        if(username == '' || password == '') {
            this.message.info("用户名或密码不能为空");
            return;
        }else if(username !=='') { 
        this.service.interface("SysUserInfo/findUser", data,  
            function(data:any){
                that.router.navigateByUrl('/index');  
                window.localStorage.setItem("user",JSON.stringify(data));//将用户信息放入缓存中
                //  window.location.href="http://www.baidu.com"; 
                       
            }
        );
      }
     
    }

    mask(alpha){
        $("#body").click(function () {
            (<any>this).style.opacity=alpha/100;
        });  
    } 
    // 联系我们
    contact(){
        if(this.show==false){
            this.show=true;
            this.mask(80);
        }else{
            this.show=false;
            this.mask(100);
        }
    }
    // 关闭
    close(){
        if(this.show==true){
            this.show=false;
            this.mask(100);
            $("#body").click();
        }
    }
        
}