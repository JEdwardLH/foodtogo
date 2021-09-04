import { Component, OnInit, Inject, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { CartService } from '../../service/cart/cart.service'
import { StringTService } from '../../service/LanguageS/string-t.service'
import { ProductService } from '../../service/product/product.service';
import { CustomerService } from '../../service/customer/customer.service'
import { AddressService } from '../../service/address/address.service'
import { LoginService } from '../../service/login/login.service'
import { MapsAPILoader, MouseEvent } from '@agm/core';
import {FormControl} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { KbankService } from 'src/app/service/kbank/kbank.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

declare var $: any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  // PHONE NUMBER
  searchcode = ""
  cus_phone_code = "";
  cus_phone1 = "";
  numberexist = false
  couponlist = []
  storeid = 0
  durationdrive = "0";
  // MAP
  deliveryfee = "0"
  displaylongitude=13.878765461964084;
  displaylatitude= 121.21280770589121;
  title: string = 'AGM project';
  latitude = 13.878765461964084;
  longitude = 121.21280770589121;
  latitude2 = 13.878765461964084;
  longitude2 = 121.21280770589121;
  displaylatitude2 = 13.878765461964084;
  displaylongitude2 = 121.21280770589121;
  displaylatitude3 = 13.878765461964084;
  displaylongitude3 = 121.21280770589121;
  selectedlat = 0
  selectedlon = 0
  zoom = 15;
  centerlat = 0
  centerlong = 0
  testlat = 0.00
  address: string;
  cartDetails: any;
  cartGrandTotal ="0";
  vouchercode = ""
  hrsvalue = "08"
  minvalue = "00"
  ampm = "am"
  parceltype = "Food"
  birthday:string
  bookdate:string
  vouchercode1: string;
  vouchercode2: string;
  vouchercode3: string;
  vouchercode4: string;
  vouchercode5: string;
  cartSubTotal = "0";
  vouchercode6: string;
  vouchercodeall: string
  discountValue: string;
  lang: string;
  hasCart = false
  distancekm = "0";

  date = new FormControl(new Date());
  private geoCoder;
  isLanguageLoaded = false
  LanguageText: any;
  restoName = ""
  hasDiscout = false
  hasVouch = false;
  AllOptions: any;
  deliveryAddressList = [];
  selectedAddress: any;
  selectedAddresstoedit: any
  restoid = ""
  store_name = ""
  deliverytime = ""
  selectedAddressRadio = "0"
  selectedPaymentRadio = "cod"
  selectedPaymentMethod = "Cash on delivery"
  showAddressList = true
  showAddressMap = true
  showAddressForm = false
  addressStep = 1
  searchlocation = ""
  location_id = ""
  addressname = "Home"
  buildingtype = "0"
  buildingname = ""
  Address = ""
  Address2 = ""
  barangay = ""
  city = ""
  barangay2 = ""
  city2 = ""
  postalcode = ""
  houseno = ""
  note = ""
  note2 = ""
  floor = ""
  provinceList = []
  province = "0"
  districtList = []
  district = "0"
  subdistrictList = []
  countryCodeList = [];
  cardlist = []
  subdistrict = "0"
  active2 = ""
  active3 = ""
  durationInSeconds = 5;
  fullname = ""
  fullname2 = ""
  fullname2val = ""
  fullnameval = ""
  lastname = ""
  email = ""
  weight = "1"
  checkoutphonenumber = ""
  checkoutemail = ""
  checkoutfullname = ""
  checkoutlastname = ""
  phonenumber = ""
  phonenumber2 = ""
  phonenumberval = ""
  phonenumber2val = ""
  phonecode = "+66"
  invalidPhone = false
  isPhoneverify = false
  isEmailverify = false
  emailOtpCodeVisible = false
  phoneOtpCodeVisible = false
  emailvcode = ""
  phonenumbervcode = ""
  iframesrc: any
  iframestate = ""
  checkoutphone = ""
  checkoutcode = ""
  kbToken = ""
  iseditingaddress = false
  deleteselected = ""
  instruction = ""
  bookingtype = "pabili"
  bookingtypeval = "pabili"
  scheduletype = "asap"
  usermarker:any
  usermarker2:any
  cus_id = "guest";
  hours = []
  mins = []
  @ViewChild('search', { read: true, static: false })
  public searchElementRef: ElementRef;

  // END MAP

  public showcontactinfo: boolean = true;
  public showdelivery: boolean = true;
  public showpaymentmethod: boolean = true;

  constructor(private ProductService: ProductService,
    private CartService: CartService,
    private StringTServiceL: StringTService,
    private CustomerService: CustomerService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private AddressService: AddressService,
    private LoginService: LoginService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private actRoute: ActivatedRoute,
    public _sanitizer: DomSanitizer,
    private KbankService: KbankService) {
      if(this.actRoute.snapshot.params.hasOwnProperty("id"))
      this.cus_id = this.actRoute.snapshot.params.id;


  }

  ngOnInit(): void {
    console.log(this.cus_id)
    this.instruction = ""
    this.usermarker = {
      url: "https://foodtogodeliveryph.com/booking/assets/images/usermarker2.png",
      scaledSize: {
        width: 60,
        height: 60
      }
    }
    this.usermarker2 = {
      url: "https://foodtogodeliveryph.com/booking/assets/images/usermarker.png",
      scaledSize: {
        width: 60,
        height: 60
      }
    }
    for(var i = 1;i<=12;i++){
      if(i <10){
        this.hours.push("0"+i)
      }else{
        this.hours.push(""+i)
      }
    }
    for(var i = 0;i<=59;i++){
      if(i <10){
        this.mins.push("0"+i)
      }else{
        this.mins.push(""+i)
      }
    }
    this.saveloc2()
  }

  calcCrow()
    {
      var R = 6371; // km
      var dLat = this.toRad(this.displaylatitude3-this.displaylatitude2);
      var dLon = this.toRad(this.displaylongitude3-this.displaylongitude2);
      var lat1 = this.toRad(lat1);
      var lat2 = this.toRad(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      var d = R * c;
      return d;
    }

    // Converts numeric degrees to radians
  toRad(Value)
  {
      return Value * Math.PI / 180;
  }
  selectbook(){
    this.bookingtypeval = this.bookingtype
    this.getlocationprice()
  }
  dateChange(date){
    this.birthday = this.formatDate(date)

  }
  applycontact1(){
    this.fullname = this.fullnameval
    this.phonenumber = this.phonenumberval
  }
  applycontact2(){
    this.fullname2 = this.fullname2val
    this.phonenumber2 = this.phonenumber2val
  }
  saveloc1(){
    this.displaylatitude3 = this.latitude
    this.displaylongitude3 = this.longitude
   this.getlocationprice()




  }
  getlocationprice(){
    var headers = {};
    headers = headers = {  'Content-Type': 'application/json' }
    const body = { lang:"en",user_latitude:this.displaylatitude2,user_latitude2:this.displaylatitude3,user_longitude:this.displaylongitude2,user_longitude2:this.displaylongitude3,bookingtype:this.bookingtypeval,wieght:this.weight}

    this.AddressService.getDistance(body,headers).subscribe((data: any)=>{
      if(data.code == 200){
        this.distancekm = data.data+"km"
        this.durationdrive = ""+Math.round(5 + (data.data * 3)) +"mins";
        this.deliveryfee = data.price
        this.cartSubTotal = data.subtotal
        this.cartGrandTotal = data.total
      }else{

      }



    },(error: any) =>{

    })
  }
  changeweight(){
    this.getlocationprice()
  }
  booknow(){
    var headers = {};
    if(!this.fullname){
      this.openDialog("Please enter Pickup Contact Name")
      return;
    }
    if(!this.phonenumber){
      this.openDialog("Please enter Pickup Contact Phone Number")
      return;
    }
    if(!this.Address){
      this.openDialog("Please Set Your Pickup Address")
      return;
    }


    if(!this.fullname2){
      this.openDialog("Please enter Dropoff Contact Name")
      return;
    }
    if(!this.phonenumber2){
      this.openDialog("Please enter Dropoff Contact Phone Number")
      return;
    }
    if(!this.Address2){
      this.openDialog("Please Set Your Dropoff Address")
      return;
    }
    if(!this.instruction){
      this.openDialog("Please enter Instruction to the rider")
      return;
    }

    headers = headers = {  'Content-Type': 'application/json' }
    const body = { lang:"en",
    user_latitude:this.displaylatitude2,
    user_latitude2:this.displaylatitude3,
    user_longitude:this.displaylongitude2,
    user_longitude2:this.displaylongitude3,
    pickupname:this.fullname,
    dropoffname:this.fullname2,
    pickupmobile:this.phonenumber,
    dropoffmobile:this.phonenumber2,
    pickupaddress:this.Address,
    dropoffaddress:this.Address2,
    pcity: this.city,
    dcity: this.city2,
    pbarangay: this.barangay,
    dbarangay: this.barangay2,
    bookingtype:this.bookingtypeval,
    wieght:this.weight,
    schedule: this.scheduletype,
    timeanddate:this.hrsvalue+":"+this.minvalue+ " "+this.ampm,
    instruction:this.instruction,
    parceltype:this.parceltype,
    cus_id:this.cus_id,
    bookdate:this.bookdate



  }

    this.AddressService.Booknow(body,headers).subscribe((data: any)=>{
      if(data.code == 200){
        window.location.href = 'https://foodtogodeliveryph.com/booking/itrack-natin/' + data.orderid;


      }else{
        this.openDialog(data.message)
      }



    },(error: any) =>{

    })
  }
  saveloc2(){
    console.log('2')
    this.displaylatitude2 = this.latitude2
    this.displaylongitude2 = this.longitude2
    this.getlocationprice()

  }
  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}
  showMapModal(){
    this.mapsAPILoader.load().then(() => {

      this.geoCoder = new google.maps.Geocoder;
      const input = document.getElementById("searchlocation") as HTMLInputElement;
      let autocomplete = new google.maps.places.Autocomplete(input);
      autocomplete.addListener("place_changed", () => {

        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.Address = place.formatted_address
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;

        });
      });
    });
  }
  showMapModal2(){
    this.mapsAPILoader.load().then(() => {

      this.geoCoder = new google.maps.Geocoder;
      const input = document.getElementById("searchlocation2") as HTMLInputElement;
      let autocomplete = new google.maps.places.Autocomplete(input);
      autocomplete.addListener("place_changed", () => {

        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.Address2 = place.formatted_address
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude2 = place.geometry.location.lat();
          this.longitude2 = place.geometry.location.lng();
          this.zoom = 12;

        });
      });
    });
  }
  openSnackBar() {
    this._snackBar.openFromComponent(SnackComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }
  openAddressModal() {

    document.getElementById("openModalLocation").click();
    this.showMapModal()
  }
  openAddressModal2() {

    document.getElementById("openModalLocation2").click();
    this.showMapModal2()
  }
  openPaymentModal() {
    console.log("openModalPayment")

    document.getElementById("openModalPayment").click();
  }
  openAddressModalUser() {

    document.getElementById("openModalUser").click();
  }
  openAddressModalUser2() {

    document.getElementById("openModalUser2").click();
  }
  closeLocationModal() {

    document.getElementById("closeModalLocation").click();
    this.showAddressList = true
    this.showAddressMap = true
    this.showAddressForm = false
    this.addressStep = 1
    this.active3 = ""
    this.active2 = ""
  }
  // Get Current Location Coordinates
  setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }

  public isUserMode() {
    if (localStorage.usermode == "1") {
      return true;
    } else {
      return false;
    }
  }


  markerDragEnd($event: MouseEvent) {

    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    // this.getAddress(this.latitude, this.longitude);
  }
  centerChange($event) {

    this.centerlat = $event.lat;
    this.centerlong = $event.lng;
    // this.getAddress(this.latitude, this.longitude);
  }
  boundsChange($event) {
    console.log("bounce")
    // this.latitude = $event.lat;
    // this.longitude = $event.lng;
  }
  mapReady(map) {
    console.log("ready")
    map.addListener("dragend", () => {
      //the values
      this.latitude = this.centerlat;
      this.longitude = this.centerlong
      console.log(map)
    });
  }


  markerDragEnd2($event: MouseEvent) {

    this.latitude2 = $event.coords.lat;
    this.longitude2 = $event.coords.lng;
    // this.getAddress(this.latitude, this.longitude);
  }
  centerChange2($event) {

    this.centerlat = $event.lat;
    this.centerlong = $event.lng;
    // this.getAddress(this.latitude, this.longitude);
  }
  boundsChange2($event) {
    console.log("bounce")
    // this.latitude = $event.lat;
    // this.longitude = $event.lng;
  }
  mapReady2(map) {
    console.log("ready")
    map.addListener("dragend", () => {
      //the values
      console.log("2"+this.latitude2)
      this.latitude2 = this.centerlat;
      this.longitude2 = this.centerlong
      console.log(map)
    });
  }



  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 20;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }



  omit_special_char(event) {
    var k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }
  popupCenter = ({ url, title, w, h }) => {
    // Fixes dual-screen position                             Most browsers      Firefox
    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

    const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    const systemZoom = width / window.screen.availWidth;
    const left = (width - w) / 2 / systemZoom + dualScreenLeft
    const top = (height - h) / 2 / systemZoom + dualScreenTop
    const newWindow = window.open(url, title,
      `
      scrollbars=yes,
      width=${w / systemZoom},
      height=${h / systemZoom},
      top=${top},
      left=${left}
      `
    )

    if (window.focus) newWindow.focus();
  }



  googlegeocode(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {

      if (status === 'OK') {
        if (results[0]) {
          if(this.Address == ""){
            this.Address = results[0].formatted_address
          }
          console.log(results[0].formatted_address);
        } else {
         // window.alert('No results found');
        }
      } else {
        //window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

  public searchLocation() {
    this.searchLocation
  }
  openDialog(errormessage): void {
    const dialogRef = this.dialog.open(ErroDialog, {
      width: '300px',
      data: { errormessage: errormessage }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.selectedAddressRadio = this.selectedAddress.loc_id
      if (result == "done") {
        document.getElementById("openModalPayment").click();
      } else if (result == "verify") {
        document.getElementById("openModalUser").click();
      }

    });
  }


}
@Component({
  selector: 'snack-bar-component-example-snack',
  templateUrl: 'snackbar.html',
  styles: [`
    .snackbarsuccess {
      color: hotpink;
    }
  `],
})
export class SnackComponent { }
@Component({
  selector: 'checkoutdialog',
  templateUrl: 'dialog.html',
})
export class ErroDialog {
  message: any
  constructor(
    public dialogRef: MatDialogRef<ErroDialog>,
    @Inject(MAT_DIALOG_DATA) public data: CheckoutComponent) {
    this.message = this.data
  }

  close(): void {
    if (this.message.errormessage == "Card added successfully") {
      this.dialogRef.close("done");
    } else if (this.message.errormessage.includes("verify")) {
      this.dialogRef.close("verify");
    } else {
      this.dialogRef.close("success");
    }


  }



}
