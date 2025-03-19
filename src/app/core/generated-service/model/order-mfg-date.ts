/**
 * Silicone API
 * Web API for Silicone
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { InventoryAvailable } from './inventory-available';
import { ProductDto } from './product-dto';
import { UnitDto } from './unit-dto';


export interface OrderMfgDate { 
    totalExport?: number;
    productId?: string;
    product?: ProductDto;
    unitId?: string;
    unit?: UnitDto;
    inventoryAvails?: Array<InventoryAvailable> | null;
}

