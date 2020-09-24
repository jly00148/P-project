const mongoose = require('mongoose');
// const ProductModel = require('./product.js');
const CartItemSchema = new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    count:{
        type:Number,
        default:1
    },
    totalPrice:{
        type:Number,
        default:0
    },
    checked:{
        type:Boolean,
        default:true
    }
});

const CartSchema = new mongoose.Schema({
  cartList:{
    type:[CartItemSchema]
  },
  allChecked:{
    type:Boolean,
    default:true
  },
  totalCartPrice:{
    type:Number,
    default:0
  }
})

const ShippingSchema = new mongoose.Schema({
    name:{
        type:String
    },
    province:{
        type:String
    },
    city:{
        type:String
    },
    address:{
        type:String
    },
    phone:{
        type:String
    },
    zip:{
        type:String
    }
})

const UserSchema = new mongoose.Schema({
    username:{
        type:String
    },
    password:{
        type:String
    },
    isAdmin:{
        type:Boolean,
        default:false//默认是普通用户
    },
    email:{
        type:String
    },
    phone:{
        type:String
    },
    cart:{
        type:CartSchema
    },
    shipping:{
        type:[ShippingSchema],
        default:[]
    }
},{
  timestamps:true
});


const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;