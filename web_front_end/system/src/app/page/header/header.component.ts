import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { InterfaceService } from 'src/app/interface/interface.component';
@Component({
    selector: 'storeHeader',
    templateUrl: 'header.component.html',
    styleUrls:['header.component.css']
})

export class HeaderComponent implements OnInit {
    private list:any;
    constructor(private myRouter:Router,private service:InterfaceService) {
        var that = this;
        this.service.interface("SysUserInfo/getMenu.do", null,  
            function(data:any){
                that.list = data; 
                for(var i=0;i<data.length;i++){
                    console.log(data[i].url);
                     
                }
                // that.myRouter.navigateByUrl(data[i].url);
            }
        );
    }
    ngOnInit() { 
    }
    jump(){
        this.myRouter.navigateByUrl('index');
    }
}