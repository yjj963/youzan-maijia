import Address from 'js/addressService.js'

export default {
    data(){
        return {
            name:'',
            tel:'',
            provinceValue:-1,
            cityValue:-1,
            districtValue:-1,
            address:'',
            id:'',
            addressData:require('js/address.json'),
            provinceList:null,
            cityList:null,
            districtList:null,
            isInitVal:false
        }
    },
    created(){
        console.log(this.$route.query.instance)
        if(this.$route.query.type==='edit'){
            let ad=this.$route.query.instance
            this.name=ad.name
            this.tel=ad.tel
            this.address=ad.address
            this.id=ad.id
            this.provinceValue=parseInt(ad.provinceValue)
            this.isInitVal = true
        }
    },
    methods:{
        add(){
            let {name,tel,provinceValue,cityValue,districtValue,address,id}=this
            let data={name,tel,provinceValue,cityValue,districtValue,address,id}
            if(this.$route.query.type==='edit'){
                Address.update(data).then(res=>{
                    this.$router.go(-1)
                })
            }else{
                Address.add(data).then(res=>{
                    this.$router.go(-1)
                })
            }
        },
        remove(){
            if(window.confirm()){
                Address.remove(this.id).then(res=>{
                    this.$router.go(-1)
                })
            }
        },
        setDefault(){
            Address.setDefault(this.id).then(res=>{
                this.$router.go(-1)
            })
        }
    },
    watch:{
        provinceValue(val){
            if(val===-1) return
            let index = this.addressData.list.findIndex(item => {
                return item.value === val
              })
              this.cityList = this.addressData.list[index].children
              this.cityValue = -1
              this.districtValue = -1
              if (this.type === 'edit' && this.isInitVal) {
                this.cityValue = parseInt(this.instance.cityValue)
              }
        },
        cityValue(val) {
            if (val === -1) return
            let index = this.cityList.findIndex(item => {
              return item.value === val
            })
            this.districtList = this.cityList[index].children
            this.districtValue = -1
            if (this.type === 'edit' && this.isInitVal) {
              this.districtValue = parseInt(this.instance.districtValue)
              this.isInitVal = false
            }
          }
    }
}
