import { Component, OnInit } from '@angular/core';
import { InterfaceService } from 'src/app/interface/interface.component';
import {Router} from '@angular/router';
@Component({
    selector: 'storeSpend',
    templateUrl: 'spend.component.html',
    styleUrls:['spend.component.css']
})

export class SpendComponent implements OnInit {
    // 编辑备注
    editId: string | null;
    // 当前页码
    pageIndex: any = 1;
    pageSize =8;
    spend: any = [];
  // 当前数据总数量
    total: any = 0;
    i = 1;
    add:any=false;
    editCache = {};
    dataSet = [];
    selectedDicclass='伙食';
    selectedPayway='支付宝';
    selectedName="早餐";
    dicclass:any=[];
    payway:any=[];
    dicValue:any=[];
    id:any=[];
    obj:object={};
    xq:any;
    demoValue = 100;
    constructor(private service:InterfaceService,private router:Router){}
    addRow(){
        if(this.add == false){
          this.add=true;
        }
        var data= JSON.parse(localStorage.category);
        this.obj = {};
        for (var d of data){
            if(this.obj[d.dicclass] == undefined){
                this.obj[d.dicclass] = [];
            }
            var obj2 = {};
            obj2['name'] = d.name;
            obj2['id'] = d.id;
            this.obj[d.dicclass].push(obj2);  
        }
        // 第一级 是数组
        this.dicclass = [];
        for (var dic in this.obj){
            this.dicclass.push(dic);
        }
        this.payway = JSON.parse(localStorage.payway);
    }
   
     //  第二级
    change(){
        var a=this.selectedDicclass;
        this.dicValue = this.obj[a]
    }

    //第三级
    // changeId(){
    //     this.id=[];
    //     var a=this.selectedDicclass;
    //     var b=this.selectedName;
    //     for(var i of this.obj[a]){
    //         var c=i[b];
    //         this.id.push(c);
    //     }
        
    // }
    cancel(){
        if(this.add == true){
            this.add=false;
        }
    } 
    
    ngOnInit(): void {
        this.reloadData();
    }
    reloadData(){
        var page=this.pageIndex;
        var pageSize=this.pageSize;
        var data={page:page,pageSize:pageSize};
        var that=this;
        this.service.interface("/pay/getUserPayList.do",data,
            function(data:any){
                that.total=data.count;
                that.dataSet=data.list;
            });    
            var that = this;
            var msg=JSON.parse(localStorage.payway);
            console.log(msg);
    }
     /* 页码变化时*/
  indexChange() {
    this.reloadData();
  }
  /* 每页显示数据变化时*/
  sizeChange() {
    this.reloadData();
  }
    deleteRow(i: string): void {
        var that=this;
        var obj = {id:i};
        this.service.interface("pay/deleteUserPay.do",obj,
        function(){
            that.ngOnInit();
        })
        
    }
    provinceChange(value: string): void {
        this.selectedName = this.obj[ value ][ 0 ];
      }
    // 输入金额
    formatterDollar = value => `￥ ${value}`;
    parserDollar = value => value.replace('￥ ', '');
    submit(){
        var that = this;
        var param = {dicid:this.selectedName,way:this.selectedPayway,money:this.demoValue,note:this.xq};
        this.service.interface("/pay//addUserPay.do",param,function(data){
            that.add=false;
            that.ngOnInit();
        });
    }
}