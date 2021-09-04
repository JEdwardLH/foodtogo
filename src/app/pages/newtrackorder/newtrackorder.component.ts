import { Component, OnInit, Inject, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../service/order/order.service'
import { MapsAPILoader, MouseEvent, AgmPolyline } from '@agm/core';
import { interval } from 'rxjs';
import { FoodtypeService } from '../../service/foodtype.service';
import { map } from 'rxjs/operators'
import { GlobalConstants } from 'src/app/common/global-constants';
import { StringTService } from '../../service/LanguageS/string-t.service';
import { Router, NavigationEnd } from '@angular/router';
import { FdatabaseService } from '../../service/firebase/fdatabase.service';
@Component({
  selector: 'app-newtrackorder',
  templateUrl: './newtrackorder.component.html',
  styleUrls: ['./newtrackorder.component.css']
})
export class NewtrackorderComponent implements OnInit {
  SpecialproductList = [];
  // LANGUAGE
  reasontextfield = ""
  LanguageText: any;
  instruction  =  ""
  isLanguageLoaded = false;
  smurf = false
  bookingtype = ""
  item_type = ""
  weight = ""
  params: string
  lang: string
  orderid: string
  delfee = 0
  storeid: any
  address2 = ""
  customername = ""
  customerAddress1 = ""
  customerAddress2 = ""
  customerMobile = ""
  customerEmail = ""
  order_date = ""
  productList = []
  pickupname = ""
  pickupmobile = ""
  dropoffname = ""
  dropoffmobile = ""
  storename = ""
  paytype = ""
  grand_sub_total = ""
  grand_total = ""
  currency = ""
  delivery_fee = ""
  coupon_used = ""
  latitude: any
  longitude: any
  focuslatitude = 0.0
  focuslongitude = 0.0
  riderlatitude = 0.0
  riderlongitude = 0.0
  fromriderlatitude = 0.0
  fromriderlongitude = 0.0
  usermarker: any
  ridermarker: any
  merchantmarker: any
  restolatitude: any
  restolongitude: any
  deliverytime: number
  restaurant_current_date = ""
  acceptedTime = ""
  waitingtime: string
  zoom = 15;
  mapready = false
  points = []
  orderStatus = []
  locationdata = {}
  position1 = 0.0
  position2 = 0.0
  deltaLat = 0.0
  deltaLng = 0.0
  numDeltas = 100;
  delay = 10; //milliseconds


  //
  status_text = ""
  status_message = ""
  store_name = ""
  estimated_delivery_duration = ""
  estimated_time = ""
  address = ""
  landmark = ""
  rider_rating = ""
  delivery_boy_name = ""
  profile_image = ""
  total = ""
  status = ""
  motorbike = ""
  offer = ""
  mobile = ""
  firstload = false
  statusval = ""
  //

  i = 0;
  specialoffertitle = ""
  quick_id: string;

  restaurantList:any;
  categoryList:any;
  categoryName:string;
  sugestionlist = []
  specialOptions = {
    items: 4,
    margin: 20,
    dots: true,
    stagePadding: 50,
    loop: true,
    autoplay: false,
    autoplayHoverPause: false,
    nav: true,
    navText: ["<i class='fas fa-chevron-left'></i>", "<i class='fas fa-chevron-right'></i>"],
    responsive: {
      0: {
        items: 1,
        stagePadding: 30,
        nav:false,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true,
      },
      576: {
        items: 2,
        stagePadding: 50,
        nav:false,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true,
      },
      766: {
        items: 1,
        stagePadding: 100,
        nav:false,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true,
      },
      768: {
        items: 2,
        nav:false,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true,
      },
      992: {
        items: 3,
        nav:false,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true,
      },
      1201: {
        item: 4
      }
    }
  };
  mobilecarousel = {
    items: 1,
    margin: 30,
    dots: true,
    loop: true,
    autoplay: true,
    autoplayHoverPause: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    nav: false,
    responsive: {
      0: {
        items: 1,
        touchDrag: true,
        pullDrag: true,
        mouseDrag: true
      },
      575: {
        items: 1,
        touchDrag: true,
        pullDrag: true,
        mouseDrag: true
      },
      768: {
        items: 1,
        touchDrag: true,
        pullDrag: true,
        mouseDrag: true
      },
      993: {
        items: 1
      },
      1201: {
        item: 4
      }
    }
  };
  constructor(private foodTypeService:FoodtypeService ,private router: Router,private actRoute: ActivatedRoute, private OrderService: OrderService, private mapsAPILoader: MapsAPILoader, private StringTServiceL: StringTService,
    private ngZone: NgZone, private FdatabaseService: FdatabaseService) {


    this.orderid = this.actRoute.snapshot.params.id;


    this.StringTServiceL.getLanguageString().subscribe((data: any) => {
      this.isLanguageLoaded = true;
      this.LanguageText = data;

    })

    this.FdatabaseService.trackOrder(this.orderid).subscribe((data: any) => {


      data.forEach(data => {


        this.locationdata[data.key] = data.payload.val()


      });


      if (!isNaN(Number(this.locationdata['deliver_latitude'])) && !isNaN(Number(this.locationdata['deliver_longitude']))) {
        if (this.riderlatitude == 0) {
          this.riderlatitude = Number(this.locationdata['deliver_latitude'])
          this.riderlongitude = Number(this.locationdata['deliver_longitude'])
          this.focuslatitude = this.riderlatitude
          this.focuslongitude = this.riderlongitude
        } else {
          var angle = this.bearing(this.riderlatitude, this.riderlongitude, Number(this.locationdata['deliver_latitude']), Number(this.locationdata['deliver_longitude'])) - 180

          this.ridermarker = {
            url: "https://foodtogodeliveryph.com/booking/assets/images/usermarker.png" + angle,
            scaledSize: {
              width: 40,
              height: 60
            },

          }
          this.transition([Number(this.locationdata['deliver_latitude']), Number(this.locationdata['deliver_longitude'])])

          console.log(this.locationdata)
        }

      }


    });

  }
  @ViewChild('line') polyLine: AgmPolyline;
  ngOnInit(): void {
    this.trackmyorder()

    this.usermarker = {
      url: "https://foodtogodeliveryph.com/booking/assets/images/usermarker2.png",
      scaledSize: {
        width: 60,
        height: 60
      }
    }
    this.merchantmarker = {
      url: "https://foodtogodeliveryph.com/booking/assets/images/usermarker.png",
      scaledSize: {
        width: 60,
        height: 60
      }
    }
    this.ridermarker = {
      url: "https://foodtogodeliveryph.com/booking/assets/images/usermarker2.png",
      scaledSize: {
        width: 60,
        height: 60
      },

    }
    this.getRestaurantDirection(this.orderid)
  }
  public seeResto(resto){
    if(localStorage.language == "th"){
      this.lang = "th"
    }else{
      this.lang = "en"
    }
    if(resto.hasOwnProperty('item_id')){
      localStorage.item_id = resto.item_id
    }
    window.location.href= "/"+this.lang+"/pattaya/restaurant/"+resto.store_slug.replace("(", '%28').replace(")", '%29');
  }
  getStorename(st_store_name) {
    if (st_store_name.length > 26) {
      return st_store_name.substring(0, 26) + "...";
    } else {
      return st_store_name
    }

  }
  getRestaurantDirection(orderid) {
    var headers = {};

    if(this.smurf){
      headers = headers = { 'Content-Type': 'application/json' }
    }else{
      if (localStorage.usermode == "1") {
        var tk = localStorage.hntk;
        headers = { 'Authorization': 'Bearer ' + tk, 'Content-Type': 'application/json' }
      } else {
        headers = headers = { 'Content-Type': 'application/json' }
      }
    }

    if (localStorage.language == "th") {
      this.lang = "th"
    } else {
      this.lang = "en"
    }
    const body = { lang: this.lang, order_id: orderid }

    this.OrderService.restoDirection(body, headers).subscribe((data: any) => {

      if (data.status == "OK") {
        this.points = this.getpointsdecode(data.routes[0].overview_polyline.points)

      }

    }, (error: any) => {

    })
  }

  getpointsdecode(encoded) {

    // array that holds the points

    var points = []
    var index = 0, len = encoded.length;
    var lat = 0, lng = 0;
    while (index < len) {
      var b, shift = 0, result = 0;
      do {

        b = encoded.charAt(index++).charCodeAt(0) - 63;//finds ascii                                                                                    //and substract it by 63
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);


      var dlat = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
      lat += dlat;
      shift = 0;
      result = 0;
      do {
        b = encoded.charAt(index++).charCodeAt(0) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      var dlng = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
      lng += dlng;

      points.push({ latitude: (lat / 1E5), longitude: (lng / 1E5) })

    }
    return points
  }
  transition(result) {
    this.i = 0;
    this.deltaLat = (result[0] - this.position1) / this.numDeltas;
    this.deltaLng = (result[1] - this.position2) / this.numDeltas;
    this.moveMarker();
  }
  public moveMarker() {
    this.position1 += this.deltaLat;
    this.position2 += this.deltaLng;
    var angle = this.bearing(this.riderlatitude, this.riderlongitude, this.position1, this.position2) - 180

    this.ridermarker = {
      url: "https://foodtogodeliveryph.com/booking/assets/images/usermarker.png",
      scaledSize: {
        width: 60,
        height: 60
      },

    }

    this.setPositionLoc(this.position1, this.position2);
    if (this.i != this.numDeltas) {
      this.i++;
      setTimeout(() => {
        this.moveMarker()
      }, this.delay);
      //setTimeout(this.moveMarker, this.delay);
    }
  }
  setPositionLoc(lat, lng) {

    this.riderlatitude = lat
    this.riderlongitude = lng
    this.focuslatitude = lat
    this.focuslongitude = lng
  }
  bearing(startLat, startLng, destLat, destLng) {
    startLat = this.toRadians(startLat);
    startLng = this.toRadians(startLng);
    destLat = this.toRadians(destLat);
    destLng = this.toRadians(destLng);

    var y = Math.sin(destLng - startLng) * Math.cos(destLat);
    var x = Math.cos(startLat) * Math.sin(destLat) -
      Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
    var brng = Math.atan2(y, x);
    brng = this.toDegrees(brng);
    return (brng * -1);
  }
  isUserMode() {
    if (localStorage.usermode == "1") {
      return true;
    } else {
      return false;
    }
  }
  toRadians(degrees) {
    return degrees * Math.PI / 180;
  };

  // Converts from radians to degrees.
  toDegrees(radians) {
    return radians * 180 / Math.PI;
  }
  getrecommendproduct(){
    var headers = {};
      if(localStorage.usermode == "1"){
        var tk = localStorage.hntk;
        headers = { 'Authorization': 'Bearer '+tk, 'Content-Type': 'application/json'  }
      }else{
        headers = headers = {  'Content-Type': 'application/json' }
      }
      if(localStorage.language == "th"){
        this.lang = "th"
      }else{
        this.lang = "en"
      }
    const body2 = { user_latitude: this.latitude,user_longitude:this.longitude,user_location:'',lang:this.lang, orderid	: this.orderid}
      this.foodTypeService.cancelRecommend(body2,headers).subscribe((data: any)=>{
        this.specialoffertitle = "Food you may like!"
        this.SpecialproductList = data.data.recomendation;

      })
  }
  public trackmyorder() {

    var headers = {};


    headers = {  'Content-Type': 'application/json' }
    if (localStorage.language == "th") {
      this.lang = "th"
    } else {
      this.lang = "en"
    }

    const body = { lang: this.lang, orderid: this.orderid }

    this.OrderService.trackmyorder(body, headers).subscribe((data: any) => {
      if (data.code == 200) {
          this.status = data.data.status
          if((this.status == "6"||this.status == "7")){
            if(this.firstload){
              this.statusval = "ontheway"
            }else{
              this.firstload = true
              this.statusval = "pickup"
            }
          }else{
            this.statusval = ""
          }
          this.bookingtype = data.data.bookingtype
          this.item_type = data.data.item_type
          this.weight = data.data.weight
          this.instruction = data.data.instruction
          this.pickupmobile = data.data.order_info.pickupmobile
          this.pickupname = data.data.order_info.pickupname
          this.dropoffmobile = data.data.order_info.dropoffmobile
          this.dropoffname = data.data.order_info.dropoffname
          this.status_text = data.data.status_text
          this.status_message = data.data.status_message
          this.store_name = data.data.store_name
          this.address2 = data.data.address2
          this.total = data.data.total
          this.delfee = data.data.del_fee
          this.estimated_delivery_duration = data.data.estimated_delivery_duration
          this.estimated_time = data.data.estimated_time
          this.address = data.data.address
          this.landmark = data.data.landmark
          this.delivery_boy_name = data.data.delivery_boy_info.delivery_boy_name
          this.profile_image = data.data.delivery_boy_info.profile_image
          this.motorbike =  data.data.delivery_boy_info.motorbike
          this.productList = data.data.items
          this.offer = data.data.offer
          this.mobile = data.data.delivery_boy_info.mobile
          this.restolatitude = data.data.coordinates.store_latitude
          this.restolongitude = data.data.coordinates.store_longitude
          this.latitude = data.data.coordinates.customer_latitude
          this.longitude = data.data.coordinates.customer_longitude
          if (this.riderlatitude == 0) {
            this.riderlatitude = Number(data.data.delivery_boy_info.latitude)
            this.riderlongitude = Number(data.data.delivery_boy_info.longitude)
            this.focuslatitude = this.riderlatitude
            this.focuslongitude = this.riderlongitude
          } else {
            var angle = this.bearing(this.riderlatitude, this.riderlongitude, Number(data.data.delivery_boy_info.latitude), Number(data.data.delivery_boy_info.longitude)) - 180

            this.ridermarker = {
              url: "https://foodtogodeliveryph.com/booking/assets/images/usermarker2.png",
              scaledSize: {
                width: 40,
                height: 60
              },

            }
            this.transition([Number(this.locationdata['deliver_latitude']), Number(this.locationdata['deliver_longitude'])])


          }
      }
      setTimeout(() => {
        this.trackmyorder()
      }, 2000);

    }, (error: any) => {

    })
  }

}
