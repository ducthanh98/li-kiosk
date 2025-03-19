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
import { OrderState } from './order-state';


export interface OrderStatusRequest { 
    orderState?: OrderState;
    cancelReason?: string | null;
    returnFee?: number | null;
}
export namespace OrderStatusRequest {
}


