import { model, Schema    } from "mongoose";

 
const RESOURCE_TYPES = [
  'users',
  'categories',
  'subcategories',
  'products',
  'orders',
  'payments',
  'invoices',
  'dashboard',
  'settings',
  'reports',
  'roles',
  'system',
  'general'
];

 
const ACTION_TYPES = [
  'create',
  'read',
  'update',
  'delete',
  'approve',
  'cancel',
  'refund',
  'manage',
  'generate',
  'access',
  'view',
  'assign',
  'maintenance',
  'all'
];

const permissionSchema = new  Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  resource: {
    type: String,
    required: true,
    enum: RESOURCE_TYPES
  },
  action: {
    type: String,
    required: true,
    enum: ACTION_TYPES
  },
  description: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

 
permissionSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

 
export default model("Permission", permissionSchema);
 