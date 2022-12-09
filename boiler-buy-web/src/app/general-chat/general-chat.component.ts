import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { ChatMessageItem, ChatGroup, ChatGroupPK, ChatGroupFull } from '../chat-types';
import { ChatService } from '../chat.service';
import { Globals } from '../globals';
import { Product } from '../product-types';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-general-chat',
  templateUrl: './general-chat.component.html',
  styleUrls: ['./general-chat.component.css']
})
export class GeneralChatComponent implements OnInit {
  public globals: Globals = new Globals;
  private appcomp: AppComponent = new AppComponent();

  public chatInfo: ChatGroup = {currEmail: "", otherEmail: "", productID: 0} as ChatGroup;

  messages: {name:string, message:string, date:string}[] = [];
  id = -1;
  isSeller: boolean = false;
  canShip: boolean = false;

  // For the actual purchase:
  pricedPerUnit = true;
  isShipping = false;
  trackingNum = '';
  trackingLink = '';

  
  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, 
    private router: Router, private chatService: ChatService, private productService: ProductService
    ) { }

  ngOnInit(): void {
    this.chatInfo.currEmail = this.activatedRoute.snapshot.queryParamMap.get('currEmail') || "";
    this.chatInfo.otherEmail = this.activatedRoute.snapshot.queryParamMap.get('otherEmail') || "";
    this.chatInfo.productID = +(this.activatedRoute.snapshot.queryParamMap.get('productID') || "");

    //get messages
    var urlStr = this.activatedRoute.snapshot.queryParamMap;
    this.id = +(urlStr.get('productID') || -1);
    console.log('id:' + this.id)

    var urlParams = new URLSearchParams();
    urlParams.set('id', "" + this.id)

    this.chatService.getMessages({
      currEmail: this.appcomp.getEmail(),
      otherEmail: this.chatInfo.otherEmail,
      productID: this.chatInfo.productID
    } as ChatGroup).subscribe((stuff) => {
      console.log(stuff.body);
      stuff.body.forEach((element:any) => {
        this.messages = this.messages.concat({
          "name": element.sender_id,
          message: element.message,
          date: element.timestamp
        })
      });
    });

    // determine if the current user is the buyer or the seller
    this.productService.getProductsSellerEmail(this.id).subscribe((sellerEmail) => {
      console.log('email: '+ sellerEmail.sellerEmail);
      if (this.chatInfo.currEmail == sellerEmail.sellerEmail) {
        this.isSeller = true;
      } else {
        this.isSeller = false;
      }

      if (this.isSeller) {
        //get tracking info
        this.chatService.getChatGroup({
          seller: this.chatInfo.currEmail,
          buyer: this.chatInfo.otherEmail || '',
          productID: +(this.chatInfo.productID || '')
        }).subscribe((output) => {
          var cg = output.body as ChatGroupFull;
          this.trackingLink = cg.trackingLink;
          this.trackingNum = cg.trackingNumber;
        })
      } else {
        //get tracking info
        this.chatService.getChatGroup({
          seller: this.chatInfo.otherEmail || '',
          buyer: this.chatInfo.currEmail,
          productID: +(this.chatInfo.productID || '')
        }).subscribe((output) => {
          var cg = output.body as ChatGroupFull;
          this.trackingLink = cg.trackingLink;
          this.trackingNum = cg.trackingNumber;
        })  
      }
      
    });

    this.productService.getProductFromID(this.id).subscribe((product:Product) => {
      this.canShip = product.canShip;
    })
  }

  sendMessage(message: string) {
    if (message != "") {
      console.log("clicked!", message);

      this.chatService.sendMessage({
        senderEmail: this.chatInfo.currEmail,
        receiverEmail: this.chatInfo.otherEmail,
        productID: this.chatInfo.productID,
        message: message
      } as ChatMessageItem).subscribe((success) => {
        this.messages = this.messages.concat([{"name": this.chatInfo.currEmail, "message": message, "date":"now"}]);
        window.scroll(0, document.documentElement.offsetHeight);
        console.log(success)
      }, (error) => {
        console.log(error)
        alert("There was an issue with sending your message. Please try again")
      })
    }
  }

  saveTrackingNumber() {
    console.log(this.trackingLink);
    console.log(this.trackingNum);

    var pk = this.chatService.getChatGroupID({
      seller: this.chatInfo.currEmail,
      buyer: this.chatInfo.otherEmail,
      productID: this.chatInfo.productID,
    } as ChatGroupPK).subscribe((id) => {
      console.log('id', id.body);
      var body = {
        "trackingNumber": this.trackingNum,
        "trackingLink": this.trackingLink,
        "function": "update_tracking"
      };

      let params = new URLSearchParams()
      params.set("id", id.body);
      params.set("trackingNumber", this.trackingNum);
      params.set("trackingLink", this.trackingLink);
      params.set("function", "update_tracking");


      this.http.get('api/chatGroup/?' + params.toString(), {responseType: 'json'}).subscribe()

    })
  }
}
