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
import { UnitDto } from './unit-dto';


export interface InventoryGroupDto { 
    productId?: string;
    productName?: string | null;
    productImage?: string | null;
    productColor?: string | null;
    defaultPrice?: number | null;
    inventoryNumber?: number;
    inventoryHolding?: number;
    merchantId?: string | null;
    unitBase?: UnitDto;
    unitConversions?: Array<UnitDto> | null;
    readonly units?: Array<UnitDto> | null;
}

